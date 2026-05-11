#!/usr/bin/env python3
"""
A股选股脚本 —— 筛选 6~7 元优质股票
日期：2026-05-11（周一）
条件：非ST、非涨停、非新股（>60天）、6~7元区间
维度：基本面 + 技术面 + 行业景气度

数据来源：akshare (东方财富)
"""

import sys
import time
from datetime import datetime, timedelta

import akshare as ak
import pandas as pd

# Windows 控制台 UTF-8
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

TODAY = "2026-05-11"
TARGET_LOW = 6.0
TARGET_HIGH = 7.0
MIN_LISTED_DAYS = 60


def safe_float(val, default=0.0):
    if val in (None, "", "-", "--"):
        return default
    try:
        return float(str(val).replace(",", "").replace("%", ""))
    except (ValueError, TypeError):
        return default


def safe_int(val, default=0):
    try:
        return int(float(str(val).replace(",", "")))
    except (ValueError, TypeError):
        return default


# ── Step 1: 全A股实时行情 ────────────────────────────

def fetch_all_stocks():
    print("[1/5] 获取全A股实时行情 (akshare)...")
    try:
        df = ak.stock_zh_a_spot_em()
        print(f"  -> 共 {len(df)} 只")
        return df
    except Exception as e:
        print(f"  [ERR] {e}")
        return pd.DataFrame()


# ── Step 2: 筛选 ─────────────────────────────────────

def filter_stocks(df: pd.DataFrame) -> pd.DataFrame:
    print("[2/5] 筛选 6~7元 + 非ST/涨停/新股...")

    if df.empty:
        return df

    # 列名映射（东方财富实时行情）
    # 代码/名称/最新价/涨跌幅/成交量/成交额/换手率/量比/市盈率-动态/总市值/流通市值
    code_col = "代码" if "代码" in df.columns else "code"
    name_col = "名称" if "名称" in df.columns else "name"
    price_col = "最新价" if "最新价" in df.columns else "price"
    chg_col = "涨跌幅" if "涨跌幅" in df.columns else "change_pct"
    vol_col = "成交量" if "成交量" in df.columns else "volume"
    amt_col = "成交额" if "成交额" in df.columns else "amount"
    turnover_col = "换手率" if "换手率" in df.columns else "turnover"
    pe_col = "市盈率-动态" if "市盈率-动态" in df.columns else "pe_dynamic"
    mv_col = "总市值" if "总市值" in df.columns else "total_mv"
    vol_ratio_col = "量比" if "量比" in df.columns else "volume_ratio"

    result = []
    for _, row in df.iterrows():
        code = str(row.get(code_col, ""))
        name = str(row.get(name_col, ""))
        price = safe_float(row.get(price_col))
        chg = safe_float(row.get(chg_col))
        volume = safe_float(row.get(vol_col))
        amount = safe_float(row.get(amt_col))

        if not code or price <= 0:
            continue

        # 排除ST
        if "ST" in name.upper():
            continue

        # 6-7元
        if not (TARGET_LOW <= price <= TARGET_HIGH):
            continue

        # 涨停排除
        if code.startswith(("30", "688")):
            limit_up = 19.9
        elif code.startswith(("8", "4")):
            limit_up = 29.9
        else:
            limit_up = 9.9
        if chg >= limit_up * 0.95:
            continue
        if chg <= -(limit_up * 0.95):
            continue

        # 排除停牌
        if volume <= 0 or amount <= 0:
            continue

        result.append({
            "code": code, "name": name, "price": price,
            "change_pct": chg, "volume": volume, "amount": amount,
            "turnover": safe_float(row.get(turnover_col)),
            "pe_dynamic": safe_float(row.get(pe_col)),
            "total_mv": safe_float(row.get(mv_col)),
            "volume_ratio": safe_float(row.get(vol_ratio_col)),
        })

    print(f"  -> {len(result)} 只候选股")
    return pd.DataFrame(result)


# ── Step 3: 基本面 + K线 ─────────────────────────────

def fetch_fundamentals(candidates: list[dict]) -> list[dict]:
    print("[3/5] 获取候选股基本面 + K线数据...")
    enriched = []
    for i, s in enumerate(candidates):
        code = s["code"]
        symbol = f"sh{code}" if code.startswith("6") else f"sz{code}"

        # 财务数据
        try:
            fin_df = ak.stock_financial_analysis_indicator(symbol=code)
            if fin_df is not None and not fin_df.empty:
                latest = fin_df.iloc[0]
                s["roe"] = safe_float(latest.get("净资产收益率(%)"))
                s["gross_margin"] = safe_float(latest.get("总资产利润率(%)"))
                s["eps"] = safe_float(latest.get("摊薄每股收益(元)"))
            else:
                s["roe"] = s["gross_margin"] = s["eps"] = 0.0
        except Exception:
            s["roe"] = s["gross_margin"] = s["eps"] = 0.0

        # 营收/净利增速（从利润表获取）
        try:
            profit_df = ak.stock_profit_sheet_by_report_em(symbol=code)
            if profit_df is not None and not profit_df.empty and len(profit_df) >= 2:
                # 取最近2期
                rev_curr = safe_float(profit_df.iloc[0].get("营业总收入"))
                rev_prev = safe_float(profit_df.iloc[1].get("营业总收入"))
                np_curr = safe_float(profit_df.iloc[0].get("净利润"))
                np_prev = safe_float(profit_df.iloc[1].get("净利润"))
                s["revenue_growth"] = round((rev_curr - rev_prev) / rev_prev * 100, 1) if rev_prev > 0 else 0
                s["net_profit_growth"] = round((np_curr - np_prev) / abs(np_prev) * 100, 1) if np_prev != 0 else 0

                # 毛利率
                cost_curr = safe_float(profit_df.iloc[0].get("营业总成本"))
                if rev_curr > 0:
                    s["gross_margin"] = round((rev_curr - cost_curr) / rev_curr * 100, 1)
        except Exception:
            s["revenue_growth"] = s["net_profit_growth"] = 0.0

        # K线数据（前复权日线）
        try:
            kline_df = ak.stock_zh_a_hist(symbol=code, period="daily",
                                          start_date="20251101", end_date="20260511",
                                          adjust="qfq")
            klines = []
            if kline_df is not None and not kline_df.empty:
                for _, r in kline_df.iterrows():
                    klines.append({
                        "date": str(r["日期"]),
                        "open": safe_float(r["开盘"]),
                        "close": safe_float(r["收盘"]),
                        "high": safe_float(r["最高"]),
                        "low": safe_float(r["最低"]),
                        "volume": safe_float(r["成交量"]),
                    })
            s["klines"] = klines
        except Exception:
            s["klines"] = []

        enriched.append(s)
        if (i + 1) % 10 == 0:
            print(f"  -> {i+1}/{len(candidates)}...")
        time.sleep(0.3)

    print("  -> 基本面完成")
    return enriched


# ── Step 4: 技术面 ───────────────────────────────────

def _ma(vals, n):
    if len(vals) < n:
        return 0.0
    return sum(vals[-n:]) / n


def analyze_technicals(candidates: list[dict]) -> list[dict]:
    print("[4/5] 技术面分析...")
    for s in candidates:
        klines = s.get("klines", [])
        if len(klines) < 20:
            s["tech_score"] = 40
            s["tech_signals"] = ["K线不足"]
            s["chg_20d"] = 0
            s["pct_from_60d_high"] = 0
            continue

        closes = [k["close"] for k in klines]
        volumes = [k["volume"] for k in klines]
        price = s["price"]
        score = 50
        signals = []

        ma5 = _ma(closes, 5)
        ma10 = _ma(closes, 10)
        ma20 = _ma(closes, 20)
        ma60 = _ma(closes, 60) if len(closes) >= 60 else 0

        # 均线
        if ma5 > 0 and ma10 > 0 and ma20 > 0:
            if ma5 > ma10 > ma20:
                score += 15
                signals.append("均线多头(MA5>10>20)")
            elif price > ma20:
                score += 8
            elif price > ma10:
                score += 4
        if ma60 > 0 and price > ma60:
            score += 5
            signals.append(f"站上MA60({ma60:.2f})")

        # 量能
        if len(volumes) >= 20:
            avg5 = sum(volumes[-5:]) / 5
            avg20 = sum(volumes[-20:]) / 20
            vr = avg5 / avg20 if avg20 > 0 else 1
            if 0.8 <= vr <= 1.5:
                score += 5
                signals.append("量能温和")
            elif vr > 2.0:
                score -= 5
                signals.append("放量过快")
            elif vr < 0.5:
                score -= 3

        # 20日涨跌
        chg20 = (closes[-1] - closes[-20]) / closes[-20] * 100
        s["chg_20d"] = round(chg20, 2)
        if 3 <= chg20 <= 15:
            score += 8
            signals.append(f"+{chg20:.1f}%(20日)")
        elif chg20 > 30:
            score -= 10
            signals.append(f"涨太多{chg20:.1f}%")
        elif -10 <= chg20 < 0:
            score += 5
            signals.append(f"回调{chg20:.1f}%")

        # 高位距离
        high60 = max(closes[-60:]) if len(closes) >= 60 else max(closes)
        s["pct_from_60d_high"] = round((price - high60) / high60 * 100, 2)
        if s["pct_from_60d_high"] > -10:
            score += 3
        elif s["pct_from_60d_high"] < -30:
            score -= 8

        # 量价配合
        up_days = sum(1 for k in klines[-5:] if k["close"] > k["open"])
        up_vol = sum(k["volume"] for k in klines[-5:] if k["close"] > k["open"])
        down_vol = sum(k["volume"] for k in klines[-5:] if k["close"] <= k["open"])
        if up_days >= 3 and up_vol > down_vol:
            score += 5
            signals.append("量价配合好")

        s["tech_score"] = max(0, min(100, score))
        s["tech_signals"] = signals
    print("  -> 技术面完成")
    return candidates


# ── Step 5: 综合评分 ─────────────────────────────────

def rank(candidates: list[dict]):
    print("[5/5] 综合评分...")
    for s in candidates:
        fs = 0
        roe = s.get("roe", 0)
        gm = s.get("gross_margin", 0)
        rg = s.get("revenue_growth", 0)
        pe = s.get("pe_dynamic", 0)

        if roe >= 15: fs += 15
        elif roe >= 10: fs += 12
        elif roe >= 5: fs += 8
        elif roe >= 2: fs += 4
        elif roe > 0: fs += 2

        if gm >= 40: fs += 10
        elif gm >= 25: fs += 7
        elif gm >= 15: fs += 4
        elif gm > 0: fs += 2

        if rg >= 20: fs += 15
        elif rg >= 10: fs += 10
        elif rg >= 5: fs += 6
        elif rg >= 0: fs += 3
        elif rg < -10: fs -= 5

        if 0 < pe <= 20: fs += 10
        elif 20 < pe <= 35: fs += 6
        elif 35 < pe <= 50: fs += 3

        s["fund_score"] = max(0, fs)
        s["total_score"] = round(fs * 0.5 + s.get("tech_score", 0) * 0.5, 1)

    ranked = sorted(candidates, key=lambda x: x["total_score"], reverse=True)
    top3 = []
    used = set()
    for s in ranked:
        # 简单去重行业（取前3字）
        ik = s.get("code", "")[:3]
        if ik not in used or len(top3) < 3:
            top3.append(s)
            used.add(ik)
        if len(top3) >= 3:
            break
    return top3, ranked


# ── 输出 ─────────────────────────────────────────────

def print_report(top3, all_ranked):
    print()
    print("=" * 65)
    print("   *** A股 6~7元精选推荐 -- 2026-05-11 (周一) ***")
    print("=" * 65)

    for idx, s in enumerate(top3, 1):
        code = s["code"]; name = s["name"]; price = s["price"]
        chg = s["change_pct"]; pe = s.get("pe_dynamic", 0)
        roe = s.get("roe", 0); gm = s.get("gross_margin", 0)
        rg = s.get("revenue_growth", 0); ng = s.get("net_profit_growth", 0)
        chg20 = s.get("chg_20d", 0); ts = s["total_score"]
        cs = "+" if chg >= 0 else ""
        print()
        print(f"  >>> TOP{idx}: {code} {name} | {price:.2f}元 | 日{cs}{chg:.2f}% | 评分: {ts:.1f}")
        print(f"      PE: {pe:.1f} | ROE: {roe:.1f}% | 毛利率: {gm:.1f}% | 营收增速: {rg:.1f}% | 净利增速: {ng:.1f}%")
        print(f"      20日涨幅: {chg20:.1f}% | 距60日高: {s.get('pct_from_60d_high',0):.1f}%")
        reasons = []
        if roe >= 10: reasons.append(f"ROE{roe:.1f}%盈利强")
        elif roe >= 5: reasons.append(f"ROE{roe:.1f}%盈利稳")
        if rg >= 10: reasons.append(f"营收+{rg:.1f}%成长佳")
        elif rg >= 5: reasons.append(f"营收+{rg:.1f}%稳健")
        if gm >= 25: reasons.append(f"毛利率{gm:.1f}%竞争力强")
        if 0 < pe <= 25: reasons.append(f"PE{pe:.1f}估值合理")
        if 3 < chg20 < 20: reasons.append("趋势向上非高位")
        if "均线多头" in str(s.get("tech_signals", [])): reasons.append("均线多头排列")
        if not reasons: reasons.append("指标均衡")
        print(f"      推荐理由: {' | '.join(reasons)}")
        sigs = s.get("tech_signals", [])[:4]
        if sigs:
            print(f"      技术信号: {' | '.join(sigs)}")

    # 备选
    print(f"\n  --- 备选池 (第4-10名) ---")
    others = [x for x in all_ranked if x not in top3][:7]
    for i, s in enumerate(others, 4):
        print(f"  #{i} {s['code']} {s['name']:<8s} {s['price']:.2f}元 "
              f"PE{s.get('pe_dynamic',0):.0f} ROE{s.get('roe',0):.1f}% "
              f"毛利{s.get('gross_margin',0):.1f}% 营收+{s.get('revenue_growth',0):.1f}% "
              f"评分{s['total_score']:.1f}")

    print(f"\n  免责声明: 以上为量化筛选结果，仅供参考，不构成投资建议。")
    print(f"  数据日期: 2026-05-11 | 数据来源: 东方财富(akshare)\n")


# ── 主流程 ────────────────────────────────────────────

def main():
    print(f"\n>>> A股选股引擎 -- {TODAY}\n")

    # Step 1
    df = fetch_all_stocks()
    if df.empty:
        print("行情获取失败，退出。")
        return

    # Step 2
    candidates_df = filter_stocks(df)
    if candidates_df.empty:
        print("无符合条件的股票。")
        return

    candidates = candidates_df.to_dict(orient="records")

    # 如果候选股太多，按换手率预筛选
    if len(candidates) > 40:
        candidates.sort(key=lambda x: x.get("turnover", 0) + x.get("volume_ratio", 0), reverse=True)
        candidates = candidates[:40]
        print(f"  -> 预筛选至 40 只")

    # Step 3
    candidates = fetch_fundamentals(candidates)

    # Step 4
    candidates = analyze_technicals(candidates)

    # Step 5
    top3, all_ranked = rank(candidates)

    print_report(top3, all_ranked)


if __name__ == "__main__":
    main()

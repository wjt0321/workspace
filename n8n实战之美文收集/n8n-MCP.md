{

  "mcpServers": {

    "n8n-mcp": {

      "command": "npx",

      "args": [

        "-y",

        "supergateway",

        "--streamableHttp",

        "https://n8n.wxbfnnas.com/mcp-server/http",

        "--header",

        "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MzQ3YzhjMC1iNzg0LTQxNTUtOTEyYi04MWJiZGEyY2FkNzMiLCJpc3MiOiJuOG4iLCJhdWQiOiJtY3Atc2VydmVyLWFwaSIsImp0aSI6IjYxM2Q2ZWI4LWI3ODYtNDM3MS1iMjZkLTg1OTNlODMyZjM1MCIsImlhdCI6MTc2ODU0NDYyMX0.80Cq4q9vguHE8e6pO4Hg9tvTaA87zmcunsXomElJmtw",

        "--logLevel",

        "debug"

      ]

    }

  }

}
# Demo service

This service shows a problem with the GraphQL Hive Gateway.
It is not performing string interpolation (i.e., processing env variables).

mesh-compose works fine with the env var and generates a valid supergraph schema but the hive gateway doesn't work with the env var.

When an env var is used in mesh.config.ts as the subgraph endpoint the hive gateway returns an error:

```

[2025-04-07T13:44:06.952Z] DEBUG [requestId=b5def054-6bdf-4b7c-b8fe-b5a406e915e9, fetchId=2e796841-02d2-44e8-a2d1-c85f43413dd5, http-fetch-request]  {
  url: '{env.SUBGRAPH_GRAPHQL_COUNTRIES_ENDPOINT}',
  method: 'POST',
  body: '{"query":"query($filter:CountryFilterInput){__typename countries(filter:$filter){__typename code capital currency}}","variables":{"filter":{}}}',
  headers: {
    accept: 'application/graphql-response+json, application/json, multipart/mixed',
    'content-type': 'application/json',
    'x-request-id': 'b5def054-6bdf-4b7c-b8fe-b5a406e915e9'
  },
  signal: false
}

[2025-04-07T13:37:03.003Z] DEBUG [requestId=702734b0-482b-429d-b2a6-ba247315096e, subgraph=Countries, subgraphExecuteId=9c68c3fa-93de-418a-90f5-908ce7fbbb32, subgraph-execute-end]  {
  errors: [
    Error: connect ECONNREFUSED ::1:80
        at createConnectionError (node:net:1675:14)
        at afterConnectMultiple (node:net:1705:16) {
      path: undefined,
      locations: undefined,
      extensions: [Object]
    },
    Error: connect ECONNREFUSED 127.0.0.1:80
        at createConnectionError (node:net:1675:14)
        at afterConnectMultiple (node:net:1705:16) {
      path: undefined,
      locations: undefined,
      extensions: [Object]
    }
  ]
}
```

## Prerequisites

- pnpm 10.7.1

## Replicating the issue

1. Start the service

```bash
pnpm mesh:dev
```

2. Copy the `.env.example`. file to `.env`

3. Run the GraphQL query:

```gql
{
  countries {
    capital
    currency
  }
}
```

Using `curl`:

```bash
curl --location 'http://localhost:4000/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"{\n  countries {\n    capital\n    currency\n  }\n}","variables":{}}'
```

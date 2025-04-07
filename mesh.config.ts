import { config } from 'dotenv'
config()
// ------------------------------------------------------

import { defineConfig, loadGraphQLHTTPSubgraph } from '@graphql-mesh/compose-cli'
import { GatewayCLIConfig } from '@graphql-hive/gateway'

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadGraphQLHTTPSubgraph('Countries', {
        // NOTE: mesh-compose works fine with the env var and generates a valid supergraph schema
        // but the hive gateway doesn't work with the env var
        endpoint: '{env.SUBGRAPH_ENDPOINT}'

        // NOTE: When the env var is passed as a literal string, the hive gateway works, but then
        // the supergraph schema is hardcoded
        //  endpoint: process.env.SUBGRAPH_ENDPOINT
      })
    }
  ]
})

// A workaround for the hive gateway not working with the interpolated env var in supergraph schema
// export const gatewayConfig: GatewayCLIConfig = {
//   transportEntries: {
//     // 👇 your subgraph name
//     Countries: {
//       // 👇 your new location
//       location: process.env.SUBGRAPH_ENDPOINT
//     }
//   }
// }

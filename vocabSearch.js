import 'dotenv/config'
import { SearchClient, AzureKeyCredential } from '@azure/search-documents'

import { env } from './config/config.js'

const client = new SearchClient(
  env.AZURE_SEARCH_URL,
  env.AZURE_VOCAB_INDEX,
  new AzureKeyCredential(env.AZURE_SEARCH_KEY)
)

const searchResults = await client.search('term2~', {
  searchMode: 'all',
  queryType: 'full',
})

const data = []
for await (const result of searchResults.results) {
  data.push(result.document)
}

console.log(data)

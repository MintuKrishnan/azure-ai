import { SearchClient, AzureKeyCredential } from '@azure/search-documents'
import { env } from '../config/config.js'

const client = new SearchClient(
  env.AZURE_SEARCH_URL,
  env.AZURE_VOCAB_INDEX,
  new AzureKeyCredential(env.AZURE_SEARCH_KEY)
)

export async function updateAzureSearch(action, document) {
  try {
    let toUpload
    if (action === 'upload' || action === 'merge') {
      toUpload = [{ '@search.action': action, ...document }]
    } else if (action === 'delete') {
      toUpload = [{ '@search.action': action, id: document.id.toString() }]
    }
    const result = await client.uploadDocuments(toUpload)
    console.log(`${action} documents: `, result.results.length)
  } catch (error) {
    console.error(`Error ${action} document:`, error.message)
  }
}

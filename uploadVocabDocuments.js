import { SearchClient, AzureKeyCredential } from '@azure/search-documents'
import { env } from '../config/config.js'
import { Vocabulary } from '@libs/mongoose-orm'

const client = new SearchClient(
  env.AZURE_SEARCH_URL,
  env.AZURE_VOCAB_INDEX,
  new AzureKeyCredential(env.AZURE_SEARCH_KEY)
)

export async function uploadVocabularyDocuments() {
  try {
    const count = await Vocabulary.countDocuments()
    const page = Math.ceil(count / 1000)
    console.log(`*** Indexing ${count} documents in ${page} batches ***`)

    for (let i = 0; i < page; i++) {
      console.log('Batch ', i + 1)

      const documents = await Vocabulary.find({})
        .limit(1000)
        .skip(i * 1000)
        .select('_id name alias definition document status version date')
        .exec()
      console.log(documents)
      const toUpload = documents.map(({ _doc: { _id, ...rest } }) => {
        return { '@search.action': 'upload', id: _id, ...rest }
      })
      console.log(toUpload)
      const result = await client.uploadDocuments(toUpload)
      console.log('Indexed documents: ', result.results.length)
    }

    console.log('Total indexed result:', await client.getDocumentsCount())
  } catch (error) {
    console.error('Error uploading documents:', error.message)
  }
}

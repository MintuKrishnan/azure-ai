import 'dotenv/config'

import { Vocabulary, createConnection, disconnect } from '@libs/mongoose-orm'
import { uploadVocabularyDocuments } from './indexer/uploadVocabDocuments.js'
import { createVocabularyIndex } from './indexer/createVocabIndex.js'

const dummyData = [
  {
    name: 'Term1',
    alias: ['Term1Alias1', 'Term1Alias2'],
    definition: 'Definition of Term1',
    document: 'Document1',
    status: 'active',
    version: 'v1.0',
    date: new Date('2024-01-01'),
  },
]

try {
  await createConnection()
  await Vocabulary.insertMany(dummyData)
  console.log('Database seeded with dummy vocabulary data')
  await createVocabularyIndex()
  await uploadVocabularyDocuments()
} catch (err) {
  console.error(err)
} finally {
  await disconnect()
}

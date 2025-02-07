import { AzureKeyCredential, SearchIndexClient } from '@azure/search-documents'
import 'dotenv/config'
import { env } from '../config/config.js'

const searchIndexClient = new SearchIndexClient(
  env.AZURE_SEARCH_URL,
  new AzureKeyCredential(env.AZURE_SEARCH_KEY)
)

const vocabularyIndexOptions = {
  name: env.AZURE_VOCAB_INDEX,
  fields: [
    {
      name: 'id',
      type: 'Edm.String',
      searchable: false,
      filterable: false,
      retrievable: true,
      stored: true,
      sortable: false,
      facetable: false,
      key: true,
      indexAnalyzer: null,
      searchAnalyzer: null,
      analyzer: null,
      normalizer: null,
      dimensions: null,
      vectorSearchProfile: null,
      vectorEncoding: null,
      synonymMaps: [],
    },
    {
      name: 'name',
      type: 'Edm.String',
      searchable: true,
      filterable: false,
      retrievable: true,
      stored: true,
      sortable: false,
      facetable: false,
      key: false,
      indexAnalyzer: null,
      searchAnalyzer: null,
      analyzer: 'standard.lucene',
      normalizer: null,
      dimensions: null,
      vectorSearchProfile: null,
      vectorEncoding: null,
      synonymMaps: [],
    },
    {
      name: 'alias',
      type: 'Collection(Edm.String)',
      searchable: true,
      filterable: false,
      retrievable: true,
      stored: true,
      sortable: false,
      facetable: false,
      key: false,
      indexAnalyzer: null,
      searchAnalyzer: null,
      analyzer: 'standard.lucene',
      normalizer: null,
      dimensions: null,
      vectorSearchProfile: null,
      vectorEncoding: null,
      synonymMaps: [],
    },
    {
      name: 'definition',
      type: 'Edm.String',
      searchable: true,
      filterable: false,
      retrievable: true,
      stored: true,
      sortable: false,
      facetable: false,
      key: false,
      indexAnalyzer: null,
      searchAnalyzer: null,
      analyzer: 'standard.lucene',
      normalizer: null,
      dimensions: null,
      vectorSearchProfile: null,
      vectorEncoding: null,
      synonymMaps: [],
    },
    {
      name: 'status',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
      retrievable: true,
      stored: true,
      sortable: true,
      facetable: false,
      key: false,
      indexAnalyzer: null,
      searchAnalyzer: null,
      analyzer: null,
      normalizer: null,
      dimensions: null,
      vectorSearchProfile: null,
      vectorEncoding: null,
      synonymMaps: [],
    },
    {
      name: 'version',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
      retrievable: true,
      stored: true,
      sortable: true,
      facetable: false,
      key: false,
      indexAnalyzer: null,
      searchAnalyzer: null,
      analyzer: null,
      normalizer: null,
      dimensions: null,
      vectorSearchProfile: null,
      vectorEncoding: null,
      synonymMaps: [],
    },
    {
      name: 'date',
      type: 'Edm.DateTimeOffset',
      searchable: false,
      filterable: true,
      retrievable: true,
      stored: true,
      sortable: true,
      facetable: false,
      key: false,
      indexAnalyzer: null,
      searchAnalyzer: null,
      analyzer: null,
      normalizer: null,
      dimensions: null,
      vectorSearchProfile: null,
      vectorEncoding: null,
      synonymMaps: [],
    },
    {
      name: 'document',
      type: 'Edm.String',
      searchable: false,
      filterable: false,
      retrievable: true,
      stored: true,
      sortable: false,
      facetable: false,
      key: false,
      indexAnalyzer: null,
      searchAnalyzer: null,
      analyzer: null,
      normalizer: null,
      dimensions: null,
      vectorSearchProfile: null,
      vectorEncoding: null,
      synonymMaps: [],
    },
  ],
  scoringProfiles: [],
  corsOptions: null,
  suggesters: [
    {
      name: 'iface-suggester',
      searchMode: 'analyzingInfixMatching',
      sourceFields: ['name', 'definition'],
    },
  ],
}

export async function createVocabularyIndex() {
  try {
    const index = await searchIndexClient.getIndex(env.AZURE_VOCAB_INDEX)
    if (index) {
      await searchIndexClient.deleteIndex(env.AZURE_VOCAB_INDEX)
    }
    const result = await searchIndexClient.createIndex(vocabularyIndexOptions)
    console.log('Vocabulary index created/updated:', result.name)
  } catch (error) {
    console.error('Error creating vocabulary index:', error)
  }
}

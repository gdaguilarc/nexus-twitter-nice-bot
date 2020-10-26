import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'No custom scalars are used in your Prisma Schema.'

// Prisma model type definitions
interface PrismaModels {
  Tweet: Prisma.Tweet
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    tweets: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'Content' | 'Negative' | 'Positive'
      ordering: 'id' | 'Content' | 'Negative' | 'Positive'
    }
  },
  Tweet: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    tweet: 'Tweet'
    tweets: 'Tweet'
  },
  Mutation: {
    createOneTweet: 'Tweet'
    updateOneTweet: 'Tweet'
    updateManyTweet: 'BatchPayload'
    deleteOneTweet: 'Tweet'
    deleteManyTweet: 'BatchPayload'
    upsertOneTweet: 'Tweet'
  },
  Tweet: {
    id: 'String'
    Content: 'String'
    Negative: 'Int'
    Positive: 'Int'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Tweet: Typegen.NexusPrismaFields<'Tweet'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  
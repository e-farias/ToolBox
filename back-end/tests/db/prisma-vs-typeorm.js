import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const queryPrisma = async () => {
  return await prisma.yourModel.findMany()
}

const queryTypeORM = async () => {
  return await prisma.yourModel.findMany()
}

async function runTest() {
  try {
    const startTime = new Date()

    // Execute the first query
    const queryPrisma = await prisma.yourModel.findMany()

    const elapsedTime = new Date() - startTime

    console.log('Time Elapsed:', elapsedTime, 'ms')
  } catch (e) {
    console.error('Error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

runTest()
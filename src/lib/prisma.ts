import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: PrismaClient | undefined
}

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // PrismaClient is attached to the `global` object in development to prevent
  // exhausting your database connection limit.
  //
  // Learn more:
  // https://pris.ly/d/help/next-js-best-practices
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

import { Pool } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from '@prisma/adapter-neon';

const prismaClientSingleton = () => {  
  //Make prisma client edge compatible
  const pool = new Pool({ connectionString:process.env.DATABASE_URL })
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({adapter});
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const roles = [
    { title: 'Admin', value: 'admin' },
    { title: 'User', value: 'user' },
  ]

  for (const role of roles) {
    await prisma.role.create({
      data: role
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
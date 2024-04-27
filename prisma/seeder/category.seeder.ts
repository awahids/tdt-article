import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { title: 'Technology', value: 'tech' },
    { title: 'Business', value: 'business' },
    { title: 'Sports', value: 'sports' },
    { title: 'Entertainment', value: 'entertainment' },
    { title: 'Health', value: 'health' },
  ];

  for (const category of categories) {
    try {
      await prisma.category.upsert({
        where: { value: category.value },
        update: {},
        create: {
          title: category.title,
          value: category.value,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

main()
  .catch((error) => {
    console.error('Error during seeding:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data for Costume
  const costume1 = await prisma.costume.create({
    data: {
      name: 'WereWolf Costume',
      description: 'A costume that makes you look like a werewolf.',
      weakness: ['Silver'],
      skills: ['Howling', 'Running'],
      price: 200,
      stock: true,
    },
  });

  const costume2 = await prisma.costume.create({
    data: {
      name: 'Vampire Costume',
      description: 'A costume that makes you look like a vampire.',
      weakness: ['Garlic'],
      skills: ['Flying', 'Biting'],
      price: 300,
      stock: false,
    },
  });


  const costume3 = await prisma.costume.create({
    data: {
      name: 'Ghost Costume',
      description: 'A costume that makes you look like a ghost.',
      weakness: ['Salt'],
      skills: ['Scaring', 'Floating'],
      price: 100,
      stock: true,
    },
  });


  // Seed data for Attendee
  const attendee1 = await prisma.attendee.create({
    data: {
      dni: '12345678',
      firstName: 'Mario',
      lastName: 'Doe',
      address: '123 Main St',
      money: 150,
      age: 16,
      fears: ['bats', 'clowns'],
      isNervous: false,
    },
  });

  const attendee2 = await prisma.attendee.create({
    data: {
      dni: '87654321',
      firstName: 'Ariel',
      lastName: 'Doe',
      address: '123 Main St',
      money: 200,
      age: 20,
      fears: ['ghosts', 'spiders'],
      isNervous: false,
    },
  });

  const attendee3 = await prisma.attendee.create({
    data: {
      dni: '11111111',
      firstName: 'Jessica',
      lastName: 'Smith',
      address: '456 American St',
      money: 500,
      age: 19,
      fears: ['wolfs', 'fly'],
      isNervous: true,
    },
  });


  // Seed data for Party
  const party1 = await prisma.party.create({
    data: {
      name: 'Halloween Bash',
      date: new Date('2024-10-31'),
      address: '456 Party Lane',
    },
  });

  const party2 = await prisma.party.create({
    data: {
      name: 'Christmas Party',
      date: new Date('2024-12-25'),
      address: '123 Party Lane',
    },
  });

  const party3 = await prisma.party.create({
    data: {
      name: 'New Year Party',
      date: new Date('2024-12-31'),
      address: '789 Party Lane',
    },
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

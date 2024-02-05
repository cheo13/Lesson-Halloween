import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CostumesService {
  constructor(private prisma: PrismaService) {}

//First endpoint...

async getCostumesInStock() {
  const costumes = await this.prisma.costume.findMany({
    where: {
      stock: true,
    },
  });

  return costumes;
}

// Second endpoint...

async supplyCostumes(numberToSupply: number) {
  // Obtén la cantidad total de disfraces en stock
  const totalStock = await this.prisma.costume.aggregate({
    _count: true,
  });

  // Calcula la cantidad de disfraces que faltan para satisfacer la demanda
  const shortage = Math.max(0, numberToSupply - totalStock._count);

  // Si hay una escasez, agrega más disfraces al inventario
  if (shortage > 0) {
    const newCostumesData = Array.from({ length: shortage }, () => ({
      name: "Disfraz Spiderman",
      description: "Rojo con blanco",
      weakness: ["Doctor Octopus"],
      skills: ["Aracnido"],
      price: 50, // Ajusta el precio según tus necesidades
      stock: true,
    }));

    const newCostumes = await this.prisma.costume.createMany({
      data: newCostumesData,
    });

    return newCostumes;
  }

  return { message: 'It is not required to add costumes to the inventory.' };
}

  async createCostume(createCostumeDto: CreateCostumeDto) {
    const costume = await this.prisma.costume.create({
      data: createCostumeDto,
    });

    return costume;
  }

  async getAllCostumes() {
    const costumes = await this.prisma.costume.findMany();
    return costumes;
  }

  async getCostumeById(id: number) {
    const costume = await this.prisma.costume.findUnique({
      where: { id },
    });

    if (!costume) {
      throw new NotFoundException(`Costume with ID ${id} not found`);
    }

    return costume;
  }

  async updateCostume(id: number, updateCostumeDto: UpdateCostumeDto) {
    const existingCostume = await this.prisma.costume.findUnique({
      where: { id },
    });

    if (!existingCostume) {
      throw new NotFoundException(`Costume with ID ${id} not found`);
    }

    const updatedCostume = await this.prisma.costume.update({
      where: { id },
      data: updateCostumeDto,
    });

    return updatedCostume;
  }

  async deleteCostume(id: number) {
    const deletedCostume = await this.prisma.costume.delete({
      where: { id },
    });

    if (!deletedCostume) {
      throw new NotFoundException(`Costume with ID ${id} not found`);
    }

    return deletedCostume;
  }
}
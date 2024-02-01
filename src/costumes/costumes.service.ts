import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CostumesService {
  constructor(private prisma: PrismaService) {}
//Primer endpoint...
async getCostumesInStock() {
  const costumes = await this.prisma.costume.findMany({
    where: {
      stock: true,
    },
  });

  return costumes;
}

// Segundo endpoint...
async supplyCostumes(numberToSupply: number) {
  // Obtén la cantidad total de disfraces en stock
  const totalStock = await this.prisma.costume.aggregate({
    _count: true,
  });

  // Calcula la cantidad de disfraces que faltan para satisfacer la demanda
  const shortage = Math.max(0, numberToSupply - totalStock._count);

  // Si hay una escasez, agrega más disfraces al inventario
  if (shortage > 0) {
    const newCostumes = await this.prisma.costume.createMany({
      data: [
        {
          name: "Disfraz de Superman",
          description: "Descripción opcional",
          weakness: ["Kryptonite"],
          skills: ["Vuelo", "Super fuerza"],
          price: 30,
          stock: true
        }
      ]
    });

    return newCostumes;
  }

    return { message: 'No se requiere agregar disfraces al inventario.' };
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

    return deletedCostume;
  }
}
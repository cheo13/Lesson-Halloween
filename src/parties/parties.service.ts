import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PartiesService {
  constructor(private prisma: PrismaService) {}

  async createParty(createPartyDto: CreatePartyDto) {
    const party = await this.prisma.party.create({
      data: createPartyDto,
    });

    return party;
  }

  async getAllParties() {
    const parties = await this.prisma.party.findMany();
    return parties;
  }

  async getPartyById(id: number) {
    const party = await this.prisma.party.findUnique({
      where: { id },
    });

    if (!party) {
      throw new NotFoundException(`Party with ID ${id} not found`);
    }

    return party;
  }

  async updateParty(id: number, updatePartyDto: UpdatePartyDto) {
    const existingParty = await this.prisma.party.findUnique({
      where: { id },
    });

    if (!existingParty) {
      throw new NotFoundException(`Party with ID ${id} not found`);
    }

    const updatedParty = await this.prisma.party.update({
      where: { id },
      data: updatePartyDto,
    });

    return updatedParty;
  }

  async deleteParty(id: number) {
    const deletedParty = await this.prisma.party.delete({
      where: { id },
    });

    return deletedParty;
  }
}
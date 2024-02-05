import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AttendeesService {
  constructor(private prisma: PrismaService) {}

  //Three endpoint...

async purchaseCostumes() {
  
  const attendees = await this.prisma.attendee.findMany();
  const costumes = await this.prisma.costume.findMany();

  const costumeMap = new Map<number, any>();
  costumes.forEach(costume => {
    costumeMap.set(costume.id, costume);
  });

  const attendeesWithCostumes = attendees.map(attendee => {
    const costumeId = attendee.id;
    const costume = costumeMap.get(costumeId);

    return {
      attendee,
      costume,
    };
  });

  return attendeesWithCostumes;
}

// Four endpoint....

async getAttendeesWithLowBudget() {
  const attendeesWithLowBudget = await this.prisma.attendee.findMany({
    where: {
      money: {
        lte: 200,
      },
    },
  });

  return attendeesWithLowBudget;
}

async incrementBudget(attendeeId: number, amount: number) {
  const existingAttendee = await this.prisma.attendee.findUnique({
    where: { id: attendeeId },
  });

  if (!existingAttendee) {
    throw new NotFoundException(`Assistant with ID not found ${attendeeId}.`);
  }

  const updatedAttendee = await this.prisma.attendee.update({
    where: { id: attendeeId },
    data: {
      money: {
        increment: amount,
      },
    },
  });

  return updatedAttendee;
}

//Five endpoint...

async reallocateFunds(senderId: number, receiverId: number, amountToTransfer: number) {
  const senderAttendee = await this.prisma.attendee.findUnique({
    where: { id: senderId },
  });

  const receiverAttendee = await this.prisma.attendee.findUnique({
    where: { id: receiverId },
  });

  if (!senderAttendee || !receiverAttendee) {
    throw new NotFoundException('The attendees were not found...');
  }

  if (senderAttendee.age < 18 || receiverAttendee.age >= 18) {
    throw new Error('The transfer of funds is only possible between an adult attendee and a minor attendee.');
  }
  if (amountToTransfer <= 0) {
    throw new Error('The amount to be transferred must be greater than zero.');
  }

  if (amountToTransfer > senderAttendee.money) {
    throw new Error('The sending assistant does not have enough funds to transfer that amount.');
  }

    await this.prisma.attendee.update({
      where: { id: senderId },
      data: {
        money: {
          decrement: amountToTransfer,
        },
      },
    });

    await this.prisma.attendee.update({
      where: { id: receiverId },
      data: {
        money: {
          increment: amountToTransfer,
        },
      },
    });
  

  return { message: 'Fund transfer completed.' };
}

//Seven endpoint...

async getAdultAttendees(): Promise<CreateAttendeeDto[]> {
  const adultAttendees = await this.prisma.attendee.findMany({
    where: {
      age: {
        gte: 18,
      },
    },
  });

  return adultAttendees;
}

//Eight endpoint...

async getNervousAttendees(): Promise<CreateAttendeeDto[]> {
  const nervousAttendees = await this.prisma.attendee.findMany({
    where: {
      isNervous: true,
    },
  });

  return nervousAttendees;
}

  async createAttendee(createAttendeeDto: CreateAttendeeDto) {
    const attendee = await this.prisma.attendee.create({
      data: createAttendeeDto,
    });

    return attendee;
  }

  async getAllAttendees() {
    const attendees = await this.prisma.attendee.findMany();
    return attendees;
  }

  async getAttendeeById(id: number) {
    const attendee = await this.prisma.attendee.findUnique({
      where: { id },
    });

    if (!attendee) {
      throw new NotFoundException(`Attendee with ID ${id} not found`);
    }

    return attendee;
  }

  async updateAttendee(id: number, updateAttendeeDto: UpdateAttendeeDto) {
    const existingAttendee = await this.prisma.attendee.findUnique({
      where: { id },
    });

    if (!existingAttendee) {
      throw new NotFoundException(`Attendee with ID ${id} not found`);
    }

    const updatedAttendee = await this.prisma.attendee.update({
      where: { id },
      data: updateAttendeeDto,
    });

    return updatedAttendee;
  }

  async deleteAttendee(id: number) {
    const deletedAttendee = await this.prisma.attendee.delete({
      where: { id },
    });
    if (!deletedAttendee) {
      throw new NotFoundException(`Attendee with ID ${id} not found`);
    }

    return deletedAttendee;
  }
}
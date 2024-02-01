import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { PrismaService } from "../prisma/prisma.service";
import { PurchaseCostumesDto } from './dto/purchase-costumes.dto';

@Injectable()
export class AttendeesService {
  constructor(private prisma: PrismaService) {}
//Tercer endpoint...
// En el servicio (attendees.service.ts)
async purchaseCostumes(attendeeId: number, costumeIds: number[]) {
  // Verifica si el asistente existe
  const existingAttendee = await this.prisma.attendee.findUnique({
    where: { id: attendeeId },
  });

  if (!existingAttendee) {
    throw new NotFoundException(`No se encontró el asistente con ID ${attendeeId}.`);
  }

  // Obtiene los disfraces seleccionados para la compra
  const selectedCostumes = await this.prisma.costume.findMany({
    where: {
      id: {
        in: costumeIds,
      },
    },
  });

  // Realiza la compra asignando los disfraces al asistente
  const purchasedAttendee = await this.prisma.attendee.update({
    where: { id: attendeeId },
    data: {
      // Actualiza el dinero del asistente restando el precio total de los disfraces
      money: {
        decrement: selectedCostumes.reduce((total, costume) => total + costume.price, 0),
      },
    },
  });

  return purchasedAttendee;
}


// Cuarto endpoint....
async incrementBudget(attendeeId: number, amount: number) {
  const existingAttendee = await this.prisma.attendee.findUnique({
    where: { id: attendeeId },
  });

  if (!existingAttendee) {
    throw new NotFoundException(`No se encontró el asistente con ID ${attendeeId}.`);
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
//Quinto endpoint...
async reallocateFunds(senderId: number, receiverId: number) {
  const senderAttendee = await this.prisma.attendee.findUnique({
    where: { id: senderId },
  });

  const receiverAttendee = await this.prisma.attendee.findUnique({
    where: { id: receiverId },
  });

  if (!senderAttendee || !receiverAttendee) {
    throw new NotFoundException('No se encontraron los asistentes.');
  }

  if (senderAttendee.age >= 18 || receiverAttendee.age < 18) {
    throw new Error('La transferencia de fondos solo es posible entre un asistente mayor de edad y un asistente menor de edad.');
  }

  const transferAmount = Math.min(senderAttendee.money, receiverAttendee.money);

  if (transferAmount > 0) {
    await this.prisma.attendee.update({
      where: { id: senderId },
      data: {
        money: {
          decrement: transferAmount,
        },
      },
    });

    await this.prisma.attendee.update({
      where: { id: receiverId },
      data: {
        money: {
          increment: transferAmount,
        },
      },
    });
  }

  return { message: 'Transferencia de fondos completada.' };
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

    return deletedAttendee;
  }
}
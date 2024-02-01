import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { PurchaseCostumesDto } from './dto/purchase-costumes.dto';
import { BankDto } from './dto/increment-budget.dto';

@Controller('attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}
//Tercer endpoint...@Post('purchase')// En el controlador (attendees.controller.ts)

@Post(':id/purchase')
  async purchaseCostumes(@Param('id') attendeeId: number, @Body() purchaseCostumesDto: PurchaseCostumesDto) {
    const { costumeIds } = purchaseCostumesDto;
    const purchasedAttendee = await this.attendeesService.purchaseCostumes(attendeeId, costumeIds);
    return purchasedAttendee;
  }

  //Cuarto endpoint...
  @Post(':id/bank')
  async incrementBudget(
    @Param('id', ParseIntPipe) attendeeId: number,
    @Body('amount', ParseIntPipe) amount: number,
  ) {
    const updatedAttendee = await this.attendeesService.incrementBudget(attendeeId, amount);
    return updatedAttendee;
  }
  //Quinto endpoint..
  @Post(':senderId/reallocation/:receiverId')
  async reallocateFunds(
    @Param('senderId', ParseIntPipe) senderId: number,
    @Param('receiverId', ParseIntPipe) receiverId: number,
  ) {
    const result = await this.attendeesService.reallocateFunds(senderId, receiverId);
    return result;
  }

  @Post()
  async createAttendee(@Body() createAttendeeDto: CreateAttendeeDto) {
    const createdAttendee = await this.attendeesService.createAttendee(
      createAttendeeDto,
    );
    return createdAttendee;
  }

  @Get()
  async getAllAttendees() {
    const attendees = await this.attendeesService.getAllAttendees();
    return attendees;
  }

  @Get(':id')
  async getAttendeeById(@Param('id') id: string) {
    const attendee = await this.attendeesService.getAttendeeById(+id);
    return attendee;
  }

  @Patch(':id')
  async updateAttendee(
    @Param('id') id: string,
    @Body() updateAttendeeDto: UpdateAttendeeDto,
  ) {
    const updatedAttendee = await this.attendeesService.updateAttendee(
      +id,
      updateAttendeeDto,
    );
    return updatedAttendee;
  }

  @Delete(':id')
  async deleteAttendee(@Param('id') id: string) {
    const deletedAttendee = await this.attendeesService.deleteAttendee(+id);
    if (!deletedAttendee) {
      throw new NotFoundException(`Attendee with ID ${id} not found`);
    }
    return deletedAttendee;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';

@Controller('attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

 //Three endpoint...

@Get('purchase')
  async purchaseCostumes() {
    const result = await this.attendeesService.purchaseCostumes();
    return { message: 'Operation complet...', data: result };
  }

  //Four endpoint...

  @Get('attendeeslow')
  async getAttendeesWithLowBudget() {
    const attendeesWithLowBudget = await this.attendeesService.getAttendeesWithLowBudget();
    return { message: 'Operation complet...', data: attendeesWithLowBudget };
  }

  @Post(':id/bank')
  async incrementBudget(
    @Param('id', ParseIntPipe) attendeeId: number,
    @Body('amount', ParseIntPipe) amount: number,
  ) {
    const updatedAttendee = await this.attendeesService.incrementBudget(attendeeId, amount);
    return updatedAttendee;
  }

  //Five endpoint..

  @Post(':senderId/reallocation/:receiverId')
  async reallocateFunds(
    @Param('senderId', ParseIntPipe) senderId: number,
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Body('amountToTransfer', ParseIntPipe) amountToTransfer: number,
  ) {
    const result = await this.attendeesService.reallocateFunds(senderId, receiverId, amountToTransfer);
    return result;
  }
  
  //Seven endpoint...

  @Get('adults')
  async getAdultAttendees() {
    const adultAttendees = await this.attendeesService.getAdultAttendees();
    return { message: 'Attendees Adults Localization...', data: adultAttendees };
  }

  //Eigth endpoint...

  @Get('nervous')
  async getNervousAttendees() {
    const nervousAttendees = await this.attendeesService.getNervousAttendees();
    return { message: 'Attendees Nerous Localization...', data: nervousAttendees };
  }
  
  @Post()
  async createAttendee(@Body() createAttendeeDto: CreateAttendeeDto) {
    const createdAttendee = await this.attendeesService.createAttendee(createAttendeeDto,);
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
  async updateAttendee(@Param('id') id: string,@Body() updateAttendeeDto: UpdateAttendeeDto,) {
    const updatedAttendee = await this.attendeesService.updateAttendee(+id,updateAttendeeDto,);
    return updatedAttendee;
  }

  @Delete(':id')
  async deleteAttendee(@Param('id') id: string) {
    const deletedAttendee = await this.attendeesService.deleteAttendee(+id);
    return deletedAttendee;
  }
}

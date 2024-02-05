import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) { }

  //Six endpoint...
  @Get(':date')
  async getPartiesByDate(@Param('date') date: string) {
    const parties = await this.partiesService.getPartiesByDate(new Date(date));
    return parties;
  }

  @Post()
  createParty(@Body() createPartyDto: CreatePartyDto) {
    return this.partiesService.createParty(createPartyDto);
  }

  @Get()
  getAllParties() {
    return this.partiesService.getAllParties();
  }

  @Get(':id')
  getPartyById(@Param('id') id: string) {
    return this.partiesService.getPartyById(+id);
  }

  @Patch(':id')
  updateParty(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.updateParty(+id, updatePartyDto);
  }

  @Delete(':id')
  deleteParty(@Param('id') id: string) {
    return this.partiesService.deleteParty(+id);
  }
}
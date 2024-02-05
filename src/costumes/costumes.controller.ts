import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CostumesService } from './costumes.service';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';

@Controller('costumes')
export class CostumesController {
  constructor(private readonly costumesService: CostumesService) {}

  //First endpoint....

  @Get('/stock')
  async getCostumesInStock() {
    const costumes = await this.costumesService.getCostumesInStock();
    return costumes;
  }

  //Second endpoint...

  @Post('supplying')
  async supplyCostumes(@Body('numberToSupply', ParseIntPipe) numberToSupply: number) {
    const result = await this.costumesService.supplyCostumes(numberToSupply);
    return { message: 'Operation complet...', data: result };
  }

  @Post()
  createCostume(@Body() createCostumeDto: CreateCostumeDto) {
    return this.costumesService.createCostume(createCostumeDto);
  }

  @Get()
  getAllCostumes() {
    return this.costumesService.getAllCostumes();
  }

  @Get(':id')
  getCostumeById(@Param('id') id: string) {
    return this.costumesService.getCostumeById(+id);
  }

  @Patch(':id')
  updateCostume(@Param('id') id: string, @Body() updateCostumeDto: UpdateCostumeDto) {
    return this.costumesService.updateCostume(+id, updateCostumeDto);
  }

  @Delete(':id')
  deleteCostume(@Param('id') id: string) {
    return this.costumesService.deleteCostume(+id);
  }
}

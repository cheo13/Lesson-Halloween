import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CostumesService } from './costumes.service';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';

@Controller('costumes')
export class CostumesController {
  constructor(private readonly costumesService: CostumesService) {}

  //Primer endpoint....
  @Get('/stock')
  async getCostumesInStock() {
    const costumes = await this.costumesService.getCostumesInStock();
    return costumes;
  }

  //Segundo endpoint...
  @Post('supplying')
  async supplyCostumes(@Body('quantity') quantity: number) {
    const result = await this.costumesService.supplyCostumes(quantity);
    return { message: 'Operación exitosamente.', result };
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

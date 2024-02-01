import { Module } from '@nestjs/common';
import { CostumesService } from './costumes.service';
import { CostumesController } from './costumes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [CostumesController],
  providers: [CostumesService],
  imports: [PrismaModule],
})
export class CostumesModule {}

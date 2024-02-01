import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [PartiesController],
  providers: [PartiesService],
  imports: [PrismaModule],
})
export class PartiesModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CostumesModule } from './costumes/costumes.module';
import { AttendeesModule } from './attendees/attendees.module';
import { PartiesModule } from './parties/parties.module';

@Module({
  imports: [PrismaModule, CostumesModule, AttendeesModule, PartiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { ApiProperty } from '@nestjs/swagger';

export class PurchaseCostumesDto {
  @ApiProperty()
  attendeeId: number;

  @ApiProperty({ type: [Number] })
  costumeIds: number[];
}

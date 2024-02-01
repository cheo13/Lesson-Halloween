import { ApiProperty } from '@nestjs/swagger';

export class CreatePartyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  address: string;
}

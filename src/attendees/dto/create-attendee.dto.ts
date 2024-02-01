import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendeeDto {
  @ApiProperty()
  dni: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty()
  money: number;

  @ApiProperty()
  age: number;

  @ApiProperty({ type: [String], required: false })
  fears?: string[];

  @ApiProperty({ required: false })
  isNervous?: boolean;
}

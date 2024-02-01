import { ApiProperty } from '@nestjs/swagger';

export class CreateCostumeDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ type: [String], required: false })
  weakness?: string[];

  @ApiProperty({ type: [String], required: false })
  skills?: string[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: boolean;
}

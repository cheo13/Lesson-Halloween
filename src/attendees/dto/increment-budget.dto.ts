import { ApiProperty } from '@nestjs/swagger';

export class BankDto {
  @ApiProperty()
  amount: number;
}
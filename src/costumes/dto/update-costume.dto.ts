import { PartialType } from '@nestjs/swagger';
import { CreateCostumeDto } from './create-costume.dto';

export class UpdateCostumeDto extends PartialType(CreateCostumeDto) {}

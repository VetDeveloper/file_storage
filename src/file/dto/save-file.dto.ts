import { ApiProperty, PickType } from '@nestjs/swagger';
import { ResponseUrlDTO } from './reponse-url.dto';

export class SaveFileDTO extends PickType(ResponseUrlDTO, ['key']) {}

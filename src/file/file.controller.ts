import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user';
import { DeleteFileDTO } from './dto/delete-file.dto';
import { GetPersistentUrlDTO } from './dto/get-persistent-url.dto';
import { ResponseUrlDTO } from './dto/reponse-url.dto';
import { SaveFileDTO } from './dto/save-file.dto';
import { FileService } from './file.service';
import { FileModel } from './models/file.model';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiResponse({
    status: 201,
    description: 'URL создан успешно',
    type: ResponseUrlDTO,
  })
  @ApiOperation({
    summary: 'Получения подписанного URL для сохранения файла в облако',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('url')
  async getPersistentUrl(@Body() dto: GetPersistentUrlDTO) {
    return this.fileService.getPersistentUrl(dto);
  }

  @ApiOperation({ summary: 'Сохранение файла, загруженного по Persistent URL' })
  @ApiResponse({ status: 201, type: FileModel })
  @ApiBody({ type: SaveFileDTO })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('upload')
  async saveUploadFile(@Body() dto: SaveFileDTO, @GetUser('id') id: number) {
    return this.fileService.createOneFile(dto, id);
  }

  @ApiOperation({ summary: 'Получить все файлы пользователя' })
  @ApiResponse({ status: 200, type: [FileModel] })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getFiles(@GetUser('id') id: number) {
    return this.fileService.getUserFiles(id);
  }

  @ApiOperation({ summary: 'Удалить один файл' })
  @ApiResponse({ status: 202, type: [FileModel] })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  async deleteFile(@Body() dto: DeleteFileDTO) {
    return this.fileService.deleteFile(dto);
  }

  /////////////////////////////////////////////////////

  @ApiOperation({ summary: 'Загрузка файла на облако' })
  @ApiResponse({ status: 200, type: FileModel })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @Post('upl')
  async createOneFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') id: number,
  ) {
    return this.fileService.uploadOneFile(file.buffer, file.originalname, id);
  }
}

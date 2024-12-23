import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderRequestDto } from 'src/dto/request/folder';
import { UpdateFolderRequestDto } from 'src/dto/request/folder';


@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async createFolder(@Body() createFolderDto: CreateFolderRequestDto) {
    const dataFetch = await this.folderService.createFolder(createFolderDto);
    return await this.folderService.getAllFolders();
  }

  @Get(':id')
  async getFolder(@Param('id') id: string) {
    return this.folderService.getFolderById(id);
  }

  @Get()
  async getAllFolders(@Query("name") name) {
    return this.folderService.getAllFolders();
  }

  @Patch(':id')
  async updateFolder(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderRequestDto) {
    return this.folderService.updateFolder(id, updateFolderDto);
  }

  @Delete(':id')
  async deleteFolder(@Param('id') id: string) {
    return this.folderService.deleteFolder(id);
  }
}

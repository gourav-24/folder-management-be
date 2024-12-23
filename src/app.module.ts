import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { FolderModule } from './api';

const API_MODULES = [FolderModule];

@Module({
  imports: [...API_MODULES],
  controllers: [],
  providers: [ PrismaService],
})
export class AppModule {}

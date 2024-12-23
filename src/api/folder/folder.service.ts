import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Folder } from '@prisma/client';

@Injectable()
export class FolderService {
  constructor(private readonly prisma: PrismaService) {}

  async createFolder(dataReq: { id:string, name: string; depth: number; parentId?: string }): Promise<Folder> {
    const data = {
        id:dataReq.id,
        name: dataReq.name,
        depth: dataReq.depth,
        parent: dataReq.parentId ? { connect: { id: dataReq.parentId } } : undefined, // Use nested relation
    } 
    return this.prisma.folder.create({ data });
  }

  async getFolderById(id: string): Promise<Folder[] | null> {
    let record = await this.prisma.folder.findUnique({ where: { id } });
    record = await this.fillChildren(record);
    return record? [record]:[];
  }

  async getAllFolders(name:string = ""): Promise<Folder[]> {
    let folders = await this.prisma.folder.findMany({
        where: {
          name:{
            contains:name,
            mode: "insensitive"
          }
        }
      });
      if(name==""){
        folders = await this.buildFolderHierarchy(folders);
      }
      
      return folders;
  }

  async updateFolder(id: string, data: { name?: string; depth?: number }): Promise<Folder> {
    return this.prisma.folder.update({ where: { id }, data });
  }

  async deleteFolder(id: string): Promise<Folder> {
    return this.prisma.folder.delete({ where: { id } });
  }

  private async fillChildren(folder){
    if(!folder || !folder?.id) return [];
    const foldersList = await this.prisma.folder.findMany({
        where:{
            parentId:{
                not:null
            }
        }
    });
    const children = await this.buildFolderHierarchy(foldersList, folder.id);
    folder.children = children;
    return folder;


  }

  private buildFolderHierarchy(folders: any[], parentId: string | null = null): any[] {
    return folders
      .filter(folder => folder.parentId === parentId) // Find all folders for the current parent
      .map(folder => ({
        ...folder,
        children: this.buildFolderHierarchy(folders, folder.id), // Recursively find children
      }));
  }
}

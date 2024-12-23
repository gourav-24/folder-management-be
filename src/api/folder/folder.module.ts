import { Module } from "@nestjs/common";
import { FolderService } from "./folder.service";
import { FolderController } from "./folder.controller";
import { PrismaService } from "src/prisma/prisma.service";

const Services = [FolderService, PrismaService];

@Module({
    imports:[],
    providers:[...Services],
    controllers:[FolderController],
    exports:[...Services],
})
export class FolderModule{}
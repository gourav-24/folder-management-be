import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
export class UpdateFolderRequestDto {
  
    @IsString()
    @IsNotEmpty()
    id?:string;

    @IsOptional() 
    @IsString() 
    name?: string;

    @IsOptional() 
    @IsNumber() 
    depth?: number;
}
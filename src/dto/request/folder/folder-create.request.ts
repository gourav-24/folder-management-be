import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateFolderRequestDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty() 
  @IsString() 
  name: string;

  @IsNotEmpty() 
  @IsNumber() 
  depth: number;

  @IsOptional() 
  @IsString() 
  parentId?: string;
}
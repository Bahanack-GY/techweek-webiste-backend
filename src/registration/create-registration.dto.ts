import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ContestType } from './registration.schema';

export class TeamMemberDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;
}

export class CreateRegistrationDto {
  @IsEnum(ContestType)
  contestType: ContestType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  teamName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  school: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  leaderName: string;

  @IsEmail()
  leaderEmail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  leaderPhone: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDto)
  members: TeamMemberDto[];
}

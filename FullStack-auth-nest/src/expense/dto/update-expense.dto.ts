import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsString()
  type: string;

  
  @IsNotEmpty()
  userId: number;
}

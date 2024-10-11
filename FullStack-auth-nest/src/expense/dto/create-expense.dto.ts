// src/expense/dto/create-expense.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDateString() // Change this line
  @IsNotEmpty()
  date: string; // Change this type to string
  
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  userId: number; // Include userId for linking to the User
}

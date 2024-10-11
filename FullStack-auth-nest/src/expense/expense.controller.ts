// src/expense/expense.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Request } from 'express';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

//   @Get()
//   findAll(@Req() request: Request) {
//     const userId = request.user?.id; // Fetching the user ID from the request
//     return this.expenseService.findAll(userId); // Fetch expenses for the authenticated user
//   }

  @Get('user/:userId') // New route to get expenses by user ID
  findByUserId(@Param('userId') userId: string) {
    return this.expenseService.findByUserId(+userId); // Convert userId to number
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}

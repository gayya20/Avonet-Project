// src/expense/expense.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Assuming you're using a PrismaService to handle Prisma client
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const { date, ...rest } = createExpenseDto;

    return this.prisma.expense.create({
      data: {
        ...rest,
        date: new Date(date), // Convert string date to Date object
      },
    });
  }

  async findAll(userId: number) {
    // Fetching all expenses for the authenticated user
    return this.prisma.expense.findMany({
      where: { userId }, // Filter expenses by userId
      include: {
        user: true, // Including user details in the response
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.expense.findMany({
      where: { userId }, // Fetch expenses by userId
    });
  }

  async findOne(id: number) {
    return this.prisma.expense.findUnique({
      where: { id },
      include: {
        user: true, // Including user details in the response
      },
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    // Check if the expense exists
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    // If the expense doesn't exist, throw a NotFoundException
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found.`);
    }

    // Proceed with deletion if the record exists
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}

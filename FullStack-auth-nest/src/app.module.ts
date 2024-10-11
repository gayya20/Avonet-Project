import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseService } from './expense/expense.service';
import { ExpenseModule } from './expense/expense.module';
// import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ExpenseModule,
  ],
  controllers: [AppController, ExpenseController],
  providers: [AppService, PrismaService, ExpenseService],
})
export class AppModule {}

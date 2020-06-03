import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { TaskRepository } from './tasks/task.repository';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './auth/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TasksModule,
    TypeOrmModule.forFeature([TaskRepository, UserRepository]),
    AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule { }

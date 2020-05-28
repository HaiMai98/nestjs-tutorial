import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    };

    //Method1
    // @Post()
    // createTask(@Body () body) {
    //     console.log('Body =============> ', body);
    //     return this.tasksService.createTask(body.title, body.description);
    // }


    //Method2
    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ): Task {
    //     console.log('Title =============> ', title);
    //     console.log('Description =============> ', description);
    //     return this.tasksService.createTask(title, description);

    // }

    @Post()
    createTask(
        @Body()createTaskDto: CreateTaskDto
    ): Task {
        console.log('CreateTaskDto =============> ', createTaskDto);
        return this.tasksService.createTask(createTaskDto);

    }

}

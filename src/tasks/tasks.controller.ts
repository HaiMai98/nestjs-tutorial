import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';    //add Task if no db connection
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from 'src/pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }



    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise <Task[]>{
        return this.tasksService.getTasks(filterDto);
    };
    // @Get()
    // getTasks(@Query()filterDto: GetTaskFilterDto): Task[] {
    //     console.log('filterDTO ================> ', filterDto);
    //     if (Object.keys(filterDto).length){
    //         return this.tasksService.getTaskWithFilter(filterDto);
    //     }
    //     else {
    //         return this.tasksService.getAllTasks();
    //     }
    // };


    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }
    // //Method1
    // // @Post()
    // // createTask(@Body () body) {
    // //     console.log('Body =============> ', body);
    // //     return this.tasksService.createTask(body.title, body.description);
    // // }


    // //Method2
    // // @Post()
    // // createTask(
    // //     @Body('title') title: string,
    // //     @Body('description') description: string
    // // ): Task {
    // //     console.log('Title =============> ', title);
    // //     console.log('Description =============> ', description);
    // //     return this.tasksService.createTask(title, description);

    // // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        console.log('CreateTaskDto =============> ', createTaskDto);
        return this.tasksService.createTask(createTaskDto);

    }


    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        console.log('id ==============>', id);
        return this.tasksService.deleteTask(id);
    }

    @Put('/:id')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
}

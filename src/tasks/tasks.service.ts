import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    //For method 1 & 2 in controller
    // createTask(title: string, description: string): Task{
    //     const task: Task = {
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //         id: uuidv1(),
    //     }

    //     this.tasks.push(task);
    //     return task;
    // }


    //For Dto
    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            title,
            description,
            status: TaskStatus.OPEN,
            id: uuidv1(),
        }

        this.tasks.push(task);
        return task;
    }
}

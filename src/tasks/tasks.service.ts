import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilter(filter: GetTaskFilterDto): Task[] {
        const { status, search } = filter;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const data = this.tasks.find(task =>
            task.id === id
        );
        if (!data){
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return data;
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
        const { title, description } = createTaskDto;
        const task: Task = {
            title,
            description,
            status: TaskStatus.OPEN,
            id: uuidv1(),
        }

        this.tasks.push(task);
        return task;
    }


    deleteTask(id: string) {
        const data = this.getTaskById(id);
        this.tasks.filter(task => task.id !== data.id);
        return { message: 'Done' }
    }


    updateTaskStatus(id: string, status: TaskStatus) {
        let task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}

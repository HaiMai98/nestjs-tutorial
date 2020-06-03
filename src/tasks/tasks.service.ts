import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';    //add Task if no db connection
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }
    // private tasks: Task[] = [];      //Use only when no db connection



    async getTasks(filterDto: GetTaskFilterDto): Promise <Task[]>{
        return this.taskRepository.getTasks(filterDto);

    }
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskWithFilter(filter: GetTaskFilterDto): Task[] {
    //     const { status, search } = filter;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    //     }
    //     return tasks;
    // }



    async getTaskById(id: number): Promise<Task> {
        const data = await this.taskRepository.findOne(id);
        if (!data) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return data;
    }
    // getTaskById(id: string): Task {
    //     const data = this.tasks.find(task =>
    //         task.id === id
    //     );
    //     if (!data){
    //         throw new NotFoundException(`Task with id ${id} not found`);
    //     }
    //     return data;
    // }



    async createTask(createTaskDto: CreateTaskDto): Promise <Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    //For one who not use task repository
    // async createTask(createTaskDto: CreateTaskDto): Promise <Task>{
    //     const {title, description} = createTaskDto;
    //     const task = new Task();
    //     task.title = title;
    //     task.description = description;
    //     task.status = TaskStatus.OPEN;
    //     await task.save();
    //     return task;
    // }


    // //For method 1 & 2 in controller
    // // createTask(title: string, description: string): Task{
    // //     const task: Task = {
    // //         title,
    // //         description,
    // //         status: TaskStatus.OPEN,
    // //         id: uuidv1(),
    // //     }

    // //     this.tasks.push(task);
    // //     return task;
    // // }


    // //For Dto
    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //         id: uuidv1(),
    //     }

    //     this.tasks.push(task);
    //     return task;
    // }



    async deleteTask(id: number):Promise <void>{
        const result = await this.taskRepository.delete(id);
        console.log(result);
        if (result.affected === 0){
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }
    // deleteTask(id: string) {
    //     const data = this.getTaskById(id);
    //     this.tasks.filter(task => task.id !== data.id);
    //     return { message: 'Done' }
    // }



    async updateTaskStatus (id: number, status: TaskStatus): Promise <Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
    // updateTaskStatus(id: string, status: TaskStatus) {
    //     let task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}

import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks/tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any) {
        value = value.toUpperCase();
        console.log('value ', value);
        if (!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is invalid status`);
        }
        return value;

    }

    private isStatusValid(status: any){
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}
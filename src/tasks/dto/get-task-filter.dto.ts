import { TaskStatus } from "../tasks.model";
import { IsNotEmpty } from "class-validator";

export class GetTaskFilterDto{
    @IsNotEmpty()
    status: TaskStatus;
    @IsNotEmpty()
    search: string;

}
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  createTask({ title, description }: CreateTaskDto) {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const index = this.tasks.findIndex((t) => t.id === id);
    const task = this.tasks[index];
    this.tasks.splice(index, 1);
    return task;
  }

  updateTaskStatus(id: string, { status }: UpdateTaskStatusDto) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}

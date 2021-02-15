import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters({ search, status }: GetTasksFilterDto) {
    return this.tasks.filter((t) => {
      let isSearch = true;
      let isStatus = true;

      if (search) {
        isSearch =
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase());
      }
      if (status) {
        isStatus = t.status === status;
      }
      return isSearch && isStatus;
    });
  }

  getTaskById(id: string) {
    const found = this.tasks.find((t) => t.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
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
    const task = this.getTaskById(id);
    const index = this.tasks.findIndex((t) => t.id === id);
    this.tasks.splice(index, 1);
    return task;
  }

  updateTaskStatus(id: string, { status }: UpdateTaskStatusDto) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}
  // getAllTasks() {
  //   return this.tasks;
  // }
  // getTasksWithFilters({ search, status }: GetTasksFilterDto) {
  //   return this.tasks.filter((t) => {
  //     let isSearch = true;
  //     let isStatus = true;
  //     if (search) {
  //       isSearch =
  //         t.title.toLowerCase().includes(search.toLowerCase()) ||
  //         t.description.toLowerCase().includes(search.toLowerCase());
  //     }
  //     if (status) {
  //       isStatus = t.status === status;
  //     }
  //     return isSearch && isStatus;
  //   });
  // }

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async createTask({ title, description }: CreateTaskDto) {
    return await this.taskRepository
      .create({
        title,
        description,
        status: TaskStatus.OPEN,
      })
      .save();
  }

  // deleteTask(id: string) {
  //   const task = this.getTaskById(id);
  //   const index = this.tasks.findIndex((t) => t.id === id);
  //   this.tasks.splice(index, 1);
  //   return task;
  // }
  // updateTaskStatus(id: string, { status }: UpdateTaskStatusDto) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}

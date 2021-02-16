import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskStatusValidationPipe } from './pipes/update-task-status-validation.pipe';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // @UsePipes(ValidationPipe)
  // getTasks(@Query() filterDto: GetTasksFilterDto) {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  @UsePipes(UpdateTaskStatusValidationPipe)
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }
}

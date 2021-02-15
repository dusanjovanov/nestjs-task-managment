import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.metatype === UpdateTaskStatusDto) {
      if (!this.isStatusValid(value.status)) {
        throw new BadRequestException(`${value.status} in an invalid value`);
      }
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}

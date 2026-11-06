import { Controller, Get, Post, Body, Patch, Param, Delete,  ParseIntPipe, Put} from '@nestjs/common';
import { TasksService, Task } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

   @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

 @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, dto);
  }

  @Patch(':id')
    patch(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: Partial<UpdateTaskDto>,
    ): Promise<Task> {
    return this.tasksService.patch(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.tasksService.remove(id);
  }
}
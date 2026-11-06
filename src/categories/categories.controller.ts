import { Controller, Get, Post, Body, Patch, Param, Delete,  ParseIntPipe, Put} from '@nestjs/common';
import { CategoriesService, Category } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

   @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

 @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, dto);
  }

  @Patch(':id')
    patch(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: Partial<UpdateCategoryDto>,
    ): Promise<Category> {
    return this.categoriesService.patch(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
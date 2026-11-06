import { Injectable, NotFoundException } from '@nestjs/common';
import { writeFile, readFile } from 'node:fs/promises';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { join } from 'node:path';
import { UpdateCategoryDto } from './dto/update-category.dto.js';


export interface Category {
  id: number;
  imagem: string | undefined;
  nome: string | undefined;
  status: number;
}

@Injectable()
export class CategoriesService {
  private readonly filePath = join(
    process.cwd(),
    'data',
    'categories.json',
  );

  private writeQueue: Promise<void> = Promise.resolve();

  private async readCategories(): Promise<Category[]> {
    const content = await readFile(this.filePath, 'utf-8');
    return JSON.parse(content) as Category[];
  }

  private async saveCategories(categories: Category[]): Promise<void> {
    const content = JSON.stringify(categories, null, 2);

    this.writeQueue = this.writeQueue.then(() =>
      writeFile(this.filePath, content, 'utf-8'),
    );

    await this.writeQueue;
  }

  async findAll(): Promise<Category[]> {
    return this.readCategories();
  }

  async findOne(id: number): Promise<Category> {
    const categories = await this.readCategories();
    const category = categories.find((item) => item.id === id);

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const categories = await this.readCategories();

    const category: Category = {
      id: categories.length > 0
        ? Math.max(...categories.map((item) => item.id)) + 1
        : 1,
      imagem: dto.imagem,
      nome: dto.nome,
      status: 1
    };

    categories.push(category);
    await this.saveCategories(categories);

    return category;
  }

  async update(
  id: number,
  dto: UpdateCategoryDto,
): Promise<Category> {
  const categories = await this.readCategories();
  const index = categories.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new NotFoundException('Categoria não encontrada');
  }

  categories[index] = {
    id,
imagem  : dto.imagem,
    nome: dto.nome,
    status: dto.status,
  
  };

  await this.saveCategories(categories);

  return categories[index];
}

async patch(
  id: number,
  dto: Partial<UpdateCategoryDto>,
): Promise<Category> {
  const categories = await this.readCategories();
  const index = categories.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new NotFoundException('Categoria não encontrada');
  }

  categories[index] = {
    ...categories[index],
    ...dto,
    id,
  };

  await this.saveCategories(categories);

  return categories[index];
}

  async remove(id: number): Promise<void> {
    const categories = await this.readCategories();
    const filteredCategories = categories.filter((item) => item.id !== id);

    if (filteredCategories.length === categories.length) {
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.saveCategories(filteredCategories);
  }
}
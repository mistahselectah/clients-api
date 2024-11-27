import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource } from 'typeorm/data-source/DataSource';
import { InjectDataSource } from '@nestjs/typeorm/dist/common/typeorm.decorators';

export const IsEntityExistsPipe = (entityClass: EntityClassOrSchema) => {
  @Injectable()
  class EntityIdMixinPipe {
    constructor(@InjectDataSource() public dataSource: DataSource) {}
    async transform(id: string): Promise<string> {
      const entity = await this.dataSource
        .getRepository(entityClass)
        .findOneBy({ id });
      if (!entity) {
        throw new NotFoundException();
      }
      return id;
    }
  }
  return EntityIdMixinPipe;
};

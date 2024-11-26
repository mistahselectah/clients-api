import { ClientEntity } from '@entities/client.entity';
import { CreateClientInput } from '@modules/clients/dto/create-client.input';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IsEmailNotTakenPipe implements PipeTransform {
  constructor(@InjectRepository(ClientEntity) private clientsRepo: typeof ClientEntity) {
  }

  async transform(input: CreateClientInput): Promise<boolean> {
    const exist = await this.clientsRepo.existsBy({email: input.email});
    if(exist){
      throw new BadRequestException('Такой email уже занят');
    }
    return true;
  }

}

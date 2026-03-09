import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource
  ) { }

  async create(user: User) {
    console.log(user, "before..")
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const savedUser = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      console.log(savedUser, "saved...")
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}

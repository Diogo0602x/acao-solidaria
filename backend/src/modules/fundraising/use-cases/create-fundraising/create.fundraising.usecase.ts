import { Injectable, NotFoundException } from '@nestjs/common'
import { FundraisingRepository } from '@fundraising/repositories/fundraising.repository'
import { CreateFundraisingDto } from '@fundraising/dtos/create.fundraising.dto'
import { User } from '@users/entities/user.entity'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import { UsersRepository } from '@users/repositories/users.repository'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class CreateFundraisingUseCase {
  constructor(
    private readonly fundraisingRepository: FundraisingRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    createFundraisingDto: CreateFundraisingDto,
  ): Promise<Fundraising> {
    const user = await this.usersRepository.findOne({
      where: { id: createFundraisingDto.userId },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const fundraising = new Fundraising()

    fundraising.name = createFundraisingDto.name
    fundraising.quantity = createFundraisingDto.quantity
    fundraising.quantityAvailable = createFundraisingDto.quantityAvailable
    fundraising.price = createFundraisingDto.price

    if (user.linkedTo) {
      const linkedUser = await this.usersRepository.findOne({
        where: { id: user.linkedTo },
      })

      if (!linkedUser) {
        throw new NotFoundException('Linked user not found')
      }

      fundraising.pixKeyCpf = user.cpf
      fundraising.pixKeyCnpj = linkedUser.cnpj || user.cnpj
      fundraising.pixKeyChaveAleatoria =
        linkedUser.pixKeyChaveAleatoria || user.pixKeyChaveAleatoria
    } else {
      fundraising.pixKeyCpf = user.cpf
      fundraising.pixKeyCnpj = user.cnpj
      fundraising.pixKeyChaveAleatoria = user.pixKeyChaveAleatoria
    }

    fundraising.user = Promise.resolve(user) // Wrap the user in a Promise

    // Save the fundraising entity first to get the ID
    const savedFundraising = await this.fundraisingRepository.save(fundraising)

    // Now save the image using the fundraising ID
    fundraising.image = await this.saveImage(
      createFundraisingDto.image,
      user,
      savedFundraising.id,
    )

    // Save the fundraising entity again with the updated image path
    return await this.fundraisingRepository.save(fundraising)
  }

  private async saveImage(
    image: string,
    user: User,
    fundraisingId: string,
  ): Promise<string> {
    const userDir = path.resolve(
      __dirname,
      `../../users/${user.id}/fundraising`,
    )
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }

    const imagePath = path.join(userDir, `${fundraisingId}-image.jpg`)
    fs.writeFileSync(imagePath, image)

    return imagePath
  }
}

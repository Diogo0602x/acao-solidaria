import { User } from '@modules/users/infra/mongoose/schemas/User'
import { UpdateUserDTO } from '@modules/users/dtos/UpdateUserDTO'

class UpdateUserService {
  public async execute(
    userId: string,
    updateData: UpdateUserDTO,
  ): Promise<User | null> {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true })

    return user
  }
}

export { UpdateUserService }

import User from '../src/domain/entities/user-entity'
import * as mUsers from './users-data'

const NAME = 'Ricardo'
const EMAIL = 'ricardo@mail.com'
const PASSWORD = '123456'

const user = new User()
user.setEmail = EMAIL
user.setName = NAME
user.setPassword = PASSWORD

mUsers.mockUsers.push(user)
const mockUsers = mUsers.mockUsers

export {
  NAME,
  EMAIL,
  PASSWORD,
  mockUsers
}

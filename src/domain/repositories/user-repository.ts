import User from "../entities/user-entity"
import { mockUsers } from "../../../__mocks__/user.sut"

export default class UserRepository {

    async create(name: string, email: string, password: string): Promise<User> {
        let user = new User()
        user.setEmail = email
        user.setName = name
        user.setPassword = password
        return user
    }

    async findOneByEmailAndPassword(email: string, password: string): Promise<User | null> {
        let users: Array<User> = mockUsers.filter(user => user.getEmail === email && user.getPassword === password)
        if (users.length === 1) {
            return users[0]
        }
        return null
    }
}
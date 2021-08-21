import User from "../entities/user-entity"
import { mockUsers } from "../../../__mocks__/user.sut"

export default class UserRepository {

    static create(name: string, email: string, password: string): User {
        let user = new User()
        user.setEmail = email
        user.setName = name
        user.setPassword = password
        return user
    }

    static findOneByEmailAndPassword(email: string, password: string): User | null {
        let users: Array<User> = mockUsers.filter(user => user.getEmail === email && user.getPassword === password)
        if (users.length === 1) {
            return users[0]
        }
        return null
    }
}
import { NAME, EMAIL, PASSWORD } from "../../../__mocks__/user.sut"
import User from "../entities/user-entity"
import UserRepository from "./user-repository"

describe('User Repository', () => {

    test('Should to create an User.', () => {
        const user:  User = UserRepository.create(NAME, EMAIL, PASSWORD)
        expect(user).toBeInstanceOf(User)
    })

    test('Should to find an User by email and password.', () => {
        const user:  User | null = UserRepository.findOneByEmailAndPassword(EMAIL, PASSWORD)
        expect(user).toBeInstanceOf(User)
    })

})
import { NAME, EMAIL, PASSWORD } from "../../../__mocks__/user.sut"
import User from "../entities/user-entity"
import UserRepository from "./user-repository"

const makeSut = () => {
    const userRepository = new UserRepository()
    return {
        userRepository
    }
}

describe('User Repository', () => {

    test('Should to create an User.', async () => {
        const { userRepository } = makeSut()
        const user: User = await userRepository.create(NAME, EMAIL, PASSWORD)
        expect(user).toBeInstanceOf(User)
    })

    test('Should to find an User by email and password.', async () => {
        const { userRepository } = makeSut()
        const user: User | null = await userRepository.findOneByEmailAndPassword(EMAIL, PASSWORD)
        expect(user).toBeInstanceOf(User)
    })

})
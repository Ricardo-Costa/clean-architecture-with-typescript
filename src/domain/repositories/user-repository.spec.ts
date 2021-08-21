import {
    EMAIL,
    PASSWORD,
    mockUsers
 } from "../../../__mocks__/user.sut"
import User from "../entities/user-entity"
import UserRepository from "./user-repository"

describe('User Repository', () => {

    test('Should to find an User by email and password.', () => {
        const user:  User | null = UserRepository.findOneByEmailAndPassword(EMAIL, PASSWORD)
        expect(user).toBeInstanceOf(User)
    })

})
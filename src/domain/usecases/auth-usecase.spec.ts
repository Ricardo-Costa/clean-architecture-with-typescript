import AuthUseCase from "./auth-usecase"
import { HttpResponseMetadata } from "./../../infrastructure/types/http-response-metadata"
import { EMAIL, PASSWORD } from "../../../__mocks__/user.sut"
import HttpStatusCode from "../../presentation/enums/http-status-code.enum"
import UserRepository from "../repositories/user-repository"

const makeSut = () => {
    const userRepository = new UserRepository()
    const authUseCase = new AuthUseCase(userRepository)
    return {
        userRepository,
        sut: authUseCase
    }
}

describe('Auth UseCase', () => {

    test('Should return null if no email or password are provided.', () => {
        const { sut } = makeSut()
        const promise: Promise<HttpResponseMetadata> = sut.auth('', '')
        expect(promise).rejects.toThrow()
    })

    test('Should return null if no email or password are provided.', async () => {
        const { sut } = makeSut()
        const response: HttpResponseMetadata = await sut.auth(EMAIL, PASSWORD)
        expect(response).toHaveProperty('body')
        expect(response.body).toHaveProperty('accessToken')
    })

    test('Should return null if no email or password valid.', async () => {
        const { sut } = makeSut()
        const response: HttpResponseMetadata = await sut.auth(EMAIL, 'invalid_password')
        expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED)
    })

})
import AuthUseCase from "./auth-usecase"
import { HttpResponseMetadata } from "./../../infrastructure/types/http-response-metadata"

describe('Auth UseCase', () => {

    test('Should return null if no email or password are provided.', async () => {
        const sut = new AuthUseCase()
        const promise: Promise<HttpResponseMetadata> = sut.auth('', '')
        expect(promise).rejects.toThrow()
    })

})
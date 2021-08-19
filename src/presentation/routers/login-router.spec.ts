import UserRepository from "../../domain/repositories/user-repository"
import { mockUsers } from "../../mocks/users-data"
import LoginRouter from "./login-router"
import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata"
import AuthUseCase from "../../domain/usecases/auth-usecase"
import HttpResponse from "../../../src/presentation/utils/http-response-util"

const NAME = "Ricardo"
const EMAIL = "ricardo@mail.com"
const PASSWORD = "123456"
mockUsers.push(UserRepository.create(NAME, EMAIL, PASSWORD))

const makeSup = () => {

    // moked class
    class AuthUseCaseSpy extends AuthUseCase {
        email: string = ''
        password: string = ''
    
        auth(email: string, password: string): HttpResponseMetadata {
            this.email = email
            this.password = password
            const user = UserRepository.findOneByEmailAndPassword(email, password)
            if (user) {
                return HttpResponse.ok({
                    user,
                    accessToken: 'valid_access_token'
                })
            }
            return HttpResponse.notAuthorized()
        }
    }

    const authUseCase = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCase)
    return {
        sut,
        authUseCase
    }
}

describe('Login Router', () => {

    test('Should return 400 if no email or password is provided.', () => {
        const { sut } = makeSup()
        const httpRequest = {
            body: {
                email: '',
                password: ''
            }
        }
        const resp: HttpResponseMetadata = sut.router(httpRequest)
        expect(resp.statusCode).toBe(400)
    })

    // test('Should return 404 if not found User.', () => {
    //     const { sut } = makeSup()
    //     const httpRequest = {
    //         body: {
    //             email: 'invalid@mail.com',
    //             password: 'invalid_password'
    //         }
    //     }
    //     const resp: HttpResponseMetadata = sut.router(httpRequest)
    //     expect(resp.statusCode).toBe(404)
    // })

    test('Should return 401 when invalid credencials are provided.', () => {
        const { sut } = makeSup()
        const httpRequest = {
            body: {
                email: EMAIL,
                password: 'invalid_password'
            }
        }
        const resp: HttpResponseMetadata = sut.router(httpRequest)
        expect(resp.statusCode).toBe(401)
        // expect(resp.body).toEqual(new NotAuthorizedError(''))
        expect(resp.body).toBeInstanceOf(Error)
    })
    
    test('Should return 200, User and accessToken if valid login.', () => {
        const { sut } = makeSup()
        const httpRequest = {
            body: {
                email: EMAIL,
                password: PASSWORD
            }
        }
        const resp: HttpResponseMetadata = sut.router(httpRequest)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toHaveProperty('user')
        expect(resp.body).toHaveProperty('accessToken')
    })
    
    test('Should to call AuthUseCase with correct params.', () => {
        const { sut, authUseCase } = makeSup()
        const httpRequest = {
            body: {
                email: EMAIL,
                password: PASSWORD
            }
        }
        sut.router(httpRequest)
        expect(authUseCase.email).toBe(httpRequest.body.email)
        expect(authUseCase.password).toBe(httpRequest.body.password)
    })

})
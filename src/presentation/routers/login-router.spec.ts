import UserRepository from "../../domain/repositories/user-repository"
import { mockUsers } from "../../mocks/users-data"
import LoginRouter from "./login-router"
import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata"

const NAME = "Ricardo"
const EMAIL = "ricardo@mail.com"
const PASSWORD = "123456"
mockUsers.push(UserRepository.create(NAME, EMAIL, PASSWORD))

describe('Login Router', () => {

    test('Should return 400 if no email or password is provided.', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: {
                email: '',
                password: ''
            }
        }
        const resp: HttpResponseMetadata = sut.router(httpRequest)
        expect(resp.statusCode).toBe(400)
    })

    test('Should return 404 if not found User.', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: {
                email: 'test@mail.com',
                password: 'teste123'
            }
        }
        const resp: HttpResponseMetadata = sut.router(httpRequest)
        expect(resp.statusCode).toBe(404)
    })
    
    test('Should return 200 if found User.', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: {
                email: EMAIL,
                password: PASSWORD
            }
        }
        const resp: HttpResponseMetadata = sut.router(httpRequest)
        expect(resp.statusCode).toBe(200)
    })
})
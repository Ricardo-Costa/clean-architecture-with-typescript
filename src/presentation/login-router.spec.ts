type UserDTO = {
    email: string
    password: string
}

type HttpResponseMetadata = {
    statusCode: number,
    body?: object | null | Error
}

class HttpRequest {
    constructor(
        readonly body: UserDTO | object
    ) {}
}

class HttpResponse {
    static badRequest (paramName: string): HttpResponseMetadata {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }

    static serverError (description: string): HttpResponseMetadata {
        return {
            statusCode: 500,
            body: new ServerError(description)
        }
    }

    static notFound (): HttpResponseMetadata {
        return {
            statusCode: 404,
            body: null
        }
    }

    static ok (body: object | Array<object>): HttpResponseMetadata {
        return {
            statusCode: 200,
            body
        }
    }
}

class MissingParamError extends Error {
    constructor (paramName: string) {
        super(`MissingParamError: ${paramName}`)
        this.name = `MissingParamError`
    }
}

class ServerError extends Error {
    constructor (description: string) {
        super(`ServerError: ${description}`)
        this.name = `ServerError`
    }
}

class BadRequestError extends Error {
    constructor (description: string) {
        super(`BadRequestError: ${description}`)
        this.name = `BadRequestError`
    }
}

interface Router {
    router: (httpRequest: HttpRequest) => HttpResponse
}

class User {
    private name: string = ''
    private email: string = ''
    private password: string = ''

    set setName(name: string) {
        this.name = name
    }

    set setEmail(email: string) {
        this.email = email
    }

    set setPassword(password: string) {
        this.password = password
    }

    get getName() {
        return this.name
    }

    get getEmail() {
        return this.email
    }

    get getPassword() {
        return this.password
    }
}

class UserRepositore {

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

const NAME = "Ricardo"
const EMAIL = "ricardo@mail.com"
const PASSWORD = "123456"
const mockUsers: Array<User> = []
mockUsers.push(UserRepositore.create(NAME, EMAIL, PASSWORD))

class LoginRouter implements Router {
    router(httpRequest: HttpRequest): HttpResponseMetadata {
        if (!httpRequest || !httpRequest.body) {
            return HttpResponse.serverError('Invalid request propertties.')
        }
        const { email, password } = <UserDTO>httpRequest.body
        if (!email || !password) {
            return HttpResponse.badRequest('Invalid email or password.')
        }
        const user = UserRepositore.findOneByEmailAndPassword(email, password)
        if (user) {
            return HttpResponse.ok(user)
        }
        return HttpResponse.notFound()
    }
}

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
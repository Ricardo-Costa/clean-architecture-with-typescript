type HttpRequestBody = { email?: string }

class HttpRequest {
    constructor(
        readonly body: HttpRequestBody
    ) {}
}

class HttpResponse {
    private statusCode: number

    constructor(s: number) {
        this.statusCode = s
    }

    get getStatusCode() {
        return this.statusCode
    }
}

interface Router {
    router: (httpRequest: HttpRequest) => HttpResponse
}

class LoginRouter implements Router {
    router(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.email) {
            return new HttpResponse(400)
        }
        return new HttpResponse(200)
    }
}

describe('Login Router', () => {
    test('Should return 400 if no email is provided.', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: {
                password: '',
                email: ''
            }
        }
        const httpResponse: HttpResponse = sut.router(httpRequest)
        expect(httpResponse.getStatusCode).toBe(400)
    })
})
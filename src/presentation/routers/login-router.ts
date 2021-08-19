import Router from "../interfaces/router-interface"
import HttpRequest from "../utils/http-request-util"
import HttpResponse from "../utils/http-response-util"
import { UserDTO } from "../../infrastructure/dtos/user-dto"
import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata"
import AuthUseCase from "../../domain/usecases/auth-usecase"

export default class LoginRouter implements Router {

    constructor(
        readonly authUseCase: AuthUseCase
    ) {}

    router(httpRequest: HttpRequest): HttpResponseMetadata {
        try {
            if (!httpRequest || !httpRequest.body) {
                return HttpResponse.serverError('Invalid request propertties.')
            }
            if (!this.authUseCase) {
                return HttpResponse.serverError('Has no Auth instance.')
            }
            const { email, password } = <UserDTO>httpRequest.body
            if (!email || !password) {
                return HttpResponse.badRequest('Invalid email or password.')
            }
            return this.authUseCase.auth(email, password)
        } catch (error) {
            return HttpResponse.serverError('Server error, try again.')
        }
    }
}
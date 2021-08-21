import Router from "../interfaces/router-interface"
import HttpRequest from "../utils/http-request-util"
import HttpResponse from "../utils/http-response-util"
import { UserDTO } from "../../infrastructure/dtos/user-dto"
import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata"
import AuthUseCase from "../../domain/usecases/auth-usecase"
import EmailValidator from "../validators/email.validator"
import HttpStatusCode from "../enums/http-status-code.enum"

export default class LoginRouter implements Router {

    constructor(
        readonly authUseCase: AuthUseCase,
        readonly emailValidator: EmailValidator
    ) {}

    async router(httpRequest: HttpRequest): Promise<HttpResponseMetadata> {
        try {
            if (!httpRequest || !httpRequest.body) {
                return HttpResponse.serverError('Invalid request propertties.')
            }
            if (!this.authUseCase) {
                return HttpResponse.serverError('Has no Auth instance.')
            }
            if (!this.emailValidator) {
                return HttpResponse.serverError('Has no EmailValidator instance.')
            }
            const { email, password } = <UserDTO>httpRequest.body
            if (!email || !password) {
                return HttpResponse.badRequest('Invalid email or password.')
            }
            if (!this.emailValidator.isValid(email)) {
                return HttpResponse.badRequest('Invalid email.', HttpStatusCode.UNPROCESSABLE_ENTITY)
            }
            return await this.authUseCase.auth(email, password)
        } catch (error) {
            return HttpResponse.serverError('Server error, try again.')
        }
    }
}
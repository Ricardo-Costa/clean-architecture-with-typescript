import Router from "../interfaces/router-interface"
import HttpRequest from "../utils/http-request-util"
import HttpResponse from "../utils/http-response-util"
import { UserDTO } from "../../infrastructure/dtos/user-dto"
import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata"
import UserRepository from "../../domain/repositories/user-repository"

export default class LoginRouter implements Router {
    router(httpRequest: HttpRequest): HttpResponseMetadata {
        if (!httpRequest || !httpRequest.body) {
            return HttpResponse.serverError('Invalid request propertties.')
        }
        const { email, password } = <UserDTO>httpRequest.body
        if (!email || !password) {
            return HttpResponse.badRequest('Invalid email or password.')
        }
        const user = UserRepository.findOneByEmailAndPassword(email, password)
        if (user) {
            return HttpResponse.ok(user)
        }
        return HttpResponse.notFound()
    }
}
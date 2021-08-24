import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata";
import MissingParamError from "../../presentation/errors/missing-param-error";
import ServerError from "../../presentation/errors/server-error";
import HttpResponse from "../../presentation/utils/http-response-util";
import UserRepository from "../repositories/user-repository";

export default class AuthUseCase {

    protected userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async auth(email: string, password: string): Promise<HttpResponseMetadata> {
        if (!email) {
            throw new MissingParamError('Email')
        }
        if (!password) {
            throw new MissingParamError('Password')
        }
        if (!this.userRepository) {
            throw new ServerError('UserRepository is no-instanced')
        }
        const user = await this.userRepository.findOneByEmailAndPassword(email, password)
        if (user) {
            return HttpResponse.ok({
                user,
                accessToken: 'valid_access_token'
            })
        }
        return HttpResponse.notAuthorized()
    }
}
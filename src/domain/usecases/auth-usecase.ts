import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata";
import HttpResponse from "../../presentation/utils/http-response-util";
import UserRepository from "../repositories/user-repository";

export default class AuthUseCase {
    async auth(email: string, password: string): Promise<HttpResponseMetadata> {
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
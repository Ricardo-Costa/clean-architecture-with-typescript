import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata";
import HttpResponse from "../../presentation/utils/http-response-util";
import UserRepository from "../repositories/user-repository";

export default class AuthUseCase {
    auth(email: string, password: string): HttpResponseMetadata {
        const user = UserRepository.findOneByEmailAndPassword(email, password)
        if (user) {
            return HttpResponse.ok(user)
        }
        return HttpResponse.notAuthorized()
    }
}
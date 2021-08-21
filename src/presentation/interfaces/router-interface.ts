import AuthUseCase from "../../domain/usecases/auth-usecase";
import HttpRequest from "../utils/http-request-util";
import HttpResponse from "../utils/http-response-util";
import EmailValidator from "../validators/email.validator";

export default interface Router {

    readonly authUseCase: AuthUseCase,
    readonly emailValidator: EmailValidator

    router: (httpRequest: HttpRequest) => HttpResponse
}
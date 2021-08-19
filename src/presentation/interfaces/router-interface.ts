import AuthUseCase from "../../domain/usecases/auth-usecase";
import HttpRequest from "../utils/http-request-util";
import HttpResponse from "../utils/http-response-util";

export default interface Router {
    readonly authUseCase: AuthUseCase
    router: (httpRequest: HttpRequest) => HttpResponse
}
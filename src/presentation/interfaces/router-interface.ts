import HttpRequest from "../utils/http-request-util";
import HttpResponse from "../utils/http-response-util";

export default interface Router {
    router: (httpRequest: HttpRequest) => HttpResponse
}
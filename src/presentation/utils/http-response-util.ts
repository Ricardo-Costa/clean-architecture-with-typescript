import ServerError from "../errors/server-error"
import MissingParamError from "../errors/missing-param-error"
import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata"
import NotAuthorizedError from "../errors/not-authorized-error"
import HttpStatusCode from "../enums/http-status-code.enum"

export default class HttpResponse {
    
    static badRequest (paramName: string, statusCode: number = HttpStatusCode.BAD_REQUEST): HttpResponseMetadata {
        return {
            statusCode: statusCode,
            body: new MissingParamError(paramName)
        }
    }

    static serverError (description: string): HttpResponseMetadata {
        return {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            body: new ServerError(description)
        }
    }

    static notFound (): HttpResponseMetadata {
        return {
            statusCode: HttpStatusCode.NOT_FOUND,
            body: null
        }
    }

    static notAuthorized (): HttpResponseMetadata {
        return {
            statusCode: HttpStatusCode.UNAUTHORIZED,
            body: new NotAuthorizedError('Invalid Email or Password.')
        }
    }

    static ok (body: object | Array<object>): HttpResponseMetadata {
        return {
            statusCode: HttpStatusCode.OK,
            body
        }
    }
}
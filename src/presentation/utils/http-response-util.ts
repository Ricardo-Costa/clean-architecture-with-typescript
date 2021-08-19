import ServerError from "../errors/server-error"
import MissingParamError from "../errors/missing-param-error"
import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata"
import NotAuthorizedError from "../errors/not-authorized-error"

export default class HttpResponse {
    
    static badRequest (paramName: string): HttpResponseMetadata {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }

    static serverError (description: string): HttpResponseMetadata {
        return {
            statusCode: 500,
            body: new ServerError(description)
        }
    }

    static notFound (): HttpResponseMetadata {
        return {
            statusCode: 404,
            body: null
        }
    }

    static notAuthorized (): HttpResponseMetadata {
        return {
            statusCode: 401,
            body: new NotAuthorizedError('Invalid Email or Password.')
        }
    }

    static ok (body: object | Array<object>): HttpResponseMetadata {
        return {
            statusCode: 200,
            body
        }
    }
}
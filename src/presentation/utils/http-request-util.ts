import { UserDTO } from "../../infrastructure/dtos/user-dto";

export default class HttpRequest {
    constructor(
        readonly body: UserDTO | object
    ) {}
}
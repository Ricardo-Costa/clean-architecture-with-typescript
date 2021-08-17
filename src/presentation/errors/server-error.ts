export default class ServerError extends Error {
    constructor (description: string) {
        super(`ServerError: ${description}`)
        this.name = `ServerError`
    }
}
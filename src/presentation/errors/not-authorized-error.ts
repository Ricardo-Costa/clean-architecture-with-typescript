export default class NotAuthorizedError extends Error {
    constructor (description: string) {
        super(`NotAuthorizedError: ${description}`)
        this.name = `NotAuthorizedError`
    }
}
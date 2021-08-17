export default class User {
    
    private name: string = ''
    private email: string = ''
    private password: string = ''

    set setName(name: string) {
        this.name = name
    }

    set setEmail(email: string) {
        this.email = email
    }

    set setPassword(password: string) {
        this.password = password
    }

    get getName() {
        return this.name
    }

    get getEmail() {
        return this.email
    }

    get getPassword() {
        return this.password
    }
}
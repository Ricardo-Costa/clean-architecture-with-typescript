export default class ValidatorSpy {
  isValidEmail: boolean = true
  
  constructor() {
    this.isValidEmail = true
  }

  isEmail(email: string): boolean {
    return this.isValidEmail
  }
}

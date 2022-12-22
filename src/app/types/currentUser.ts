export class CurrentUser {
    email: string
    firstName: string
    lastName: string
    nickName: string
    locationCity: string
    photo: string
    requestedItems: string[]
    constructor() {
        this.email = '',
        this.firstName = '',
        this.lastName = '',
        this.nickName = '',
        this.locationCity = '',
        this.photo = '',
        this.requestedItems = []
    }
}
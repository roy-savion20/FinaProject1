export type CoustumerType = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: string,
    location: string,
    image: string,
    phone: string,
    update_details: string,
    clientType:string // 1 for trainer 2 for costumer
    payment: {
        card: string,
        date: string,
        ccv: string
    }
}

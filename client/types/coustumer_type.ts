export type CoustumerType = {
    first_name: string,
    Last_name: string,
    email: string,
    password: string,
    dob: Date,
    lodcation: string,
    image: string,
    phone: string,
    update_details: string,
    payment: {
        card: string,
        date: string,
        ccv: string
    }
}

export type TrainerType = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: Date,
    location: string,
    experiance: string,
    image?: string,
    phone: string,
    payment: {
        card: string,
        date: string,
        ccv: string
    }
}


export type TrainerType = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: string,
    location: string,
    experience: string,
    image: string,
    phone: string,
    clientType: string, // 1 for trainer 2 for costumer
    payment: {
        card: string,
        date: string,
        ccv: string
    }
    stayLogIn?: boolean;
    training?: [
        {
            name?: string, // שם הלקוח
            date: Date, // תאריך האימון
            time: string, // יש להזין מאיזה שעה לאיזה שעה
        }
    ]
}


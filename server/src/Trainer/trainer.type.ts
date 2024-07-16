import { ObjectId } from "mongodb"

export type TrainerUser = {
    _id?: ObjectId,
    first_name?: string,
    last_name?: string,
    email: string,
    password: string,
    location: string,
    dob?: string,
    experience?: string,
    image?: string,
    phone?: string,
    clientType?:string, // 1 for trainer 2 for costumer
    payment?: credit,
    openDates?: Dates[]
} 

export type credit = {
    id? :ObjectId
    card: string,
    date: string,
    ccv: string
}

export type Dates = {
    id?: ObjectId,
    date:string,
    time: string
}

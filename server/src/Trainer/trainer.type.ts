import { ObjectId } from "mongodb"

export type User = {
    _id?: ObjectId,
    name?: string,
    email: string,
    location: string,
    password: string,
    experiance?: string,
    payment?: {
        card: string,
        date: string,
        ccv: string
    },
    Chat?:{
        title: string,
        description: string
        date: Date
    }
} 

import { ObjectId } from "mongodb";

export type Costumer = {
    id?: ObjectId,
    name : string,
    email : string,
    location?: string,
    password : string,
    dogBreed? : string,
    payment?: credit,
}

export type credit = {
    id? :ObjectId
    card: string,
    date: string,
    ccv: string
}
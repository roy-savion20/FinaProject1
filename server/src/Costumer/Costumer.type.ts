import { ObjectId } from "mongodb";

export type Costumer = {
    id?: ObjectId,
    name : string,
    email : string,
    location?: string,
    password : string,
    dogBreed? : string,
    Payment? : string
}
import { ObjectId } from "mongodb";

export type meneger = {
    id: ObjectId,
    email: string,
    password: string,
}
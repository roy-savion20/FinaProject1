export type CoustumerType = {
        name: string,
        password: string,
        email: string,
        lodcation: string,
        experiance: string,
        payment:Paymant
} 
export type Paymant={
    card:string,
    date:string,
    ccv:number
}
import { meneger } from "./admin.type";
import { addcostumer, checkifexists, findCostumer } from "./admin.db";

export async function regCostumer(costumer : meneger) {
    try {
        let query = { email: costumer.email }
        let costumerExists = await checkifexists(query)
        if(costumerExists > 0){
            console.log('costumerExists', costumerExists);
            throw new Error("email already exists")
        }
        return await addcostumer(costumer)
    } catch (error) {
        throw error
    }
}

export async function logincost(email: string) {
    try {
        let query = { email: email}
        let costumers = await findCostumer(query);
        return costumers[0];
    } catch (error) {
        throw error;
    }
}


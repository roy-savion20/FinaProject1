import React, { createContext, useState } from "react";
import { CoustumerType } from "../types/coustumer_type";
import { POST } from "../api";
export const CoustumerContext = createContext<any>({});



export default function CoustumerContextProvider({ children }: any) {

    const [allCoustumers, setAllCoustumer] = useState<CoustumerType[]>([]);
    const [currentCoustumer, setCurrentCoustumer] = useState<CoustumerType>();

    // const AddNewCoustumer = (costumerInfo: CoustumerType) => {
    //     try {
    //         setAllCoustumer([...allCoustumers, costumerInfo]);
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }
async function RegisterNewCoustumer(newCustomer: CoustumerType) {
        try {
            console.log('newCustomer ====>>>', newCustomer)
            let data = await POST('customer/register', newCustomer);  // Adjust the endpoint to match your server
            console.log(data);
            if (data && data.customer) {
                setAllCoustumer([...allCoustumers, data.customer]);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <CoustumerContext.Provider
            value={{
                allCoustumers,
                currentCoustumer,
                RegisterNewCoustumer,
                setCurrentCoustumer
            }}>
            {children}
        </CoustumerContext.Provider>
    );

}

import React, { createContext, useState } from "react";
import { CoustumerType } from "../types/coustumer_type";

export const CoustumerContext = createContext<any>({});



export default function CoustumerContextProvider({ children }: any) {

    const [allCoustumers, setAllCoustumer] = useState<CoustumerType[]>([]);
    const [currentCoustumer, setCurrentCoustumer] = useState<CoustumerType>();

    const AddNewCoustumer = (costumerInfo: CoustumerType) => {
        try{
            setAllCoustumer([...allCoustumers, costumerInfo]);
            return true;
        }catch(error)
        {
            console.log(error);
            return false;
        }
    }

    return (
        <CoustumerContext.Provider
            value={{
                allCoustumers,
                currentCoustumer,
                AddNewCoustumer
            }}>
            {children}
        </CoustumerContext.Provider>
    );

}

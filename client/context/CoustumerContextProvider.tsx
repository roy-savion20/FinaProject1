import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { CoustumerType } from "../types/coustumer_type";

export const TrainerContext = createContext<any>({});



export default function CoustumerContextProvider({ children }: any) {

    const [allCoustumer, setAllCoustumer] = useState<CoustumerType[]>([]);
    const [currentCoustumer, setCurrentCoustumer] = useState<CoustumerType>();
    const [coustumerInfo, setCoustumerInfo] = useState<Partial<CoustumerType> | undefined>();

    const addCostumerInfo = (costumerInfo: Partial<CoustumerType>) => {
        try{
            setCoustumerInfo(costumerInfo);
            return true;
        }catch(error)
        {
            console.log(error);
            return false;
        }
    }
    const addCostumer = (costumerVisaInfo: Partial<CoustumerType>) => {
        try {
            const newCostumer: CoustumerType = {
                ...coustumerInfo,
                payment: costumerVisaInfo
            } as CoustumerType;
            setAllCoustumer([...allCoustumer, newCostumer]);
            console.log()
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

}

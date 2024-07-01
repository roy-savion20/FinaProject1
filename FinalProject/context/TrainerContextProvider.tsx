import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import testtrainers from "../data/users.json";
import { TrainerType } from "../types/trainer_type";

export const TrainerContext = createContext<any>({});


export default function TrainerContextProvider({ children }: any) {
    const [allTrainer, setAllTrainer] = useState<TrainerType[]>(testtrainers);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType | undefined>();
    const [tempTrainer,setTempTrainer] = useState<Partial<TrainerType> | undefined>({});
    const [tempTrainerPayment,setTempTrainerPayment] = useState<Partial<TrainerType['payment']> | undefined>({});

    const addTrainer = () => {
        try {
            if (tempTrainer && tempTrainerPayment) {
                const newTrainer: TrainerType = {
                    ...tempTrainer,
                    payment: tempTrainerPayment
                } as TrainerType;
                setAllTrainer([...allTrainer, newTrainer]);
                Alert.alert("Success", "Trainer added successfully");
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Trainer not added");
            return false;
        }
    };

    const addInfoTrainer = (trainer: Partial<TrainerType>) => {
        try {
            setTempTrainer({ ...tempTrainer, ...trainer });
            Alert.alert("Success", "Trainer info added successfully");
            return true;
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Trainer info not added");
            return false;
        }
    };

    const AddPaymentInfoTrainer = (paymentMethod: Partial<TrainerType['payment']>) => {
        setTempTrainerPayment({ ...tempTrainerPayment, ...paymentMethod });
    };

    return (
        <TrainerContext.Provider
            value={{
                allTrainer,
                currentTrainer,
                setCurrentTrainer,
                addInfoTrainer,
                AddPaymentInfoTrainer,
                addTrainer
            }}>
            {children}
        </TrainerContext.Provider>
    );
}

// const EditUser = (user: User) => {
//     const newList = allUsers.filter((d) => d.username !== user.username);
//     setAllUsers([...newList, user]);
// }

// const DeleteUser = (user: User) => {
//     const newList = allUsers.filter((d) => d.username !== user.username);
//     setAllUsers([...newList]);
// }

// const LogInUser = (username: string, password: string) => {
//     const user = allUsers.find((d) => d.username === username && d.password === password);
//     if (!user) {
//         Alert.alert("Error", "Wrong Username or Password");
//         return "null";
//     } else if (user.username === "Admin" && user.password === "AdminAdmin") {
//         Alert.alert("Success", "Admin logged In Successfully");
//         setCurrentUser(user);
//         return "Admin";
//     } else {
//         Alert.alert("Success", "Logged In Successfully");
//         setCurrentUser(user);
//         return "User";
//     }
// }

// const getCurrentUserRole = () => {
//     return currentUser?.username === "Admin" ? "Admin" : currentUser?.username === "User" ? "User" : "null";
// }
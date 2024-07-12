import React, { createContext, useState, useEffect } from "react";
import { TrainerType } from "../types/trainer_type";

export const TrainerContext = createContext<any>({});


export default function TrainerContextProvider({ children }: any) {
    const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType | undefined>();


    const AddNewTrainer = (newTrainer: TrainerType) => {
        try {
            setAllTrainer([...allTrainer, newTrainer]);
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


    return (
        <TrainerContext.Provider
            value={{
                allTrainer,
                currentTrainer,
                AddNewTrainer
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

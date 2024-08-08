import React, { createContext, useState, useEffect } from "react";
import { TrainerType } from "../types/trainer_type";
import { POST } from "../api";

export const TrainerContext = createContext<any>({});


export default function TrainerContextProvider({ children }: any) {
    const [allTrainer, setAllTrainer] = useState<TrainerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType | undefined>();


    async function RegisterNewCoustumer(newTrainer: TrainerType) {
        let TrainerToAdd = { newTrainer };
        try {
            let res = await fetch('https://finaproject1-1ghw.onrender.com/api/trainer/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(TrainerToAdd)
            });
            if (!res.ok) {
                console.log({ res });
                return;
            }
            return true;

        }
        catch (error) {
            console.log(error);
            return false;
        }
    }


    return (
        <TrainerContext.Provider
            value={{
                allTrainer,
                currentTrainer,
                RegisterNewCoustumer
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

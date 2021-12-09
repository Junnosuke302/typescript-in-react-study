import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { user } from "../types/api/user";

export const useAllUsers = () => {
    const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState(false);

    const getUsers = () => {
        setLoding(true);
        setError(false);

        axios.get<Array<user>>("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            const data = res.data.map((user) => ({
                id: user.id,
                name: `${user.name} (${user.username})`,
                email: user.email,
                address: `${user.address.city}${user.address.suite}${user.address.street}`,
            }));
            setUserProfiles(data);
        }).catch(() => {
            setError(true);
        }).finally(() => {
            setLoding(false);
        });
    };

    return { getUsers, userProfiles, loading, error }
};
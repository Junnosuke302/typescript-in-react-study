/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { user } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useAuth = () => {
    const history = useHistory();
    const { showMessage } = useMessage();

    const [loading, setLoding] = useState(false);

    const login = useCallback((id: string) => {
        setLoding(true);

        axios
            .get<user>(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                if (res.data) {
                    showMessage({ title: "ログインしました", status: "success" });
                    history.push("/home");
                } else {
                    showMessage({ title: "ユーザーが見つかりません", status: "error" });
                }
            })
            .catch(() => showMessage({ title: "ログインできません", status: "error" }))
            .finally(() => setLoding(false));
        },
        [history, showMessage]
    );
    return { login, loading };
};
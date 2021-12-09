import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import reactotron from "reactotron-react-native";
import { store } from "../redux/configureStore";

export let url = "https://dev.100k.uz/api";

axios.interceptors.request.use(
    (response) => {
        if (response.method === "POST") {
            let form = new FormData();
            for (let el in response.data) {
                form.append(el, response.data[el]);
            }
            response.data = form;
        }
        let token = store.getState().user.data;
        console.log({ token });
        if (!!token) {
            response.headers = {
                ...response.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return response;
    },
    (error) => {
        if (error.response.status === 555) {
            AsyncStorage.removeItem("@token");
        } else if (error.response.status !== 401) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        console.log("Refreshing token");
        const token = AsyncStorage.getItem("@token");
        return axios
            .post(`${url}/auth/refresh-token?token=${token}`)
            .then(({ data }) => {
                AsyncStorage.setItem("@token", data.token);
                const config = error.config;
                config.headers = { Authorization: `Bearer ${data.token}` };
                return new Promise((resolve, reject) => {
                    axios
                        .request(config)
                        .then((response) => {
                            resolve(response);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            })
            .catch((err) => {
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            });
    }
);

export let requests = {
    auth: {
        requestPassword: (username = "") =>
            axios.post(`${url}/auth/password`, { username }),
        login: (credentials: any) =>
            axios.post(`${url}/auth/login`, credentials),
    },
    user: {
        getMe: () => axios.get(`${url}/user/getMe`),
    },
    mail: {
        getMail: () => axios.get(`${url}/user/packages`),
    },
    taxi: {
        getTaxi: (status='') => axios.get(`${url}/user/caborders`),
    },
    help:{
        getRegions:()=>axios.get(`${url}/locations`)
    }
};

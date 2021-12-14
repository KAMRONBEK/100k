import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import reactotron from "reactotron-react-native";
import { navigate } from "../navigation/NavigationService";
import { routes } from "../navigation/routes";
import { store } from "../redux/configureStore";
import { logoutUser, update } from "../redux/slices/user/user";

export let url = "https://dev.100k.uz/api";

axios.interceptors.request.use((response) => {
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
});

axios.interceptors.response.use(
  (response) => {
    console.log(response.status);

    if (response.status === 555) {
      store.dispatch(logoutUser);
      navigate(routes.LOGIN, {});
    }
    return response;
  },
  (error) => {
    if (error.response.status === 555) {
      store.dispatch(logoutUser);
      navigate(routes.LOGIN, {});
    } else if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    console.log("Refreshing token");
    // const token = AsyncStorage.getItem("@token");
    const token = store.getState().user.data;
    console.log("token in store/storage");

    return axios
      .post(`${url}/auth/refresh-token?token=${token}`)
      .then(({ data }) => {
        const config = error.config;
        store.dispatch(update({ data: data.token }));
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
    login: (credentials: any) => axios.post(`${url}/auth/login`, credentials),
  },
  user: {
    getMe: () => axios.get(`${url}/user/getMe`),
  },
  mail: {
    getMail: (status = "") => axios.get(`${url}/user/packages`),
    createMail: (credentials) =>
      axios.post(`${url}/user/packages`, credentials),
  },
  taxi: {
    getTaxi: (status = "") => axios.get(`${url}/user/caborders`),
    createPassanger: (credentials) =>
      axios.post(`${url}/user/caborders`, credentials),
  },
  help: {
    getRegions: () => axios.get(`${url}/locations`),
  },
};

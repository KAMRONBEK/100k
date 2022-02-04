import axios from "axios";
import { navigate } from "../navigation/NavigationService";
import { routes } from "../navigation/routes";
import { store } from "../redux/configureStore";
import { logoutUser } from "../redux/slices/user/user";

export let url = "https://dev.100k.uz/api";

axios.interceptors.request.use((response) => {
  // if (response.method === "post") {
  //     let form = new FormData();
  //     for (let el in response.data) {
  //         form.append(el, response.data[el]);
  //     }
  //     response.data = form;
  // }
  let token = store.getState().user.data;
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
    return response;
  },
  (error) => {
    if (error.response.status === 555) {
      store.dispatch(logoutUser());
      navigate(routes.LOGIN, {});
      return error;
    } else if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    // const token = AsyncStorage.getItem("@token");
    const token = store.getState().user.data;

    return axios
      .post(`${url}/auth/refresh-token?token=${token}`)
      .then(({ data }) => {
        const config = error.config;
        store.dispatch(update({ data: data.token }));
        config.headers = {
          Authorization: `Bearer ${data.token}`,
        };
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
    updateUser: (credentials) => axios.post(`${url}/user/update`, credentials),
  },
  mail: {
    getMail: () => axios.get(`${url}/user/packages`),
    createMail: (credentials) =>
      axios.post(`${url}/user/packages`, credentials),
    editMail: (credentials, id) =>
      axios.post(`${url}/user/packeges/${id}`, credentials),
    getCommonMail: () => axios.get(`${url}/packages`),
    getReceiveMail: () => axios.get(`${url}/recipient/packages`),
    getPackageListMail: () => axios.get(`${url}/user/package-list`),
  },
  transport: {
    getTransport: (status = "") => axios.get(`${url}/driver/transports`),
    createTransport: (credentials) =>
      axios.post(`${url}/driver/transports`, credentials),
    editTransport: (credentials, id) =>
      axios.post(`${url}/driver/transports/${id}`, credentials),
    deleteTransport: (credentials, id) =>
      axios.post(`${url}/driver/transport/${id}`, credentials),
    getCommonTransport: () => axios.get(`${url}/transports`),
  },
  taxi: {
    getTaxi: () => axios.get(`${url}/user/caborders`),
    createPassanger: (credentials) =>
      axios.post(`${url}/user/caborders`, credentials),
    editPassanger: (credentials, id) =>
      axios.post(`${url}/user/caborders/${id}`, credentials),
    getCommonTaxi: () => axios.get(`${url}/caborders`),
  },
  load: {
    getLoad: () => axios.get(`${url}/user/cargo`),
    createLoad: (credentials) => axios.post(`${url}/user/cargo`, credentials),
    editLoad: (credentials, id) =>
      axios.post(`${url}/user/cargo/${id}`, credentials),
    getCommonLoad: () => axios.get(`${url}/cargo`),
  },
  help: {
    getRegions: () => axios.get(`${url}/locations`),
  },
  courier: {
    becomeCourier: (credentials) =>
      axios.post(`${url}/user/become-driver`, credentials),
  },
  uploads: {
    uploadImage: (form) => axios.post(`${url}/upload-file`, form),
  },
};

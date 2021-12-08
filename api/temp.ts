axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("err", error);
  
      if (error.response.status === 555) {
        window.localStorage.removeItem("@token");
        window.location.reload();
      } else if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
  
      const token = window.localStorage.getItem("@token");
      return axios
        .post(${url}/auth/refresh-token?token=${token})
        .then(({ data }) => {
          window.localStorage.setItem("@token", data.token);
  
          const config = error.config;
          config.headers = { Authorization: Bearer ${data.token} };
  
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
import Config from "config";
import { axiosInstance as httpClient } from "data-provider";

const AUTH_FIELD = "auth";

httpClient.interceptors.request.use((req) => {
  const auth = authProvider.getAuth();
  if (auth) {
    req.headers["Authorization"] = `Bearer ${auth.token}`;
  }
  return req;
});

const authProvider = {
  login: async ({
    username,
    password,
    remember,
  }: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    // Suppose we actually send a request to the back end here.
    const uri = `${Config.apiUrl}/auth-admins/signin`;
    try {
      const { data } = await httpClient.post(uri, {
        username,
        password,
      });
      if (data) {
        localStorage.setItem(AUTH_FIELD, JSON.stringify(data));
        return Promise.resolve();
      }
    } catch (error: any) {
      const { response } = error;
      return Promise.reject(new Error(response.data.message));
    }
    return Promise.reject();
  },
  logout: () => {
    localStorage.removeItem(AUTH_FIELD);
    return Promise.resolve();
  },
  checkAuth: async () => {
    const auth = localStorage.getItem(AUTH_FIELD);
    if (auth) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkError: (error: any) => {
    if (error.statusCode === 401) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    const auth = localStorage.getItem(AUTH_FIELD);
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
  getUserIdentity: () => {
    const auth = authProvider.getAuth();
    if (auth) {
      return Promise.resolve(auth?.user);
    }
    return Promise.reject();
  },
  getAuth: () => {
    const auth = localStorage.getItem(AUTH_FIELD);
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  },
};

export default authProvider;

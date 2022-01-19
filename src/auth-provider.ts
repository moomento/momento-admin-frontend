const mockUsers = [
  {
    username: "admin",
    roles: ["admin"],
  },
  {
    username: "editor",
    roles: ["editor"],
  },
];

const authProvider = {
  login: ({
    username,
    password,
    remember,
  }: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.username === username);

    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      return Promise.resolve();
    }

    return Promise.reject();
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error: any) => {
    if (error.status === 401) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
  getUserIdentity: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.username);
    }
    return Promise.reject();
  },
};

export default authProvider;

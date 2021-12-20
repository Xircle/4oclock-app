import storage from "./myAsyncStorage";

export const Account = {
  logout: async () => {
    await storage.setItem("token", null);
  },
};

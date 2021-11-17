import React, { useContext } from "react";

export const DBContext = React.createContext(null);

export const UserSchema = {
  name: "UserSchema",
  properties: {
    _id: "int",
    token: "string",
  },
  primaryKey: "_id",
};

export const useDB = () => {
  return useContext(DBContext);
};

export const getToken = async () => {
  const realm = await Realm.open({
    schema: [UserSchema],
  });

  return realm.objects("UserSchema")[0];
};

export const setToken = async (token: string) => {
  const realm = await Realm.open({
    schema: [UserSchema],
  });

  realm.write(() => {
    realm.create("UserSchema", {
      _id: Date.now(),
      token: token,
    });
  });
};

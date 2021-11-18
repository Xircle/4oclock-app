import React, { useContext } from "react";

export const DBContext = React.createContext(null);

export const UserSchema = {
  name: "UserSchema",
  properties: {
    _id: "int",
    token: "string",
    email: "string",
  },
  primaryKey: "_id",
};

export const useDB = () => {
  return useContext(DBContext);
};

export const getData = () => {
  const realm = useDB();

  return realm.objects("UserSchema")[0];
};

export const setProfile = (token: string, email: string) => {
  const realm = useDB();

  realm.write(() => {
    if (realm.objects("UserSchema").length === 0) {
      realm.create("UserSchema", {
        _id: Date.now(),
        email: email,
        token: token,
      });
    } else {
      realm.objects("UserSchema")[0].email = email;
      realm.objects("UserSchema")[0].token = token;
    }
  });
};

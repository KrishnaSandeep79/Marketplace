import axios from "axios";
import * as React from "react";
import { backend_url } from "../constants";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login(data) {
    return axios.post(`${backend_url}/user/login/` , data);
      // return new Promise((res) => {
      //   console.log("here")
      //   setAuthed(true);
      //   res("set authed to True");
      // });
    },
    setAuthed,
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
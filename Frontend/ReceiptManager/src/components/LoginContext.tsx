import React from "react";

type LoginContextType = {
    state: {state: boolean, uid: string};
    setLogin: (state:boolean, uid: string) => void
}

const defaultState = {
    state: {state: false, uid: "false"},
    setLogin: (state:boolean, uid: string) => {}
}
const AppLoginContext = React.createContext<LoginContextType>(defaultState);

export default AppLoginContext;
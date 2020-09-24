import React from "react";

const AuthContext = React.createContext({
    authenticated: false,
    pseudoLoggedIn: null,
    logout: () => {}
});

export default AuthContext
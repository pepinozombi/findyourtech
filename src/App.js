import React, { createContext, useMemo, useState } from "react";
import AppRouter from "./components/AppRouter";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "./firebase/config";

export const AuthenticationContext = createContext({ user: {}, setUser: () => {} });

function App() {
  const [user, setUser] = useState({});

  const value = useMemo(() => ({ user, setUser }), [user]);

  onAuthStateChanged(authentication, (firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser);
    } else {
      setUser(null);
    }
  });

  return (
    <AuthenticationContext.Provider value={value}>
      <AppRouter />
    </AuthenticationContext.Provider>
  );
}

export default App;

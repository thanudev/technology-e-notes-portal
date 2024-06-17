"use client";
import { auth, db } from "@/firebase-config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const router = useRouter();

  const checkLocalUser = async () => {
    const userJson = localStorage.getItem("#user");
    const userData = userJson ? JSON.parse(userJson) : null;
    if (userData) {
      setUserInfo(userData);
    } else {
      setUserInfo(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    checkLocalUser();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });

    setLoading(false);
    setLoadingInitial(false);

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    if (user) {
      setUserInfo(user);
      localStorage.setItem("#user", JSON.stringify(user));
      await setDoc(doc(db, "Users", user?.email), {
        id: user?.uid,
        email: user?.email,
        username: user?.displayName,
        photoURL: user?.photoURL,
        timeStamp: serverTimestamp(),
      }).then(() => {
        router.push("/");
      });
    }
    setLoading(false);
  };

  const logout = async () => {
    await signOut(auth).then((resp) => {
      setUserInfo(null);
    });
  };

  const memoredValue = useMemo(() => {
    return {
      userInfo,
      loading,
      signInWithGoogle,
      logout,
    };
  }, [userInfo, loading]);
  return (
    <AuthContext.Provider value={memoredValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

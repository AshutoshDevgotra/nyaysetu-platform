// utils/authFunctions.ts
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signInWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  return result.user;
};

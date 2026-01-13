import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCtRfNVafsh2GtemFcIpQ-KX9sYHLDW38A",
  authDomain: "curso-vue-f9f41.firebaseapp.com",
  projectId: "curso-vue-f9f41",
  storageBucket: "curso-vue-f9f41.firebasestorage.app",
  messagingSenderId: "148206399730",
  appId: "1:148206399730:web:8cce8a710240e7195c606b",
  measurementId: "G-V7QSC44K91"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const logoutUser = async () => {
  return await signOut(auth)
}

export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider)
}
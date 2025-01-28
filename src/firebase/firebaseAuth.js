import { app } from "./firebaseConfig";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app);

async function register(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
}


async function login(email, password) {
    return (await signInWithEmailAndPassword(auth, email, password)).user;
}


async function logout() {
    try {
        await signOut(auth);
        console.log("User berhasil logout");
    } catch (error) {
        console.error("Error saat logout:", error.message);
        throw error;
    }
}

// Export semua fungsi agar bisa digunakan di file lain
export { auth, register, login, logout };

import { app } from "./firebaseConfig";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

function getUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user.uid);
            } else {
                reject("User belum login");
            }
            unsubscribe();
        });
    });
}

// Export semua fungsi agar bisa digunakan di file lain
export { getUser, register, login, logout, auth };

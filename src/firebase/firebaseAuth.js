import { doc, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { db } from "./firebaseFirestore";

const auth = getAuth(app);

async function register(email, password, nama) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            email: email,
            nama: nama,
            createdAt: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Error saat register:", error.message);
        throw error; // Melempar error agar bisa ditangani di handleSubmit
    }
}
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error saat login:", error.message);
        throw error;
    }
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user.uid)
            }
            else {
                reject(new Error("User Belum Login"))
            }
        })
    })
}
export { getUser, register, login, logout, auth };

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

/**
 * Registrasi user baru dengan email & password
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 * @returns {Promise<object>} - Data user yang terdaftar
 */
async function register(email, password, nama) {
    try {
        // Mendaftarkan pengguna ke Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Menyimpan data pengguna ke Firestore (collection: users)
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            nama: nama,
            createdAt: new Date().toISOString(),
        });

        console.log("ANJENGGG MEMEK")

    } catch (error) {
        console.error("Error saat register:", error.message);
        throw error; // Melempar error agar bisa ditangani di handleSubmit
    }
}


/**
 * Login user dengan email & password
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 * @returns {Promise<object>} - Data user yang login
 */
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error saat login:", error.message);
        throw error;
    }
}

/**
 * Logout user dari aplikasi
 * @returns {Promise<void>}
 */
async function logout() {
    try {
        await signOut(auth);
        console.log("User berhasil logout");
    } catch (error) {
        console.error("Error saat logout:", error.message);
        throw error;
    }
}

/**
 * Mendapatkan UID user yang sedang login
 * @returns {Promise<string>} - UID user yang sedang login
 */

function getUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return user.uid
        } else {
            console.log("USER BELUM LOGIN TODDDD")
        }
    })
}

// function getUser() {
//     return new Promise((resolve, reject) => {
//         // Cek apakah user sudah login
//         if (auth.currentUser) {
//             return resolve(auth.currentUser.uid);
//         }

//         // Jika belum, tunggu perubahan autentikasi
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 resolve(user.uid);
//             } else {
//                 reject(new Error("User belum login"));
//             }
//             unsubscribe();
//         });
//     });
// }

// Export semua fungsi agar bisa digunakan di file lain
export { getUser, register, login, logout, auth };

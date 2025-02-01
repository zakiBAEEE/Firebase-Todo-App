import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import { getUser } from "./firebaseAuth";

const db = getFirestore(app);

async function addTodo(todo) {
    try {
        const userId = await getUser(); // Langsung UID, bukan objek user

        const docRef = await addDoc(collection(db, "todos"), {
            ...todo,
            userId, // Tidak perlu user.uid lagi
        });
        console.log("✅ To-do berhasil disimpan dengan ID:", docRef.id);
    } catch (error) {
        console.error("❌ Gagal menambahkan to-do:", error.message);
        throw error;
    }
}

async function getTodo() {
    try {
        const userId = await getUser(); // Ambil UID

        const q = query(collection(db, "todos"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("❌ Gagal mengambil to-do:", error.message);
        return [];
    }
}
async function updateTodo(todoId, updatedData) {
    try {
        const todoRef = doc(db, "todos", todoId);
        await updateDoc(todoRef, updatedData);
        console.log("✅ To-do berhasil diperbarui:", todoId);
    } catch (error) {
        console.error("❌ Gagal mengupdate to-do:", error.message);
        throw error;
    }
}
async function deleteTodo(todoId) {
    try {
        const todoRef = doc(db, "todos", todoId);
        await deleteDoc(todoRef);
        console.log("✅ To-do berhasil dihapus:", todoId);
    } catch (error) {
        console.error("❌ Gagal menghapus to-do:", error.message);
        throw error;
    }
}
export { addTodo, getTodo, updateTodo, deleteTodo, db };

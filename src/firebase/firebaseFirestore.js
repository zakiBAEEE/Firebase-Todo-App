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

async function addTodo(taskId, todo = "") {
    try {

        const docRef = await addDoc(collection(db, "task", taskId, "todos"), {
            todo,
        })
        console.log("✅ To-do berhasil disimpan dengan ID:", docRef.id);
        return docRef.id
    } catch (error) {
        console.error("❌ Gagal menambahkan to-do:", error.message);
    }
}

async function updateTodoItem(taskId, todoId, newTodo) {
    try {
        await updateDoc(doc(db, "task", taskId, "todos", todoId), {
            todo: newTodo
        });
    } catch (error) {
        console.error("Gagal mengupdate todo:", error);
    }
}


async function addTask(todo = null) {
    try {
        const userId = await getUser();

        const docRef = await addDoc(collection(db, "task"), {
            ...todo,
            userId,
        });
        console.log("✅ To-do berhasil disimpan dengan ID:", docRef.id);
        return docRef.id

    } catch (error) {
        console.error("❌ Gagal menambahkan to-do:", error.message);
        throw error;
    }
}

async function getTodo() {
    try {
        const userId = await getUser(); // Ambil UID

        const q = query(collection(db, "task"), where("userId", "==", userId));
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
async function updateTitle(todoId, updatedData) {
    try {
        const todoRef = doc(db, "task", todoId);
        await updateDoc(todoRef, updatedData);
        console.log("✅ To-do berhasil diperbarui:", todoId);
    } catch (error) {
        console.error("❌ Gagal mengupdate to-do:", error.message);
        throw error;
    }
}
async function deleteTodo(todoId) {
    try {
        const todoRef = doc(db, "task", todoId);
        await deleteDoc(todoRef);
        console.log("✅ To-do berhasil dihapus:", todoId);
    } catch (error) {
        console.error("❌ Gagal menghapus to-do:", error.message);
        throw error;
    }
}
export { addTask, getTodo, updateTitle, deleteTodo, db, addTodo, updateTodoItem };

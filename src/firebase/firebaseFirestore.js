import { deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "./firebaseAuth";

const db = getFirestore(app);

async function addTodo(todo) {
    const user = auth.currentUser;
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            ...todo,
            userId: user.uid
        });
        console.log("Dokumen Berhasil Tersimpan dengan id : ", docRef.id);
    } catch (error) {
        alert(error.message);
    }
}

async function getTodo() {
    const todos = [];
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() })
    })
    return todos;
}

async function updateTodo(todoId, updatedData) {
    const todoRef = doc(db, "todos", todoId);
    await updateDoc(todoRef, updatedData);
}

async function deleteTodo(todoId) {
    const todoRef = doc(db, "todos", todoId);
    await deleteDoc(todoRef);
}

export { addTodo, getTodo, updateTodo, deleteTodo }




import { deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getUser } from "./firebaseAuth";


const db = getFirestore(app);

async function addTodo(todo) {
    const user = getUser()
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

    const user = await getUser()

    try {
        const q = query(collection(db, "todos"), where("userId", "==", user))

        const querySnapshot = await getDocs(q);

        const todos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        return todos;

    } catch (error) {
        console.log(error.message);
        return [];
    }


}

async function updateTodo(todoId, updatedData) {
    const todoRef = doc(db, "todos", todoId);
    await updateDoc(todoRef, updatedData);
}

async function deleteTodo(todoId) {
    const todoRef = doc(db, "todos", todoId);
    await deleteDoc(todoRef);
}

export { addTodo, getTodo, updateTodo, deleteTodo, db }




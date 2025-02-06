import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseFirestore";
import { Overview } from "../components/Overview";
import { Tabs } from "../components/Tabs";
import { TaskList } from "../components/TaskList";
import { collection, onSnapshot } from "firebase/firestore";

function TodoPages() {
    const [task, setTask] = useState([]);

    useEffect(() => {
        const taskRef = collection(db, "task"); // Referensi ke koleksi "task"

        const unsubscribe = onSnapshot(taskRef, (snapshot) => {
            const taskData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTask(taskData);
        });

        return () => unsubscribe(); // Unsubscribe saat komponen unmount
    }, []);


    return (
        <div className="flex flex-col gap-4">
            <Overview />
            <Tabs />
            <TaskList taskList={task} />
        </div>
    )
}
export { TodoPages }
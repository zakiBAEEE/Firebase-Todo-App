import { useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodo } from "../firebase/firebaseFirestore";
import { Overview } from "../components/Overview";
import { Tabs } from "../components/Tabs";

function TodoPages() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const ambilData = async () => {
            const data = await getTodo()
            setTodos(data)
        }
        ambilData()
    }, [])

    function onSubmit(todo) {
        addTodo(todo)
        getTodo().then((todos) => setTodos(todos))
    }

    function onDelete(id) {
        deleteTodo(id)
        getTodo().then((todos) => setTodos(todos))
    }
    return (
        <div className="flex flex-col gap-4">
            <Overview />
            <Tabs />
            {/* <InputTodo onSubmit={onSubmit} />
            <TodoList todos={todos} onDelete={onDelete} /> */}
        </div>
    )
}
export { TodoPages }
import { useEffect, useState } from "react";
import { InputTodo } from "../components/Input"
import { TodoList } from "../components/TodoList";
import { addTodo, deleteTodo, getTodo } from "../firebase/firebaseFirestore";

function TodoPages() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodo().then((todos) => setTodos(todos))
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
            <InputTodo onSubmit={onSubmit} />
            <TodoList todos={todos} onDelete={onDelete} />
        </div>
    )
}
export { TodoPages }
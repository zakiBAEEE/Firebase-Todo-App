import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import PropTypes from "prop-types"
import { useInput } from "../customHooks/useInput"
import * as emoji from 'node-emoji'
import { useEffect, useState } from "react";
import { addTodo, updateTodo } from "../firebase/firebaseFirestore";
import { FaPlus } from "react-icons/fa";
import { TodoList } from "./TodoList";

function ModalTodo({ handleOpen, taskId }) {
    const [title, onChangeTitle] = useInput();
    const [todos, setTodos] = useState([]);

    const addTodoItem = async () => {
        try {
            const todoId = await addTodo(taskId); // Menambahkan todo kosong ke Firestore
            setTodos((prevState) => [...prevState, { todo: "", todoId }])
        } catch (error) {
            console.error("Gagal menambahkan todo:", error);
        }
    };

    useEffect(() => {
        const simpanTodo = async () => {
            taskId && (await updateTodo(taskId, { title }))
        }
        if (!taskId || title.trim() === "") return;
        simpanTodo()
    }, [taskId, title])

    return (
        <>
            <Dialog open={true} size="lg" handler={handleOpen} className="bg-opacity-20 backdrop-blur-sm">
                <DialogHeader><input
                    type="text"
                    placeholder={`Apa Tugas Anda ${emoji.get(':dart:')}`}
                    className="bg-transparent outline-none border-none text-gray-700 font-bold w-full "
                    value={title}
                    onChange={onChangeTitle}
                />
                </DialogHeader>
                <DialogBody>
                    <TodoList todos={todos} taskId={taskId} />
                    <FaPlus className="cursor-pointer" onClick={addTodoItem} />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => handleOpen(false)}
                    >
                        <span>Tutup</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

ModalTodo.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    taskId: PropTypes.string
}

export { ModalTodo }
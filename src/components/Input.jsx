import { Button, Input } from "@material-tailwind/react"
import { useInput } from "../customHooks/useInput"
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";



function InputTodo({ onSubmit }) {
    const [inputTodo, onChangeTodos, reset] = useInput();

    function onSubmitHandler(e) {
        e.preventDefault();
        onSubmit({ name: inputTodo, status: false, date: new Date().toLocaleDateString() });
        reset();
    }


    return (
        <form onSubmit={onSubmitHandler} className="flex gap-2 justify-center items-center">
            <Input value={inputTodo} onChange={onChangeTodos} color="black" className="" />

            <Button type="submit" size="sm" className="flex gap-1 justify-center items-center"><FaPlus /> Tambah</Button>

        </form>
    )
}

InputTodo.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export { InputTodo }
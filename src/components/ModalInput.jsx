import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import PropTypes from "prop-types"
import { useInput } from "../customHooks/useInput"
import * as emoji from 'node-emoji'

function ModalInput({ handleOpen }) {
    const [title, onChangeTitle] = useInput();
    const [body, onChangeBody] = useInput();
    return (
        <>
            <Dialog open='lg' size="lg" handler={handleOpen} className="bg-opacity-20 backdrop-blur-sm">
                <DialogHeader><input
                    type="text"
                    placeholder={`Apa Tugas Anda ${emoji.get(':dart:')}`}
                    className="bg-transparent outline-none border-none text-gray-700 font-bold w-full "
                    value={title}
                    onChange={onChangeTitle}
                />
                </DialogHeader>
                <DialogBody>
                    <textarea placeholder={`Apa step yang harus dilakukan ${emoji.get(':pushpin:')}??`}
                        className="w-full bg-transparent outline-none border-none text-gray-700 font-bold"
                        value={body}
                        onChange={onChangeBody}></textarea>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpen(false)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => handleOpen(false)}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

ModalInput.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    size: PropTypes.string.isRequired
}

export { ModalInput }
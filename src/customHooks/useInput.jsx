import { useState } from "react"

function useInput() {
    const [value, setValue] = useState('');
    const onChangeValue = (e) => setValue(e.target.value);
    const reset = () => setValue('');

    return [value, onChangeValue, reset];
}

export { useInput }
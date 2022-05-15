import { useState } from "react";

export default function useToggle(initialValue = false) {
    const [toggle, setToggle] = useState(initialValue);

    const toggleFn = () => {
        setToggle(toggle => !toggle);
    }
    const handleOpenToggle = () => setToggle(true);
    const handleCloseToggle = () =>setToggle(false)


    return [toggle, handleOpenToggle, handleCloseToggle, toggleFn];
}
import { useEffect, useState } from "react";

export default function useComponentSize (ref) {
    const [size, setSize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        if (ref.current) {
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight
            });
        }
    }, [ref]);

    return {
        width: size.width,
        height: size.height
    };
}
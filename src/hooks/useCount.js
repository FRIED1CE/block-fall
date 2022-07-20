import { useState } from "react";

export const useCount = () => {
    const [count, setCount] = useState(0);

    return {count, setCount};
}
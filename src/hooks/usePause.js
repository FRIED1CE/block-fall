import { useState, useCallback } from "react"

export const usePause = () => {
    const [pause, setPause] = useState(false);
    
    const resetPause = useCallback(() => {
        setPause(false);
    }, []);

    return[pause, setPause, resetPause]
}


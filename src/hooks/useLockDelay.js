import { useState } from "react";

export const useLockDelay = () => {
    const [ lockDelay, setLockDelay ] = useState(false);

    return [lockDelay, setLockDelay];
}

export const useNormalLockDelay = () => {
    const [ normalLockDelay, setNormalLockDelay ] = useState(false);

    return [ normalLockDelay, setNormalLockDelay ];
}

export const useLockCount = () => {
    const [ lockCount, setLockCount ] = useState(0)

    return [ lockCount, setLockCount ];
}
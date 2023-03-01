import { useState, useCallback } from "react"

export const useUsername = () => {
    const [username, setUsername] = useState("");

    return[username, setUsername]
}


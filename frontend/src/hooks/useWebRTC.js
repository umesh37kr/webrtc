import { useState } from "react"
import { useStateWithCallback } from "./useStateWithCallback";

export const useWebRtc = () => {
    const [clients, setClients] = useStateWithCallback([
        {
            id: 1,
            name: 'umesh k'
        },
        {
            id: 2,
            name: 'john doe'
        }
    ])

    return { clients };
}
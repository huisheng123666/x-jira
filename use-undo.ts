import { useState } from "react"

export const useUndo = <T>(initialPresent: T) => {
    const [past, setPast] = useState<T[]>([])
    const [present, setPresent] = useState(initialPresent)
    const [future, setFuture] = useState<T[]>([])

    const canUndo = past.length !== 0
    const canRedo = future.length !== 0

    const undo = () => {
        if (canUndo) {
            const previous = past[past.length - 1]
            setPresent(previous)
            const newPast = past.slice(0, past.length - 1)
            setPast(newPast)
            setFuture([present, ...future])
        }
    }

    const redo = () => {
        if (canRedo) {
            const next = future[0]
            setPresent(next)
            const newPast = [...past, next]
            setPast(newPast)
            setFuture(future.slice(1))
        }
    }

    const set = (newPresent: T) => {
        if (newPresent === present) {
            return
        }
        setPast([...past, newPresent])
        setPresent(newPresent)
        setFuture([])
    }

    const reset = (newPresent: T) => {
        setPast([])
        setPresent(newPresent)
        setFuture([])
    }

    return [
        { past, present, future },
        { set, reset, undo, redo, canUndo, canRedo }
    ] as const
}
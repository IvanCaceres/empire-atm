import {FC, KeyboardEvent, KeyboardEventHandler, RefObject, useEffect, useRef, useState} from 'react'
import { ScreenBaseProps } from '../types'
import Typography from '@/components/Typography'
import ContentEditable from "react-contenteditable";

const LoginRegister: FC<ScreenBaseProps> = () => {
    const [username, setUsername] = useState("")
    const [pin, setPin] = useState("")
    const usernameRef = useRef("")
    const contentEl = useRef<HTMLElement>(null)
    console.log('rendering LoginRegister')

    useEffect(() => {
        contentEl.current ? contentEl.current.focus() : null
        console.log('contentEl', contentEl.current)
    }, [])

    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        // submit
        if(e.code=== "Enter") {
            e.preventDefault()
            if(!username) {
                setUsername(e.currentTarget.textContent || "")
            } else {
                setPin(e.currentTarget.textContent || "")
            }
        }

        // prevent text cursor movement
        if(e.code === "ArrowLeft" || e.code === "ArrowRight" || e.code === "ArrowUp" || e.code === "ArrowDown") {
            e.preventDefault()
        }
    }

    console.log('username', username)

    return (
        <form autoComplete="off">
            {!username ? <div>
                <label htmlFor="username"><Typography variant="machine">Username:</Typography></label>
                <div className="machine-input-container">
                    <ContentEditable spellCheck="false" onKeyDown={onKeyUp} onBlur={() => {
                        contentEl.current ? contentEl.current.focus() : null
                    }} innerRef={contentEl} html={usernameRef.current} autoFocus className="machine-input w-auto bg-transparent text-[rgb(var(--machine-text-rgb))]" onChange={() => {}} />
                </div>
            </div> : <div>
            <label htmlFor="username"><Typography variant="machine">PIN:</Typography></label>
                <div className="machine-input-container">
                    <ContentEditable spellCheck="false" onKeyDown={onKeyUp} onBlur={() => {
                        contentEl.current ? contentEl.current.focus() : null
                    }} innerRef={contentEl} html={usernameRef.current} autoFocus className="machine-input w-auto bg-transparent text-[rgb(var(--machine-text-rgb))]" onChange={() => {}} />
                </div>
            </div>}
        </form>
    )
}

export default LoginRegister
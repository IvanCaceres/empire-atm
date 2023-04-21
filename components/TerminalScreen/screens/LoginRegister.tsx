import { FC, KeyboardEvent, KeyboardEventHandler, RefObject, useEffect, useRef, useState } from 'react'
import { ScreenBaseProps } from '../types'
import Typography from '@/components/Typography'
import ContentEditable from "react-contenteditable";
import { Auth } from 'aws-amplify';
import awsconfig from '@/aws-exports'
import Spinner from '@/components/Spinner/Spinner';
Auth.configure(awsconfig)

const LoginRegister: FC<ScreenBaseProps> = ({ changeStepHandler }) => {
    const [username, setUsername] = useState("")
    const [pin, setPin] = useState("")
    const usernameRef = useRef("")
    const [loading, setLoading] = useState(false)
    const contentEl = useRef<HTMLElement>(null)

    useEffect(() => {
        contentEl.current ? contentEl.current.focus() : null
    }, [])

    const onKeyUp = async (e: KeyboardEvent<HTMLDivElement>) => {
        // submit
        if (e.code === "NumpadEnter" || e.code === "Enter") {
            e.preventDefault()
            if (!username) {
                setUsername(e.currentTarget.textContent || "")
            } else {
                setLoading(true)
                const pinInput = e.currentTarget.textContent || ""
                let registrationFailed = false
                try {
                    const registration = await Auth.signUp(username, pinInput)
                } catch (error) {
                    console.error(error)
                    let message = error instanceof Error ? error.name : String(error)
                    if (message === 'UsernameExistsException') {
                        registrationFailed = true
                    }
                }

                try {
                    const login = await Auth.signIn(username, pinInput)
                    changeStepHandler('welcome', { username, id: login.attributes.sub })
                } catch (error) {
                    let message = error instanceof Error ? error : String(error)
                    console.error('login error', message)
                }
            }
        }

        // prevent text cursor movement
        if (e.code === "ArrowLeft" || e.code === "ArrowRight" || e.code === "ArrowUp" || e.code === "ArrowDown") {
            e.preventDefault()
        }
    }

    return (
        <form autoComplete="off">
            {loading ? <Spinner /> :
                !username ?
                    <div>
                        <label htmlFor="username"><Typography variant="machine">Username:</Typography></label>
                        <div className="machine-input-container">
                            <ContentEditable spellCheck="false" onKeyDown={onKeyUp} onBlur={() => {
                                contentEl.current ? contentEl.current.focus() : null
                            }} innerRef={contentEl} html={usernameRef.current} autoFocus className="machine-input w-auto bg-transparent text-[rgb(var(--machine-text-rgb))]" onChange={() => { }} />
                        </div>
                    </div> :
                    <div>
                        <label htmlFor="username"><Typography variant="machine">PIN:</Typography></label>
                        <div className="machine-input-container">
                            <ContentEditable spellCheck="false" onKeyDown={onKeyUp} onBlur={() => {
                                contentEl.current ? contentEl.current.focus() : null
                            }} innerRef={contentEl} html={usernameRef.current} autoFocus className="machine-input w-auto bg-transparent text-[rgb(var(--machine-text-rgb))]" onChange={() => { }} />
                        </div>
                    </div>}
        </form>
    )
}

export default LoginRegister
import { FC, useEffect, useLayoutEffect, KeyboardEvent as ReactKeyboardEvent, useRef, useState } from 'react'
import { ScreenBaseProps } from '../types'
import { API } from 'aws-amplify'
import awsconfig from '@/aws-exports'
import { UserType, UsersByTypeAndUsernameQuery } from '@/API'
import { GraphQLQuery, GraphQLResult } from '@aws-amplify/api'
import { usersByTypeAndUsername } from '@/graphql/customQueries'
import Typography from '@/components/Typography'
import ContentEditable from 'react-contenteditable'

API.configure(awsconfig)
// get a list of users
const getUsers = async () => {
    const users = await API.graphql<GraphQLQuery<UsersByTypeAndUsernameQuery>>({
        query: usersByTypeAndUsername, variables: {
            type: UserType['user']
        }
    })

    return users
}

type Users = NonNullable<GraphQLResult<GraphQLQuery<UsersByTypeAndUsernameQuery>>['data']>['usersByTypeAndUsername']

const Transfer: FC<ScreenBaseProps> = ({ changeStepHandler, balance }) => {
    const [users, setUsers] = useState<Users>(null)
    const [arrowTarget, setArrowTarget] = useState(0)
    const [transferUser, setTransferUser] = useState<NonNullable<NonNullable<Users>['items']>[0]>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const usernameRef = useRef("")
    const contentEl = useRef<HTMLElement>(null)

    useEffect(() => {
        // listen for keyboard events to navigate options and for enter submission
        function keydownCallback(this: Document, evt: KeyboardEvent): any {
            if (evt.code === "ArrowUp") {
                let newTarget = 0
                setArrowTarget((state) => {
                    newTarget = state
                    // reset cursor to top
                    if (state === 0) {
                        newTarget = (users?.items?.length || 1) - 1
                        containerRef.current?.scroll(0, newTarget * 35)
                        return newTarget
                    }
                    newTarget = --state
                    containerRef.current?.scroll(0, newTarget * 35)
                    return newTarget
                })
            }

            if (evt.code === "ArrowDown") {
                let newTarget = 0
                setArrowTarget((state) => {
                    if (state === ((users?.items?.length || 1) - 1)) {
                        containerRef.current?.scroll(0, 0)
                        return 0
                    }
                    newTarget = ++state
                    containerRef.current?.scroll(0, newTarget * 35)
                    return newTarget
                })
            }

            if (evt.code === "Enter" || evt.code === "NumpadEnter") {
                // ignore normal enter input when transferUser amount field is shown
                evt.preventDefault()

                // go to transfer screen on enter
                setTransferUser(users?.items[arrowTarget] || null)
                // changeStepHandler('transfer', transferUser || undefined)
            }
        }

        if (!transferUser) {
            document.addEventListener("keydown", keydownCallback, false)
        }
        return () => {
            document.removeEventListener("keydown", keydownCallback, false)
        }
    }, [arrowTarget, users, transferUser])

    useEffect(() => {
        (async () => {
            const fetchedUsers = await getUsers()
            setUsers(fetchedUsers?.data?.usersByTypeAndUsername)
        })()
    }, [])

    useLayoutEffect(() => {
        // maintain focus on transfer amount input
        contentEl.current ? contentEl.current.focus() : null
    }, [transferUser])

    const onChange = (e: ReactKeyboardEvent<HTMLDivElement>) => {
        if (e.key !== "Backspace" && e.key !== "0" && e.key !== "1" && e.key !== "2" && e.key !== "3" && e.key !== "4" && e.key !== "5" && e.key !== "6" && e.key !== "7" && e.key !== "8" && e.key !== "9") {
            e.preventDefault()
        }
    }

    const onUserClick = (usr: typeof transferUser) => {
        setTransferUser(usr)
    }

    return (
        <div className='h-full overflow-hidden' ref={containerRef}>
            {!transferUser ? users?.items?.map((usr, index) => {
                return (
                    <Typography variant="machine" key={usr?.id} onClick={() => onUserClick(usr)}>
                        {usr?.username} {index === arrowTarget ? "<" : undefined}
                    </Typography>
                )
            }) : (
                <div>
                    <Typography variant="machine">
                        Your Imperial Credits:
                    </Typography>
                    <Typography variant="machine">
                        {balance}
                    </Typography>
                    <label htmlFor="username"><Typography variant="machine">Transfer to {transferUser?.username}:</Typography></label>
                    <div className="machine-input-container">
                        <ContentEditable spellCheck="false" onKeyDown={onChange} onBlur={() => {
                            contentEl.current ? contentEl.current.focus() : null
                        }} innerRef={contentEl} html={usernameRef.current} autoFocus className="machine-input w-auto bg-transparent text-[rgb(var(--machine-text-rgb))]" onChange={(e) => { }} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Transfer
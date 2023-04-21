import { FC, useEffect, useState } from 'react'
import Typography from '@/components/Typography'
import { ScreenBaseProps } from '../types'
import { API } from 'aws-amplify'
import { GraphQLQuery } from '@aws-amplify/api'
import { GetUserQuery } from '@/API'
import { getUser as getUserQuery } from '@/graphql/queries'
import awsconfig from '@/aws-exports'

API.configure(awsconfig)

// get personal balance
const getUser = async (id: string) => {
  const user = await API.graphql<GraphQLQuery<GetUserQuery>>({
    query: getUserQuery, variables: {
      id,
    }
  })

  return user
}

type WelcomeOptions = "transfer" | "exit"

const Welcome: FC<ScreenBaseProps> = ({ changeStepHandler, user }) => {
  const [userAccount, setUserAccount] = useState<GraphQLQuery<GetUserQuery>['getUser'] | undefined>(undefined)
  const [arrowTarget, setArrowTarget] = useState<WelcomeOptions>("transfer")

  useEffect(() => {
    // listen for keyboard events to navigate options and for enter submission
    function keydownCallback(this: Document, evt: KeyboardEvent): any {
      if (evt.code === "ArrowUp" || evt.code === "ArrowDown") {
        setArrowTarget((state) => {
          return state === 'exit' ? 'transfer' : 'exit'
        })
      }

      if (evt.code === "Enter" || evt.code === "NumpadEnter") {
        // go to transfer screen on enter
        changeStepHandler(arrowTarget === 'exit' ? 'home' : 'transfer', userAccount || undefined)
      }
    }

    document.addEventListener("keydown", keydownCallback, false)
    return () => {
      document.removeEventListener("keydown", keydownCallback, false)
    }
  }, [arrowTarget, userAccount])

  useEffect(() => {
    (async () => {
      if (user?.id) {
        const account = await getUser(user.id)
        setUserAccount(account.data?.getUser)
      }
    })()
  }, [])

  const handleClick = (target: WelcomeOptions) => {
    changeStepHandler(target === "exit" ? 'home' : 'transfer', userAccount || undefined)
  }

  return (
    <div>
      <Typography variant='machine'>
        WELCOME, {user?.username}
      </Typography>
      <Typography variant='machine'>
        IMPERIAL CREDITS: {userAccount?.balance}
      </Typography>
      <Typography variant='machine' className="cursor-pointer" onClick={() => { handleClick('transfer') }}>
        Transfer Credits {arrowTarget === "transfer" ? "<" : undefined}
      </Typography>
      <Typography variant='machine' className="cursor-pointer" onClick={() => handleClick('exit')}>
        Exit {arrowTarget === "exit" ? "<" : undefined}
      </Typography>
    </div>
  )
}

export default Welcome
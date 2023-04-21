import { FC, useEffect } from 'react'
import Typography from '@/components/Typography'
import { ScreenBaseProps } from '../types'
import Spinner from '@/components/Spinner/Spinner'

const Home: FC<ScreenBaseProps> = ({ changeStepHandler }) => {
  const onClickEnter = () => {
    changeStepHandler('login')
  }

  useEffect(() => {
    // listen for keyboard events to navigate options and for enter submission
    function keydownCallback(this: Document, evt: KeyboardEvent): any {
      if (evt.code === "Enter" || evt.code === "NumpadEnter") {
        evt.preventDefault()
        // go to transfer screen on enter
        changeStepHandler('login')
      }
    }

    document.addEventListener("keydown", keydownCallback, false)
    return () => {
      document.removeEventListener("keydown", keydownCallback, false)
    }
  }, [])

  return (
    <div>
      <Typography className="marquee" variant='machine'>
        IMPERIAL BANK
      </Typography>
      <Spinner />
      <Typography className="text-center p-4 cursor-pointer" variant='machine' onClick={onClickEnter}>
        ENTER
      </Typography>
    </div>
  )
}

export default Home
import { FC } from 'react'
import Image from 'next/image'
import Typography from '@/components/Typography'
import { ScreenBaseProps } from '../types'
import Spinner from '@/components/Spinner/Spinner'

const Home: FC<ScreenBaseProps> = ({ changeStepHandler }) => {
  const onClickEnter = () => {
    changeStepHandler('login')
  }

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
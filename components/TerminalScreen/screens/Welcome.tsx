import {FC} from 'react'
import Image from 'next/image'
import Typography from '@/components/Typography'
import { ScreenBaseProps } from '../types'

const Welcome: FC<ScreenBaseProps> = ({changeStepHandler}) => {
    const onClickEnter = () => {
        console.log('change step handler')
        changeStepHandler('login')
    }

    return (
        <div>
          <Typography className="marquee" variant='machine'>
            IMPERIAL BANK
          </Typography>
          <Image
            className="relative imperial-emblem"
            src="/imperial-emblem.webp"
            alt="Imperial Emblem"
            width={100}
            height={100}
            unoptimized
            priority
          />
          <Typography className="text-center p-4 cursor-pointer" variant='machine' onClick={onClickEnter}>
            ENTER
          </Typography>
        </div>
    )
}

export default Welcome
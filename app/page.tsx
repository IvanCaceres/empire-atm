import { Inter } from 'next/font/google'
import ATM from '@/components/ATM/ATM'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ATM />
    </main>
  )
}

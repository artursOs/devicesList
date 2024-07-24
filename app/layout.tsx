import type { ReactNode } from 'react'
import Logo from '@/assets/Union.svg'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import ProviderReactQuery from '@/src/providers/providers.reactQuery'
import NextTopLoader from 'nextjs-toploader'

const openSans = Open_Sans({ subsets: ['latin'] })

const config = {
  Author: 'Arturs Osipovs'
}

function LogoHomoLink() {
  return (
    <Link href="/">
      <button className="p-1.5 outline-primary-6 hover:[&_svg]:text-primary">
        <Logo width="20" height="21" className="cursor-pointer text-[#50565E]" />
      </button>
    </Link>
  )
}

function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-neutral-2 pr-[50px]">
      <div className="flex items-center gap-4">
        <div className="flex size-[50px] items-center justify-center">
          <LogoHomoLink />
        </div>
        <span className="text-sm text-text-3">Devices</span>
      </div>
      <div className="text-sm text-text-3">{config.Author}</div>
    </header>
  )
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <NextTopLoader showSpinner={false} color="#006FFF" />
        <ProviderReactQuery>
          <div className="flex h-screen flex-col">
            <Header />
            {children}
          </div>
        </ProviderReactQuery>
      </body>
    </html>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BackButton() {
  const router = useRouter()

  return (
    // <Link href="/">
    <Button
      onClick={() => {
        router.back()
      }}
      variant="ghost"
      className="h-[28px] px-1 text-sm text-black text-opacity-45 shadow"
    >
      <ChevronLeft width={20} height={20} />
      Back
    </Button>
    // </Link>
  )
}

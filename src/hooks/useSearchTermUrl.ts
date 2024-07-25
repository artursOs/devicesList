import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const TERM_KEY = 'term'

export function useGetSearchQuery() {
  const searchParams = useSearchParams()
  return searchParams.get(TERM_KEY)
}

export function useSearchTermProduct() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleTermUpdate(value: string) {
    const newParams = new URLSearchParams(searchParams.toString())

    if (!value) {
      newParams.delete(TERM_KEY)
    } else {
      newParams.set(TERM_KEY, value)
    }

    router.push(pathname + '?' + newParams.toString())
  }

  return {
    handleTermUpdate
  }
}

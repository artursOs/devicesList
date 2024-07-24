import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ENTITY_KEY = 'products'

export function useGetUrlProductsState() {
  const searchParams = useSearchParams()
  return (
    searchParams
      .get(ENTITY_KEY)
      ?.split(',')
      ?.filter(item => !!item) || []
  )
}

export function useProductUrlState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const product = searchParams.get(ENTITY_KEY)?.split(',') || []

  function handleProductsUpdate(values: string[]) {
    const newParams = new URLSearchParams(searchParams.toString())

    if (!values?.length) {
      newParams.delete(ENTITY_KEY)
    } else {
      newParams.set(ENTITY_KEY, values.toString())
    }

    router.push(pathname + '?' + newParams.toString())
  }

  return { handleProductsUpdate, productsArr: product }
}

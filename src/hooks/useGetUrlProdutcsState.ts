import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGetJsonData } from '@/src/hooks/useGetJsonData'

const ENTITY_KEY = 'products'

export function useGetUrlProductsState() {
  const searchParams = useSearchParams()
  return (
    searchParams
      .get('products')
      ?.split(',')
      ?.filter(item => !!item) || []
  )
}

export function useProductUrlState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const product = searchParams.get('products')?.split(',') || []

  function handleProductsUpdate(values: string[]) {
    const newParams = new URLSearchParams(searchParams.toString())

    if (!values?.length) {
      newParams.delete('products')
    } else {
      newParams.set('products', values.toString())
    }

    router.push(pathname + '?' + newParams.toString())
  }

  return { handleProductsUpdate, productsArr: product }
}

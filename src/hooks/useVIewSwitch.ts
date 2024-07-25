import { useRouter, useSearchParams } from 'next/navigation'

const QUERY_KEY = 'view'

export enum View {
  Table = 'table',
  Thumbnail = 'thumbnail'
}

export function useGetActiveView() {
  const searchParams = useSearchParams()
  return searchParams.get(QUERY_KEY) || View.Table
}

export function useIsThumbnailsView() {
  const active = useGetActiveView()
  return active === View.Thumbnail
}

export function useViewSwitch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  function switchHandler(view: string) {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set(QUERY_KEY, view)
    router.push('/?' + newParams.toString())
  }

  return { switchHandler }
}

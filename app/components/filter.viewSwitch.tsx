import GridViewIco from '@/public/gridView.svg'
import ListViewIco from '@/public/listView.svg'
import { cn } from '@/src/lib/utils'
import { PropsWithChildren } from 'react'
import { useGetActiveView, useViewSwitch, View } from '@/hooks/useVIewSwitch'
import { Button } from '@/components/ui/button'

function IcoLink({ view, children }: PropsWithChildren<{ view: string }>) {
  const active = useGetActiveView()
  const { switchHandler } = useViewSwitch()

  return (
    <Button
      onClick={() => {
        switchHandler(view)
      }}
      variant="ghost"
      className={cn(
        'h-auto rounded p-1.5',
        view === active ? 'bg-neutral-1 [&_svg]:text-primary' : '[&_svg]:text-[#838691]'
      )}
    >
      {children}
    </Button>
  )
}

export function FilterViewSwitch() {
  return (
    <>
      <IcoLink view={View.Table}>
        <GridViewIco />
      </IcoLink>
      <IcoLink view={View.Thumbnail}>
        <ListViewIco />
      </IcoLink>
    </>
  )
}

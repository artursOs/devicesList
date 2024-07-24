import Logo from '@/public/Union.svg'

export function Loader() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <Logo width={320} height={320} className="animate-pulse" />
      <h4>Loading</h4>
    </div>
  )
}

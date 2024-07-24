export function buildImgUrl(id: string, imgDef: string, size: number): string {
  return `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${id}/default/${imgDef}.png&w=${size}&q=75`
}

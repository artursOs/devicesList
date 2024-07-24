export interface Device {
  guids: []
  icon: {
    id: string
    resolutions: string[]
  }
  id: string
  images: {
    default: string
  }
  line: {
    id: string
    name: string
  }
  product: {
    abbrev: string
    name: string
  }
  shortnames: string[]
  unifi: Record<string, any>
}

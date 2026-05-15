const shimmer = (w: number, h: number, fill: string) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="${fill}"/>
</svg>`

const toBase64 = (str: string) =>
  typeof Buffer !== 'undefined'
    ? Buffer.from(str).toString('base64')
    : btoa(str)

export const blurPlaceholder = (w = 400, h = 400, fill = '#e2e8f0') =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h, fill))}`

export const darkBlurPlaceholder = (w = 400, h = 400) =>
  blurPlaceholder(w, h, '#1e293b')

export const BLUR_DATA_URL = blurPlaceholder()
export const DARK_BLUR_DATA_URL = darkBlurPlaceholder()

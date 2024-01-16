export const getActualImageUrl = (path: string, image?: string) => {
  if (image) {
    return image.startsWith('http') ? image : `/media/${path}/${image}`
  }

  return ''
}

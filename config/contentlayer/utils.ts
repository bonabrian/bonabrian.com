export const getActualImageUrl = (path: string, image?: string) => {
  if (image) {
    return image.startsWith('http') ? image : `/static/images/${path}/${image}`
  }

  return ''
}

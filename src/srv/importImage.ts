export const importImage = async (file: File): Promise<string> => {
  const objUrl = URL.createObjectURL(file)
  return objUrl
}

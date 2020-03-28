import { useCallback, useEffect, useRef } from 'react'

export interface Opts {
  onFileChoosen(file: File, by: 'fs' | 'paste' | 'drop'): unknown
}

export const useFileChooser = ({ onFileChoosen }: Opts): [() => unknown] => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const openFileChooser = useCallback(() => inputRef.current && inputRef.current.click(), [])
  useEffect(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.style.display = 'none'
    const changeListener = () => {
      const file = input.files && input.files.length > 0 && input.files[0]
      if (!file) {
        return
      }
      onFileChoosen(file, 'fs')
    }
    input.addEventListener('change', changeListener)
    document.body.appendChild(input)
    inputRef.current = input
    return () => {
      input.removeEventListener('change', changeListener)
      document.body.removeChild(input)
      inputRef.current = null
    }
  }, [onFileChoosen])

  useEffect(() => {
    const pasteListener = (pasteEv: ClipboardEvent) => {
      const data = pasteEv.clipboardData
      if (!(data && data.files && data.files.length > 0)) {
        return
      }
      const file = data.files[0]
      onFileChoosen(file, 'paste')
    }
    document.body.addEventListener('paste', pasteListener)
    return () => {
      document.body.removeEventListener('paste', pasteListener)
    }
  }, [onFileChoosen])

  useEffect(() => {
    const dropListener = (dragEv: DragEvent) => {
      const data = dragEv.dataTransfer
      if (!(data && data.files.length > 0)) {
        return
      }
      const file = data.files[0]
      onFileChoosen(file, 'drop')
    }
    document.body.addEventListener('drop', dropListener)
    return () => {
      document.body.removeEventListener('drop', dropListener)
    }
  }, [onFileChoosen])

  return [openFileChooser]
}

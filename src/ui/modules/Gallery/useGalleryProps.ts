import { useDispatcher } from 'lib/Actions/provideDispatcher'
import { useFileChooser } from 'lib/hook/useFileChooser'
import { useCallback, useMemo } from 'react'
import { useStickeryState } from 'srv'
import { act_importImage } from 'srv/db'
import { ImageMeta } from 'srv/db/db'
import { act_clickImage } from '.'

export const useGalleryProps = () => {
  const {
    imageDB: { images }
  } = useStickeryState()
  const { dispatch } = useDispatcher()
  const add = useCallback((_: File) => dispatch(act_importImage(_)), [dispatch])
  const clickImage = useCallback((_: ImageMeta) => dispatch(act_clickImage(_)), [dispatch])
  const [openFileChooser] = useFileChooser({ onFileChoosen: add })

  return useMemo(() => {
    return {
      openFileChooser,
      images,
      clickImage
    }
  }, [clickImage, images, openFileChooser])
}

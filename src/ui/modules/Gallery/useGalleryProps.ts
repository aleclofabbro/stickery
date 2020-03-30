import { actionCtx, useActionDispatcher } from 'lib/Actions'
import { useDispatcher } from 'lib/Actions/provideDispatcher'
import { useFileChooser } from 'lib/hook/useFileChooser'
import { useMemo } from 'react'
import { useStickeryState } from 'srv'
import { cmd_import_image_file } from 'srv/db'
import { ImageMeta } from 'srv/db/db'

export const cmd_gallery_image_clicked = actionCtx<ImageMeta>('cmd_gallery_image_clicked')
export const useGalleryProps = () => {
  const {
    imageDB: { images }
  } = useStickeryState()
  const { dispatch } = useDispatcher()
  const add = useActionDispatcher(cmd_import_image_file, dispatch)
  const clickImage = useActionDispatcher(cmd_gallery_image_clicked, dispatch)
  const [openFileChooser] = useFileChooser({ onFileChoosen: add })

  return useMemo(() => {
    return {
      openFileChooser,
      images,
      clickImage
    }
  }, [clickImage, images, openFileChooser])
}

import { commandCtx, useActionCustDispatch } from 'lib/Actions'
import { useCallback, useEffect, useMemo } from 'react'
import { ImageFileMeta } from 'srv/@types/data'
import { useStickeryDB } from '../db'
import { importImageFile } from './lib'
import { cmd_int_add_image_meta, cmd_int_set_images, useImagesReducer } from './reducer'

export interface ImageDBState {
  images: ImageFileMeta[]
}

export const cmd_imagedb_import_image_file = commandCtx<File, ImageFileMeta | null>(
  'cmd_import_image_file',
  null
)

export const useImages = () => {
  const [state, reduce] = useImagesReducer()
  const db = useStickeryDB()
  const addImagesMeta = useActionCustDispatch(cmd_int_add_image_meta, reduce)
  const dispatch = useCallback(
    (action) => {
      cmd_imagedb_import_image_file.consume(action, (file) =>
        importImageFile(db, file).then(({ imageMeta }) => {
          addImagesMeta(imageMeta)
          return imageMeta
        })
      )

      reduce(action)
    },
    [addImagesMeta, db, reduce]
  )

  useEffect(() => {
    db.imageMeta.toArray().then(cmd_int_set_images(dispatch))
  }, [dispatch, db])

  return useMemo(() => {
    return {
      state,
      dispatch
    }
  }, [dispatch, state])
}

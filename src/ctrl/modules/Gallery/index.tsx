import { ComponentArray } from '@types'
import { useActionDispatch } from 'lib/Actions'
import { useFileChooser } from 'lib/hook/useFileChooser'
import React, { FC, useMemo } from 'react'
import { useStickeryState } from 'srv'
import { cmd_imagedb_import_image_file } from 'srv/images'
import { Gallery, GalleryItem } from 'ui/modules/Gallery'
import { ImageFileMeta } from 'srv/@types/data'

export interface GalleryCtrl {
  clickImage(_: ImageFileMeta): unknown
}
export const GalleryCtrl: FC<GalleryCtrl> = ({ clickImage }) => {
  const {
    imageDB: { images }
  } = useStickeryState()
  const add = useActionDispatch(cmd_imagedb_import_image_file)

  const [openFileChooser] = useFileChooser({ onFileChoosen: add })
  const GalleryItems = useMemo<ComponentArray>(
    () => images.map((image) => [image.src, () => <GalleryItemCtrl {...{ image, clickImage }} />]),
    [clickImage, images]
  )

  const props = useMemo<Gallery>(() => {
    return {
      openFileChooser,
      GalleryItems
    }
  }, [GalleryItems, openFileChooser])
  return <Gallery {...props} />
}

export interface GalleryItemCTRL {
  image: ImageFileMeta
  clickImage(image: ImageFileMeta): unknown
}
export const GalleryItemCtrl: FC<GalleryItemCTRL> = ({ image, clickImage }) => {
  const props = useMemo<GalleryItem>(() => {
    return {
      image,
      clickImage: () => clickImage(image)
    }
  }, [clickImage, image])
  return <GalleryItem {...props} />
}

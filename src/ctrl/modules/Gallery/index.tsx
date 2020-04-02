import { actionCtx, useActionDispatch } from 'lib/Actions'
import { useFileChooser } from 'lib/hook/useFileChooser'
import React, { FC, useCallback, useMemo } from 'react'
import { useStickeryState } from 'srv'
import { ImageMeta } from 'srv/db/db'
import { Gallery, GalleryItem } from 'ui/modules/Gallery'
import { ComponentArray } from '@types'

export const cmd_gallery_image_clicked = actionCtx<ImageMeta>('cmd_gallery_image_clicked')
export const cmd_gallery_add_file = actionCtx<File>('cmd_gallery_add_file')

export interface GalleryCtrl {}
export const GalleryCtrl: FC<GalleryCtrl> = () => {
  const {
    imageDB: { images }
  } = useStickeryState()
  const add = useActionDispatch(cmd_gallery_add_file)
  const [openFileChooser] = useFileChooser({ onFileChoosen: add })
  const GalleryItems = useMemo<ComponentArray>(
    () => images.map((image) => [image.src, () => <GalleryItemCTRL {...{ image }} />]),
    [images]
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
  image: ImageMeta
}
export const GalleryItemCTRL: FC<GalleryItemCTRL> = ({ image }) => {
  const clickImageAction = useActionDispatch(cmd_gallery_image_clicked)
  const clickImage = useCallback(() => clickImageAction(image), [image, clickImageAction])
  const props = useMemo<GalleryItem>(() => {
    return {
      image,
      clickImage
    }
  }, [clickImage, image])
  return <GalleryItem {...props} />
}

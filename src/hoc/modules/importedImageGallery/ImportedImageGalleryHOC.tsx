import React, { SFC, useCallback, useMemo, CSSProperties } from 'react'
import { ImageMeta, useImagesStore } from '../../../srv/db'
import { Button } from '../../../ui/elements/basic/Button'
import { useFileChooser } from '../../../lib/hook/useFileChooser'
const GridGallery = require('react-grid-gallery')
export interface Image {
  src: string
  thumbnail: string
  thumbnailWidth: number
  thumbnailHeight: number
}
export interface ImportedImageGalleryHOC {
  onClickImage(meta: ImageMeta): unknown
}
export const ImportedImageGalleryHOC: SFC<ImportedImageGalleryHOC> = ({ onClickImage }) => {
  const { images, add } = useImagesStore()
  const [importFile] = useFileChooser({ onFileChoosen: add })

  const gridImages = useMemo<Image[]>(
    () =>
      images.map((imgMeta) => {
        return {
          meta: imgMeta,
          src: imgMeta.src,
          thumbnail: imgMeta.src,
          thumbnailWidth: 0,
          thumbnailHeight: 0
        }
      }),
    [images]
  )

  const select = useCallback(
    function(this: { props: { item: { meta: ImageMeta } } }) {
      onClickImage(this.props.item.meta)
    },
    [onClickImage]
  )
  return (
    <div style={templateStyle}>
      <div style={headStyle}>
        <Button onClick={importFile}>scegli file</Button>
        <br />
        <span>o incolla</span>
      </div>
      <div style={galleryContainerStyle}>
        <GridGallery {...gridConfig} images={gridImages} onClickThumbnail={select} />
      </div>
    </div>
  )
}

const gridConfig = {
  enableImageSelection: false
}

const templateStyle: CSSProperties = {
  display: 'grid',
  gridTemplate: `
  "head" 20px
  "gallery" auto
  `,
  position: 'absolute',
  top: 0,
  bottom: 0
}

const headStyle: CSSProperties = {
  gridArea: 'head'
}

const galleryContainerStyle: CSSProperties = {
  gridArea: 'gallery',
  overflowY: 'auto',
  overflowX: 'hidden'
}

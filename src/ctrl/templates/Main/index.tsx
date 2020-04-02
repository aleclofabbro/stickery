import { cmd_gallery_add_file, cmd_gallery_image_clicked, GalleryCtrl } from 'ctrl/modules/Gallery'
import { useActionDispatch } from 'lib/Actions'
import { useMWProvider } from 'lib/Actions/provideDispatcher'
import React, { FC, useCallback, useMemo } from 'react'
import { cmd_imagedb_import_image_file } from 'srv/db'
import { Main } from 'ui/templates/Main'

export interface MainCtrl {}
export const MainCtrl: FC<MainCtrl> = () => {
  const addFileToDb = useActionDispatch(cmd_imagedb_import_image_file)
  const GalleryMWProvider = useMWProvider(
    useCallback(
      (action) => {
        cmd_gallery_image_clicked.do(action, (meta) => console.log('clickedMeta', meta))
        cmd_gallery_add_file.do(action, addFileToDb)
        return action
      },
      [addFileToDb]
    )
  )

  const GalleryComp = useMemo(
    (): FC => () => (
      <GalleryMWProvider>
        <GalleryCtrl />
      </GalleryMWProvider>
    ),
    []
  )
  const props = useMemo<Main>(
    () => ({
      GalleryComp
    }),
    [GalleryComp]
  )
  return <Main {...props} />
}

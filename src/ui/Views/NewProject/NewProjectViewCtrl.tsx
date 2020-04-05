import { GalleryCtrl } from 'ui/modules/Gallery/GalleryCtrl'
import { useFormik } from 'formik'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { NewProjectView } from 'ui/Views/NewProject/NewProjectView'
import { cmd_prj_new_project } from 'srv/project'
import { useActionDispatch } from 'lib/Actions'
import { ImageFileMeta } from 'srv/@types/data'

export interface NewProjectViewCtrl {}
export const NewProjectViewCtrl: FC<NewProjectViewCtrl> = () => {
  const newProject = useActionDispatch(cmd_prj_new_project)
  const [background, setBg] = useState<ImageFileMeta>()
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: ({ name }) => {
      if (!background) {
        return
      }
      return newProject({
        background,
        name
      }).response
    }
  })
  const GalleryComp = useMemo<NewProjectView['GalleryComp']>(
    () => ({ done }) => (
      <Gallery
        {...{
          setBackground: (background) => {
            setBg(background)
            done()
          }
        }}
      />
    ),
    []
  )
  const props = useMemo<NewProjectView>(
    () => ({
      GalleryComp,
      formik,
      background: background?.src
    }),
    [GalleryComp, formik, background]
  )
  return (
    <>
      {`${formik.isSubmitting}`}
      <NewProjectView {...props} />
    </>
  )
}
const Gallery: FC<{ setBackground(_: ImageFileMeta): unknown }> = ({ setBackground }) => {
  const clickImage = useCallback<GalleryCtrl['clickImage']>((image) => setBackground(image), [
    setBackground
  ])

  return <GalleryCtrl {...{ clickImage }} />
}

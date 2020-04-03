import { GalleryCtrl } from 'ctrl/modules/Gallery'
import { useFormik } from 'formik'
import React, { FC, useCallback, useMemo } from 'react'
import { NewProjectView } from 'ui/Views/NewProject'
import { cmd_prj_new_project } from 'srv/project'
import { useActionDispatch } from 'lib/Actions'

export interface NewProjectViewCtrl {}
export const NewProjectViewCtrl: FC<NewProjectViewCtrl> = () => {
  const newProject = useActionDispatch(cmd_prj_new_project)
  const formik = useFormik({
    initialValues: {
      name: '',
      background: ''
    },
    onSubmit: (values) => newProject(values).response
  })
  const GalleryComp = useMemo<NewProjectView['GalleryComp']>(
    () => ({ done }) => (
      <Gallery
        {...{
          setBackgroundUrl: (background) => {
            formik.setValues({ ...formik.values, background })
            done()
          }
        }}
      />
    ),
    [formik]
  )
  const props = useMemo<NewProjectView>(
    () => ({
      GalleryComp,
      formik
    }),
    [GalleryComp, formik]
  )
  return (
    <>
      {`${formik.isSubmitting}`}
      <NewProjectView {...props} />
    </>
  )
}
const Gallery: FC<{ setBackgroundUrl(_: string): unknown }> = ({ setBackgroundUrl }) => {
  const clickImage = useCallback<GalleryCtrl['clickImage']>(
    (image) => setBackgroundUrl(image.src),
    [setBackgroundUrl]
  )

  return <GalleryCtrl {...{ clickImage }} />
}

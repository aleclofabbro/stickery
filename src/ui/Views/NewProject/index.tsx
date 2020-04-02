import React, { ComponentType, FC } from 'react'
import { Button } from 'ui/elements/button'
import { FormikHook } from '@types'
import { useBoolState } from 'lib/hook/useBoolState'

export interface NewProjectView {
  GalleryComp: ComponentType<{ done(): unknown }>
  formik: FormikHook<{ name: string; background: string }>
}
export const NewProjectView: FC<NewProjectView> = ({ GalleryComp, formik }) => {
  const { b: showGallery, T: openGallery, F: closeGallery } = useBoolState()
  return (
    <div>
      <h2>Scegli lo sfondo e il nome</h2>
      <input name="name" onChange={formik.handleChange} value={formik.values.name} />
      {formik.values.background && <img src={formik.values.background} alt={'bg'} />}
      {showGallery ? (
        <GalleryComp done={closeGallery} />
      ) : (
        <Button onClick={openGallery}>scegli da gallery</Button>
      )}
      {formik.isValid && <Button onClick={formik.submitForm}>ok</Button>}
      <span>{formik.errors.name}</span>
    </div>
  )
}

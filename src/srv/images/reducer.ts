import { Reducer, useReducer } from 'react'
import { actionCtx } from 'lib/Actions'
import { ImageDBState } from '.'
import { ImageFileMeta } from 'srv/@types/data'

type ImageDBReducer = Reducer<ImageDBState, any>
export const cmd_int_set_images = actionCtx<ImageDBState['images']>('cmd_int_set_DB_images')
export const cmd_int_add_image_meta = actionCtx<ImageFileMeta>('cmd_int_add_image_meta')

const initState: ImageDBState = {
  images: []
}
const reducer: ImageDBReducer = (prev, action) => {
  if (cmd_int_set_images.is(action)) {
    return {
      ...prev,
      images: action.payload
    }
  }
  if (cmd_int_add_image_meta.is(action)) {
    return {
      ...prev,
      images: [action.payload, ...prev.images]
    }
  }
  return prev
}

export const useImagesReducer = () => useReducer<ImageDBReducer>(reducer, initState)

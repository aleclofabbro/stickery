import { useProject } from 'srv/project'
import { useImageDb } from 'srv/db'
import { useServices } from 'lib/hook/useServices'

export type StickeryServices = ReturnType<typeof useStickeryServices>
export const useStickeryServices = () => {
  return useServices({
    project: useProject(),
    imageDB: useImageDb()
  })
}

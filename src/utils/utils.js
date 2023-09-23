import variables from '../stylus/variables.json'
import metadata from './metadata.json'

export const getVariable = varName => {
  if (varName in variables) {
    return variables[varName]
  }
  return null
}

export const getMetadata = pathName => {
  if (pathName in metadata) {
    return metadata[pathName]
  }
  return metadata['/']
}

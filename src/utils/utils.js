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

export const pascalize = s => {
  let str = s.replace(/-./g, x => x[1].toUpperCase())
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const evilDOMHack = (callback, timeout = 0) => {
  setTimeout(() => {
    callback()
  }, timeout)
}
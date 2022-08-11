import fs from 'fs'
import path from 'path'

const pipe =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x)

const flattenArray = (input: any) =>
  input.reduce(
    (acc: any[], item: any) => [
      ...acc,
      ...(Array.isArray(item) ? item : [item]),
    ],
    [],
  )

const map = (fn: any) => (input: any[]) => input.map(fn)

const pathJoinPrefix = (prefix: string) => (extraPath: string) =>
  path.join(prefix, extraPath)

const getAllFilesRecursively = (folder: string): string[] =>
  pipe(
    fs.readdirSync,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    map(pipe(pathJoinPrefix(folder), walkDir)),
    flattenArray,
  )(folder)

const walkDir = (fullPath: string) => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllFilesRecursively(fullPath)
}

export default getAllFilesRecursively

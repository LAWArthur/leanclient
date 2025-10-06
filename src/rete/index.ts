/* eslint-disable */
import { createEditor as createDefaultEditor } from './editor'

const create = createDefaultEditor;

export const createEditor = ((...args: Parameters<typeof create>) => {
  return create.apply(this, args)
}) as typeof create

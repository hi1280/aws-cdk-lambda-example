import * as fs from 'fs'

interface Context {
  readonly env: string;
  readonly url: string;
}

function createContext(env: string): Context {
  return JSON.parse(fs.readFileSync(`context${env ? `.${env}` : ""}.json`).toString());
}

export {Context, createContext}
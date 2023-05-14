import {homedir} from "os"
import {join} from "path"
import {writeFile, readFile, stat} from "fs/promises"

const FILE_NAME = "weather-data.json"
const MAP_APP_PARAMS = {
  TOKEN: "token",
  LAT: "lat",
  LON: "lon",
  CITY: "city",
}

const filePath = join(homedir(), FILE_NAME)

const isExists = async (path) => {
  try {
    await stat(path)
    return true
  } catch (e) {
    return false
  }
}

const saveKeyValue = async (key, value) => {
  let data = {}

  if (await isExists(filePath)) {
    const file = await readFile(filePath)
    data = JSON.parse(file)
  }

  data[key] = value

  await writeFile(filePath, JSON.stringify(data))
}
const getKeyValue = async (key) => {
  if (await isExists(filePath)) {
    const file = await readFile(filePath)
    return JSON.parse(file)[key]
  }
}

export {saveKeyValue, getKeyValue, MAP_APP_PARAMS}

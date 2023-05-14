#!/usr/bin/env/node
import dotenv from 'dotenv'
import getArgs from "./helpers/args.js";
import {printError, printForecast, printHelp, printSuccess} from "./services/log.service.js";
import {getKeyValue, MAP_APP_PARAMS, saveKeyValue} from "./services/storage.service.js"
import {getCity, getWeather} from './services/api.service.js'

dotenv.config()

const DEFAULT_LAT = 55.7504461
const DEFAULT_LON = 37.6174943

const saveToken = async (token) => {
  if (!token?.length > 0) {
    printError(`No token provided`)
    return false
  }
  try {
    await saveKeyValue(MAP_APP_PARAMS.TOKEN, token)
    printSuccess(`token ${token} saved successfully`)
    return true
  } catch (e) {
    printError(`Error occurred while saving token: ${e.message()}`)
    return false
  }
}

const saveCity = async (city) => {
  try {
    const data = await getCity(city)

    if (!data) throw Error(`city ${city} not found`)

    await saveKeyValue(MAP_APP_PARAMS.CITY, data.name)
    await saveKeyValue(MAP_APP_PARAMS.LAT, data.lat)
    await saveKeyValue(MAP_APP_PARAMS.LON, data.lon)
    printSuccess(`city ${city} saved successfully`)
    return true
  } catch (e) {
    printError(e)
    return false
  }
}

const getForecast = async () => {
  try {
    const lat = await getKeyValue(MAP_APP_PARAMS.LAT) || DEFAULT_LAT
    const lon = await getKeyValue(MAP_APP_PARAMS.LON) || DEFAULT_LON

    return await getWeather(lat, lon)
  } catch (e) {
    printError(e)
  }

}

const initCli = async () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
    return
  }
  if (args.t) {
    const isTokenSaved = await saveToken(args.t)
    if (!isTokenSaved) return
  }
  if (args.s) {
    const isCitySaved = await saveCity(args.s)
    if (!isCitySaved) return
  }

  const forecast = await getForecast()
  if (!forecast) return
  printForecast(forecast)
}

initCli()

import {getKeyValue, MAP_APP_PARAMS} from "./storage.service.js";

const WEATHER_URL = "https://api.openweathermap.org/"
const WEATHER_VERSION = "data/2.5/weather"
const CITY_VERSION = "geo/1.0/direct"

const getWeather = async (lat, lon) => {
  const token = process.env.OPEN_WEATHER_API_KEY || await getKeyValue(MAP_APP_PARAMS.TOKEN)

  if (!token) {
    throw new Error("Token has not been set, use -t <API_TOKEN> to set token")
  }

  const url = new URL(`${WEATHER_URL}${WEATHER_VERSION}`)
  url.searchParams.append("lat", lat)
  url.searchParams.append("lon", lon)
  url.searchParams.append("appid", token)
  url.searchParams.append("units", "metric")

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}

const getCity = async (cityName) => {
  const token = process.env.OPEN_WEATHER_API_KEY || await getKeyValue(MAP_APP_PARAMS.TOKEN)

  if (!token) {
    throw new Error("Token has not been set , use -t <API_TOKEN> to set token")
  }

  const url = new URL(`${WEATHER_URL}${CITY_VERSION}`)
  url.searchParams.append("q", cityName)
  url.searchParams.append("limit", "1")
  url.searchParams.append("appid", token)


  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json().then(r => r[0])
}

export {getWeather, getCity}

import chalk from "chalk";
import dedent from "dedent"
import {getIcon} from "../helpers/icon-picker.js";

const printError = (errorMessage) => {
  console.log(chalk.red(`${errorMessage}`))
}

const printSuccess = (message) => {
  console.log(chalk.green(`${message}`))
}

const printHelp = () => {
  console.log(chalk.cyan("====HELP===="))
  console.log(chalk.yellow(dedent(`
    Без параметров - вывод погоды
    -s <CITY>      - установка города
    -h             - для вывода помощи
    -t <API_KEY>   - для назначения api-ключа
  `)))
}

const printForecast = ({name, weather, main, wind}) => {
  console.log(chalk.bgGrey(dedent(`
  ${chalk.bgYellowBright.black(" WEATHER ")}
  Current weather in ${chalk.cyan(name)}: ${chalk.green(weather[0].main)} ${getIcon(weather[0].icon)}
  Description: ${chalk.green(weather[0].description)}
  Temperature: 
    Current: ${chalk.cyan(main.temp)} °C
    FeelsLike: ${chalk.cyan(main.feels_like)} °C
    Min: ${chalk.cyan(main.temp_min)} °C
    Max: ${chalk.cyan(main.temp_max)} °C
    Pressure: ${chalk.cyan(main.pressure)}
    Humidity: ${chalk.cyan(main.humidity)} %
    Wind: ${chalk.cyan(wind.speed)} m/s
  `)))
}

export {printError, printSuccess, printHelp, printForecast}

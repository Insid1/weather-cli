import chalk from "chalk";
import dedent from "dedent"

const printError = (errorMessage) => {
  console.log(chalk.red(`Error: ${errorMessage}`))
}

const printSuccess = (message) => {
  console.log(chalk.green(`Error: ${message}`))
}

const printHelp = () => {
  console.log(chalk.cyan("====HELP===="))
  console.log(chalk.yellow(dedent(`
    Без параметров - вывод погоды
    -s <CITY>    - установка города
    -h           - для вывода помощи
    -t <API_KEY> - для назначения api-ключа
  `)))
}

export {printError, printSuccess, printHelp,}

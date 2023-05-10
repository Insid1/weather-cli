const getArgs = (args) => {
  const res = {}

  for (let i = 2; i < args.length;) {
    const value = args[i]

    if (value.charAt(0) === "-") {

      if (args[i + 1]?.charAt(0) === "-" || i === args.length - 1) {
        res[value.substring(1)] = true
        i += 1
      } else {
        res[value.substring(1)] = args[i + 1]
        i += 2
      }
    } else {
      i += 1
    }
  }

  return res
}

export default getArgs;

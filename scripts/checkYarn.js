const useYarn = () => {
    return (
        (process.env.npm_execpath &&
            process.env.npm_execpath.includes('yarn')) ||
        (process.env.npm_config_user_agent &&
            process.env.npm_config_user_agent.includes('yarn'))
    )
}

if (!useYarn) {
    console.warn(
        '\u001b[33mThis repository requires Yarn 1.x for scripts to work properly.\u001b[39m\n'
    )
    process.exit(1)
}

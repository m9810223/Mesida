global.console = {
  debug: () => {},
  log: window.console.log,
  error: window.console.error,
  warn: (...args) => window.console.log('warn:', ...args),
};

/* eslint-disable no-console */
import { inspect } from 'util'
import chalk from 'chalk'

/**
 * Print an Err to console in a readable way
 *
 * @param {Error} err
 */
export function printErr(err) {

  // ========== (0) not an Error ==========
  if (!(err instanceof Error)) {
    console.error(chalk.red('[printErr] non-Error value:'))
    console.error(inspect(err, { colors: true, depth: 5 }))
    return
  }
 
  try {

  // ========== (1) message ==========
    const name = err.name || 'Err'
    const msg = err.message || ''

    console.error(chalk.red(`${name}: `)+ chalk.cyan(msg))

    // ========== (2) print full stack ==========
    const stack = getFullErrorStack(err)
    const lines = stack.split('\n').filter(Boolean)

    for (let i = 0, l = lines.length; i < l; i++) {
      console.error(chalk.magenta(lines[i]))
    }
    

    // ========== (3) dump remaining props ==========
    // clone all props
    const rest = {}
    Object.assign(rest, err)

    // delete what we already printed
    delete rest.message
    delete rest.stack

    if (Object.keys(rest).length) {
      console.error(chalk.gray('--- details ---'))
      console.log(inspect(rest, {colors: true, depth: 5}))
    }
  }
  catch (er) {
    console.log(chalk.red('\n  ==>catch error while print error log...print something first'))
    console.error(er)
    console.log(chalk.gray('----------------------'))

    printErr(er)

    throw er
  }
}

/**
 * Modified from:
 * https://github.com/trentm/node-bunyan/blob/master/lib/bunyan.js#L1120
 */
/**
 * @param {Error} ex
 * @return {string}
 */
export function getFullErrorStack(ex) {
  var ret = ex.stack || ex.toString()
  if (ex.cause && typeof (ex.cause) === 'function') {
    var cex = ex.cause()
    if (cex) {
      ret += '\nCaused by: ' + getFullErrorStack(cex)
    }
  }
  return (ret)
}
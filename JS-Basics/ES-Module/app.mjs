// As es module are experimental, this app.mjs should be loaded using the terminal command :
// node --experimental-modules ESModule/app.mjs

import log from './mod'
import {log2} from './mod2'
import * as logger from './mod3'

log()
log2()
logger.log()
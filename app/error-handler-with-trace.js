import './error-handler' // global error handler - will catch and show pretty UI errors
import {mapStackTrace} from 'sourcemapped-stacktrace'

window.mapStackTrace = mapStackTrace // set to let error-handler use it
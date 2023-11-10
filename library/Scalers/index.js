import {relative_scaler} from "./relative-scaler.js"
import {procent_scaler} from "./procent-scaler.js"
import {background_scaler} from "./background-scaler.js"
import {test_scaler} from "./test.js"

export const LibScalers = {
    "rs": relative_scaler,
    "%s": procent_scaler,
    "bs": background_scaler,
    "ts": test_scaler
}
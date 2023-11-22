/**
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
 *                 Animate Drawing Data Middleware
 *  --------------------------------------------------------------
 * 
 * Function that build animation data from drawing.
 * @param {String} assetName 
 * @param {String} param 
 * @param {any} data -
 * {
        path       : array  (coordinates),
        steps      : number (puts that many coordinates between two poins (x and x') ), 
        skipPoint  : number (skip every number coordinate),
        hitPoint   : number (hit every number coordinate),
        skipRangeX : number (skip every x' if difrence between | x' - x | <= number),
        skipRangeY : number (skip every y' if difrence between | y' - y | <= number)
    }
 * @param {string} animatorName
 */
export function animateDrawingDataMiddleware(
    assetName,
    paramName,
    data,
    animatorName
){
    console.log("animateDrawingDataMiddleware >>> ",
        assetName,
        paramName,
        data,
        animatorName
    );
    /**
     * Default values:
     */
    if (!data.path){
        data.path = []
    }
    if (!data.steps){
        data.steps = 1
    }
    if (data.skipPoint == undefined){
        data.skipPoint = 0
    }
    if (data.hitPoint == undefined){
        data.hitPoint = 1
    }
    if (data.skipRangeX == undefined){
        data.skipRangeX = -1
    }
    if (data.skipRangeY == undefined){
        data.skipRangeY = -1
    }
    data.path = normalizeCoordinates(
        data.path, 
        data.steps, 
        data.skipPoint,
        data.hitPoint,
        data.skipRangeX, 
        data.skipRangeY
    )
    /**
     * Deside what to put in animation Data
     */
    let animeData = {
        assetName,
        paramName,
        data,
        animatorName
    }

    return animeData
}

/**
 * Function that removes repeated coordinates and pushes more 
 * depending upon the steps we need to take between two points.
 * x              x'
 * |--.--.--.--.--|
 *   
 * where:
 * --.--.--.--.-- = dx = x' - x
 * .--. incrementX = dx / steps
 * 
 * -----------------------------------------------------------
 * @param {array} path 
 * @param {number} steps 
 * @returns {array}
 */
function normalizeCoordinates(path, steps, skipPoint, hitPoint, skipRangeX, skipRangeY){
    let newPath = []
    let prevCoordinates = [null, null]
    let pointCounter = 0

    for (let [x, y] of path){
        //console.log(x, y);

        /**
         * Manage first coordinates
         */
        if (prevCoordinates[0] == null && prevCoordinates[1] == null){
            newPath.push([x, y])
            prevCoordinates = [x, y]
            //console.log("first");
            continue
        }
        /**
         * Skip points if they are same
         */
        if (x == prevCoordinates[0] && y == prevCoordinates[1]){
            //console.log("same");
            continue
        }
        pointCounter++
        /**
         * Skip points by order
         * anyNumber % 0 = NaN
         */
        if (pointCounter % skipPoint == 0){
            //console.log("skipP");
            continue
        }
        /**
         * Skip points by order
         * anyNumber % 1 = 0
         */
        if (pointCounter % hitPoint != 0){
            //console.log("hitP");
            continue
        }
        let dx = x - prevCoordinates[0]
        let dy = y - prevCoordinates[1]
        /**
         * Skip points by range along x
         */
        if (Math.abs(dx) <= skipRangeX){
            //console.log("absX");
            continue
        }
        /**
         * Skip points by range along y
         */
        if (Math.abs(dy) <= skipRangeY){
            //console.log("absY");
            continue
        }
        let incrementX = dx / steps
        let incrementY = dy / steps
        for (let mult of Array.from({ length: steps }, (_, i) => i+1)){
            newPath.push(
                [
                    prevCoordinates[0] + (incrementX*mult), 
                    prevCoordinates[1] + (incrementY*mult)
                ]
            )
        }
        //console.log(newPath);
        prevCoordinates = [x, y]
    }
    return newPath
}
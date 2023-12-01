/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
 *                 Animate Drawing Data Middleware
 *  --------------------------------------------------------------
 * 
 * Function that build animation data from drawing.
 * @param {String} assetName 
 * @param {String} param 
 * @param {Array}  dataBulk - 
 *  [
*       {
            path       : array  (coordinates),
            steps      : number (puts that many coordinates between two poins (x and x') ), 
            skipPoint  : number (skip every number coordinate),
            hitPoint   : number (hit every number coordinate),
            skipRangeX : number (skip every x' if difrence between | x' - x | <= number),
            skipRangeY : number (skip every y' if difrence between | y' - y | <= number),
            viewBox    : screen demension [0, 0 , width, height],
            loop       : boolean | number (loop the path forever on some number of times),
            onStart    : function,
            onUpdate   : function,
            onComplate : function
        },
        ...
    ]
 * @param {string} animatorName
 */
export function animateDrawingDataMiddleware(
    assetName,
    paramName,
    dataBulk,
    animatorName
){
    // NEW:
    for (let i=0; i < dataBulk.length; i++){
        parseData(dataBulk[i])
    }
    // Construct the animeData object for animator
    let animeData = {
        assetName,
        paramName,
        dataBulk,
        animatorName
    }
    return animeData
}

/**
 * 
 * @param {object} data -
 *  {
        path       : array  (coordinates),
        steps      : number (puts that many coordinates between two poins (x and x') ), 
        skipPoint  : number (skip every number coordinate),
        hitPoint   : number (hit every number coordinate),
        skipRangeX : number (skip every x' if difrence between | x' - x | <= number),
        skipRangeY : number (skip every y' if difrence between | y' - y | <= number),
        viewBox    : screen demension [0, 0 , width, height],
        loop       : boolean | number,
        onStart    : function,
        onUpdate   : function,
        onComplate : function
    }
 */
function parseData(data){
    /**
     * Default values:
     */
    if (!data.path){
        data.path = []
    }
    if (!data.viewBox){
        data.viewBox = {width:window.innerWidth, height: window.innerHeight}
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
    if (data.loop == undefined){
        data.loop = false
    }
    if (data.unitTag == undefined){
        data.unitTag = "%"
    }
    
    /**
     * Manage coordinates
     */
    data.path = normalizeCoordinates(
        data.path, 
        data.steps, 
        data.skipPoint,
        data.hitPoint,
        data.skipRangeX, 
        data.skipRangeY
    )
    /**
     *  Save original path
     */
    data.originalPath = JSON.parse(JSON.stringify(data.path))
}

/**
 * @param {array} path 
 * @param {number} steps 
 * @param {number} skipPoint 
 * @param {number} hitPoint 
 * @param {number} skipRangeX 
 * @param {number} skipRangeY 
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

        /** 
         * Depending upon the steps we need to put more coordinates between two points.
         * x              x'
         * |--.--.--.--.--|
         *   
         * where:
         * --.--.--.--.-- = dx = x' - x
         * .--. incrementX = dx / steps
         */
        for (let mult of Array.from({ length: steps }, (_, i) => i+1)){
            newPath.push(
                [
                    prevCoordinates[0] + (incrementX*mult), 
                    prevCoordinates[1] + (incrementY*mult)
                ]
            )
        }
        prevCoordinates = [x, y]
    }
    
    return newPath
}
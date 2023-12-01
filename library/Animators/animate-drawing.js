/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
*                           Drawing Animator
*  --------------------------------------------------------------
* Function that takes coordinates of each point of a drawing
* and makes animation out of it.
*/
export function drawingAnimator(asset, vIn, animationData){
    // console.log("drawingAnimator >>>", asset, );
    // console.log("drawingAnimator >>>", vIn);
    // console.log("drawingAnimator >>>", animationData);

    let pathData = animationData.dataBulk[0]
   
    // Return value if data is undefined
    if (!pathData){
        return vIn
    }

    // Call start hook if present
    if (pathData.onStart){
        pathData.onStart.call(this, asset)
        delete pathData.onStart
    }
    
    let nextCoordinates = calcNextCoordinates(vIn, pathData)
    
    // Make transition to next pathData
    if (animationData.dataBulk.length && JSON.stringify(nextCoordinates) == JSON.stringify(vIn)){
        // Call complate hook if present for the current
        if (pathData.onComplate){
            pathData.onComplate.call(this, asset)
        }
        // Remove current path data from bulk
        animationData.dataBulk.shift()
        // Get first coordinate from next dataPath
        return nextCoordinates = drawingAnimator(asset, vIn, animationData)
    }

    // Call update hook if present
    if (pathData.onUpdate){
        pathData.onUpdate.call(this, asset)
    }

    return nextCoordinates
} 

function calcNextCoordinates(vIn, data){

    if (data.path && data.path.length){

        // Get coordinates from data
        let [nx, ny] = data.path.shift()

        // Reset path data if Loop is true
        if (data.loop && data.path.length == 0){
            data.path = JSON.parse(JSON.stringify(data.originalPath))
            if (data.loop.constructor.name == 'Number'){
                data.loop -= 1
            }
        }

        // Convert coordindates relative to units
        const unitTag = data.unitTag
        if (unitTag == "%"){
            nx = nx / data.viewBox.width
            ny = ny / data.viewBox.height
            return {
                x:{[unitTag]:nx},
                y:{[unitTag]:ny}
            }
        }
    }

    return vIn
}
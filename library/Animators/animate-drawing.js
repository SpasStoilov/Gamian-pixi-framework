/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
*                           Drawing Animato
*  --------------------------------------------------------------
* Function that takes coordinates of each point of a drawing
* and makes animation out of it.
*/
export function drawingAnimator(asset, vIn, animationData){
    // console.log("drawingAnimator >>>", asset, );
    // console.log("drawingAnimator >>>", vIn);
    // console.log("drawingAnimator >>>", animationData.data.path);

    if (animationData.data.path && animationData.data.path.length){
        // Get coordinates from data
        let [nx, ny] = animationData.data.path.shift()
        // Reset path data if Loop is true
        if (animationData.data.loop && animationData.data.path.length == 0){
            animationData.data.path = JSON.parse(JSON.stringify(animationData.data.originalPath))
        }
        // Convert coordindates relative to units
        const unitTag = animationData.data.unitTag
        if (unitTag == "%"){
            nx = nx / window.innerWidth
            ny = ny / window.innerHeight
            return {
                x:{[unitTag]:nx},
                y:{[unitTag]:ny}
            }
        }
    }
    return vIn
} 
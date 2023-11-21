/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
*                           Drawing Animato
*  --------------------------------------------------------------
* Function that takes coordinates of each point of a drawing
* and makes animation out of it.
*/
export function drawingAnimator(asset, vIn, animationData){
    console.log("drawingAnimator >>>", asset, vIn, animationData);

    if (animationData.data.path && animationData.data.path.length){
        let [nx, ny] = animationData.data.path.shift()
        // Convert coordindates to procent
        nx = nx / window.innerWidth
        ny = ny / window.innerHeight
        return {
            x:{"%":nx},
            y:{"%":ny}
        }
    }
    return vIn
} 
import {
    initialWindowWidth,
    initialWindowHeight,
    worldRation, 
    howMuchWindowWidthChange, 
    howMuchWindowHeightChange,
    totalGridPointsX,
    totalGridPointsY
} from "../../root.js"

let initChangeState = "|W,H>"

/**
 * Scale
 * @param {number} value 
 * @returns 
 */
export function getScale(value){
    const ratioConstant = 0.001
    //TODO : keep track what change innerWidth of innerH or thogether
    return window.innerWidth*ratioConstant*value
}
export function getPosition3(axis, value, tag, asset=null){
   
    if (axis == "x"){
        if (tag == "++"){
            return asset.x + window.innerWidth*value
        }
        return window.innerWidth*value
    }
    if (axis == "y"){
        if (tag == "++"){
            return asset.y + window.innerHeight*value
        }
        return window.innerHeight*value
    }
}

// export function getPosition2(axis,value, tag, name="sdsdsd"){
//     let abstractW = 1
//     let abstractH = 1
//     if (name == "player_1"){
//         console.log("initChangeState >>", initChangeState);
//     }
//     /**
//      * If .innerWidth has changed more we must correct the y axis
//      * in order to be proportional to x
//      */
//     if (initChangeState == "|W,H>" && howMuchWindowWidthChange > howMuchWindowHeightChange){
//         initChangeState = "|W>"
//     }
//     /**
//      * If .innerHeight has changed more we must correct the x axis
//      * in order to be proportional to y
//      */
//     if (initChangeState == "|W,H>" && howMuchWindowHeightChange > howMuchWindowWidthChange){
//         initChangeState = "|H>"
//     }
//     /**
//      * Execute states
//      */
//     if (initChangeState == "|W>"){
//         abstractW = totalGridPointsX
//         // Make y proportional
//         abstractH = window.innerHeight * totalGridPointsX / window.innerWidth
//     }
//     else if (initChangeState == "|H>"){
//         abstractH = totalGridPointsY
//         // Make x proportional
//         abstractW = window.innerWidth * totalGridPointsY / window.innerHeight
//     }
//     else if (initChangeState == "|W,H>"){
//         // We define init grid to be with sized:   
//         abstractW = totalGridPointsX
//         abstractH = totalGridPointsY
//     }
//     if (name == "player_1"){
//         console.log("abstractW >>", abstractW);
//         console.log("abstractH >>", abstractH);
//     }
//     /**
//      * Get values
//      * Note: values depend on initChangeState
//      */
//     if (axis == "x"){
//         const dx = window.innerWidth/abstractW
//         /**
//          * if value is %
//          */
//         if (tag == "%"){
//             return dx * abstractW * value
//         }
//         if (name == "player_1"){
//             console.log("dx = window.innerWidth/abstractW >>", dx);
//             console.log("value >>", value);
//             console.log("dx*value >>", dx*value);
//         }
//         return dx*value
//     }
//     if (axis == "y"){
//         const dy = window.innerHeight / abstractH
//         /**
//          * if value is %
//          */
//         if (tag == "%"){
//             return dy * abstractH * value
//         }
//         return dy*value
//     }
// }

// /**
//  * @param {string} key - axis
//  * @param {number} value - % of the screen size
//  * @returns 
//  */
// export function getPosition(axis,value){
//     let abstractW = 1
//     let abstractH = 1
//     /**
//      * If .innerWidth has changed more we must correct the y axis
//      * in order to be proportional to x
//      */
//     if (initChangeState == "|W,H>" && howMuchWindowWidthChange > howMuchWindowHeightChange){
//         initChangeState = "|H>"
//     }
//     /**
//      * If .innerHeight has changed more we must correct the x axis
//      * in order to be proportional to y
//      */
//     if (initChangeState == "|W,H>" && howMuchWindowHeightChange > howMuchWindowWidthChange){
//         initChangeState = "|W>"
//     }
//     /**
//      * Execute states
//      */
//     if (initChangeState == "|H>"){
//         abstractW = window.innerWidth
//         // Make y proportional
//         abstractH = window.innerWidth/worldRation
//     }
//     else if (initChangeState == "|W>"){
//         abstractH = window.innerHeight
//         // Make x proportional
//         abstractW = window.innerHeight*worldRation
//     }
//     else if (initChangeState == "|W,H>"){
//         // No need if there are the same    
//         abstractW = window.innerWidth
//         abstractH = window.innerHeight
//     }
//     /**
//      * Get values
//      * Note: values depend on initChangeState
//      */
//     if (axis == "x"){
//         return abstractW*value
//     }
//     if (axis == "y"){
//         return abstractH*value
//     }
// }
import{
    currentWindowHeight,
    currentWindowWidth,
}from "../../root.js"

const assetsDistanceChange = {}

/**
 * Test function
 */
export function test_geometry(
    axis, value, asset
){
    console.log(
        "test_geometry >>>",
        asset.name, 
        axis
    );
   
    // let difW = currentWindowWidth - value.rel.W
    // let difH = 0//currentWindowHeight - value.rel.H

    // if (difH % 2 == 0){
    //     difH = 0
    // }
    // else{
    //     difH = 0
    // }
    // if (difW % 2 == 0){
    //     difW = difW / 2
    // }
    // else{
    //     difW = (difW - 1) / 2
    // }
    // /**
    //  * Convert pixel values in % values
    //  * value ~ {%: 1000}
    //  */
    // if (axis == "x"){
    //     return  value.tst + difW
    // }
    // else if (axis == "y"){
    //     return value.tst + difH
    // }
    /**
     * Convert pixel values in % values
     * value ~ {%: 1000}
     */
    if (axis == "x"){
        console.log(
            "W>",
            value.tst,
            window.innerWidth,
            window.innerWidth*(value.tst)
        );
        return  window.innerWidth*(value.tst)
        //+ assetsDistanceChange[asset.name].dW
    }
    else if (axis == "y"){
        console.log("H>",
            value.tst,
            window.innerHeight,
            window.innerHeight*(value.tst)
        );
        return window.innerHeight*(value.tst)
            //+ assetsDistanceChange[asset.name].dH
    }
}
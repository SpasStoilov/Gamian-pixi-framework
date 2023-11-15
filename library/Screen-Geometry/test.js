import{
    currentWindowHeight,
    currentWindowWidth,
}from "../../root.js"

/**
 * Test function
 */
export function test_geometry(
    axis, value, asset
){
    console.log("TEST-GEO >>", asset.name, axis, value);

    if (axis == "x"){
        console.log(
            window.innerWidth,
            asset.width,
            value.tst,
            (value.tst*(currentWindowWidth - asset.width))
        );
        return (value.tst*(currentWindowWidth - asset.width))
       
    }
    else if (axis == "y"){
        return (value.tst*(currentWindowHeight - asset.height))
    }
}
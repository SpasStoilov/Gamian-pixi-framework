/**
 * Scale
 * @param {number} value 
 * @returns 
 */
export function procent_of_screen(
    axis, value, tag, asset, initScale
){
    asset.scale.x = window.innerWidth * value.x
    asset.scale.y = window.innerHeight * value.y
}
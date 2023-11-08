/**
 * Scale % of screen axis
 * @param {number} value 
 * @returns 
 */
export function procent_of_screen(
    value, axis
){
    return [window.innerWidth * value.x, window.innerHeight * value.y]
}
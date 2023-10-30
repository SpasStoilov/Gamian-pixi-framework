/**
 * Checks if all parent's of the asset are visible.
 * @param {DisplayObject} asset 
 * @returns {boolean}
 */
export function ParentChainVisibility(asset){
    let parentChainVisible = true
    
    if (!asset.parent || asset.parent.name == "ROOT_CONTAINER"){
        return parentChainVisible
    };

    let Parent = asset.parent

    while (true){
        if (!Parent || Parent.name == "ROOT_CONTAINER"){
            break
        }
        if (!Parent.visible){
            parentChainVisible = false
            break
        }
        Parent = Parent.parent
    }
    return parentChainVisible
}
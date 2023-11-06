let finalState = null

export function update_asset_animation_scale(value, asset, model, animeData){
    let amountOfUpdate = model.TIME - animeData.startTime + 1
    let scaleX = value.x == undefined ? 1 : value.x
    let scaleY = value.y == undefined ? 1 : value.y
    asset.scale.x += scaleX*amountOfUpdate
    asset.scale.y += scaleY*amountOfUpdate
    finalState = {x: asset.scale.x, y: asset.scale.y}
    return saveFinalState
}

function saveFinalState(asset){
    asset.scale.x = finalState.x
    asset.scale.y = finalState.y
}
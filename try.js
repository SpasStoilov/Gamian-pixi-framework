
if(tag == "^^"){
    key = key.match(/\^\^x/) ? "x" : "y" // same
    let rawX = treeData.assets_params[asset.name].x.replaceAll("%", "")
    let rawY = treeData.assets_params[asset.name].y.replaceAll("%", "")
    let initX = eval(rawX) || 0
    let initY = eval(rawY) || 0
    assetInitPosition = {x:initX,y:initY} // same
}
value = value.replaceAll("%", "")
v = eval(value)
v = Number(v)

// grds
if(tag == "^^"){
    key = key.match(/\^\^x/) ? "x" : "y"// same
    let initX = null
    let initY = null
    eval("initX =" + treeData.assets_params[asset.name].x)
    eval("initY =" + treeData.assets_params[asset.name].y)
    assetInitPosition = {x:initX, y:initY}// same
}
eval("v =" + value)
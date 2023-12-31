const fs = require("fs")
let { MANIFEST } = require("./setManifestBundles.js")

// vars:
const componentEnds = /<$/
const componentsDir = "../components/"
const logicComponentSeparator = ">>>"
const logicFunctionsSeparator = "#"
let ComponentsJsLogic = {}
let componentJsLogic = []
//-----------------------------------------------------------------------^
function returnFileDataSplitByLines(link = componentsDir + "root.gm") {
    /**
     * Get Data
     */
    let DATA_FILE = fs.readFileSync(link).toString()
    let [jsLogic, componentsLogic, rest] = DATA_FILE.split(logicComponentSeparator)
    /**
     * Handle components functions logic
     */
    console.log("returnFileDataSplitByLines >>> raw-jsLogic :", jsLogic);
    if (jsLogic){
        componentJsLogic = jsLogic.split(logicFunctionsSeparator)
        componentJsLogic = componentJsLogic.filter(line => line)
        if (componentJsLogic.length){
            componentJsLogic = componentJsLogic.map(line => line.replaceAll("\r", ""))
            normalizeJsLogic()
        }
    }
    /**
     * Handle components structure
     */
    console.log("returnFileDataSplitByLines >>> raw-componentsLogic:", componentsLogic);
    let splitByLineComponents = componentsLogic.split("\n")
    splitByLineComponents = splitByLineComponents.map(line => line.replaceAll("\r", ""))
    splitByLineComponents = splitByLineComponents.filter(line => line)
    return splitByLineComponents
}
function normalizeJsLogic(){
    console.log("componentJsLogic:", componentJsLogic);
    /**
     * Get chunks
     */
    for(let iC = 0 ; iC < componentJsLogic.length; iC++ ){

        let chunkLogic = componentJsLogic[iC].split("\n")
        let endIndx = null
        let emitterName = null
        let functionName = null
        let emitType = null
        let functionDeclaration = null
        let normalizedLogic = []
        console.log("chunkLogic:", chunkLogic);

        for (let iL = 0 ; iL < chunkLogic.length; iL++){
            /**
             * Skip children lines
             **/
            if (endIndx && iL < endIndx) continue;
            if (endIndx && iL == endIndx) {
                endIndx = null
                continue
            };
            let line = chunkLogic[iL]
            console.log("line:", line);
            const lineHasEmitterName = iL == 0
            const lineHasComponentTag = line.match(/^\s*@omponent/)
            const lenOfWhiteSpace = getLenOfWhiteSpaceAtFrontOfLine(line)

            if(lineHasEmitterName){
                /**
                 * Patterns
                 */
                emitterName = line.match(/^\w+(?=\.\w+\s+)/)[0]
                emitType = line.match(/(?<=\.)\w+/)[0]
                functionName = line.match(/[\w\d_]+(?=\()/)[0]
                functionDeclaration = line.match(/\(.*\)\{.*/)[0]

                normalizedLogic.push(
                    `function${functionDeclaration}`
                )

                if (!ComponentsJsLogic[emitterName]){
                    ComponentsJsLogic[emitterName] = {}
                }
                ComponentsJsLogic[emitterName][functionName] = null
                continue
            }
            else if(lineHasComponentTag){
                let [chldComponent, skipLineToIndex]  = extractChild(
                    iL,
                    chunkLogic,
                    lenOfWhiteSpace
                ) 
                endIndx = skipLineToIndex
                chldComponent = chldComponent.map(line => line.slice(lenOfWhiteSpace))
                console.log("chldComponent:", chldComponent);
                const asset  = lexer(chldComponent)
                normalizedLogic.push(JSON.stringify(asset))
                continue
            }
            normalizedLogic.push(line)
        }

        console.log("normalizedLogic:", normalizedLogic);
        ComponentsJsLogic[emitterName][functionName] = {
            name: functionName,
            emitType,
            logic:normalizedLogic.join("\n")
        }
    }

}
function checkIsPropOneLine(line, lineEnd) {
    console.log(
        "checkIsPropOneLine >>> line:", line, "\n",
        "checkIsPropOneLine >>> pattern for how line ends:", lineEnd, "\n"
    );
    line = line.trimEnd()
    if (line.endsWith(lineEnd)) {
        return true
    }
    else {
        return false
    }
}
function extractEntireProp(
    i,
    splitByLineComponents,
    line,
    lineEnd
) {
    console.log(
        "extractEntireProp >>> start from index:", i, "\n",
    );

    const isPropOneLine = checkIsPropOneLine(line, lineEnd)
    console.log("extractEntireProp >>> isPropOneLine:", isPropOneLine)

    if (isPropOneLine) {
        return [line, null]
    }

    let endIndx;
    splitByLineComponents.find((line, indx) => {
        console.log(`${indx}-| `, line);
        if (line.endsWith(lineEnd) && i < indx) {
            endIndx = indx
            return line
        }
    })

    console.log("extractEntireProp >>> prop value ends at index:", endIndx);

    let extrProp = splitByLineComponents.slice(i, endIndx + 1)
    return [extrProp, endIndx]
}
function extraxtPropValue(
    i,
    splitByLineComponents,
    line,
    lineEnd,
    pettern
) {
    let [prop, skipLineToIndex] = extractEntireProp(
        i, splitByLineComponents, line, lineEnd
    )
    if (prop.constructor.name == "Array") {
        prop = prop.join("")
    }
    console.log("extraxtPropValue >>> prop :", prop);
    console.log("extraxtPropValue >>> skipLineToIndex:", skipLineToIndex);
    prop = prop.trimEnd()
    prop = prop.trimStart()
    console.log("extraxtPropValue >>> trimed(end, start) prop:", prop);
    console.log("extraxtPropValue >>> search pettern for prop value:", pettern);
    let value = prop.match(pettern) ? prop.match(pettern)[0] : null;
    value = value.trimEnd()
    value = value.trimStart()
    value = value.replaceAll(" ", "\n")
    console.log("extraxtPropValue >>> value found:", value);

    return [value, skipLineToIndex]
}
function getLenOfWhiteSpaceAtFrontOfLine(line) {
    let count = 0
    for (let c of line) {
        if (c == " ") {
            count += 1
            continue
        }
        break
    }
    return count
}
function extractChild(
    i,
    splitByLineComponents,
    lenOfWhiteSpace,
    endPattern=componentEnds
) {
    let child = []
    let skipLineToIndex = null

    for (let indx = 0; indx < splitByLineComponents.length; indx++) {
        let line = splitByLineComponents[indx]
        if (i <= indx) {
            child.push(line)
            skipLineToIndex = indx
            let lenOf = getLenOfWhiteSpaceAtFrontOfLine(line)
            if (lenOfWhiteSpace == lenOf && line.match(endPattern)) break
        }
    }
    return [child, skipLineToIndex]
}
function lexer(
    splitByLineComponents = returnFileDataSplitByLines(),
    whiteSpaceLenTree = 0
) {
    console.log("lexer >>> splitByLineComponents:", splitByLineComponents);

    let asset = {
        children:[], 
        params:{},
    }
    let endIndx = null

    for (let i = 0; i < splitByLineComponents.length; i++) {

        /**
         * Skip children lines
         **/
        if (endIndx && i < endIndx) continue;
        if (endIndx && i == endIndx) {
            endIndx = null
            continue
        };
        //--------------------------------------------------------^

        /**
         * Get Line
         **/
        let line = splitByLineComponents[i]
        //--------------------------------------------------------^

        /**
         * Check what type is the property
         **/
        const typeAsignPresent = line.match(/^\s*@omponent/)
        const equalAsignPresent = line.match(/~/)
        const functionAsignPresent =
            !typeAsignPresent && !equalAsignPresent && line.match(/\(/)
        //--------------------------------------------------------^

        /**
         * Handle typeAsignPresent
         **/
        if (typeAsignPresent) {
            let lenOfWhiteSpace = getLenOfWhiteSpaceAtFrontOfLine(line)

            // 1. Check for child:
            if (lenOfWhiteSpace > whiteSpaceLenTree) {
                let [chldComponent, skipLineToIndex] = extractChild(
                    i,
                    splitByLineComponents,
                    lenOfWhiteSpace
                )
                console.log("lexer >>> typeAsignPresent -> CHIL Found:", chldComponent);
                // Normalize the child in order whiteSpaceLenTree == 0
                chldComponent = chldComponent.map(line => line.slice(lenOfWhiteSpace))
                //---------------------------------------------------------------------^

                endIndx = skipLineToIndex
                const child = lexer(chldComponent)
                asset.children.push(child)
            }
            // 2. Asing Type
            else {
                let [value, skipLineToIndex] = extraxtPropValue(
                    i,
                    splitByLineComponents,
                    line,
                    ";",
                    /(?<=^@omponent).+(?=;$)/
                )
                endIndx = skipLineToIndex
                /**
                 * Handle if component is type == file
                 * We need to parse the file and break the loop
                 */
                if (value.match(/\.gm/)){
                    console.log(
                        "lexer >>> typeAsignPresent -> Handle file:", componentsDir + value
                    );
                    let data  = returnFileDataSplitByLines(componentsDir + value)
                    asset = lexer(data)
                    break
                }
                asset.type = value
            }
        }
        /**
        * Handle equalAsignPresent
        **/
        if (equalAsignPresent) {
            let propName = line.replaceAll(" ", "").match(/.+(?=~)/)[0]
            let [value, skipLineToIndex] = extraxtPropValue(
                i,
                splitByLineComponents,
                line,
                ";",
                /(?<=~).+(?=;$)/
            )
            endIndx = skipLineToIndex

            console.log(
                "lexer >>> equalAsignPresent -> propName=value:", propName, value
            );

            if (
                ["emitter", "args", "name", "mask", "ignore", "update", "visible", "animations"].includes(propName)
            ){
                asset[propName] = value
            }
            else{
                asset.params[propName] = value
            }
        }
        /**
        * Handle functionAsignPresent
        **/
        if (functionAsignPresent) {
            let propName = line.replaceAll(" ", "").match(/^.+(?=\()/)[0]
            console.log("lexer >>> functionAsignPresent -> propName:", propName);
            let [value, skipLineToIndex] = extraxtPropValue(
                i,
                splitByLineComponents,
                line,
                ";",
                /\(.+\)/
            )
            endIndx = skipLineToIndex
            asset.params[propName] = value
        }
    }
    
    if(asset.type == "Sprite"){
        MANIFEST.bundles[0].assets.push(
            {name: asset.name, srcs: asset.args}
        )
    }
    return asset
}

module.exports = {lexer, ComponentsJsLogic}
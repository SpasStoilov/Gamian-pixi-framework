const fs = require("fs")

// vars:
const componentEnds = "<"
const componentsDir = "../components/"
//-----------------------------------------------------------------------^

function executeJsLogic(jsLogic) {
    // Manage logic js:
    console.log("jsLogic --->", jsLogic)
    // 1. Evaluate js logic
    eval(jsLogic)
    // 2. Call the functions inside jsLogic
    anime1()
    anime2()
}

function returnFileDataSplitByLines(link = componentsDir + "root.gm") {
    let [jsLogic, componentsLogic] = fs.readFileSync(link).toString().split("return")
    let splitByLineComponents = componentsLogic.split("\n")
    splitByLineComponents = splitByLineComponents.map(line => line.replaceAll("\r", ""))
    splitByLineComponents = splitByLineComponents.filter(line => line)
    return splitByLineComponents
}
function checkIsPropOneLine(line, lineEnd) {
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
        "extractEntireProp i >>>", i, "\n",
        "extractEntireProp line >>>", line, "\n",
        "extractEntireProp lineEnd >>>", lineEnd, "\n"
    );

    const isPropOneLine = checkIsPropOneLine(line, lineEnd)
    console.log("isPropOneLine >>>", isPropOneLine)

    if (isPropOneLine) {
        return [line, null]
    }

    let endIndx;
    splitByLineComponents.find((line, indx) => {
        if (line.endsWith(lineEnd) && i < indx) {
            endIndx = indx
            return line
        }
    })

    console.log("EndIndex >>>", endIndx);

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
    console.log("extraxtPropValue / prop >>>", prop);
    console.log("extraxtPropValue / skipLineToIndex >>>", skipLineToIndex);
    prop = prop.replaceAll(" ", "")
    console.log("extraxtPropValue / replaceAll prop >>>", prop);
    console.log("extraxtPropValue / pettern >>>", pettern);
    let value = prop.match(pettern) ? prop.match(pettern)[0] : null;
    console.log("extraxtPropValue / value >>>", value);

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
    lenOfWhiteSpace
) {
    let child = []
    let skipLineToIndex = null

    for (let indx = 0; indx < splitByLineComponents.length; indx++) {
        let line = splitByLineComponents[indx]
        if (i <= indx) {
            child.push(line)
            skipLineToIndex = indx
            let lenOf = getLenOfWhiteSpaceAtFrontOfLine(line)

            console.log(
                "extractChild >>>",
                lenOfWhiteSpace == lenOf, "\n",
                lenOfWhiteSpace, "\n",
                lenOf, "\n",
            );

            if (lenOfWhiteSpace == lenOf && line.endsWith(componentEnds)) break
        }
    }
    return [child, skipLineToIndex]
}

/**
 * 
 */
function lexer(
    splitByLineComponents = returnFileDataSplitByLines(),
    whiteSpaceLenTree = 0
) {
    console.log("splitByLineComponents >>>", splitByLineComponents);

    let asset = {
        children: [], 
        params:{}
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
                // Normalize the child in order whiteSpaceLenTree == 0
                chldComponent = chldComponent.map(line => line.slice(lenOfWhiteSpace))
                console.log("CHILD >>> ", chldComponent);
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
                    console.log(componentsDir + value);
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
            console.log("propName/value >>>", propName, value);
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
            console.log("propName >>>", propName);
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
    
    return asset

}

module.exports = lexer
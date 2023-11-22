const namePattern = /^\w+(?=-)/;

export function select(qrySelector){
    return document.querySelector(qrySelector);
};

export function refresh(parent, content){

    // The function removes all children and append new ones.

    //check for qry:
    if (typeof parent == "string"){
        parent = document.querySelector(`${parent}`)
    }
    //-------------------------------------------------------

    parent.replaceChildren('')
    insertTo(parent, content)
}

export function removeFrom(parentQry, kidQry){
    document.querySelector(parentQry).removeChild(document.querySelector(kidQry))
}

export function make(nodename){
    return document.createElement(nodename)
}

export function removeEvents(qry, ...evnts){

    const Eventlist = evnts.map((ev) => {
        let obj = {}
        obj.evnt = ev[0];
        obj.evntFunc = ev[1];
        obj.act = 'remove';
        return obj
    })

    let data = [
        {
            query: qry,
            Events: Eventlist
        }
    ]
    change(data)
}

export function change(data){

    // The function updates elements.

    for (let obj of data) {

        try {
            if (!obj.query){
                throw new Error(`ERROR: ${JSON.stringify(obj)} don't have "query" proparty in it!`)
            }
    
            let objToChange = select(obj.query)
            delete obj.query
            obj.passedObj = objToChange
            
            if (obj.textContent) {
                refresh(objToChange, [{textContent: obj.textContent}])
                delete obj.textContent
            }
    
            insertTo(false, [obj])

        } catch (err) {
            console.log(err.message)
        }
        
    }
}

export function DEEP_COPY_ARRAY(ARR){
    let copyArr = []

    for (let value of ARR ){
        
        if (value.constructor.name == 'Array'){
            copyArr.push(DEEP_COPY_ARRAY(value))
        }
        else if (value.constructor.name == 'Object'){
            copyArr.push(DEEP_COPY_OBJECT(value))
        }
        else {
            copyArr.push(value)
        }
    }

    return copyArr
}

export function DEEP_COPY_OBJECT(OBJ){
    let copyObj = {}

    for (let [key, value] of Object.entries(OBJ) ){
        
        if (value.constructor.name == 'Array'){
            copyObj[key] = DEEP_COPY_ARRAY(value)
        }
        else if (value.constructor.name == 'Object'){
            copyObj[key] = DEEP_COPY_OBJECT(value)
        }
        else {
            copyObj[key] = value
        }
    }

    return copyObj
}

function loop(htmlEL, atributes, ignoreAtr){
    if (htmlEL.nodeName === '#document-fragment' && typeof atributes == "string"){
        htmlEL.textContent = atributes
        return
    }

    for (let [atrName, value] of Object.entries(atributes)){
        if (ignoreAtr.includes(atrName)){
            continue
        }
        else if (atrName === 'Events'){
            for (let eventObj of value){
                eventObj.act === "add" || !eventObj.act ? htmlEL.addEventListener(eventObj.evnt, eventObj.evntFunc) : htmlEL.removeEventListener(eventObj.evnt, eventObj.evntFunc)
            }
            continue
        }
        else if (value.constructor.name == "Array"){
            insertTo(htmlEL, value)
        }       
        else if (value.constructor.name == "Object" && value.nodeName !== '#document-fragment'){

            for (let [secondAtrName, secondValue] of Object.entries(value)){
                htmlEL[`${atrName}`][`${secondAtrName}`] = secondValue;
            };

        }
        else if (value.nodeName === '#document-fragment'){
            htmlEL.appendChild(value)
        }
        else {
            htmlEL[atrName] = value
        };

    };
    
};

export function insertTo(parent, ARR, flag='end', ignoreAtr=[]){
    try {
        
        if (typeof parent != "string" && !(parent instanceof HTMLElement)){
            throw new Error("Only: QuerySelector, typeName or HTMLElement is Allowed!")
        }
        if (typeof parent == "string"){
            parent = document.querySelector(`${parent}`);
        };

        for (let value of ARR) {

            let htmlEL;
            //console.log(value, value.typeName);
            if (typeof value === 'string' || typeof value === 'number'){
                htmlEL = document.createDocumentFragment()
                htmlEL.textContent += value
            }
            else if (value.constructor.name !== "Object"){
                throw new Error("Value is not Allowed!")
            }
            else if (Object.keys(value).length == 0){
                throw new Error("Value is empty!")
            }
            else if (value.passedObj){
                htmlEL = value.passedObj
                delete value.passedObj
            }
            else if (!value.typeName){
                htmlEL = document.createDocumentFragment()
            }
            else if (value.typeName){
                htmlEL = document.createElement(value.typeName);
                delete value.typeName
            }
            //console.log(htmlEL);
            loop(htmlEL, value, ignoreAtr);
            
            if (parent) {
                if (flag == "end"){
                    parent.appendChild(htmlEL);
                }
                else if(flag == "start"){
                    parent.prepend(htmlEL);
                };
            }
            
        };
        
        return parent
    }
    catch(err){
        console.log(err.message)
    }
    
}
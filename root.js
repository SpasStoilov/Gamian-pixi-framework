import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs';
import { TreeBuilder } from '/main/TreeBuilder.js';
import { EventEmitter } from './node_modules/events/events.mjs';
import { emitterFactory } from "./main/GlobalEmitterRegister.js"

//------------------ GLOBAL PARAMS ---------------------//
/**
 *  Create an instance of EventEmitter
 */
export const emitter = new EventEmitter();
 /**
 *  Create an instance of TreeBuilder
 */
export const tree = new TreeBuilder()
//-------------------------------------------------------^

 /**
 *  Start Application
 */
async function START_APP(){
    /**
     *  Create Application
     */
    const app = new PIXI.Application(
        {
            width: 800,
            height: 800,
            backgroundColor: 0xAAAAAA
        }
    )
    console.log("gamian >>> app:", app);
    /**
     *  Dock Application to index.html
     */
    document.body.appendChild(app.view)
    /**
     *  Get Tree information from back-end
     */
    const root_gm = await tree.getTreeInformation()
    console.log("gamian >>> back-end-response: ", root_gm);
    /**
     *  Render Tree Root
     */
    const structure = tree.prepareComponent(root_gm, app.stage)
    console.log("gamian >>> Assets Register:", tree.assets_register);
    console.log("gamian >>> Tree Structure:", structure);
    /**
     *  Get all components emitters
     */
    await emitterFactory()
    /**
     *  On Update
     */
    app.ticker.add((delta)=>{
        tree.hookTreeParams()
    })
    /**
     * Render root componet
     */
    emitter.emit("RootEmitter")
}

START_APP()
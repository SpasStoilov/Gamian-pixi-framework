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
 /**
 *  Window states & values
 */
export let initialWindowWidth = window.innerWidth;
export let initialWindowHeight = window.innerHeight;
export let currentWindowWidth = window.innerWidth;
export let currentWindowHeight = window.innerHeight;
export let howMuchWindowWidthChange = 0;
export let howMuchWindowHeightChange = 0;
export let totalWindowWidthChange = 0;
export let totalWindowHeightChange = 0;
/**
 * WorldRation:
 * W/H = worldRation ; W = H*worldRation ; W / worldRation = H
 */
export const worldRation = window.innerWidth / window.innerHeight
export const wordlRatioScaleConstant = 0.001
//----------------------------------------------------------------------------^

 /**
 *  Start Application
 */
async function START_APP(){
    /**
     *  Create Application
     */
    const app = new PIXI.Application(
        {
            backgroundColor: 0xAAAAAA
        }
    )
    console.log("gamian >>> app:", app);
    /**
     *  Dock Application to index.html
     */
    document.body.appendChild(app.view)
    /**
     * Keep track of screen size
     */
    function resizeAppView() {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        // console.log("resize >>> Window current demension:", currentWindowWidth, currentWindowHeight);
        // console.log("resize >>> Window new demension:", newWidth, newHeight);
        /**
         * Rerender App
         */
        app.renderer.resize(newWidth, newHeight);
        /**
         * Set change values. We need amount not direction (.abs)
         */
        howMuchWindowWidthChange = newWidth - currentWindowWidth;
        howMuchWindowHeightChange = newHeight - currentWindowHeight;
        totalWindowHeightChange = initialWindowWidth - newWidth
        totalWindowHeightChange = initialWindowHeight - newHeight
        
        // console.log(
        //     "resize >>> howMuchWindowWidthChange/howMuchWindowHeightChange:", 
        //     howMuchWindowWidthChange, 
        //     howMuchWindowHeightChange
        // );
        /**
         * Set new demensions
         */
        currentWindowWidth = newWidth;
        currentWindowHeight = newHeight;
    }
    window.addEventListener('resize', resizeAppView);
    resizeAppView()
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
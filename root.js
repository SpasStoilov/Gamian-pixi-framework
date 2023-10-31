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
export let currentWindowWidth = window.innerWidth;
export let currentWindowHeight = window.innerHeight;
export let howMuchWindowWidthChange = window.innerWidth / currentWindowWidth;
export let howMuchWindowHeightChange = window.innerHeight / currentWindowHeight;

export let initialWindowWidth = window.innerWidth;
export let initialWindowHeight = window.innerHeight;
/**
 * Grid:
 * - Preserves geometry of the stage:
 *   innerWidth / totalGridPointsX = innerHeight * totalGridPointsY
 *    =>
 *   innerWidth * totalGridPointsY = innerHeight * totalGridPointsX
 */
export const totalGridPointsX = 1000
export const totalGridPointsY = window.innerHeight * totalGridPointsX / window.innerWidth
export const gridConverter = 100000000000

/**
 * WorldRation:
 * W/H = worldRation ; W = H*worldRation ; W / worldRation = H
 */
export const worldRation = window.innerWidth / window.innerHeight
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
        console.log("Window current demension >>>", currentWindowWidth, currentWindowHeight);
        console.log("Window new demension >>>", newWidth, newHeight);
        console.log("Current change in size >>>", currentWindowWidth/newWidth, currentWindowHeight/newHeight);
        /**
         * Rerender App
         */
        app.renderer.resize(newWidth, newHeight);
        /**
         * Set change values. We need amount not direction (.abs)
         */
        howMuchWindowWidthChange = Math.abs(currentWindowWidth - newWidth);
        howMuchWindowHeightChange = Math.abs(currentWindowHeight - newHeight);
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
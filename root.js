import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs';
import { TreeBuilder } from '/main/TreeBuilder.js';
import { EventEmitter } from './node_modules/events/events.mjs';
import { emitterFactory } from "./main/GlobalEmitterRegister.js"
import { Modelator} from './main/Modelator.js'
import {classEmitterRegister} from "./main/GlobalEmitterRegister.js"
//----------------------  IMPORTS -------------------------------------^


/** ------------------ GLOBAL PARAMS ----------------------------------
 *
 *  Bundles
 */
export let SPRITES = null
/**
 * svgFilesNames
 */
export let svgFilesNames = null
/**
 *  App instance
 */
export let APP = null
/**
 *  Create an instance of EventEmitter
 */
export let emitter = null;
/**
 *  Create an instance of TreeBuilder
 */
export let tree = null
/**
 *  Create an instance of Modelator
 */
 export let Model = null
/**
 *  Window states & values
 */
export let initialWindowWidth = window.innerWidth;
export let initialWindowHeight = window.innerHeight;
export let currentWindowWidth = window.innerWidth;
export let currentWindowHeight = window.innerHeight;
export let prevWindowWidth = window.innerWidth;
export let prevWindowHeight = window.innerHeight;
export let howMuchWindowWidthChange = 0;
export let howMuchWindowHeightChange = 0;
export let totalWindowWidthChange = 0;
export let totalWindowHeightChange = 0;
export const worldRation = window.innerWidth / window.innerHeight
export const worldArea = window.innerWidth * window.innerHeight
/**
 * USER mode information
 */
export let DataFromUserMode = {
    animations:{
        paths:{}
    }
}
//-----------------------------------------------------------------^

/**
 * Aplication resizer
 */
export function resizeAppView(userModeData={}) {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    /**
     * Rerender App
     */
    APP.renderer.resize(newWidth, newHeight);
    /**
     * Set states
     */
    howMuchWindowWidthChange = newWidth - currentWindowWidth;
    howMuchWindowHeightChange = newHeight - currentWindowHeight;
    totalWindowWidthChange = initialWindowWidth - newWidth
    totalWindowHeightChange = initialWindowHeight - newHeight
    prevWindowWidth = currentWindowWidth;
    prevWindowHeight = currentWindowHeight;
    currentWindowWidth = newWidth;
    currentWindowHeight = newHeight;
    /**
     * Refresh the tree params on resize
     */
    tree.hookTreeParams()
    /**
     * Play all animations on resize
     */
    Model.animateAllOnResize()
}

/**
 *  Application starter
 */
export async function START_APP(){
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *               Set Foundations
     * -----------------------------------------------
     */
    emitter = new EventEmitter();
    tree = new TreeBuilder()
    Model = new Modelator()
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *              Create Application
     * -----------------------------------------------
     */
    const app = new PIXI.Application(
        {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xAAAAAA,
        }
    )
    console.log("app >>>", app);
    app.view.id = "game-world";
    APP = app
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *       Get Tree information from back-end
     * -----------------------------------------------
     */
    const response = await tree.getTreeInformation()
    console.log("app >>> back-end-response: ", response);
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *          Load MANIFEST with all bundles
     * -----------------------------------------------
     */
    const manifest = response.Manifest
    await PIXI.Assets.init({manifest})
    SPRITES = await PIXI.Assets.loadBundle('SPRITES')
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *             Add Tree Root to stage
     * -----------------------------------------------
     */
    const root_gm = response.Lexer
    const structure = tree.prepareComponent(root_gm, app.stage)
    console.log("app >>> Assets Register:", tree.assets_register);
    console.log("app >>> Tree Structure:", structure);
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *           Get all SVG animation paths
     * -----------------------------------------------
     */
    svgFilesNames = response.svgFilesNames
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *           Get all components emitters
     * -----------------------------------------------
     */
    emitter.removeAllListeners()
    await emitterFactory()
    /**^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *               Start world ticker
     * -----------------------------------------------
     */
    app.ticker.add((delta)=>{
        //Model.TIME += 1
        /**
         * Plays all animations
         */
        Model.animate()
    })
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *           Keep track of screen size
     * -----------------------------------------------
     */
    window.removeEventListener('resize', resizeAppView);
    window.addEventListener('resize', resizeAppView);
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *       Hook the params of root componet
     * -----------------------------------------------
     */
    emitter.emit("RootEmitter")
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *        Dock Application to index.html
     * -----------------------------------------------
     */
    document.body.appendChild(app.view)
}


await START_APP()
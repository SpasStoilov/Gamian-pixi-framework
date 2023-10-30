import * as PIXI from '../node_modules/pixi.js/dist/pixi.mjs';
import {fetchME}  from "./Utils/fetch.js"
import {classEmitterRegister} from "./GlobalEmitterRegister.js"
import {evalArgs, evalProp} from "./Utils/EvalProps.js"
import {ongoingEvent} from "./Utils/OngoingEvent.js"

export class TreeBuilder{
    /**
     * Select the proper classEmitter
     */
    props = null;
    /**
     * Holds all assets in que. Easy to get (no structure).
     */
    assets_register = {}

    /**
     * Holds all assets current state (first-render; re-render; destroy).
     */
    assets_current_life_state = {}

    /**
     * Holds all assets parameters.
     */
    assets_params = {}

    /**
     * Holds information about every assets in the game.
     */
    root_gm = {}

    /**
     * Holds information which props of asset to ignore on update.
     */
    ignore_on_update = {}

    /**
     * Holds information which props of asset to update.
     */
    on_update = {}

    /**
     * Holds information about which assets visibility.
     */
    show_components = {}
    /**
     * Maps asset to emitter.
     */
    asset_emitter_mapper = {}
    /**
     * Holds all animations about every assets.
     */
    animator = {}

    /**
     * Defines what components can be present in the three
     */
    constructorObject = {
        Sprite(args){
            return PIXI.Sprite.from(args);
        },
        Container(){
            return new PIXI.Container();
        },
        Graphics(){
            return new PIXI.Graphics();
        },
        Text(args){
            return new PIXI.Text(args);
        }
    }

    constructor(){}

    /**
     * Information needed to construct the tree
     */
    async getTreeInformation(){
        this.root_gm = await fetchME("")
        return this.root_gm
    }
    /**
     * Extract needed data for object creation 
     */
    prepareComponent(component=this.root_gm, parent=null, parentEmitter=null){
        console.log("Tree Builder >>> prepareComponent:", component);
        /**
         * Check for "must have" props
         */
        if (!component.type){
            throw new Error("Tree Builder >>> Component type is missing!")
        }
        if (!component.emitter && !parentEmitter){
            throw new Error("Tree Builder >>> Component emitter is missing!")
        }
        if (["Sprite", "Text"].includes(component.type) && !component.args){
            throw new Error(`Tree Builder >>> Component of type ${component.type} must have args property!`)
        }
        if (!component.name){
            throw new Error(`Tree Builder >>> Component must have name property!`)
        }
        //--------------------------------------------------------------------------^
        /**
         * Make asset
         * type: any
         */
        component.args = evalArgs(component.args)
        const asset = this.constructorObject[component.type](component.args)
        /**
         * Set name of the asset
         * type: string
         */
        asset.name = component.name
        /**
         * Append asset as posible container for mask asset
        */
        this.assets_register[asset.name] = asset
        /**
         * Handle emitter property that conect component with classEmitter
         * type: string
         */
        component.emitter = component.emitter || parentEmitter
        this.asset_emitter_mapper[asset.name] = component.emitter
        /**
         * Handle ignore property
         * type: string[]
         */
        if (component.ignore){
            this.ignore_on_update[asset.name] = component.ignore
        }
        /**
         * Handle update property
         * type: string[]
         */
        if (component.update){
            this.on_update[asset.name] = component.update
        }
        /**
         * Handle visible property
         * type: booloean
         */
        if (component.visible != undefined){
            this.show_components[asset.name] = component.visible
        }
        /**
         * Handle children property
         * type: component[]
         */
        if (component.children.length){
            for (let childComponent of component.children){
                /**
                 * If component is a mask it will have difrent parent.
                 * NOTE: We must add it as a mask not as child of asset!
                 */
                if (component.mask)continue;
                //-------------------------------------------------------^

                const child = this.prepareComponent(childComponent, asset, component.emitter)
                asset.addChild(child)
            }
        }
        /**
         * Handle animations property
         * type: {}
         */
        if (component.animations){
            if (component.animations.constructor.name == "Object"){
                component.animations = [component.animations]
                this.animator[asset.name] = component.animations
            }
        }
        /**
         * Handle mask property
         * type: booloean
         * 
         * Handle parentName property
         * type: string
         */
        if (component.mask){
            if (!component.parentName){
                throw new Error(
                    `Tree Builder >>> If component is a mask must have prop parentName`
                )
            }
            else {
                if (!this.assets_register[component.parentName]){
                    throw new Error(`Tree Builder >>> component.parentName dose not exist!`)
                }
                const parent = this.assets_register[component.parentName]
                const mask = this.prepareComponent(
                    component, parent, component.emitter
                )
                parent.addChild(mask)
                asset.mask = mask
            }
        }
        /**
         * Handle params property
         * type: {}
         */
        if (component.params){
            this.assets_params[asset.name] = component.params
        }

        /**
         * Current life state
         */
        this.assets_current_life_state[asset.name] = undefined

        // Asset ready!
        return asset
    }

    updateAssetLifeState(assetName, setDestroyState=false){
        const asset_life_state = this.assets_current_life_state[assetName]
        /**
         * Indicate in what state is the asset
         */
        if (asset_life_state == undefined){
            this.assets_current_life_state[assetName] = "first-render"
        }
        else if (asset_life_state == "first-render"){
            this.assets_current_life_state[assetName] = "re-render"
        }
        else if (setDestroyState){
            this.assets_current_life_state[assetName] = "destroy"
        }
        return this.assets_current_life_state[assetName]
    }

    showNeededAssets(){
        for (
            let [assetName, value] of Object.entries(this.show_components)
        ){
            const asset = this.assets_register[assetName]
            if (asset){
                /**
                 * Set the correct context for the components.
                 * In this way we are shure that at evalProp function is passed
                 * the corect classEmitter.
                 */
                this.setContext(asset.name)
                /**
                 * Eval the prop with the correct context (this.props)
                 */
                evalProp.call(this.props, asset, "visible", value)
            } 
        }

    };
    setContext(assetName){
        const emmiterName = this.asset_emitter_mapper[assetName]
        this.props = classEmitterRegister[emmiterName]
    }
    hookTreeParams(){
        /**
         * Sets to all asset.visible to true or false
         */
        this.showNeededAssets()
        /**
         * Hook the params of visible assets
         */
        for (
            let [assetName, params] of Object.entries(this.assets_params)
        ){
            const asset = this.assets_register[assetName]
            /**
            * Hook parameters of asset
            */
            this.hookParams(asset, params)
        }

    };
    hookParams(asset, params){
        if (asset && asset.visible){
            /**
            * Update life-state of the asset only when is visible
            */
            const asset_life_state = this.updateAssetLifeState(asset.name)
            const assetReRendered = asset_life_state != "first-render"
            /**
            * Eval all the parameters
            */
            this.evalParams(
                asset, 
                params, 
                assetReRendered  ? this.ignore_on_update[asset.name] : [],
                assetReRendered ? this.on_update[asset.name] : [],
                assetReRendered
            )
        }
    }

    evalParams(asset, params, ignore=[], update=[], assetReRendered){
        for (let [key, value] of Object.entries(params)){
            /**
             * Set the correct context for the components.
             * In this way we are shure that at evalProp function is passing
             * the corect classEmitter (this.props).
             */
            this.setContext(asset.name)
            /**
             * First Render of the asset we set all params of it.
             * NOTE: on life-state "re-render or destroy" we use "ignore" & "update" to define what to be used from the params.
             */
            if (!assetReRendered || update.includes(key)){
                /**
                 * Eval the prop with the correct context
                 */
                evalProp.call(this.props, asset, key, value, assetReRendered)
            }
        }
    }
    animate(){};
}
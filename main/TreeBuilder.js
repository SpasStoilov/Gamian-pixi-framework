import * as PIXI from '../node_modules/pixi.js/dist/pixi.mjs';
import {fetchME}  from "./Utils/fetch.js"
import {classEmitterRegister} from "./GlobalEmitterRegister.js"
import {evalArgs, evalProp} from "./Utils/EvalProps.js"
import {ParentChainVisibility} from "./Utils/ParentChainVisibility.js"
import { emitter } from '../root.js';

export class TreeBuilder{
    /**
     * Current Calss Emitter
     */
    currentEmitterName = null
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
     * Holds information which props of asset to ignore.
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
     * Holds jsLogic.
     * TODO: add to delete asset
     */
    functionalRegister = {}

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
        this.root_gm = await fetchME("structure")
        return this.root_gm
    }
    /**
     * Extract needed data for object creation 
     */
    prepareComponent(component, parent, parentEmitter=null){
        console.log("Tree Builder >>> prepareComponent:", component);
        /**
         * Check for "must have" props
         */
        if (!parent){
            throw new Error("Tree Builder >>> Component type must have parent!")
        }
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
            this.on_update[asset.name] = eval(component.update)
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

                this.prepareComponent(childComponent, asset, component.emitter)
                // asset.addChild(child)
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
                // parent.addChild(mask)
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

        /**
         * Stage asset
         */
        parent.addChild(asset)

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
        //console.log("showNeededAssets >>> this.show_components:", this.show_components);
        for (
            let [assetName, value] of Object.entries(this.show_components)
        ){
            const asset = this.assets_register[assetName]

            //console.log("showNeededAssets >>> asset.name:", asset.name);
            
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
        //....
        const emmiterName = this.asset_emitter_mapper[assetName]
        //....
        this.props = classEmitterRegister[emmiterName]
        //....
        return emmiterName
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
    hookEmitterComponentsParams(targetEmitter){
        /**
        * Show needed assets
        */
        this.showNeededAssets()
        /**
        * Hook the params of the target emitter
        */
        for (let [assetName, emitterName] of Object.entries(this.asset_emitter_mapper)){
            if (targetEmitter != emitterName)continue;
            const asset = this.assets_register[assetName]
            const params  = this.assets_params[assetName]
            this.hookParams(asset, params)
        }
    }
    hookParams(asset, params){
        //....
        const parentChainVisible = ParentChainVisibility(asset)
        //....
        if (asset && asset.visible && parentChainVisible){

            //console.log("hookParams >>> eval all props of:", asset.name);

            /**
            * Update life-state of the asset
            */
            const asset_life_state = this.updateAssetLifeState(asset.name)

            //console.log("hookParams >>> asset_life_state:", asset_life_state);

            const assetReRendered = asset_life_state != "first-render"
            /**
             * Set the correct context for the components.
             * In this way we are shure that at evalProp function is passing
             * the corect classEmitter (this.props).
             */
            const emmiterName = this.setContext(asset.name)
            /**
             * Call Hook - beforeUpdate only once
             */
            if (this.currentEmitterName != emmiterName && assetReRendered){
                emitter.emit(emmiterName + "-beforeUpdate")
            }
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
            /**
             * Call Hook - afterUpdate only once
             */
            if (this.currentEmitterName != emmiterName && assetReRendered){
                emitter.emit(emmiterName + "-afterUpdate")
                this.currentEmitterName = emmiterName
            }
        }
    }
    evalParams(asset, params, ignore=[], update=[], assetReRendered){

        //console.log("EvalParams >>> assetReRendered:", assetReRendered);

        for (let [key, value] of Object.entries(params)){
            /**
             * First Render of the asset we set all params of it.
             * NOTE: on life-state "re-render or destroy" we use "ignore" & "update" to define what to be used from the params.
             */

            //console.log("EvalParams >>> key, update", key, update, update.includes(key));

            if (!assetReRendered || update.includes(key)){
                /**
                 * Eval the prop with the correct context
                 */
                evalProp.call(
                    this.props, 
                    asset, 
                    key, 
                    value, 
                    {
                        assets_params: this.assets_params,
                        assetReRendered
                    }
                )
            }
        }
    }
    get(assetName){
        let asset = this.assets_register[assetName]
        /**
         * Check if asset exist
         */
        if (!asset){
            console.log(`Asset with name - ${assetName} dose not exist in tree!`)
            return false
        }
        return asset
    }
    pos(component, parent, parentEmitter){
        const asset = this.prepareComponent(component, parent, parentEmitter)
        this.showNeededAssets()
        const params  = this.assets_params[asset.name]
        this.hookParams(asset, params)
        return asset
    }
    del(assetName){
        /**
         * Check if asset exist
         */
        let asset = this.get(assetName)
        if (asset)return;
        /**
         * Delete mask
         */
        if (asset.mask){
            this.del(asset.mask.name)
        }
        /**
         * Holds all assets current state (first-render; re-render; destroy).
         */
        delete this.assets_current_life_state[assetName]
        /**
         * Holds all assets parameters.
         */
        delete this.assets_params[assetName]
        /**
         * Holds information which props of asset to ignore.
         */
        delete this.ignore_on_update[assetName]
        /**
         * Holds information which props of asset to update.
         */
        delete this.on_update[assetName]
        /**
         * Holds information about which assets visibility.
         */
        delete this.show_components[assetName]
        /**
         * Maps asset to emitter.
         */
        delete this.asset_emitter_mapper[assetName]
        /**
         * Holds all animations about every assets.
         */
        delete this.animator[assetName]
        /**
         * Delete from parent
         */
        asset.parent.removeChild(asset)
        /**
         * Holds all assets in que. Easy to get (no structure).
         */
        delete this.assets_register[assetName]
    }
    animate(){};
}
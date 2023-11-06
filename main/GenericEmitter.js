import {emitter, tree, Model} from "../root.js"
import { setOngoingEvent, ongoingEvent } from "./Utils/OngoingEvent.js";
import { gsap } from "../node_modules/gsap/gsap-core.js";

export class GenericEmitter{
    emitter = emitter
    ongoingEvent = ongoingEvent
    tree = tree
    gsap = gsap
    model = Model
    data = {}
    emitterName = null

    constructor(){}

    async init(){
        /**
         * Set emitterName. We do it only to use it easy in components
         */
        this.emitterName = this.constructor.name
        /**
         * Set event helper - current initiatedEmitter
         * For more see -> ./Utils/OngoingEvent.js
         */
        setOngoingEvent("initiatedEmitter", this.emitterName)
        /**
         * Init all live hooks
         * 1. Destroy Scope
         * 2. Update Scope
         * 3. Render Scope
         */
        // 1.
        this.emitter.once(this.emitterName + "-destroy", async function(){
            await this.beforeDestroy();
            await this.destroy();
            await this.afterDestroy();
        }.bind(this))
        // 2.
        this.emitter.on(this.emitterName + "-beforeUpdate", async function(){
            await this.beforeUpdate();
        }.bind(this))
        this.emitter.on(this.emitterName + "-afterUpdate", async function(){
            await this.afterUpdate();
        }.bind(this))
        // 3.
        await this.beforeRender();
        await this.render();
        await this.afterRender();
    }
    // Hooks:
    async beforeRender(asset=null){
        console.log(`${this.emitterName} >>> beforeRender`);
        return ()=>{}
    }
    /**
     * Hook the params of the assets that belong to calssEmitter
     * @param {*} asset 
     * @returns 
     */
    async render(asset=null){
        console.log(`${this.emitterName} >>> render`);
        this.tree.hookEmitterComponentsParams(this.emitterName)
        return ()=>{}
    }
    async afterRender(asset=null){
        console.log(`${this.emitterName} >>> afterRender`);
        return ()=>{}
    }
    //
    async beforeUpdate(asset=null){
        console.log(`${this.emitterName} >>> beforeUpdate`);
        return ()=>{}
    }
    async update(asset=null){
        console.log(`${this.emitterName} >>> update`);
        return ()=>{}
    }
    async afterUpdate(asset=null){
        console.log(`${this.emitterName} >>> afterUpdate`);
        return ()=>{}
    }
    //
    async beforeDestroy(asset=null){
        console.log(`${this.emitterName} >>> beforeDestroy`);
        return ()=>{}
    }
    async destroy(asset=null){
        console.log(`${this.emitterName} >>> destroy`);
        return ()=>{}
    }
    async afterDestroy(asset=null){
        console.log(`${this.emitterName} >>> afterDestroy`);
        return ()=>{}
    }
} 
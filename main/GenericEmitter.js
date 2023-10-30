import {emitter, tree} from "../root.js"
import { setOngoingEvent } from "./Utils/OngoingEvent.js";

export class GenericEmitter{
    emitter = emitter
    tree = tree
    data = {}
    emitterName = null

    constructor(){}

    async init(){
        /**
         * Set emitterName. We do it only to use it easy in components
         */
        this.emitterName = this.constructor.name
        /**
         * Set current ongoingEvent
         * NOTE: this.emitterName == nngoingEvent
         * For more see -> ./Utils/OngoingEvent.js
         */
        setOngoingEvent(this.emitterName)
        /**
         * Init all live hooks
         * 1. Render Scope
         * 2. Update Scope
         * 3. Destroy Scope
         */
        // 1.
        await this.beforeRender();
        await this.render();
        await this.afterRender();
        // 2.
        await this.beforeUpdate();
        await this.update();
        await this.afterUpdate();
        // 3.
        await this.beforeDestroy();
        await this.destroy();
        await this.afterDestroy();
    }
    // Hooks:
    async beforeRender(){
        return ()=>{}
    }
    async render(){
        return ()=>{}
    }
    async afterRender(){
        return ()=>{}
    }
    //
    async beforeUpdate(){
        return ()=>{}
    }
    async update(){
        return ()=>{}
    }
    async afterUpdate(){
        return ()=>{}
    }
    //
    async beforeDestroy(){
        return ()=>{}
    }
    async destroy(){
        return ()=>{}
    }
    async afterDestroy(){
        return ()=>{}
    }
} 
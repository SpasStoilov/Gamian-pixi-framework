/**
 * Manages Animations
 */
export class Modelator{
    TIME = 0
    animations = {}
    currentAnimationsState = {}

    constructor(){}

    callAnimation(
        asset,
        animeName,
        animationProps,
        animationExecutor
    ){
        let currentTime = this.TIME
        let assetName = asset.name
        /**
         * Register animation data of asset
         */
        if (!this.animations[assetName]){
            this.animations[assetName] = {}
            this.currentAnimationsState[assetName] = {}
        }
        if (!this.animations[assetName][animeName]){
            this.animations[assetName][animeName] = {
                ...animationProps, 
                animationExecutor, 
                startTime: currentTime,
                endAnimationTime: currentTime + animationProps.duration
            }
        }
        /**
         * Execute the animation
         */
        let animeData = this.animations[assetName][animeName]

        if (this.TIME <= animeData.endAnimationTime){
            this.currentAnimationsState[assetName][animeName] = 
                animeData.animationExecutor(this, animeData)
        }
        else {
            // Call final state of animation:
            this.currentAnimationsState[assetName][animeName](asset)
        } 
    }
}
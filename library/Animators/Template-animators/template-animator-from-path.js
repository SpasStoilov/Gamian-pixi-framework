import { templateFromPathStateRegister } from "../../Utils/globalScopeVariables.js"

export function templateFromPathAnimator(asset, vIn, animationData){

   console.log("templateFromPathAnimator >>>", asset, vIn, animationData);

   if (!templateFromPathStateRegister[asset.name]){
      templateFromPathStateRegister[asset.name] = {state: NaN}
   }
   /**
    * We track in which state we are in
    */
   const currentState = animationData.data.setState.call(this)
   /**
    * Last recorded state
    */
   let lastRecordedState = templateFromPathStateRegister[asset.name].state
   /**
    * We are currently refresh the animator object when lastRecordedState != currentState
    * TODO: Refresh the animator object (optional) every time we set (call animationData.data.setState) currentState
    */
   if (
      lastRecordedState != currentState
   ){
      lastRecordedState = currentState;
      templateFromPathStateRegister[asset.name].state = lastRecordedState
      /**
       * Copy data for safety reasons
       */
      let data = copyData(
         animationData.data.animatorName,
         animationData.data.chooseFromData[lastRecordedState]
      )
      /**
       * Refresh the "DrawingAnimator" with new path
       * NOTE: DrawingAnimator is appended with name = "position" in model animation object,
       * so we refresh the animation object with new "DrawingAnimator" on the place of the old one.
       */
      this.model.shift(
         animationData.assetName, 
         animationData.paramName,
         data,
         animationData.data.animationMiddleware,
         animationData.data.animatorName,
      );
   }

   return vIn
} 

function copyData(animatorName, data){
   /**
    * data = [{}, {}...]
    */
   if (animatorName == "DrawingAnimator"){
      let copy = []
      // d = {options}
      for (let d of data){
         console.log(d);
         copy.push({...d})
      }
      return copy
   }
}
import { 
    linearRangeModel,
    oscillationRangeModel,
    backFowardRangeModel,
    test,
    positionParabulaProcent,
    sinCos
 } from './position-models.js'

/**
 * This object holds all model function. It is ment to be used in your 
 * animator function.
 * Bellow you can define parameter you will animate and what models that 
 * pamrameter support.
 * --------------------------------------------------------------------------------
 * You may pass the model in DATA object (it is up to you how your gona pass it), 
 * It is semanthics (easy to see what model is used for the parameter).
 * Ex:
 * this.model.shift(
*        <Name of asset you want to animate>, 
*        <name of the parameter you want to animate>, 
*        { ..., model: ["LR"] },
*        <name of the parser that builds your "data">,,
*        <name of animator that is going to use the build data>,
*     )
 */
export const LibModels = {
    x:{
        TEST: test,
        LR : linearRangeModel,
        OR : oscillationRangeModel,
        BFR: backFowardRangeModel,
    },
    y:{
        TEST: test,
        LR : linearRangeModel,
        OR : oscillationRangeModel,
        BFR: backFowardRangeModel,
    },
    position:{
        TEST: test,
        LR : linearRangeModel,
        OR : oscillationRangeModel,
        BFR: backFowardRangeModel,
        SinCos: sinCos,
        "PP%": positionParabulaProcent,
    },
    scale: {
        LR : linearRangeModel,
    },
    alpha:{
        TEST: test,
    },
    rotation:{
        TEST: test,
    },
    anchor:{
        TEST: test,
    },
    pivot:{
        TEST: test,
    }
}
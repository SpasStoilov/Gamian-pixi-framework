import { positionModels } from './position-models.js'

export const LibModels = {
    x:{
        ...positionModels
    },
    y:{
        ...positionModels
    },
    position:{
        ...positionModels
    },
    scale: {
        LR : positionModels.LR
    },
    alpha:{},
    rotation:{},
    anchor:{},
    pivot:{}
}
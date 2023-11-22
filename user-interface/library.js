import * as Event from "./events.js"
import * as glbStyles from "./globalStyles.js"
import { svgFilesNames } from "../root.js"

const origin  = "./library/Animators/Paths-svgs"

export let svgPaths = svgFilesNames.map((name, i) => {
        return {
            typeName: "li",
            className: `svg-li-${name}`,
            style:{
                display:"none",
            },
            textContent: [
                {
                    typeName: "label",
                    style: {
                        display: "block",
                        padding: '10px 25px 10px 25px',
                        margin: '0px',
                        fontFamily: "Arial, Helvetica, sans-serif",
                        textDecoration: "none",
                        color: 'gray',
                        border: "1px solid gray",
                        margin: "5px 0 0 0",
                        "border-radius": "5%",
                        backgroundColor: ""
                    },
                    textContent: name,
                    Events: [
                        {evnt: "click", evntFunc: Event.getSvgCoordinates},
                    ],
                },
                {
                    typeName: 'object',
                    id: name,
                    type:"image/svg+xml",
                    data: `${origin}/${name}`,
                }
            ],
        }
    }
)

export function drawingPath(className, name){
    return {
        typeName: "li",
        className,
        style:{
            display:"block",
        },
        textContent: [
            {
                typeName: "label",
                style: {
                    display: "block",
                    padding: '10px 25px 10px 25px',
                    margin: '0px',
                    fontFamily: "Arial, Helvetica, sans-serif",
                    textDecoration: "none",
                    color: 'gray',
                    border: "1px solid gray",
                    margin: "5px 0 0 0",
                    "border-radius": "5%",
                    backgroundColor: ""
                },
                textContent: name,
                Events: [
                    {evnt: "click", evntFunc: Event.getDrawingCoordinates},
                ],
            },
        ],
    }
}

export let animationDrawingStage = [
    {
        typeName: 'canvas',
        id: "animation-drawing-stage",
        style:{
            position: "absolute",
            top: "0",
            left: "0",
            display: 'none',
            zIndex: '9',
            border: "10px solid #f00",
            backgroundColor: `rgba(1, 78, 99, 0.5)`

        },
        Events: [
            {evnt: "mousedown", evntFunc: Event.startDraw},
            {evnt: "mousemove", evntFunc: Event.onDraw},
            {evnt: "mouseup", evntFunc: Event.destroyDraw},
        ],
        
    }
]

export let Mode_Options = [
    {
        typeName: "a",
        className:"animation-drawing-stg",
        textContent: "Drawing",
        style: glbStyles.AnchorNavBarStyles,
        href: "#animation-drawing-stg",
        Events: [
            {evnt: "click", evntFunc: Event.OnClick},
        ],
    },
    {
        typeName: "ul",
        className: "ul-hand-drawings",
        style: {
            listStyleType: 'none',
            display: "block",
            padding: '10px 25px 10px 25px',
            margin: '0px',
            fontFamily: "Arial, Helvetica, sans-serif",
            color: 'white',
        },
        textContent: [
            "Animation from Drawing",
        ],
        Events: [
            {evnt: "click", evntFunc: Event.OnClick},
        ],
    },
    {
        typeName: "ul",
        className:"ul-svg-drawings",
        style: {
            listStyleType: 'none',
            display: "block",
            padding: '10px 25px 10px 25px',
            margin: '0px',
            fontFamily: "Arial, Helvetica, sans-serif",
            color: 'white',
        },
        textContent: [
            "Animation from SVG",
            ...svgPaths
        ],
        Events: [
            {evnt: "click", evntFunc: Event.OnClick},
        ],
    },
]

export let Mode_Menu = [
    {
        typeName: 'div',
        className: "mode-menu",
        style: {
            display: 'none',
            "flex-direction": "column",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: '#0a212d',
            zIndex: '10',
            borderTop:'25px solid #e5e8ed',
            "border-top-left-radius": '10%',
            "border-top-right-radius": '10%',
        },
        Events: [
            {evnt: "mousedown", evntFunc: Event.onStarDragModeMenu},
            {evnt: "mousemove", evntFunc: Event.onDragModeMenu},
            {evnt: "mouseup", evntFunc: Event.onDestroyDragModeMenu},
        ],
        textContent: [
            ...Mode_Options,
        ]
    }

];

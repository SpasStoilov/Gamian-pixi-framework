import * as Event from "./events.js"
import * as glbStyles from "./globalStyles.js"

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
        textContent: "Draw Animation",
        style: glbStyles.AnchorNavBarStyles,
        href: "#animation-drawing-stg",
        Events: [
            {evnt: "click", evntFunc: Event.OnClick},
        ],
    },
    {
        typeName: "a",
        className:"stop",
        textContent: "stop",
        style: glbStyles.AnchorNavBarStyles,
        href: "#stop",
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

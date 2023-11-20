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
            zIndex: '9'
        }
    }
]

export let NAV_OPTIONS = [
    {
        typeName: "a",
        className:"animation-drawing-stg",
        textContent: "DrawAnimation",
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

export let NAVBAR = [
    {
        typeName: 'div',
        className: "navbar",
        style: {
            display: 'none',
            position: "absolute",
            top: "0",
            left: "0",
            width: '100%',
            height: "50px",
            backgroundColor: '#0a212d',
            padding: '0px 0 0px 0',
            zIndex: '10',
        },
        textContent: [
            ...NAV_OPTIONS,
        ]
    }

];

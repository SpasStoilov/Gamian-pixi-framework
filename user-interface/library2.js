import * as Event from "./events.js"
import * as glbStyles from "./globalStyles.js"
import { DATA_DICT } from "./data.js"


export let MAIN = [
    {
        typeName: 'main',
        style:{
            justifyContent: 'row',
            display: 'flex',
            marginTop: '50px'
        }
    }
]

export let IMG_Column_Card_Temp = [
    {
        typeName: "img",
        src: '',
        style: {
            width: "130px",
            height: "100px",
            padding: '20px 10px 20px 10px',
            marginTop: '10px',
            objectFit: 'cover',
        },
        Events: [
            {evnt: "click", evntFunc: Event.OnClick},
            {evnt: "mouseover", evntFunc: Event.OnMouseover},
            {evnt: "mouseout", evntFunc: Event.OnMouseout}
        ],

    }
]

export let IMG_Column_Temp = [
    {
        typeName: "div",
        className:"img-column",
        style: {
            display: 'inline-flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            height: "650px",
            padding: '0 10px 0 10px',
        },
        textContent: []
    },
]

export let ArrrowButtonLeft = [
    {
        typeName: 'button',
        className: 'arrrow-button-left',
        style: {
            padding: '5px',
            color: 'white',
            fontSize: '50px',
            border: 'none',
            backgroundColor: '#e5e8ed'
        },
        textContent: [
            '<'
        ],
        Events: [
            {evnt: "click", evntFunc: Event.OnClick},
        ],
    }
]

export let ArrrowButtonRight = [
    {
        typeName: 'button',
        className: 'arrrow-button-right',
        style: {
            padding: '5px',
            color: 'white',
            fontSize: '50px',
            border: 'none',
            backgroundColor: '#e5e8ed'

        },
        textContent: [
            '>'
        ],
        Events: [
            {evnt: "click", evntFunc: Event.OnClick},
        ],
    }
]

export let IMG_MAIN_VIEW = [
    {
        typeName: 'div',
        className: 'image-main-view',
        style:{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: '#e5e8ed',
            marginLeft: '10px',
        },
        textContent:[
        ]
    }
]

export let INFORMATION_HOLDER_PROMOTIONS_LABLE = [
    {
        typeName: 'lable',
        className: 'information-holder-lable',
        style: {
            width: '160px',
            padding: '4px 0px 4px 0px',
            backgroundColor: '#e8bc54',
            borderRadius: '15px',
            textAlign: 'center',
            fontFamily: 'Gill Sans, sans-serif',
            fontSize: '13px', 
            marginBottom: '20px',
            fontWeight: '600'
        },
        textContent: "Онлайн Промоция"
    }
]

export let INFORMATION_HOLDER_HEADER = [
    {
        typeName: 'h2',
        className: 'information-holder-header',
        style: {
            fontWeight: 'bold',
            margin: '0px',
            fontFamily: 'Gill Sans, sans-serif',
        },
        textContent: DATA_DICT.TVS[0] ? DATA_DICT.TVS[0].header: ''
    }
]

export let INFORMATION_HOLDER_SUB_HEADER = [
    {
        typeName: 'p',
        className: 'information-holder-sub-header',
        style: {
            fontFamily: 'Gill Sans, sans-serif',
            fontWeight: '1px',
            fontSize: '20px'
        },
        textContent: DATA_DICT.TVS[0] ? DATA_DICT.TVS[0].subHeader: ''
    }
]

export let INFORMATION_HOLDER_SERIAL_NUMBER_INSTOCK = [
    {
        typeName: 'p',
        className: 'information-holder-serial-number-instock',
        style: {
            fontFamily: 'Gill Sans, sans-serif',
            borderTop:'2px solid #e5e8ed',
            fontSize:'13px',
            paddingTop: '10px'
        },
        textContent: [
            'Код: ',
            {
                typeName: 'span',
                textContent: DATA_DICT.TVS[0] ? DATA_DICT.TVS[0].serialNumber: '',
                className: 'information-holder-serial-number',
                style: {
                    fontFamily: 'Gill Sans, sans-serif'
                }
            },
            ' | ',
            {
                typeName: 'span',
                textContent: DATA_DICT.TVS[0].inStock ?'В наличност': 'Изчерпан',
                className: 'information-holder-instock',
                style: {
                    fontFamily: 'Gill Sans, sans-serif',
                    color: DATA_DICT.TVS[0].inStock ? 'green': 'red'
                }
            }
        ]
    }
]

export let INFORMATION_HOLDER_PRICE = [
    {
        typeName: 'p',
        className: 'information-holder-price',
        style: {
            fontWeight: 'bold',
            fontSize: '35px',
            fontFamily: 'Gill Sans, sans-serif',
        },
        textContent: DATA_DICT.TVS[0] ? DATA_DICT.TVS[0].price: ''
    }
]

export let INFORMATION_HOLDER_DELIVERY = [
    {
        typeName: 'p',
        className: 'information-holder-delivery',
        style: {
            flexDirection: 'row',
            display:'inline-flex',
            fontFamily: 'Gill Sans, sans-serif',
            fontSize:'13px',
            color: '#808fa5',
        },
        textContent: [
            {
                typeName: 'span',
                textContent: 'Безплатна доставка',
                className: 'information-holder-free-delivery',
                style: {
                    fontFamily: 'Gill Sans, sans-serif',
                }
            },
            {
                typeName: 'span',
                textContent: '14 Дни право на връщане',
                className: 'information-holder-return-delivery',
                style: {
                    fontFamily: 'Gill Sans, sans-serif',
                    marginLeft: '40px'
                }
            },
            {
                typeName: 'span',
                textContent: '24 Месеца гаранция',
                className: 'information-holder-warranty-delivery',
                style: {
                    fontFamily: 'Gill Sans, sans-serif',
                    marginLeft: '40px'
                }
            }
        ]
    }
]

export let INFORMATION_HOLDER_PROTECT_TV_POST = [
    {
        typeName:'div',
        className: 'information-holder-protect-tv-post',
        textContent:[
            {
                typeName: 'p',
                textContent: "Защитете техниката си с удължена гаранция",
                className: 'information-holder-protect-tv-text',
                style: {
                    fontFamily: 'Gill Sans, sans-serif',
                    marginLeft: '20px',
                    padding: '0px'
                }
            },
            {
                typeName: 'a',
                textContent: 'Виж повече',
                className: 'information-holder-protect-tv-seemore',
                href: '#lookmore',
                style: {
                    fontFamily: 'Gill Sans, sans-serif',
                    marginRight: '20px',
                    padding: '0px',
                    color: '#e5b43d',
                    // textDecoration: 'underline'
                }
            },
        ], 
        style:{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#e5b43d',
            background: 'linear-gradient(to right, #0a212d, #294b5d)',
            fontFamily: 'Gill Sans, sans-serif',
            fontSize: '13px',
        },

    }
]

export let INFORMATION_HOLDER_ADD_TV = [
    {
        typeName:'button',
        className: 'information-holder-add-tv-button',
        textContent:[
            {
                typeName: 'img',
                src:  'shopping-car.png',
                style: {
                    width:'22px',
                    height: '22px',
                    marginRight: '15px'
                }
            },
            "Добави в количка"
        ], 
        style:{
            width: '400px',
            height: '52px',
            color: 'white',
            backgroundColor: '#0a212d',
            fontFamily: 'Gill Sans, sans-serif',
            fontSize: '15px',
            textAlign: 'center',
            marginTop: '15px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            
        },

    }
]

export let INFORMATION_HOLDER_CREDIT_ADD = [
    {
        typeName:'div',
        className: 'information-holder-credit-add',
        textContent:[
            {
                typeName: 'p',
                textContent: [
                    `Купи с кредит от `,
                    {
                        typeName: 'span',
                        textContent: "TBIBank",
                        style: {
                            color: '#e5ab00'
                        }
                    },
                    ` на`,
                ],
                style: {
                    margin: '0px'
                }
            },
            {
                typeName: 'p',
                textContent: "12 вноски по 468,72 лв.",
                style: {
                    margin: '0px'
                }
            },
           
        ], 
        style:{
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '400px',
            height: '50px',
            fontFamily: 'Gill Sans, sans-serif',
            fontSize: '13px',
            marginTop: '15px',
            border: '2px solid #e5ab00',
            overflow: 'hidden',
            fontWeight: 'bold'
        },

    }
]

export let INFORMATION_HOLDER = [
    {
        typeName: 'div',
        className: 'information-holder',
        style: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            display:'flex',
            flex:1,
            height: "650px",
            marginLeft: '10px',
            paddingLeft: '20px',
        },
        textContent: [
            ...INFORMATION_HOLDER_PROMOTIONS_LABLE,
            ...INFORMATION_HOLDER_HEADER,
            ...INFORMATION_HOLDER_SUB_HEADER,
            ...INFORMATION_HOLDER_SERIAL_NUMBER_INSTOCK,
            ...INFORMATION_HOLDER_PRICE,
            ...INFORMATION_HOLDER_DELIVERY,
            ...INFORMATION_HOLDER_PROTECT_TV_POST,
            {
                typeName: 'div',
                textContent:[
                    ...INFORMATION_HOLDER_ADD_TV,
                    ...INFORMATION_HOLDER_CREDIT_ADD
                ],
                style: {
                    display: 'inline-flex',
                    justifyContent: 'space-between'
                }
            }
        ]

    }
]

export let SUB_NAV_OPTIONS = [
    {
        typeName: "a",
        className:"sub-nav-new",
        textContent: "Ново",
        style: glbStyles.AnchorNavBarStyles,
        href: "#new"
    },
    {
        typeName: "a",
        className:"sub-nav-offers",
        textContent: "ПРОМОЦИЯ",
        style: glbStyles.AnchorNavBarStyles,
        href: "#offers"
    },
    {
        typeName: "a",
        className:"sub-nav-tvs",
        textContent: "Телевизори",
        style: glbStyles.AnchorNavBarStyles,
        href: "#tvs"
    },
    {
        typeName: "a",
        className:"sub-nav-cinema",
        textContent: "Домашно кино",
        style: glbStyles.AnchorNavBarStyles,
        href: "#cinema"
    },
    {
        typeName: "a",
        className:"sub-nav-cinema",
        textContent: "Фотоапарати и Обективи",
        style: glbStyles.AnchorNavBarStyles,
        href: "#cinema"
    },
    {
        typeName: "a",
        className:"sub-nav-cinema",
        textContent: "Видеокамери",
        style: glbStyles.AnchorNavBarStyles,
        href: "#cinema"
    },
    {
        typeName: "a",
        className:"sub-nav-cinema",
        textContent: "Proffesional",
        style: glbStyles.AnchorNavBarStyles,
        href: "#cinema"
    },
    {
        typeName: "a",
        className:"sub-nav-cinema",
        textContent: "Аудио",
        style: glbStyles.AnchorNavBarStyles,
        href: "#cinema"
    },
    {
        typeName: "a",
        className:"sub-nav-cinema",
        textContent: "Playstation",
        style: glbStyles.AnchorNavBarStyles,
        href: "#cinema"
    },
    {
        typeName: "a",
        className:"sub-nav-cinema",
        textContent: "Мобилни телефони",
        style: glbStyles.AnchorNavBarStyles,
        href: "#cinema"
    },
    {
        typeName: "a",
        className:"sub-nav-cinema",
        textContent: "Аксесоари",
        style: glbStyles.AnchorNavBarStyles,
        href: "#cinema"
    }
]

export let SUB_NAVBAR = [
    {
        typeName: 'div',
        className: "sub-navbar",
        style: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            boxShadow: "0px 2px 5px gray",
            backgroundColor: '#103144',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            height: '20px',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContent: [
            ...SUB_NAV_OPTIONS,
        ]
    }

];

export let NAV_OPTIONS = [
    {
        typeName: "lable",
        className:"nav-sony-center",
        textContent: "Sony Center",
        style: {
            fontSize: '50px',
            color: 'white',
            fontFamily: 'Gill Sans, sans-serif',
            paddingLeft: '20px',
        }
    },

    {
        typeName: "input",
        type: 'search',
        className:"nav-tvs-search-bar",
        placeholder: "Търси...",
        style: {
            width: '400px',
            textIndent: '10px',
            color: '#9396a9',
            backgroundColor: '#0a212d',
            border: 'none',
            borderBottom: "2px solid #3d4265",
            flex: '1',
            margin: '0 200px 0 200px',
            fontSize: '17px'
        }
    },

    {
        typeName: "div",
        className:"nav-cinema-tel-call",
        textContent: [
            {
                typeName: 'span',
                textContent: '02 986 3733',
                className: 'nav-cinema-tel-call-num',
                style: {
                    fontSize: '22px',
                    color: "#bec0cb",
                }
            },
            {
                typeName: 'span',
                textContent: 'Консултация по телефон',
                className: 'nav-cinema-tel-call-text',
                style: {
                    fontSize: '11px',
                    color: '#7e8198'
                }
            },
        ],
        style: {
            display: 'inline-flex',
            flexDirection: 'column',
            fontFamily: "Arial, Helvetica, sans-serif",
            color: 'white',
            marginRight: '50px',
            justifyContent: 'center'
            
        },
        href: "#cinema"
    },

    {
        typeName: 'div',
        className: 'nav-cinema-tel-profile-button',
        textContent:[
            {
                typeName: 'img',
                className: 'image-main-profile-img',
                src:  'user-profile-icon-free-vector.png',
                style: {
                    width:'50px',
                    height: '50px',
                }
            },
        ],
        style: {
            width: '50px',
            height: '50px',
            border: '1.5px solid #bec0cb',
            borderRadius: '50%',
            marginRight: '10px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },

    {
        typeName: 'div',
        className: 'nav-cinema-tel-purches-button',
        textContent:[
            {
                typeName: 'img',
                className: 'image-main-shopping-car',
                src:  'shopping-car.png',
                style: {
                    width:'30px',
                    height: '30px',
                }
            },
            
        ],
        style: {
            width: '50px',
            height: '50px',
            border: '1.5px solid #65ca31',
            borderRadius: '50%',
            marginRight: '20px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
]

export let NAVBAR = [
    {
        typeName: 'div',
        className: "navbar",
        style: {
            width: '100%',
            display: 'flex',
            boxShadow: "0px 2px 5px gray",
            backgroundColor: '#0a212d',
            padding: '20px 0 20px 0',
        },
        Events: [
            {evnt: "mouseover", evntFunc: Event.OnMouseover},
            {evnt: "mouseout", evntFunc: Event.OnMouseout}
        ],
        textContent: [
            ...NAV_OPTIONS,
        ]
    }

];

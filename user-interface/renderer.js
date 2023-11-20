import * as act from "./interior.js"
import * as lb from "./library.js"


const Interior = {
    name:"app",
    to: "body",
    stage: act.insertTo,
    // Templates
    ModeMenu: lb.Mode_Menu,
    animationDrawingStage: lb.animationDrawingStage,
    // Render Templates
    start(){

        // We use arrow function when we need our component to use the global CTX
        // We use function expression when we need our component to use particular part of the global CTX.

        ( //Application component:
            this.app = () => {
                //Stage animationDrawingStage component:
                this.stage(this.to, this.animationDrawingStage);
                //Navbar
                this.stage(this.to, this.ModeMenu);
            }

        )();

    },
}

Interior.start()





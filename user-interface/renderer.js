import * as act from "./interior.js"
import * as lb from "./library.js"


let Interior = {
    //global
    name:"app",
    to: "body",
    act,
    lb,
    stgAt: act.insertTo,

    NAVBAR:lb.NAVBAR,
    animationDrawingStage:lb.animationDrawingStage,
    
    start(){

        // We use arrow function when we need our component to use the global CTX
        // We use function expression when we need our component to use particular part of the global CTX.

        (   //Application component:
            this.app = () => {
                //Stage animationDrawingStage component:
                this.stgAt(this.to, this.animationDrawingStage);
                //Navbar
                this.stgAt(this.to, this.NAVBAR);
            }

        )();

    },
}

Interior.start()





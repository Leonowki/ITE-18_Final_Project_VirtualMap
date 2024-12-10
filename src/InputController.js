

class InputController{
    constructor(){
        this.initialize_();
    }

    initialize_(){
        this.current_ = {
            leftButton:false,
            rightButton:false,
            mouseX: 0,
            mouseY:0
        };
        this.previous_ = null;
        this.keys_ = {};
        this.previousKeys_ = {};

        document.addEventListener('mousedown',(e) => this.onMouseDown_(e),false);
        document.addEventListener('mouseup',(e) => this.onMouseDown_(e),false);
        document.addEventListener('mousemove',(e) => this.onMouseDown_(e),false);
        document.addEventListener('keydown',(e) => this.onMouseDown_(e),false);
        document.addEventListener('keyup',(e) => this.onMouseDown_(e),false);
    }
}
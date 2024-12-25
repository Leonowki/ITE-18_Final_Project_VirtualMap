export class InputController {
    constructor() {
        this.initialize_();
    }
    initialize_() {
        this.current_ = {
            leftButton: false,
            rightButton: false,
            mouseX: 0,
            mouseY: 0,
            mouseXDelta: 0,
            mouseYDelta: 0,
        };
        this.previous_ = null;
        this.keys_ = {};

        document.addEventListener('mousedown', (e) => this.onMouseDown_(e), false);
        document.addEventListener('mouseup', (e) => this.onMouseUp_(e), false);
        document.addEventListener('mousemove', (e) => this.onMouseMove_(e), false);
        document.addEventListener('keydown', (e) => this.onKeyDown_(e), false);
        document.addEventListener('keyup', (e) => this.onKeyUp_(e), false);
    }


    onMouseDown_(e) {
        if (e.button === 0) this.current_.leftButton = true;
        if (e.button === 2) this.current_.rightButton = true;
    }
    onMouseUp_(e) {
        if (e.button === 0) this.current_.leftButton = false;
        if (e.button === 2) this.current_.rightButton = false;
    }
    onMouseMove_(e) {
        this.current_.mouseX = e.pageX - window.innerWidth / 2;
        this.current_.mouseY = e.pageY - window.innerHeight / 2;

        if (this.previous_ === null) {
            this.previous_ = { ...this.current_ };
        }

        this.current_.mouseXDelta = this.current_.mouseX - this.previous_.mouseX;
        this.current_.mouseYDelta = this.current_.mouseY - this.previous_.mouseY;
    }
    onKeyDown_(e) {
        this.keys_[e.keyCode] = true;
    }
    onKeyUp_(e) {
        this.keys_[e.keyCode] = false;
    }

    update() {
        this.previous_ = { ...this.current_ };
        this.current_.mouseXDelta = 0;
        this.current_.mouseYDelta = 0;
    }
}

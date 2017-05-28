"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../util/Point");
class Mouse {
    constructor(element, contextMenuEnabled) {
        if (element === undefined)
            throw new TypeError('html element for mouse is undefined');
        this.element = element;
        this.contextMenuEnabled = contextMenuEnabled;
        this.localPosition = new Point_1.Point(Mouse.POSITION_DEFAULT, Mouse.POSITION_DEFAULT);
        this.globalPosition = new Point_1.Point(Mouse.POSITION_DEFAULT, Mouse.POSITION_DEFAULT);
        this.leftDown = false;
        this.middleDown = false;
        this.leftDown = false;
        this.addEventListeners();
    }
    addEventListeners() {
        this.addMouseDownEvent();
        this.addMouseUpEvent();
        this.addMouseMoveEvent();
        if (this.contextMenuEnabled)
            this.addContextMenuEvent();
    }
    addMouseDownEvent() {
        let self = this;
        this.element.addEventListener('mousedown', function (e) {
            self.mouseDownEvent(e);
        });
    }
    addMouseUpEvent() {
        let self = this;
        this.element.addEventListener('mouseup', function (e) {
            self.mouseDownEvent(e);
        });
    }
    addMouseMoveEvent() {
        let self = this;
        this.element.addEventListener('mousemove', function (e) {
            self.mouseMoveEvent(e);
        });
    }
    addContextMenuEvent() {
        let self = this;
        this.element.addEventListener('contextmenu', function (e) {
            self.preventContextMenu(e);
        });
    }
    mouseDownEvent(e) {
        switch (e.which) {
            case 1:
                this.leftDown = true;
                break;
            case 2:
                this.middleDown = true;
                break;
            case 3:
                this.rightDown = true;
                break;
        }
    }
    mouseUpEvent(e) {
        switch (e.which) {
            case 1:
                this.leftDown = false;
                break;
            case 2:
                this.middleDown = false;
                break;
            case 3:
                this.rightDown = false;
                break;
        }
    }
    mouseMoveEvent(e) {
        this.globalPosition.setX(e.clientX);
        this.globalPosition.setY(e.clientY);
        let browserDimensions = this.element.getBoundingClientRect();
        let localX = e.clientX - browserDimensions.left;
        let localY = e.clientY - browserDimensions.top;
        this.localPosition.setX(localX);
        this.localPosition.setY(localY);
    }
    preventContextMenu(e) {
        e.preventDefault();
    }
    isLeftDown() {
        return this.leftDown;
    }
    isMiddleDown() {
        return this.middleDown;
    }
    isRightdown() {
        return this.rightDown;
    }
    getLocalPosition() {
        return this.localPosition;
    }
    getGlobalPosition() {
        return this.globalPosition;
    }
}
Mouse.POSITION_DEFAULT = 0.0;
exports.Mouse = Mouse;

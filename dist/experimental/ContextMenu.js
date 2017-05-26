"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = require("../datastruct/List");
const Point_1 = require("../util/Point");
const Cast_1 = require("../datastruct/Cast");
class ContextMenu {
    constructor(position, canvas, mouse) {
        this.options = new List_1.List();
        this.canvas = canvas;
        this.position = position;
        this.mouse = mouse;
    }
    addOption(option) {
        this.options.put(option);
    }
    length() {
        return this.options.length();
    }
    width() {
        let i;
        let longest = 0;
        for (i = 0; i < this.options.length(); i++) {
            if (this.options.peek(i).length() > longest) {
                longest = this.options.peek(i).length();
            }
        }
        return longest;
    }
    height() {
        return 200;
    }
    localMousePosition() {
        let x = Cast_1.float(this.mouse.getLocalPosition().getX() - this.position.getX());
        let y = Cast_1.float(this.mouse.getLocalPosition().getY() - this.position.getY());
        return new Point_1.Point(x, y);
    }
    mouseInsideMenu() {
        let mousePosition = this.localMousePosition();
        return mousePosition.getX() >= 0 &&
            mousePosition.getY() >= 0 &&
            mousePosition.getX() < this.width() &&
            mousePosition.getY() < this.height();
    }
    draw() {
        if (this.mouseInsideMenu()) {
            this.canvas.getContext().fillStyle = 'rgb(255,0,0)';
        }
        else {
            this.canvas.getContext().fillStyle = 'rgb(200,0,0)';
        }
        this.canvas.getContext().fillRect(this.position.getX(), this.position.getY(), this.width() - 1, this.height() - 1);
        this.canvas.getContext().strokeRect(this.position.getX() - 0.5, this.position.getY() - 0.5, this.width(), this.height());
        this.canvas.getContext().strokeRect(this.mouse.getLocalPosition().getX() - 1.5, this.mouse.getLocalPosition().getY() - 1.5, 3, 3);
        this.canvas.getContext().fillStyle = 'white';
        this.canvas.getContext().fillRect(this.mouse.getLocalPosition().getX(), this.mouse.getLocalPosition().getY(), 1, 1);
        console.log(this.options.peek(0));
        this.options.peek(0).draw();
    }
}
exports.ContextMenu = ContextMenu;

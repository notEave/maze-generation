"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Time {
    constructor() {
        this.start = Time.highResolutionTime();
        this.currentFrame = 0;
    }
    static highResolutionTime() {
        return window.performance.now();
    }
    static timeSinceUnixEpoch() {
        return window.performance.timing.navigationStart + Time.highResolutionTime();
    }
    deltaFrame() {
        return this.frameEnd - this.frameStart;
    }
    deltaPhysics() {
        return this.physicsEnd - this.physicsStart;
    }
    deltaDraw() {
        return this.drawEnd - this.drawStart;
    }
    setFrameStart() {
        this.frameStart = Time.highResolutionTime();
    }
    setFrameEnd() {
        this.frameEnd = Time.highResolutionTime();
    }
    setPhysicsStart() {
        this.physicsStart = Time.highResolutionTime();
    }
    setPhysicsEnd() {
        this.physicsEnd = Time.highResolutionTime();
    }
    setDrawStart() {
        this.drawStart = Time.highResolutionTime();
    }
    setDrawEnd() {
        this.drawEnd = Time.highResolutionTime();
    }
    getCurrentFrame() {
        return this.currentFrame;
    }
    iterateCurrentFrame() {
        this.currentFrame++;
    }
}
exports.Time = Time;

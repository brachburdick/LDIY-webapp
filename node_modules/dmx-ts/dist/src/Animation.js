"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
const easing_1 = require("./easing");
class Animation {
    constructor(args = {}) {
        this.frameDelay = 1;
        this.animations = [];
        this.lastAnimation = 0;
        this.timeout = null;
        this.duration = 0;
        this.startTime = null;
        this.loops = args.loop || 1;
        this.currentLoop = 0;
        this.filter = args.filter;
    }
    add(to, duration = 0, options = {}) {
        options.easing = options.easing || 'linear';
        this.animations.push({
            to,
            options,
            start: this.duration,
            end: this.duration + duration,
        });
        this.duration += duration;
        return this;
    }
    delay(duration) {
        this.add({}, duration);
        return this;
    }
    stop() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
    reset(startTime = new Date().getTime()) {
        this.startTime = startTime;
        this.lastAnimation = 0;
    }
    runNextLoop(universe, onFinish) {
        const runAnimationStep = () => {
            const now = new Date().getTime();
            const elapsedTime = now - this.startTime;
            this.timeout = setTimeout(runAnimationStep, this.frameDelay);
            // Find the animation for the current point in time, the latest if multiple match
            let currentAnimation = this.lastAnimation;
            while (currentAnimation < this.animations.length &&
                elapsedTime >= this.animations[currentAnimation].end) {
                currentAnimation++;
            }
            // Ensure final state of all newly completed animations have been set
            const completedAnimations = this.animations.slice(this.lastAnimation, currentAnimation);
            // Ensure future animations interpolate from the most recent state
            completedAnimations.forEach(completedAnimation => {
                delete completedAnimation.from;
            });
            if (completedAnimations.length) {
                const completedAnimationStatesToSet = Object.assign({}, ...completedAnimations.map(a => a.to));
                if (typeof this.filter === 'function') {
                    this.filter(completedAnimationStatesToSet);
                }
                universe.update(completedAnimationStatesToSet, { origin: 'animation' });
            }
            this.lastAnimation = currentAnimation;
            if (elapsedTime >= this.duration) {
                // This animation loop is complete
                this.currentLoop++;
                this.stop();
                if (this.currentLoop >= this.loops) {
                    // All loops complete
                    if (onFinish) {
                        onFinish();
                    }
                }
                else {
                    // Run next loop
                    this.reset(this.startTime + this.duration);
                    this.runNextLoop(universe);
                }
            }
            else {
                // Set intermediate channel values during an animation
                const animation = this.animations[currentAnimation];
                const easing = easing_1.ease[animation.options.easing];
                const duration = animation.end - animation.start;
                const animationElapsedTime = elapsedTime - animation.start;
                if (!animation.from) {
                    animation.from = {};
                    for (const k in animation.to) {
                        animation.from[k] = universe === null || universe === void 0 ? void 0 : universe.get(Number(k));
                    }
                    if (animation.options.from) {
                        animation.from = Object.assign(animation.from, animation.options.from);
                    }
                }
                if (duration) {
                    const easeProgress = easing(Math.min(animationElapsedTime, duration), 0, 1, duration);
                    const intermediateValues = {};
                    for (const k in animation.to) {
                        const startValue = animation.from[k];
                        const endValue = animation.to[k];
                        intermediateValues[k] = Math.round(startValue + easeProgress * (endValue - startValue));
                    }
                    if (typeof this.filter === 'function') {
                        this.filter(intermediateValues);
                    }
                    universe.update(intermediateValues, { origin: 'animation' });
                }
            }
        };
        runAnimationStep();
        return this;
    }
    run(universe, onFinish) {
        if (universe.interval) {
            // Optimisation to run animation updates at double the rate of driver updates using Nyquist's theorem
            this.frameDelay = universe.interval / 2;
        }
        this.reset();
        this.currentLoop = 0;
        this.runNextLoop(universe, onFinish);
    }
    runLoop(universe, onFinish, loops = Infinity) {
        this.loops = loops;
        this.run(universe, onFinish);
        return this;
    }
}
exports.Animation = Animation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBZ0M7QUFPaEMsTUFBYSxTQUFTO0lBV3BCLFlBQVksT0FBc0IsRUFBRTtRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDO0lBRUQsR0FBRyxDQUFDLEVBQU8sRUFBRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLFVBQWUsRUFBRTtRQUMxQyxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDO1FBRTVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ25CLEVBQUU7WUFDRixPQUFPO1lBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3BCLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVE7U0FDOUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7UUFFMUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQWdCO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFB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
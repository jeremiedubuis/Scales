//only considering the t value for the range [0, 1] => [0, 1]
const easeInOutQuad = (t) => { return t<.5 ? 2*t*t : -1+(4-2*t)*t };


const easing = {
    easeInOutQuad
};

const ease = (frame, duration, max, easingFunc, loop) => {
    const current = frame % duration;
    if (loop) {
        const halfDuration = duration * .5;
        if (current <= halfDuration)
            return easing[easingFunc]( current / halfDuration) * max;
        else
            return easing[easingFunc]( (duration - current) / halfDuration) * max;
    } else {
        return easing[easingFunc]( current / duration) * max;
    }
};

export { ease, easeInOutQuad };
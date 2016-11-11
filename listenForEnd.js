var animationEvent = false,
    transitionEvent = false;

const transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
}

const animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
}

/**
* @public
* @name listenForAnimationEnd
* @param {object} element the target element of the animation
* @param {function} callback the function to be called after animation end
*
* @description
* Listen for the end of the animation, then call a function
*/
function listenForAnimationEnd(el, cb) {
    listenForEnd('animation', el, cb);
}

/**
* @public
* @name listenForTransitionEnd
* @param {object} element the target element of the transition
* @param {function} callback the function to be called after transition end
*
* @description
* Listen for the end of the transition, then call a function
*/
function listenForTransitionEnd(el, cb) {
    listenForEnd('transition', el, cb);
}

/**
* @private
* @name listenForEnd
* @param {string} type the listener type (transition / animation)
* @param {object} element the target element of the transition/animation
* @param {function} callback the function to be called after transition/animation end
*
* @description
* Determines and sets eventlistener, triggers callback after end. used by listenForTransitionEnd / listenForAnimationEnd
*/
function listenForEnd(type, el, cb) {
    var arTypes = ['transition', 'animation'];
    if (arTypes.indexOf(type) < 0 || el === 'undefined' || typeof cb !== 'function') {
        return;
    }

    var eventType = (type === 'transition') ? whichTransitionEvent() : whichAnimationEvent(),
        eventCallback = function() {
        el.removeEventListener(eventType, eventCallback, false);
        cb();
    };

    el.addEventListener(eventType, eventCallback, false);
}

/**
* @public
* @name whichAnimationEvent
* @returns {string} animationEvent of the current browser
*
* @description
* Determines and caches animationEvent of the current browser
*/
function whichAnimationEvent() {
    if (animationEvent) {
        return animationEvent;
    }

    return animationEvent = determineEventType(animations);
}

/**
* @public
* @name whichTransitionEvent
* @returns {string} transitionEvent of the current browser
*
* @description
* Determines and caches transitionEvent of the current browser
*/
function whichTransitionEvent() {
    if (transitionEvent) {
        return transitionEvent;
    }

    return transitionEvent = determineEventType(transitions);
}

/**
* @private
* @name determineEventType
* @param {array} array of eventTypes
* @returns {string} eventType of the current browser
*
* returns eventType of the current browser. used by whichTransitionEvent and whichAnimationEvent
*/
function determineEventType(eventTypes) {
    var t,
        el = document.createElement("fakeelement");

    for (t in eventTypes){
        if (el.style[t] !== undefined){
            return eventTypes[t];
        }
    }
}

export { whichAnimationEvent, whichTransitionEvent, listenForAnimationEnd, listenForTransitionEnd };

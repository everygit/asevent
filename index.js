/**
 * Let a class have functions related to events
 */



export default function AsEvent() {
}

AsEvent.prototype.on = function (event, handler, context) {
    var hs = this._$handlers || (this._$handlers = {});
    if (!hs[event]) hs[event] = [];

    hs[event].push({
        event: event,
        handler: handler,
        context: context || this
    });

    return this;
}

AsEvent.prototype.off = function (event, handler) {
    var hs = this._$handlers || (this._$handlers = {});
    if (hs[event]) {
        if (hs[event].length == 1 || !handler) delete hs[event];
        hs[event] = hs[event].filter(function (handler) {
            return handler.handler != handler;
        })
    }

    return this;
}

AsEvent.prototype.trigger = function (event) {
    var hs = this._$handlers[event] || (this._$handlers = {});
    if (!hs) return;
    var args = [].slice.call(arguments, 1);

    hs.forEach(function (handler) {
        handler.handler.apply(handler.context, args);
    })
}

export function inheritAsEvent(cls) {
    var props = cls.prototype;
    cls.prototype = new AsEvent();
    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
            cls.prototype[prop] = props[prop];
        }
    }
    cls.prototype.constructor = cls;
    cls.superClass = AsEvent;
}
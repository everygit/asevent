# asevent

Let a class have functions related to events

## example 

```js
import { inheritAsEvent } from 'asevent';

function Example() {
    //...
}

Example.prototype.doSomething = function() {
    // todo some
}


inheritAsEvent(Example);


var example = new Example();


example.on('custom', function(event) {
    console.log(event);
})

// {a: 1, b: 2}

example.trigger('custom', {a: 1, b: 2});


```
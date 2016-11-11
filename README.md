# util-listenForEnd

## usage
- Include util in your project 
- Use listenForAnimationEnd / listenForTransitionEnd 

Ex:
```
import { listenForAnimationEnd } from 'path/to/util';

...
var el = document.querySelectorAll('.element-with-animation');
listenForAnimationEnd(el, function() {
    // do stuff;
});
```
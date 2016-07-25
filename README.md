# Collection of TypeScript Fakes for Jasmine Tests

This package tries to compile a list of useful abstractions for unit tests while
keeping the typechecking capabilities of TypeScript for Mock/Spy/Stub classes.


## Spies

### SpyEventTarget

```typescript
import {SpyEventTarget} from 'typescript-fakes';
let spy = new SpyEventTarget();
functionThatExpectsADOMElement(spy);
expect(spy.addEventListener).toHaveBeenCalled();
expect(spy.hasListener('touchstart')).toBe(true);
spy.triggerListeners('touchstart', { x: 15, y: 17 });
```


## Utility functions

### subscribeSpy

```typescript
import {subscribeSpy} from 'typescript-fakes';
// incomingMessages is automatically unsubscribed after the test
let incomingMessages = subscribeSpy(inbox, inbox.incomingMessages);
fakeSendingMessage();
expect(incomingMessages.next).toHaveBeenCalledTimes(1);
expect(incomingMessages.error).not.toHaveBeenCalled();
```


## License

MIT

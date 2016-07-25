interface Subscribable {
    subscribe(observer?: any, error?: (error: any) => void, complete?: () => void): { unsubscribe(): void; };
}

interface SpyObserver {
    next: jasmine.Spy;
    error: jasmine.Spy;
    complete: jasmine.Spy;
}

/**
 * Creates a spy that subscribes to an observable.
 * 
 * @example
 *   let refresh = subscribeSpy(obj, obj.refresh);
 *   doSomethingThatCausesRefresh();
 *   expect(refresh.next).toHaveBeenCalledTimes(1)
 */
export function subscribeSpy(subject: any, subscribableOrName: string | Subscribable): SpyObserver {
    let name: string = 'unknown';
    let subscribable: Subscribable;

    if (typeof subscribableOrName === 'string') {
        name = subscribableOrName;
        subscribable = (<any> subject)[name];
    } else if (subscribableOrName && typeof subscribableOrName.subscribe === 'function') {
        subscribable = subscribableOrName;
        for (let k in subject) {
            if (subject[k] === subscribable) {
                name = k;
                break;
            }
        }
    } else {
        throw new Error('Parameter has no subscribe() method.');
    }

    let spy = {
        next: jasmine.createSpy(name + '.next'),
        error: jasmine.createSpy(name + '.error'),
        complete: jasmine.createSpy(name + '.complete')
    };
    let subscription = subscribable.subscribe(spy);
    jasmine.getEnv().afterAll(() => { subscription.unsubscribe(); });

    return spy;
}

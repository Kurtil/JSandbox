# JAVASCRIPT DESIGN PATTERNS

This place will contain examples of design pattern first, and design patterns
modelled for javascirpt.

## Creational patterns
- Factory method : encapsulate the logic of creation. Exemple : create items in game. The logic creation will vary in terms of levels number.
- Absctract factory : a set of factory methods. Exemple : an abstract factory of widgets platform dependent.
- Singleton : a single instance of a class. Client will always have the same instance.
## Structural patterns
- Decorator : is a and has an object. The decorator will add computation before delegate to the object he has. The goal is to add behaviour by wrapping object into a decorator (can be done an infinite time). It decouple behaviour so it is possible to compose them in any number/order we want.
- Proxy : is an intermediate between the client and the object. That allow to add logic in the information search (protection, connection to distant object ...). Here, the purpose is to not change the interface, but add access control.
- Facade : reduce coupling by proposing a simple/single interface to a complex system. The client does not have to know the complexity of the system. He just know the facade.
- Bridge : reduce class explosion by decoupling abstraction from its implementation so that the two can vary independently. Exemple : different view of different media types.
- Adapter : allow client to use an object as if it was of the correct interface. No intent to change behaviour. The original behaviour is needed but the interface need to be adapted to be used correctly.
- Composite : lets clients treat individual objects and compositions of objects uniformly.
## Behavioural patterns
- Strategy : composition over inheritance. "Has a"  instead of "Is a". Dependency injection. Exemple : injecting a sorting strategy in a collection.
- Observer : an observable have a list of observer, and will inform all observer when needed. Potential observer can subscribe or unsubscribe to the observable.
- Iterator : a same interface for iterating over collections. Encapsulate the collection itself. The collection does not have to expose the concrete structure. Allow to create infinite collections because the evaluation is lazy. One element at a time.
- Command : encapsulate the commands. Command can be shared by many invoker and can be unexecuted (undo).
- NullObject : null is something. Replace null by something we know that is an absence of behaviour (an null object).
- Template method : provide an template of a methode where the algorithm will not vary between instanciation, and the part that will vary will be filled by delegating to other 'functions' 'given' to instances.
- State : Allow an object to alter its behavior when its internal state changes. The object will appear to change its class. This is achieved by delegating context methods to state, and states can change context's state.
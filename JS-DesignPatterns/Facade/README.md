# Facade pattern

The facade pattern is very easy. Imagine you have a very complexe system with a lot of
interfaces. The facade pattern allow client to use the complexe system by instead using the facade instance. The facade instance is a set of methodes that call the whole complexe system, making this use easy for the client that juste know the facade instead of all the complexity of the system.
This allow to reduce coupling because the client will be coupled only to the facade, not the whole
system, that could represent a lot of coupling.

It is a good practice to reduce coupling. A good choice is to use only things you 'know' (in term of object, this means that you can use methods in object passed as parameters, not object of object passed as parameters...).

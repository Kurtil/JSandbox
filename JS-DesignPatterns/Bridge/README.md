# Bridge

Bridge allow to avoid class explosion.
Example : you need to implement different views of different media type like :
- large view of a Author,
- large view of a Book,
- small view of Song
- mini view of song...

You will create a interface view, that has a ressource. Then, the concrete view
will have resource and delegate them the 'work' to get some type of information
about the resource.

This pattern drasticly reduce the number of class we need. Without it, the number of needed
class is a cartesian product between the kind of view and the kind of ressource.

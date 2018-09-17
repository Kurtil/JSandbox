# The Proxy design pattern
There is 3 types of proxies :
- Remote proxy, if the object we want to access is not in the same project, server...
- Virtual proxy, that controll access to ressouce that is expensive to create
- Protection proxy, like testing if user can access this object

Proxy is similar to other design patterns like facade, adaptater or decorator, the intent is
kind of different.
A proxy, like decorator, "has" an object with type A, and generally, implements interface type A.
So it "is a" and "has a".
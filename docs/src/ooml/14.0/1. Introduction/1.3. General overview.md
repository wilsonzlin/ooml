ooml is composed of two main parts: compiler, known as oomlc, and VM, known as oomlvm.

There are many different ooml compilers that compile from different languages, which means that it's possible to write for ooml (and therefore, create web apps) in your favourite language, which might be Python and Java.

All ooml compilers compile to a common bytecode format, defined by the ooml specification. This is then loaded into the browser along with the VM (oomlvm), which executes the bytecode. Additionally, ooml code can use and depend on any compiled ooml class, regardless of what the dependency's source language is. This means that you can use someone else's compiled ooml class originally written in Java even if you are writing an app in Python.

oomlvm is a fully-featured object-orientated runtime. While it is designed to create and manage stateful views using classes, it can also be used as a general-purpose code execution environment.

It has its own concept of classes, which contain properties for holding state, methods for describing relevant behaviour, and fields for shared data and functionality. Classes can also inherit from other classes to achieve polymorphism and code reuse. This probably sounds very familiar to you; it should, as it is almost the same as any other object-orientated language.

It also has its own system for organising, loading, and referencing classes. Classes always have a globally-unique reference called a fully-qualified name (FQN). A class can always reference another class by using the other class's FQN, and the other class becomes a dependency of the class. You can't have cyclic dependencies, however. Unlike JavaScript, there is no concept of "globals", and everything is organised into classes.

ooml has a built-in type system that allows for static type checking and optionally runtime type checking. It also allows for compiled ooml classes to be easily used by ooml code written in statically typed languages.

Of course, oomlvm isn't just a generic runtime. It has plenty of features designed to help with developing large, scalable, complex, fluid web applications. At its core, ooml classes can have views, which allows decomposing complex apps into encapsulated logic that automatically and efficiently synchronises the UI to the state. This allows you to focus on business logic without worrying about the lower-level implementation details, such as DOM manipulation.

Additional built-in features like events, stores, and message brokers allow for intricate sharing and communicating between instances without spaghetti code, helping establish complex relationships while still remaining modular and scalable.

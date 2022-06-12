The code in section 6.4.4 of "Learning React 2nd edition" by Alex Banks and Eve Porcello, written in TypeScript.

<br>

A little bit characteristic code here is probably the part in *src/components/ColorProvider.tsx*.

In the definition of the *ColorProvider* component (function), the initial value of the global context object (*ColorContext*), which is the basis for the custom context provider (*Context.Provider*) and the custom context hook (*useColors*), is created with *createContext*. In the code of Section 6.4.4, the functions (*addColor*, *rateColor*, *removeColor*), which are elements of *ColorContext*, refer to *setColor* that is one of the return values of *useState*. So it is easy to create the initial value within the body of *ColorProvider*. As described in the book, the values of these elements are also required for the value props of the *Context.Provider*.

In my code, *ColorContext* is declared with **let** in the global scope, and the initial values generated above are assigned to *ColorContext* within the definition of the *ColorProvider* function.

If the closure variable has an infinite extent, as in Common Lisp, it might be better to declare the variable *ColorContext* with **const** in the definition of the *ColorProvider* function and assign the return value of *createContext* as initialization (it probably needs to rewrite the implementation of *useColors*). However, since I am not familiar with the JavaScript specification, I did not do so this time.

In addition, since React v18, the default value of the context must be given as a required argument to *createContext* (because of convenience for testing). In TypeScript, this default value and the initial value above must have consistent type. I would like to say that, it took some trail and error to seek better way to write it.

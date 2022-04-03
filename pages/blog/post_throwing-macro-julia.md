+++
include("utils.jl")
title = "Throwing From a Julia Macro"
date = Date(2022, 3, 22)
hascode = true
tags = ["Julia", "Metaprogramming"]
abstract = "How many layers of quotation do you need?"
meta = post_default_meta()
comments_allowed = true
+++

{{ blogpost_meta }}

\toc

# Exception Handling
Like most modern languages, Julia provides a variety of [control flow
constructs](https://docs.julialang.org/en/v1/manual/control-flow/). This post
will take a look at [exception
handling](https://docs.julialang.org/en/v1/manual/control-flow/#Exception-Handling).
Julia allows the programmer to manage exceptions using `try/catch` statements.
The idea is to enclose a potentially problematic chunk of code in a `try` block.
If an exception occurs, the code in a corresponding catch block is executed. For
instance, the following function tries to take the logarithm of its argument,
which has to be a real number. If `x` is negative, it is converted to a complex
number, thus allowing a complex return value (through [method
dispatch](https://en.wikipedia.org/wiki/Method_dispatch)) instead of throwing an
error.

```julia
function take_log(x::Real)
    try
        log(x)
    catch e
        log(Complex(x))
    end
end
```

As you can see, the result match our expectations for positive real numbers:
```julia-repl
julia> take_log(42)
3.7376696182833684

julia> log(42)
3.7376696182833684
```

On the other hand, the behavior of the functions differ when evaluating
negative numbers:

```julia-repl
julia> take_log(-42)
3.7376696182833684 + 3.141592653589793im

julia> log(-42)
ERROR: DomainError with -42.0:
log will only return a complex result if called
with a complex argument. Try log(Complex(x)).
[...]
```
Of course, this is just a toy example; `try-catch` blocks are not the
preferred way of achieving polymorphism ~~~&#x1F609~~~.


# Throwing an Exception
Calling the `log` function with a negative argument resulted in it *throwing*
an exception of type `DomainError`. We can easily code a function with similar 
behavior using the `throw` function:

```julia
function throw_exception()
    throw(ErrorException("😱"))

    println("No exception 🥳")
end
```

A call to that function inevitably throws an `ErrorException`:
```julia-repl
julia> throw_exception()
ERROR: 😱
```

In fact, we can even test that a call to our function throws the expected type
of exception using the
[`@test_throws`](https://docs.julialang.org/en/v1/stdlib/Test/#Test.@test_throws) 
macro from the Test package (included in the standard library):

```julia-repl
julia> using Test: @test_throws

julia> @test_throws ErrorException throw_exception()
Test Passed
  Expression: throw_exception()
      Thrown: ErrorException
```

# Throwing From a Macro
Can we achieve the same result with a macro? Let’s find out!

```julia
macro throw_exception()
    throw(ErrorException("😱"))

    :(println("No exception 🥳"))
end
```

Unfortunately, when we evaluate it, we get the following result:
```julia-repl
julia> @throw_exception
ERROR: LoadError: 😱
```

Instead of the expected `ErrorException`, we get a `LoadError`. This might
easily become an issue. For instance, it prevent `@test_throws` from doing its 
job:

```julia-repl
julia> @test_throws ErrorException @throw_exception
ERROR: LoadError: 😱
```

Luckily, this can easily be fixed. Instead of throwing directly from the macro, 
we can make it expand to code that emit the exception.

```julia
macro throw_exception()
    return :(throw(ErrorException("😱")))

    :(println("No exception 🥳"))
end
```

Testing now works as expected:

```julia-repl
julia> @test_throws ErrorException @throw_exception
Test Passed
  Expression: #= REPL[41]:1 =# @throw_exception
      Thrown: ErrorException
```

## Interpolating Error Messages
It is often useful to interpolate the value of a local variable in the error 
message. However, since the interpolation operator is the same for string and 
for quoted expression, a little bit of care is required. Let modify our macro.

```julia
macro throw_exception()
    var = "😱"

    return :(throw(ErrorException("$var")))

    :(println("No exception 🥳"))
end
```

Now, evaluating `@throwexception` throws an `UndefVarError`:

```julia-repl
julia> @throw_exception
ERROR: UndefVarError: var not defined
```

Fortunately, we can use `@macroexpand` to better understand what happened:
```julia-repl
julia> @macroexpand @throw_exception
:(Main.throw(Main.ErrorException("$(Main.var)")))
```

Instead of interpolating the error message with the variable `var` declared
(locally) in the scope of the macro body, the string in the expanded macro
still contain an interpolation operator. Julia is trying to interpolate it with
the variable `var` in the global scope. Since `var` is not defined in that
scope, we get an error. In order to avoid this and achieve the desired 
behavior, we need another interpolation operator:

```julia
macro throw_exception()
    var = "😱"

    return :(throw(ErrorException("$($var)")))

    :(println("No exception 🥳"))
end
```

Finally, we get the expected behavior!
```julia-repl
julia> @throw_exception
ERROR: 😱
```

The outermost `$` is the *string* interpolator. It interpolate the value of
the variable in the string. The other `$` is the *macro* interpolator. It
replaces `var` by its value within the scope of the macro.

## A Complicated Case
As we have seen, things are relatively simple, at least when `var` is a string.
But what if it is a symbol? Then our solution doesn’t work anymore. After
expansion, the value of `var` is going to be interpreted as a variable in the
global scope, ultimately causing a `UndefVarError` (or undefined behavior if the
variable is defined). To get around that issue, we need to add another layer of
quotation. The most convenient way of doing this is to use `Meta.quot`.

```julia
macro throw_exception()
    var = Symbol("😱")

    ## Do stuff with `var`...

    _var = Meta.quot(var)

    return :(throw(ErrorException("$($_var)")))

    :(println("No exception 🥳"))
end
```

As expected,

```julia-repl
julia> @throw_exception
ERROR: 😱

julia> @test_throws ErrorException @throw_exception
Test Passed
  Expression: #= REPL[56]:1 =# @throw_exception
      Thrown: ErrorException
```

I used these little tricks recently for my package
[JCheck](https://github.com/ps-pat/JCheck.jl) (still under development). They
have allowed me to test it more thoroughly and to give more informative error
messages to the end user. The more you know ~~~&#x1F308&#x2B50~~~

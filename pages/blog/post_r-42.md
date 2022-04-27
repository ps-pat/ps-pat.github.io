+++
title = "What's new in R 4.2?"
date = Date(2022, 4, 25)
hascode = true
tags = ["R"]
abstract = "Just the interesting stuff for the day-to-day user."
meta = "A summary of some of the interesting new features of R 4.2. Those include \
        the introduction of a placeholder for the pipe operator, error on conditions \
        with length strictly greater than 1 and an experimental implementation of hash \
        tables."
comments_allowed = true
+++

{{ blogpost_meta }}

\toc

# Vigorous Calisthenics
Version 4.2 of the R programming language has been officially released a few
days ago on April 22nd with release name "Vigourous Calisthenics". A complete
list of the changes is available in [R
News](https://cran.r-project.org/doc/manuals/r-devel/NEWS.html). However, if you
are interested only in changes that might affect the regular day-to-day user,
keep reading.

# Enforce Unit Length for Conditions
There is no scalar in R, only vectors. A scalar is represented as a vector of
unit length. Thus, it makes sense that a lot of the functions and operators in
base R are vectorized. This is true of the `==` operator. When applied to
vectors, it does not check that they are equal like most languages out
there; it actually checks for *elementwise* equality. That means that the value
returned is a vector of boolean. For instance:
```R
r$> 1:2 == c(1, 2)
[1] TRUE TRUE

r$> c(1, 2) == c(1, 3)
[1]  TRUE FALSE
```

It is standard practice to use `==` to check for equality in conditional
statements. However, as warned by R documentation, this is bad form. The reason
why should be obvious from the second statement in the previous example. A
proper equality operator should return a single boolean value, which is not the
case for `==`. In fact, since there is no such thing as a "single value" in R
(i.e. a scalar), statements such as `if` or `while` fall back to checking the
first entry of the vector they're passed. While convenient, this behaviour can
quickly lead to unintended consequences and hard to detect bugs:
```R
r$> if (c(1, 2) == c(1, 3))
        print(":)")

[1] ":)"
Warning message:
In if (c(1, 2) == c(1, 3)) print(":)") :
  the condition has length > 1 and only the first element will be used
```

This can be confusing since many users expect such a condition to check for the
equality of the vectors. The warning message is clear and informative but can
easily be lost in complex outputs. Well, this is not an issue anymore starting
with R 4.2 as the warning is turned into an error:
```R
r$> if (c(1, 2) == c(1, 3))
        print(":)")
Error in if (1:2 == c(1, 2)) print(":)") : the condition has length > 1
```

## Logical Operators
Perhaps a bit more confusing is the behaviour of the so-called "long-form"
logical operators `&&` and `||`. Similar to other languages, those are
short-circuit boolean operators. However, since this is R, there is no such
thing as a scalar so they have to work with vectors. Just like `if` and `while`,
they only take into consideration the first entry of the vectors they're passed.
Starting with R 4.2, they will warn the user when a vector of length strictly
greater than 1 is used. According to a somewhat menacing statement in [R
News](https://cran.r-project.org/doc/manuals/r-devel/NEWS.html), the warning
will be turned into an error "no later than May 2."

# Placeholder for the Pipe Operator
The base R pipe operator `|>` is pretty straightforward: `x |> f(y)` is parsed
as `f(x, y)` and that's pretty much all there is to it. Starting with 4.2, it is
now possible to spice things up a little bit with the `_` placeholder. `_` is
somewhat similar to dyplyr's `.` though not quite as powerful. As an example,
let's say we're interested in the minimum of each of the 2 variables in the `cars`
dataset. This can be done with and without `|>` as follow:
```R
r$> lapply(cars, min)
$speed
[1] 4

$dist
[1] 2

r$> min |> {\(f) lapply(cars, f)}()
$speed
[1] 4

$dist
[1] 2
```

This last formulation is awkward, to say the least! But since the function should
be passed as the second argument of `lapply`, there is no way around it... until
R 4.2! Now, we can make use of `_` to make it simpler:
```R
r$> min |> lapply(cars, FUN = _)
$speed
[1] 4

$dist
[1] 2
```

Way cleaner! That being said, `_` has two limitations:
- It can only be used once on the right-hand side of a pipe expression
- It must be used in a named argument

The more demanding pipe user is gonna have to keep using good ol'
[magrittr](https://magrittr.tidyverse.org/) `%>%`, at least for now.

# Hashtables
R 4.2 is shipped with an experimental implementation of hash tables. R arguably
already provides associative data structures in the form of named vectors. Note
that this includes lists which are merely vectors of references and
matrices/arrays which are vectors with a `dim` attribute. In that regard, the
introduction of hash tables is probably not that groundbreaking. In my opinion,
the main interest of `hashtab`s lies in the fact that they are the only
general-purpose mutable data structure in base R. Everything else is either
non-mutable (vectors) or non-general purpose (environments). If the
implementation is good, why not?

[The
documentation](https://stat.ethz.ch/R-manual/R-devel/library/utils/html/hashtab.html)
is pretty self explanatory. A simple phone book might look somewhat like this:
```R
r$> phonebook <- hashtab()

r$> sethash(phonebook, "Ronald Fisher", "870-461-5425")

r$> sethash(phonebook, "Karl Pearson", "270-706-3966")

r$> numhash(phonebook)
[1] 2

r$> gethash(phonebook, "Ronald Fisher")
[1] "870-461-5425"

r$> maphash(phonebook,
            \(key, val) print(paste(key, val, sep = ", cell: ")))
[1] "Karl Pearson, cell: 270-706-3966"
[1] "Ronald Fisher, cell: 870-461-5425"

r$> remhash(phonebook, "Ronald Fisher")
```

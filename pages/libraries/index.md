+++
title = "Libraries"
date = Date(2022, 4, 24)
meta = "A list of libraries and packages I have created or contributed to \
        in a significant way."
specific_css = "libraries.css"
+++

Here is a list of libraries and packages I have either created or contributed 
to in a significant way.

# JCheck
@@logo
![JCheck logo](/assets/pages/libraries/jcheck-logo.svg)
@@

A package implementing randomized property testing in Julia. It aims at being fast, efficient and easy to use and extend. Main features include:
~~~<ul>~~~
\checked{Integration with Julia's unit test framework}
\checked{Support for "special cases"}
\checked{Serialization of problematic cases}
\checked{Shrinkage of failing test cases}
\unchecked{"Built-in" usual predicate }
~~~</ul>~~~

{{ linksbox 
    GitHub https://github.com/ps-pat/JCheck.jl/ 
    Documentation https://www.patrickfournier.ca/JCheck.jl/dev/
    JuliaHub https://juliahub.com/ui/Packages/JCheck/xkdfQ/ }}

# Lineage
@@logo
![Lineage logo](/assets/pages/libraries/lineage-logo.svg)
@@

An [Asymptote](https://asymptote.sourceforge.io/) library for plotting ancestral
recombination graph with mutation. The software allows the user to specify a set
of sequences that are used as the leaves of the graph as well as a sequence of
coalescence/recombination events. Lineage then infers the mutation events
and the value of internal nodes. The resulting graph can be exported as a vector
image. Main features include:
~~~<ul>~~~
\checked{Infers mutation events and internal nodes valuation}
\checked{Manages missing values (modeled as non-ancestral material in the leaves)}
\checked{Direct LaTeX integration (<a href="https://asymptote.sourceforge.io/">details</a>)}
\unchecked{Documentation}
\unchecked{Multiple mutations per coalescence event}
\unchecked{Customizable vertices latitude}
~~~</ul>~~~

{{ linksbox
    GitHub https://github.com/ps-pat/Lineage/ }}

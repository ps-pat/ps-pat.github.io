using Base: Fix1

using Franklin:
    pagevar,
    locvar,
    html_span,
    html_div,
    html_ahref

using Dates: format

const blog_dir = "pages/blog/"

"""
    blogpost_meta(date, tags)

Generate an html string containing the date and tags associated with a blog
post.
"""
function blogpost_meta(date::Date, tags::Vector{String}, abstract::String = "")
    ret = html_span("date", format(date, "yyyy-mm-dd")) * "&nbsp"

    ret *= join(map(Fix1(html_span, "tag"), tags), " ")

    if !isempty(abstract)
        ret *= "<br>" * html_span("abstract", abstract)
    end

    ret
end

hfun_blogpost_meta() =
    blogpost_meta(locvar("date"), locvar("tags"), locvar("abstract"))

function hfun_blogposts()
    ## Make a list of blog posts.
    files = readdir(blog_dir, sort = false) |>
        Fix1(filter!, startswith("post")) |>
        (σ -> sort!(σ, lt = >, by = x -> pagevar(blog_dir * x, "date")))

    ret = "<ul>"
    for file ∈ files
        ## Title of the post.
        title = pagevar(blog_dir * file, "title")

        ## Date of the post.
        date = pagevar(blog_dir * file, "date")

        ## Tags of the post.
        tags = pagevar(blog_dir * file, "tags")

        ## Directory of the post in the generated website. Just remove the .rd
        ## and we're good to go!
        dir = chop(file, tail = 3)

        ret *= reduce(*, ["<li><p>",
                          html_ahref(dir * "/index.html",
                                     html_span("title", title)),
                          "<br>",
                          blogpost_meta(date, tags),
                          "</p></li>\n"])
    end
    ret *= "</ul>"

    html_div("posts-list", ret)
end

function hfun_linksbox(elems)
    elems_str = map(Iterators.partition(elems, 2)) do p
        "<td>" * "<a href=\"$(last(p))\">$(first(p))</a>" * "</td>"
    end

    separator = "<td>" * html_span("linksbox-separator", "") * "</td>"

    html_div("linksbox-container",
             "<table class=\"linksbox\"><tr>" *
                 join(elems_str, "\n" * separator * "\n") *
                 "</tr></table>")
end

<!--
Add here global page variables to use throughout your website.
-->
+++
author = "Patrick Fournier"
mintoclevel = 1
prepath = ""

# Add here files or directories that should be ignored by Franklin, otherwise
# these files might be copied and, if markdown, processed by Franklin which
# you might not want. Indicate directories by ending the name with a `/`.
# Base files such as LICENSE.md and README.md are ignored by default.
ignore = ["node_modules/"]

# RSS (the website_{title, descr, url} must be defined to get RSS)
generate_rss = true
website_title = "Patrick Fournier"
website_descr = "Patrick's personal website"
website_url   = "https://www.patrickfournier.ca"

## Default meta description.
meta = "Patrick Fournier, PhD candidate @ STATQAM (UQAM); Mathematics &amp; \
        statistics for anything computationally intensive"

comments_allowed = false

specific_css = ""

## Disable automatic generation of robot.txt and sitemap.xml.
generate_robots = false
generate_sitemap = false
+++

<!--
Add here global latex commands to use throughout your pages.
-->

## Checked/unchecked list items.
\newcommand{\checked}[1]{
~~~
<span class="checked">#1</span>
~~~
}

\newcommand{\unchecked}[1]{
~~~
<span class="unchecked">#1</span>
~~~
}

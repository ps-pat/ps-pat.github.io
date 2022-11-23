+++
title = "Communications"
date = Date(2022, 06, 03)
meta = "A list of communications."
hasmath = true
specific_css = "communications.css"
+++

Linked supporting material (slides...) might have been corrected or
otherwise modified since its initial publication.

# Score de risque polygénique et épistasie: une approche "model free" basée sur le processus de coalescence
~~~<div id="statqam-prs-logo" class="logo">~~~
![statqam_prs_logo](/assets/pages/communications/statqam_prs.svg)
~~~</div>~~~


For the [STATQAM seminar series](https://statqam.uqam.ca/activites-scientifiques/2022-2023/).
A presentation on how the Coalescent might be used to account for epistasis when
computing polygenic risk scores. Joint work with [Fabrice Larribe](http://fabricelarribe.uqam.ca/).

{{ linksbox
	Slides https://www.patrickfournier.ca/talk-statqam/ }}

# Les nombres à virgule flottante: simple comme .1 + .2 = .3!
@@logo
![floating_point_numbers](/assets/pages/communications/floating_point_numbers.png)
@@

For the AECSM seminars series. An informal overview of the various
problems that arise when working with real numbers on a computer.

{{ linksbox
	Slides https://www.patrickfournier.ca/talk-floating-point-numbers/ }}

# MAT8186 - Techniques avancées en programmation statistiques R
@@logo
![ravance_logo](/assets/pages/communications/ravance.svg)
@@

I have been teaching the advanced R course @ UQAM since the automn
semester of 2019. All classroom material is hosted on GitHub and
publicly available.

{{ linksbox
	GitHub https://github.com/cours-patrickFournier/mat8186-r-avance
	C1 https://www.patrickfournier.ca/mat8186-cours1/
	C2 https://www.patrickfournier.ca/mat8186-cours2/
	C3 https://www.patrickfournier.ca/mat8186-cours3/
	C4 https://www.patrickfournier.ca/mat8186-cours4/
	C5 https://www.patrickfournier.ca/mat8186-cours5/
	C6 https://www.patrickfournier.ca/mat8186-cours6/ }}

# JCheck.jl: Randomized Property Testing Made Easy
@@logo
![JCheck logo](/assets/pages/libraries/jcheck-logo.svg)
@@

For [JuliaCon 2022](https://juliacon.org/2022/). A short presentation of my
Julia package [JCheck.jl](/pages/libraries/#jcheck). Since the meeting was
virtual, a recording is available!

@@center
~~~
<iframe id="recording-juliacon" width="560" height="315" src="https://www.youtube.com/embed/N-Cb0eTdQpM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
~~~
@@

{{ linksbox
	Slides https://www.patrickfournier.ca/juliacon2022/
	Youtube https://youtu.be/N-Cb0eTdQpM }}

# Accounting for Epistasis in PRSs Through the Coalescent
\begin{equation*}
L({\color{#e65100} \varphi^*} | H_0^*, {\color{#9558b2} \Phi}) \propto f(H_0^*, {\color{#9558b2} \Phi^*})
= \int_{\mathrlap{\color{#4d7e65} \mathcal G_{H_0^*}}} f({\color{#e65100} \varphi^*}, {\color{#9558b2} \Phi} | {\color{#4d7e65} G}) g({\color{#4d7e65} G}) \text d {\color{#4d7e65} G}
\end{equation*}

For the 2022 annual meeting of the Statistical Society of Canada. Joint work
with [Fabrice Larribe](http://fabricelarribe.uqam.ca/). This project is
motivated by the need to account for epistasis (SNP-SNP interaction) in
[polygenic risk scores](https://en.wikipedia.org/wiki/Polygenic_score). We
introduce a framework for "model-free" phenotypical prediction based on genomic
data.

{{ linksbox
	Slides https://www.patrickfournier.ca/ssc2022/ }}

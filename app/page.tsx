"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function BlogPost() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -80% 0px" },
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const tableOfContents = [
    { id: "introduction", title: "Introduction" },
    { id: "the-challenge", title: "What is Differential Privacy" },
    { id: "ai-solution", title: "Differential Privacy & SGD" },
    { id: "technical-approach", title: "How DP-SGD works?" },
    { id: "results", title: "Results" },
    { id: "future", title: "Conclusion" },
    { id: "conclusion", title: "References" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
              Where Deep Learning Meets Privacy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700"></span>
                </div>
                <span className="font-medium text-gray-900">Yonglin, Piao</span>
              </div>
              <span className="text-gray-400">•</span>
              <time className="text-gray-600">Oct 26, 2025</time>
              <span className="text-gray-400"></span>
              <span className="text-gray-600"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with TOC */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Main Article */}
          <article className="flex-1 max-w-3xl">
            <section id="introduction" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The first time I came to understand the concept of privacy-preserving machine learning was during a
                senior-year project in college. Our graduation project aimed to design a model that could recognize
                human CT images, identify potential medical issues, and enhance the clarity of those images.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                When we started looking for datasets, we ran into challenges. On Hugging Face—a popular platform for
                sharing models and datasets—there were very few relevant medical imaging datasets, far from enough for
                our model to truly learn. So, we turned to publicly available university datasets and open research
                projects to find the data we needed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                However, when I first examined those datasets, I began to feel uneasy about privacy concerns. A few
                years earlier, Fredrikson et al. had introduced the concept of Model Inversion Attacks, showing that by
                accessing a trained model, one could reconstruct the original training data—such as real human
                faces—from the model’s output.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                This realization made me think: if someone with malicious intent repeatedly queried our model to extract
                real data used during training, our potential clients would lose all trust in our product. That thought
                sparked my interest in data privacy and encryption techniques.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                In this context, I began reading the 2016 ACM CCS paper “Deep Learning with Differential Privacy” by
                Abadi et al.. The paper does not merely propose an “improved algorithm”; rather, it attempts to
                establish a computable and verifiable privacy protection mechanism within the highly complex, non-convex
                optimization framework of deep learning itself.
              </p>
            </section>

            <section id="the-challenge" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Differential Privacy</h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The mathematical formula for differential privacy (as shown below) comes up several times throughout the
                paper, so I went back to the definition of Differential Privacy, or DP for short. Basically, it's all
                about giving a formal privacy guarantee for the output of an algorithm.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                So I realized that, in a mathematical sense, differential privacy isn't about “hiding” or “masking” data
                — it's really about making the probability distribution insensitive. In other words, DP doesn't make the
                data disappear; it just makes the algorithm's output almost unaffected by whether a particular
                individual is in the dataset or not!
              </p>

              <div className="my-8 flex justify-center">
                <Image
                  src="/images/design-mode/0837d5114763bc4a38205183f4949457.png"
                  alt="Differential Privacy Formula: Pr[M(D) ∈ S] ≤ e^ε Pr[M(D') ∈ S] + δ"
                  width={400}
                  height={60}
                  className="max-w-full h-auto"
                />
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                In more academic terms, for two neighboring datasets, D and D', that differ by only one individual, the
                output distribution of algorithm M should remain almost the same. Under this definition, ε controls the
                level of privacy leakage — the smaller it is, the stronger the privacy — while δ represents the upper
                bound on the probability of violating that guarantee.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                One of the cool things about DP is that it's composable — if several algorithms each satisfy
                differential privacy, then putting them together still gives you DP. You just need to add up their
                privacy budgets.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                But when you move into deep learning, where updates happen all the time, this method makes the privacy
                budget explode — seriously, it becomes impossible to manage. And that's exactly why Abadi and his
                colleagues introduced the Moments Accountant.
              </p>
            </section>

            <section id="ai-solution" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Differential Privacy & SGD</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                As I said before, gradient descent needs tons of updates, and since each one goes through the training
                data again and again, the model ends up performing pretty badly. So I started looking at how deep neural
                networks are actually trained — and yeah, it's nothing like the classic convex optimization we learn
                from textbooks.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The standard SGD training process is pretty straightforward — at each iteration, it samples a mini-batch
                from the dataset, calculates the gradient of the loss, and then updates the parameters.
              </p>

              <div className="my-8 flex justify-center">
                <Image
                  src="/images/design-mode/252ab70fbbe1e027ac8146c25f89568c.png"
                  alt="SGD Update Formula: θ_{t+1} = θ_t - η∇_θL(θ_t; x_i)"
                  width={200}
                  height={50}
                  className="max-w-full h-auto"
                />
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Here, η is the learning rate, L is the loss function, and xi represents the data samples in the current
                mini-batch. Basically, the model's "memory" comes from the locality of the gradients — it tends to
                remember people who stand out, those with unique or unusual features. And if one sample happens to have
                an exceptionally large gradient, it might even dominate an entire update, leaving a clear "fingerprint"
                in the model's parameters.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                That's when data leakage can happen! So to avoid that, we need to tone down the influence of those
                strong, individual gradients.
              </p>
            </section>

            <section id="technical-approach" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How DP-SGD works?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                So how can we have strong privacy protection and still keep the model's learning performance intact?
                That's where the most important concept in the whole paper comes in — DP-SGD.
              </p>
              <div className="my-8 flex justify-center">
                <Image
                  src="/images/design-mode/9-Figure2-1.png"
                  alt="DP-SGD Workflow Diagram showing the process: Compute gradient, clip gradients, add noise, and update parameters in a cycle"
                  width={800}
                  height={300}
                  className="max-w-full h-auto border border-gray-200 rounded-lg"
                />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                If we take the idea of DP and plug it into SGD, we get DP-SGD. (Sounds simple, right?) Of course it's
                not that trivial, so let's walk through it step by step.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Before we really dive in, there's one concept that'll make everything a lot easier to understand — the
                EM step. It's basically a general method for estimating parameters in probabilistic models that have
                latent variables or incomplete data.
              </p>

              <div className="my-8 flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EM_combined_horizontal-fO1LKP46fkhdCBwndqqaGI0TRpceHS.png"
                  alt="Three-panel EM algorithm progression showing: initial state with targets A and B and scattered data points, classification with probability distributions P(A)=0.6/P(B)=0.4 and P(A)=0.2/P(B)=0.8, and final state demonstrating differential privacy mechanism"
                  width={1200}
                  height={300}
                  className="max-w-full h-auto border border-gray-200 rounded-lg"
                />
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The EM algorithm works by repeatedly estimating the distribution of the latent variables (the E-step)
                and updating the parameters (the M-step) to approximately maximize the likelihood. In other words, it
                helps the model make better and better guesses over time. During the E-step, the model "guesses" the
                probability that each sample belongs to a certain class or latent state under the current parameters.
                Then in the M-step, it "re-trains" the model based on those guesses, adjusting the parameters to
                maximize the likelihood under these soft labels. The E-step and M-step alternate, and typically the
                log-likelihood keeps increasing until the process converges.
              </p>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">3 Step</h3>
              <ul className="space-y-3 text-lg text-gray-700 leading-relaxed mb-4">
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    <strong className="text-gray-900">Gradient Clipping:</strong> Step one: they set an upper limit on
                    each sample's gradient.Let's say each sample has a gradient gi, Then we define a threshold C, and
                    clip the gradient's L2 norm as follows:
                  </span>
                </li>
                <div className="my-6 flex justify-center">
                  <Image
                    src="/images/design-mode/94adadd66c87689f02313b7c5015e416.png"
                    alt="Gradient Clipping Formula: g̃_i = g_i · min(1, C/||g_i||_2)"
                    width={250}
                    height={60}
                    className="max-w-full h-auto"
                  />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  This step is kind of like setting a "speaking time limit" in a group discussion — everyone gets to
                  share their opinion, but no one gets to dominate the conversation. As a result, we're not only
                  protecting privacy, but also handling those outlier samples at the same time — because, you know,
                  real-world data is never perfect.
                </p>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    <strong className="text-gray-900">Gaussian Noise Addition:</strong> Step two: and this is really the
                    heart of the paper, before averaging all the clipped gradients, the algorithm adds a random noise
                    term to their sum. Here, L is the lot size, N denotes a multidimensional Gaussian distribution, and
                    σ controls the strength of the noise as follows:
                  </span>
                </li>
                <div className="my-6 flex justify-center">
                  <Image
                    src="/images/design-mode/3d7d540f0fa3529843b2db410204ac70.png"
                    alt="Gaussian Noise Addition Formula: g̃ = (1/L) * (Σ(i=1 to L) g̃_i + N(0, σ²C²I))"
                    width={300}
                    height={70}
                    className="max-w-full h-auto"
                  />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The intuition here is like blurring individual voices in a crowd — everyone contributes, but each
                  person's input gets mixed with a bit of random noise. That way, an outside observer can't tell whether
                  any specific person's opinion was actually included or not.
                </p>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    <strong className="text-gray-900">Moments Accountant:</strong> Step three: my favorite part.In early
                    DP research, algorithms could only roughly add up the privacy loss. Think of it like running
                    training for many steps, with each step “spending” a bit of privacy budget, and then summing up the
                    total at the end. But Abadi and his team came up with a more refined approach. Instead of directly
                    adding up the privacy loss, they track the higher-order moments of the privacy loss — that's why
                    it's called the Moments Accountant. In other words, every training step carries a bit of
                    uncertainty. Rather than looking at each individual error, they look at the overall shape of the
                    distribution. This gives a much tighter and more accurate estimate of the total ε value.
                  </span>
                </li>
              </ul>
            </section>

            <section id="results" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Results</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                When they tested it on the MNIST dataset, the traditional method gave an ε value of 9.34, while the
                Moments Accountant brought it down to just 1.26 — that's a huge improvement in privacy! And the best
                part is, the model's performance didn't drop — it actually got better. I even tried it out myself
                locally, and the results were impressive.
              </p>
              <div className="my-8 flex justify-center">
                <Image
                  src="/images/design-mode/%E4%B8%8B%E8%BD%BD.png"
                  alt="Grid of MNIST handwritten digit samples showing training data - multiple rows and columns of digits 0-9 in white on black background"
                  width={800}
                  height={1000}
                  className="max-w-full h-auto border border-gray-200 rounded-lg"
                />
              </div>
              <div className="my-8 flex justify-center">
                <Image
                  src="/images/design-mode/download.png"
                  alt="NLL Curve showing Training NLL and Testing NLL over 200 iterations - both curves decrease from ~550 to ~100-150 and plateau"
                  width={700}
                  height={500}
                  className="max-w-full h-auto border border-gray-200 rounded-lg"
                />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The experiment section in the paper is super detailed, especially the comparison between MNIST and
                CIFAR-10. I used the exact same network structure they did in my own test.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                That means even when I add noise into the gradients, the model can still recognize handwritten digits!
                The train accuracy and test accuracy of the differentially private model are almost the same — which
                shows that it's not overfitting.
              </p>
            </section>

            <section id="future" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: Teaching AI the Art of Forgetting</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We often describe AI as something that knows everything. But as I read and reflected on this paper, I
                realized — AI doesn't have to know it all. In fact, sometimes it needs to learn how to forget.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                In the world of differential privacy, learning is an act of restraint. A good learning model doesn't
                memorize every sample — it learns to distill patterns from the noise. And in doing so, it not only
                protects human privacy, but also becomes more general and adaptable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                In my eyes, this paper represents the true beginning of modern trustworthy AI — the moment we started
                teaching machines not just to think, but to be responsible.
              </p>
            </section>

            <section id="conclusion" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">References</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Abadi, M., Chu, A., Goodfellow, I., McMahan, H. B., Mironov, I., Talwar, K., & Zhang, L. (2016). Deep
                learning with differential privacy. In Proceedings of the 2016 ACM SIGSAC Conference on Computer and
                Communications Security (pp. 308–318). ACM.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">https://doi.org/10.1145/2976749.2978318</p>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Jayaraman, B., & Evans, D. (2019). Evaluating differential privacy for deep learning models: A case
                study in membership inference attacks. In Proceedings of the 28th USENIX Security Symposium (USENIX
                Security 19) (pp. 261–278). USENIX Association.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                https://www.usenix.org/conference/usenixsecurity19/presentation/jayaraman
              </p>
            </section>
          </article>

          {/* Floating Table of Contents - Desktop Only */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-8">
              <nav className="space-y-1">
                <p className="text-sm font-semibold text-gray-900 mb-4">Table of Contents</p>
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === item.id
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

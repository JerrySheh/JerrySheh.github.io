import{_ as t,c as r,f as a,o as n}from"./app-D22ydJtp.js";const o={};function s(i,e){return n(),r("div",null,e[0]||(e[0]=[a('<h1 id="问题的来源" tabindex="-1"><a class="header-anchor" href="#问题的来源"><span>问题的来源</span></a></h1><p>以前的计算机都只有一个 CPU， 并且一次只能执行一个程序。后来出现了 <strong>多任务（multitasking）</strong> 使得计算机可以同时执行多个程序，但这并不是真正的“同时”，只是把 CPU 分成多个时间片，由操作系统去调度切换。再之后出现了 <strong>多线程（multithreading）</strong> 使得在一个程序里面可以同时执行多个控制流，就像你有多个 CPU 在执行同一个程序一样。在单 CPU 的计算机中，多线程的“同时”并不是“同时”，但现代计算机一般都是多核 CPU，不同的线程可以被不同的 CPU 核心同时执行，是真正的同时。</p><p><img src="http://tutorials.jenkov.com/images/java-concurrency/java-concurrency-tutorial-introduction-1.png" alt="multithreading"></p><p>如果一个线程在读一块内存区域的同时，另一个线程在往里面写，那么这块区域的值是什么？或者两个线程同时写一块内存区域，它的值又是什么？假如我们没有对这些可能出现的结果进行防范，那么结果将是不可预测的。什么情况都可能发生。因此，我们需要在一些共享资源上做一些措施，例如内存、文件、数据库等。</p><hr><h1 id="为什么要多线程" tabindex="-1"><a class="header-anchor" href="#为什么要多线程"><span>为什么要多线程？</span></a></h1><h2 id="利" tabindex="-1"><a class="header-anchor" href="#利"><span>利</span></a></h2><ol><li><strong>更好的资源利用</strong>：多线程程序在一个线程加载 IO 的同时，另一个线程可以处理已经加载完毕的 IO，以节省时间。</li><li><strong>简化程序设计</strong>：单线程程序，既要负责加载IO，又要负责处理。多线程程序，可以让一个线程专门加载，另一个线程专门处理。程序逻辑更加清晰。</li><li><strong>更加高效的程序</strong>：当一个请求进来时，处理请求可能需要耗费一些时间。单线程程序这时候就无法接收新的请求了，而多线程程序一个线程负责接收请求，每次收到请求都开一个专门的线程去处理，实现了多请求。</li></ol><h2 id="弊" tabindex="-1"><a class="header-anchor" href="#弊"><span>弊</span></a></h2><ol><li><strong>更加复杂的设计</strong>：多线程有时候会让程序变得更加复杂（complex）。</li><li><strong>上下文切换消耗</strong>：CPU从一个线程切换到另一个线程时，要先保存上一个线程的 local data，程序指针等。这会带来一些消耗。</li><li><strong>提高资源消耗</strong>：多线程本身需要一些内存用于存储其 local stack，这可能消耗一些内存资源。不要以为它很小，实际上可能比你想象的多。</li></ol><hr><h1 id="并发模型-concurrency-models" tabindex="-1"><a class="header-anchor" href="#并发模型-concurrency-models"><span>并发模型（Concurrency Models）</span></a></h1><p>并发模型指的是线程如何在系统中协同完成一项工作。不同的并发系统可以用不同的并发模型来实现。</p><h2 id="并发模型和分布式系统的相似性" tabindex="-1"><a class="header-anchor" href="#并发模型和分布式系统的相似性"><span>并发模型和分布式系统的相似性</span></a></h2><p>并发系统模型跟分布式系统（distributed systems）十分相似。例如，并发系统是不同的线程之间互相通讯（communicate），而分布式系统是不同的进程之间互相通讯（这些进程可能在不同的计算机上）。</p><p>进程和线程在某些时候十分相似，这也是为什么不同的并发模型往往看起来都很像分布式系统架构。分布式系统需要面临网络请求可能失败、远程计算机或进程可能挂掉等问题，在并发系统中也会遇到类似 CPU 故障、网卡故障、硬盘故障等问题，虽然这些故障发生的概率很低，但理论上确实存在。</p><p>正因为并发模型和分布式系统十分相似，因此他们之间有些设计思想是相通的。例如，并发里面用于分配 workers（threads）的模型，就类似于分布式系统的负载均衡（load balancing in distributed systems）。</p><h2 id="模型1-并行-workers-模型" tabindex="-1"><a class="header-anchor" href="#模型1-并行-workers-模型"><span>模型1：并行 Workers 模型</span></a></h2><p><img src="http://tutorials.jenkov.com/images/java-concurrency/concurrency-models-1.png" alt="parallel workers"></p><p>在这个模型中，所有 Worker（Thread）都由 delegator 来委派。<strong>每一个 Worker 都完成一个完整的工作</strong>。例如，在一个车间工厂，一辆车从零到一都只由一个 Worker 来完成。</p><p>这种模型在 Java 中用得非常多。在 java.util.concurrent 包中，许多的并发工具都是用这个模型来设计的。在 J2EE 应用服务器中也能看到这种模型的影子。</p><h2 id="模型2-流水线模型" tabindex="-1"><a class="header-anchor" href="#模型2-流水线模型"><span>模型2：流水线模型</span></a></h2><p>流水线模型，也叫响应式系统或者事件驱动系统。</p><p>在这个模型中，每一个 Worker 只负责整个工作的一小部分，一旦完成自己的部分，就交给下一个 Worker 接着做。每个 Worker 都运行在单独的线程上，与其他 Worker 不共享状态。因此，流水线模型也叫做无共享（shared nothing）模型。这种模型通常用 <strong>非阻塞IO（non-blocking IO，NIO）</strong> 来实现。</p><p>所谓响应式，或者事件驱动，指的是当一个事件发生，Worker 就响应对应的动作。例如，一个HTTP请求进来，或者一个文件被加载进内存。响应式平台的例子有Vert.x、Akka、Node.JS。</p><p><img src="http://tutorials.jenkov.com/images/java-concurrency/concurrency-models-3.png" alt="Assembly Line"></p><h2 id="模型3-函数式并行" tabindex="-1"><a class="header-anchor" href="#模型3-函数式并行"><span>模型3：函数式并行</span></a></h2><p>函数式并行的基本思想是采用函数调用实现程序。函数都是通过拷贝来传递参数的，所以 <strong>除了接收函数外没有实体可以操作数据，这就避免了共享数据带来的竞争</strong>。同样也使得函数的执行类似于原子操作。每个函数调用的执行独立于任何其他函数的调用。</p><p>一旦每个函数调用都可以独立的执行，它们就可以分散在不同的CPU上执行了。这也就意味着能够在多处理器上并行的执行使用函数式实现的算法。在 Java8 中，并行 streams 能够用来帮助我们并行的迭代大型集合。</p><hr><h1 id="same-threading" tabindex="-1"><a class="header-anchor" href="#same-threading"><span>Same-threading</span></a></h1><p>Same-threading 是一种并发模型。当一个单线程系统扩展到多线程系统时，每个线程所做的工作跟单线程时一样，用在多核CPU上，每个CPU占一个线程。</p><p>分布式微服务是一个例子。将多个相同的服务部署在同一台机器上，这台机器的每个CPU占一个服务实例。</p><hr><h1 id="并发和并行" tabindex="-1"><a class="header-anchor" href="#并发和并行"><span>并发和并行</span></a></h1><p>暂时略过。</p>',36)]))}const l=t(o,[["render",s],["__file","index.html.vue"]]),p=JSON.parse('{"path":"/computer-system/mj0edu6w/","title":"聊聊并发和并发模型","lang":"zh-CN","frontmatter":{"title":"聊聊并发和并发模型","comments":false,"categories":"操作系统","tags":["并发"],"abbrlink":"3bdfeb29","createTime":"2018/10/30 11:18:00","permalink":"/computer-system/mj0edu6w/","description":"问题的来源 以前的计算机都只有一个 CPU， 并且一次只能执行一个程序。后来出现了 多任务（multitasking） 使得计算机可以同时执行多个程序，但这并不是真正的“同时”，只是把 CPU 分成多个时间片，由操作系统去调度切换。再之后出现了 多线程（multithreading） 使得在一个程序里面可以同时执行多个控制流，就像你有多个 CPU 在执...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/computer-system/mj0edu6w/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"聊聊并发和并发模型"}],["meta",{"property":"og:description","content":"问题的来源 以前的计算机都只有一个 CPU， 并且一次只能执行一个程序。后来出现了 多任务（multitasking） 使得计算机可以同时执行多个程序，但这并不是真正的“同时”，只是把 CPU 分成多个时间片，由操作系统去调度切换。再之后出现了 多线程（multithreading） 使得在一个程序里面可以同时执行多个控制流，就像你有多个 CPU 在执..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://tutorials.jenkov.com/images/java-concurrency/java-concurrency-tutorial-introduction-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"并发"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"聊聊并发和并发模型\\",\\"image\\":[\\"http://tutorials.jenkov.com/images/java-concurrency/java-concurrency-tutorial-introduction-1.png\\",\\"http://tutorials.jenkov.com/images/java-concurrency/concurrency-models-1.png\\",\\"http://tutorials.jenkov.com/images/java-concurrency/concurrency-models-3.png\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"利","slug":"利","link":"#利","children":[]},{"level":2,"title":"弊","slug":"弊","link":"#弊","children":[]},{"level":2,"title":"并发模型和分布式系统的相似性","slug":"并发模型和分布式系统的相似性","link":"#并发模型和分布式系统的相似性","children":[]},{"level":2,"title":"模型1：并行 Workers 模型","slug":"模型1-并行-workers-模型","link":"#模型1-并行-workers-模型","children":[]},{"level":2,"title":"模型2：流水线模型","slug":"模型2-流水线模型","link":"#模型2-流水线模型","children":[]},{"level":2,"title":"模型3：函数式并行","slug":"模型3-函数式并行","link":"#模型3-函数式并行","children":[]}],"readingTime":{"minutes":5.43,"words":1630},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/computer-system/9.聊聊并发和并发模型.md"}');export{l as comp,p as data};

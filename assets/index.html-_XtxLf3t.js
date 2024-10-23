import{_ as i,c as a,f as n,o as e}from"./app-D22ydJtp.js";const t={};function l(h,s){return e(),a("div",null,s[0]||(s[0]=[n(`<p>异常只用于异常的情况，不要用 <code>try-catch</code> 捕获 <code>ArrayIndexOutOfBoundsException </code> 并且不做任何处理这种方式来跳出数组遍历。为什么不用 <code>for-each</code> 循环呢？</p><p>设计良好的 API 不应该强迫它的客户端为了正常的控制流程而使用异常。</p><p>例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Iterator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Foo</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> collection</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">iterator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">hasNext</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ){</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    Foo</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> foo</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    ...</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>hasNext</code>方法是一个状态测试机。如果 Iterator API 没有设计 hasNext 方法，那么客户端代码将会变得很丑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">/* Do not use this hideous code for iteration over a collection! */</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">try</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    Iterator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Foo</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> collection</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">iterator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    while</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> true</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> )</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        Foo</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> foo</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        ...</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> catch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> NoSuchElementException </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">e</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> )</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="item-70-对可恢复的情况使用checked-exception-对编程错误使用unchecked-exception-runtime-exception" tabindex="-1"><a class="header-anchor" href="#item-70-对可恢复的情况使用checked-exception-对编程错误使用unchecked-exception-runtime-exception"><span>Item 70 对可恢复的情况使用checked exception，对编程错误使用unchecked exception（runtime exception）</span></a></h1><p>使用 checked exception 还是 unchecked exception 的一个基本原则是，你是不是想让程序恢复。如果是，使用 checked exception。</p><p>像 <code>ArrayIndexOutOfBoundsException </code>、<code>NullPointerException</code> 这类 unchecked exception 异常，可以通过优化代码实现来避免，不应该捕获。而像 <code>IOException</code> 是不可避免的，应当捕获并处理。</p><hr><h1 id="item-71-避免对-checked-exception-不必要的使用" tabindex="-1"><a class="header-anchor" href="#item-71-避免对-checked-exception-不必要的使用"><span>Item 71 避免对 checked exception 不必要的使用</span></a></h1><p>正如前面所说的，异常只用于异常情况。有些 <code>try-catch</code> 实际上可以分解重构成 <code>if-else</code>，对于真正有异常的部分才进入 <code>try-catch</code> 块。不要过度使用 <code>try-catch</code>。</p><hr><h1 id="item-72-优先使用标准的异常" tabindex="-1"><a class="header-anchor" href="#item-72-优先使用标准的异常"><span>Item 72 优先使用标准的异常</span></a></h1><p>Java 平台类库提供了一组基本的 unchecked exception，它们满足了绝大多数 API 的异常抛出需求。应该尽可能使用。</p><table><thead><tr><th>异常</th><th>使用场合</th></tr></thead><tbody><tr><td>IllegalArgumentException</td><td>非 null 的参数值不正确（如接收非负数的方法传入了-1）</td></tr><tr><td>IllegalStateException</td><td>不适合方法调用的对象状态（如对象未被正确初始化前就被调用）</td></tr><tr><td>NullPointerException</td><td>在禁止使用 null 的情况下参数值为 null</td></tr><tr><td>IndexOutOfBoundsExecption</td><td>下标参数值越界</td></tr><tr><td>ConcurrentModificationException</td><td>在禁止并发修改的情况下，检测到对象的并发修改</td></tr><tr><td>UnsupportedOperationException</td><td>对象不支持用户请求的方法</td></tr></tbody></table><hr><h1 id="item-73-异常转译和异常链" tabindex="-1"><a class="header-anchor" href="#item-73-异常转译和异常链"><span>Item 73 异常转译和异常链</span></a></h1><p>高层的实现应该捕获底层的异常，同时抛出可以按照高层抽象进行解释的异常。这种做法称为 <strong>异常转译 （exception translation）</strong>。</p><p>例如下面的例子，高层的将 <code>get(i)</code> 将底层 <code>i.next()</code> 的 <code>NoSuchElementException</code> 转译成 <code>IndexOutOfBoundsException</code> 并抛出。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">/**</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> * Returns the element at the specified position in this list.</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> * </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">@throws</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> IndexOutOfBoundsException</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> if the index is out of range</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> * ({@code index &lt; 0 || index &gt;= size()}).</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> */</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> E </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">get</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> index</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    ListIterator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">E</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> listIterator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">index</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    try</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> );</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> catch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">NoSuchElementException </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">e</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        throw</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> IndexOutOfBoundsException</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Index: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> index</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在转译时，可以形成 <strong>异常链（exception chaining）</strong>，将底层异常带出去。如果低层的异常对于调试导致高层异常的问题非常有帮助，使用异常链就很合适。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// Exception Chaining</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">try</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">...</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Use lower-level abstraction to do our bidding</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> catch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">LowerLevelException </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">cause</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    throw</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> HigherLevelException</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">cause</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但也不能滥用异常链，使用原则是：优先处理异常，无法处理时才向上抛出或转译抛出，如果底层异常对高层调试有帮助，才用异常链。</p><hr><h1 id="item-74-每个方法抛出的异常都需要创建文档" tabindex="-1"><a class="header-anchor" href="#item-74-每个方法抛出的异常都需要创建文档"><span>Item 74 每个方法抛出的异常都需要创建文档</span></a></h1><p>使用 Javadoc 的 <code>＠throws</code> 标签记录一个方法可能抛出的每个unchecked exception，但是不要使用 throws 关键字将 unchecked exception 包含在方法的声明中。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// do this</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">/**</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> * </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">@throws</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> may</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> cause NullPointerException</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> **/</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> String </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">foo</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// don&#39;t do this</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> String foo thorws </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">NullPointerException</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="item-75-异常输出" tabindex="-1"><a class="header-anchor" href="#item-75-异常输出"><span>Item 75 异常输出</span></a></h1><p>输出异常的细节信息应该包含有用的所有参数和字段的值。例如 <code>IndexOutOfBoundsException</code> 应该包含下界、上界以及实际使用的下标值。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>Exception in thread &quot;main&quot; java.lang.IndexOutOfBoundsException: Index: 5, Size: 2</span></span>
<span class="line"><span>	at java.util.ArrayList.rangeCheck(ArrayList.java:657)</span></span>
<span class="line"><span>	at java.util.ArrayList.get(ArrayList.java:433)</span></span>
<span class="line"><span>	at test.Test.main(Test.java:18)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Tips：千万不要在细节消息中包含密码、密钥以及类似的信息！</p></blockquote><hr><h1 id="item-76-failure-atomic" tabindex="-1"><a class="header-anchor" href="#item-76-failure-atomic"><span>Item 76 failure atomic</span></a></h1><p>一般而言，失败的方法调用应该使对象保持在被调用之前的状态。具有这种属性的方法被称为具有 <strong>失败原子性（failure atomic）</strong>。也就是说，出现异常并捕获，之后程序恢复，不会因此有其他任何状态的改变。</p><p>最简单的方法是用不可变对象。不可变对象的状态永远是一致的。对于在可变对象，获得失败原子性最常见的办法是，在执行操作之前检查参数的有效性 （Item 49）。这可以使得在对象的状态被修改之前，先抛出适当的异常。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Object </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">pop</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> size </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">==</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> )</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        throw</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> EmptyStackException</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    Object</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> result</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> elements</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">--</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">size</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">];</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    elements</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">size</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> /* Eliminate obsolete reference */</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">result</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果取消对初始大小（size）的检查，当这个方法试图从一个空栈中弹出元素时，它仍然会抛出异常。然而，这将会导致 size 字段保持在不一致的状态（负数）之中，从而导致将来对该对象的任何方法调用都会失败。</p><p>总而言之，<strong>想办法让在异常抛出前后，对象的状态保持一致</strong>。你可以提前检查（像上面那样），可以调整计算处理的顺序，可以在对象的一份临时拷贝上执行操作，操作完再去代替对象本身。或者是，编写恢复对象状态的代码（不常用）。</p><p>虽然一般情况下都希望实现失败原子性，但并非总是可以做到。如果两个线程企图在没有适当的同步机制的情况下，并发地修改同一个对象，这个对象就有可能被留在不一致的状态之中。因此，在捕获了 <code>ConcurrentModificationException</code> 异常之后再假设对象仍然是可用的，这就是不正确的。</p><hr><h1 id="item-77-不要忽略异常" tabindex="-1"><a class="header-anchor" href="#item-77-不要忽略异常"><span>Item 77 不要忽略异常</span></a></h1><p>忽略一个异常非常容易，只需将方法调用通过 try 语句包围起来，并包含一个空的 catch 块。但是，最好不要这么做。空的 catch 块会使异常达不到应有的目的。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// Empty catch block ignores exception - Highly suspect!</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">try</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    ...</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> catch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> SomeException </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">e</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> )</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即使确实不需要做任何处理，把异常记录下来还是明智的做法，因为如果这些异常经常发生，你就可以调查异常的原因。</p><p>如果异常确实也不需要记录下来，才选择忽略异常，catch 块中应该包含一条注释，说明为什么可以这么做，并且变量应该命名为 ignored。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">try</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    numColors </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> f</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">get</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1L</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> TimeUnit</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">SECONDS</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> );</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> catch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> TimeoutException </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">|</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ExecutionException </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">ignored</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> )</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // Use default: minimal coloring is desirable, not required</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,49)]))}const k=i(t,[["render",l],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/java/gz9xh5av/","title":"Effective Java（九）异常","lang":"zh-CN","frontmatter":{"title":"Effective Java（九）异常","comments":true,"abbrlink":"4e34dae4","createTime":"2019/11/29 19:50:38","categories":["Java","Effective Java"],"tags":["Java"],"permalink":"/java/gz9xh5av/","description":"异常只用于异常的情况，不要用 try-catch 捕获 ArrayIndexOutOfBoundsException 并且不做任何处理这种方式来跳出数组遍历。为什么不用 for-each 循环呢？ 设计良好的 API 不应该强迫它的客户端为了正常的控制流程而使用异常。 例如： hasNext方法是一个状态测试机。如果 Iterator API 没有设计...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/java/gz9xh5av/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"Effective Java（九）异常"}],["meta",{"property":"og:description","content":"异常只用于异常的情况，不要用 try-catch 捕获 ArrayIndexOutOfBoundsException 并且不做任何处理这种方式来跳出数组遍历。为什么不用 for-each 循环呢？ 设计良好的 API 不应该强迫它的客户端为了正常的控制流程而使用异常。 例如： hasNext方法是一个状态测试机。如果 Iterator API 没有设计..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Effective Java（九）异常\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":5.48,"words":1643},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/java/2.effective java/09.Effective-Java（九）异常.md"}');export{k as comp,d as data};

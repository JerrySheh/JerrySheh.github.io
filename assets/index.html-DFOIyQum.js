import{_ as i,c as a,f as n,o as e}from"./app-D22ydJtp.js";const l="/images/Java/io.png",t={};function h(p,s){return e(),a("div",null,s[0]||(s[0]=[n(`<p>在代码运行期间动态增加功能的方式，称之为装饰器（Decorator），装饰器的好处是，为一个类的对象添加新的功能，而无需继承。</p><hr><h2 id="装饰器模式例子" tabindex="-1"><a class="header-anchor" href="#装饰器模式例子"><span>装饰器模式例子</span></a></h2><p>一个图形接口</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> interface</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>矩形</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Rectangle</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> implements</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    @</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Override</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">draw a rectangle</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>矩形绘制</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> main</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> args</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 普通矩形</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    Shape</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> rectangle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Rectangle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    rectangle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们增强图形 <strong>自身</strong> 的功能，让它在绘制的时候会发光！我们不想改接口，也不想在每个实现类中都去写发光的代码（因为都一样）。</p><p>解决办法：新增一个图形发光装饰类</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">/**</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> * 为 shape 添加发光功能</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> */</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> ShapeLightingDecorator</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> implements</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    private</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Shape</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> ShapeLightingDecorator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Shape </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">        this</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> lighting</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(){</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">lighting when draw</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 绘制时发光</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    @</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Override</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        lighting</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看看效果</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> main</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> args</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 普通矩形</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    Shape</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> rectangle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Rectangle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    rectangle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 装饰过发光功能的矩形</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    Shape</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> lightingRectAngle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> ShapeLightingDecorator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Rectangle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">());</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    lightingRectAngle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="装饰器模式跟代理模式的区别" tabindex="-1"><a class="header-anchor" href="#装饰器模式跟代理模式的区别"><span>装饰器模式跟代理模式的区别</span></a></h2><p>两者都是对类的方法进行扩展，但 <strong>装饰器模式强调的是增强自身</strong>，在被装饰之后你能够在被增强的类上使用增强后的功能。增强后你还是你，只不过能力更强了；<strong>代理模式则强调要让别人帮你去做一些本身与你业务没有太多关系的职责（记录日志、设置缓存）</strong>。代理模式是为了实现对象的控制，因为被代理的对象往往难以直接获得或者是其内部不想暴露出来。</p><p>强行区分这两者的区别并没有太多意义，毕竟他们之间的边界确实比较模糊。</p><p>参考：</p><ul><li><a href="https://www.zhihu.com/question/41988550/answer/462204684" target="_blank" rel="noopener noreferrer">Java中“装饰模式”和“代理模式”有啥区别？</a></li></ul><hr><h2 id="jdk中使用-decorator-模式的例子" tabindex="-1"><a class="header-anchor" href="#jdk中使用-decorator-模式的例子"><span>JDK中使用 Decorator 模式的例子</span></a></h2><h2 id="io流" tabindex="-1"><a class="header-anchor" href="#io流"><span># IO流</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">BufferedInputStream</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> bufferedInputStream</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> BufferedInputStream</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">inputStream</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>BufferedInputStream 装饰了 inputStream 。</p><p>java.io 包中，输入流的抽象类是 InputStream, FileInputStream 继承 InputStream 并拥有文件输入流的特性。而 FliterInputStream 是一个抽象装饰器，我们熟悉的 BufferedInputStream 正是 FliterInputStream 的一个具体类，它包装一个了 InputStream，并为之扩展缓冲的功能。</p><p><img src="`+l+`" alt="图片来自《Head First 设计模式》"></p><p>在一些框架中，如 Spring，使用了 Decorator pattern 的一般类名中都含有 Wrapper 或 Decorator。作用基本上都是动态地给一个对象添加一些额外的职责。</p><hr><h2 id="python-中的-decorator" tabindex="-1"><a class="header-anchor" href="#python-中的-decorator"><span>Python 中的 Decorator</span></a></h2><p>在 Python 中实现装饰器非常简单</p><p>首先我们要绘制：</p><div class="language-python line-numbers-mode" data-ext="python" data-title="python"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">():</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">    print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">draw</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在想在绘制之后发光，但又不想修改 <code>draw()</code> 本身，可以用装饰器来加强 draw，这个装饰器传入了一个函数，对函数进行增强，然后返回增强后的函数</p><div class="language-python line-numbers-mode" data-ext="python" data-title="python"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> draw_lighting_decorator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">func</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> wrapper</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">():</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        func</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">        print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">lighting</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> wrapper</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用</p><div class="language-python line-numbers-mode" data-ext="python" data-title="python"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">##   draw 是一个函数</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">draw </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> draw_lighting_decorator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">##   函数调用</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>draw</span></span>
<span class="line"><span>lighting</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="语法糖" tabindex="-1"><a class="header-anchor" href="#语法糖"><span># 语法糖</span></a></h2><p>Python 提供了 <code>@</code> 语法糖，让我们不必显式调装饰函数，只需要在原函数上加上注解，自动装饰。</p><div class="language-python line-numbers-mode" data-ext="python" data-title="python"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> draw_lighting_decorator</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">func</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">functools</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wraps</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">func</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> wrapper</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">():</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        func</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">        print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">lighting</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> wrapper</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">@</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">draw_lighting_decorator</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">():</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">    print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">draw</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">if</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> __name__</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ==</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">__main__</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    draw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@functools.wraps(func)</code> 的作用是，在装饰后，函数名还是 <code>draw()</code> 函数的名，而不是 <code>draw_lighting_decorator()</code> 函数的名</p>`,43)]))}const d=i(t,[["render",h],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/pattern-design/decorator/","title":"设计模式（四）装饰器模式","lang":"zh-CN","frontmatter":{"title":"设计模式（四）装饰器模式","comments":true,"categories":"设计模式","tags":["设计模式"],"abbrlink":"fb099b33","createTime":"2019/05/28 11:32:58","permalink":"/pattern-design/decorator/","description":"在代码运行期间动态增加功能的方式，称之为装饰器（Decorator），装饰器的好处是，为一个类的对象添加新的功能，而无需继承。 装饰器模式例子 一个图形接口 矩形 矩形绘制 现在，我们增强图形 自身 的功能，让它在绘制的时候会发光！我们不想改接口，也不想在每个实现类中都去写发光的代码（因为都一样）。 解决办法：新增一个图形发光装饰类 看看效果 装饰器模...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/pattern-design/decorator/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"设计模式（四）装饰器模式"}],["meta",{"property":"og:description","content":"在代码运行期间动态增加功能的方式，称之为装饰器（Decorator），装饰器的好处是，为一个类的对象添加新的功能，而无需继承。 装饰器模式例子 一个图形接口 矩形 矩形绘制 现在，我们增强图形 自身 的功能，让它在绘制的时候会发光！我们不想改接口，也不想在每个实现类中都去写发光的代码（因为都一样）。 解决办法：新增一个图形发光装饰类 看看效果 装饰器模..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://jerrysheh.com/images/Java/io.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"设计模式（四）装饰器模式\\",\\"image\\":[\\"https://jerrysheh.com/images/Java/io.png\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"装饰器模式例子","slug":"装饰器模式例子","link":"#装饰器模式例子","children":[]},{"level":2,"title":"装饰器模式跟代理模式的区别","slug":"装饰器模式跟代理模式的区别","link":"#装饰器模式跟代理模式的区别","children":[]},{"level":2,"title":"JDK中使用 Decorator 模式的例子","slug":"jdk中使用-decorator-模式的例子","link":"#jdk中使用-decorator-模式的例子","children":[]},{"level":2,"title":"# IO流","slug":"io流","link":"#io流","children":[]},{"level":2,"title":"Python 中的 Decorator","slug":"python-中的-decorator","link":"#python-中的-decorator","children":[]},{"level":2,"title":"# 语法糖","slug":"语法糖","link":"#语法糖","children":[]}],"readingTime":{"minutes":2.87,"words":861},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/pattern-design/4.设计模式（四）装饰器模式.md"}');export{d as comp,r as data};

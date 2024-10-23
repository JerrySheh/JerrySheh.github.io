import{_ as i,c as a,f as n,o as l}from"./app-D22ydJtp.js";const e={};function h(t,s){return l(),a("div",null,s[0]||(s[0]=[n(`<p>链表操作的两个技巧：</p><ol><li>尽量处理当前节点的下一个节点而非当前节点本身</li><li>建立一个虚拟节点 (dummy node)，使其指向当前链表的头节点，这样即使原链表，所有节点全被删除，也会有一个 dummy 存在，返回 dummy-&gt;next 即可</li></ol><hr><h2 id="_1-反转链表" tabindex="-1"><a class="header-anchor" href="#_1-反转链表"><span>1. 反转链表</span></a></h2><p>用三个变量 prev、curr、next 分别暂存上一个结点、当前结点、下一个结点，然后依次反转</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> prev</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    while</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">head </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">!=</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // 先把 next 保存</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> prev</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // 掉头，反指</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        prev </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      // 反指完成， prev 往后走</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        head </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      // 然后才是 head 往后走</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>递归解法</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">/**</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">* 输入一个节点 head，将「以 head 为起点」的链表反转，并返回反转之后的头结点</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">**/</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">private</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ListNode </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">reverseByRecursion</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">ListNode head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">head </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">==</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ||</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ==</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> last</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> reverseByRecursion</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> last</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_2-从尾到头打印链表" tabindex="-1"><a class="header-anchor" href="#_2-从尾到头打印链表"><span>2. 从尾到头打印链表</span></a></h2><blockquote><p>《剑指offer》题目6</p></blockquote><p>逆向输出链表，自然会想到用后进先出的栈。先遍历链表，把遍历的值依次写入栈，然后再出栈即可。</p><p>事实上，递归本身就是栈结构，这道题可以直接用递归代替栈。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 递归实现</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">private</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> reversePrint</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">ListNode node</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">node</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> !=</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        reversePrint</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">node</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">node</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_3-删除链表的节点" tabindex="-1"><a class="header-anchor" href="#_3-删除链表的节点"><span>3. 删除链表的节点</span></a></h2><blockquote><p>《剑指offer》题目18</p></blockquote><p>删除链表节点的两种方法(比如要删除 i 节点)：</p><ul><li>方法一: 遍历到 i 的前一个节点 h，将 h 指向 i 的下一个节点 j，然后删除 i</li><li>方法二：把节点 j 的内容复制到 i，将 i.next 指向 j 的下一节点 k，然后删除 j</li></ul><hr><h2 id="_4-链表中倒数第-k-个节点" tabindex="-1"><a class="header-anchor" href="#_4-链表中倒数第-k-个节点"><span>4. 链表中倒数第 k 个节点</span></a></h2><blockquote><p>《剑指offer》题目22</p></blockquote><p>两个指针，如求倒数第 3 个节点，A指针先走3步，然后B指针开始走，当A指针到尾的时候，B指针所指就是倒数第 k 个节点。（注意判空，例如链表只有2个节点）</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>2 → 88 → 60 → 21 → 6 → 13 → 78</span></span>
<span class="line"><span>↑（B）    ↑（A）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2 → 88 → 60 → 21 → 6 → 13 → 78</span></span>
<span class="line"><span>                   ↑（B）    ↑（A）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_5-链表中环的入口节点" tabindex="-1"><a class="header-anchor" href="#_5-链表中环的入口节点"><span>5. 链表中环的入口节点</span></a></h2><p>如果一个链表中包含环，如何找出环的入口节点？</p><p>两个指针，一个一次走一步，另一个一次走两步，如果快的指针追上了慢的指针，那链表就包含环。否则如果走得快的到了末尾（node.next = null）都没追上慢的，就不包括环。</p><p>相遇节点就是入口节点。</p><hr><h2 id="_6-合并两个有序的链表" tabindex="-1"><a class="header-anchor" href="#_6-合并两个有序的链表"><span>6. 合并两个有序的链表</span></a></h2><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>List1: 1 -&gt; 3 -&gt; 5 -&gt; 7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>List2：2 -&gt; 4 -&gt; 6 -&gt; 8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>合并后：1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5 -&gt; 6 -&gt; 7 -&gt; 8</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>先用临时变量把合并后的表头保存下来，以便方法返回</li><li>只要 a 和 b 都不为空，就比较 a b 当前结点，将小的值给 mergeHead， 然后往后走</li></ol><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">private</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ListNode </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">mergeByIteration</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">ListNode a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ListNode b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> mergeHead</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> ListNode</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // mergeHead是会往后走的， temp 保存表头</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> temp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> mergeHead</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        while</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">!=</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &amp;&amp;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> b </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">!=</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">            if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">value</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">                mergeHead</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">                a </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">            }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> else</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">                mergeHead</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">                b </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">            }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">            mergeHead </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> mergeHead</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 如果2个链表其中一个遍历完了，那合并后的链表后续结点直接取另一个链表</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        mergeHead</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> a </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">!=</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> ?</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> a </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">:</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> temp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_7-给定一个矩阵-交换每个相邻的一对节点" tabindex="-1"><a class="header-anchor" href="#_7-给定一个矩阵-交换每个相邻的一对节点"><span>7. 给定一个矩阵，交换每个相邻的一对节点</span></a></h2><blockquote><p>leetcode 24[medium]</p></blockquote><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>        1 2         2 1</span></span>
<span class="line"><span>        3 4         4 3</span></span>
<span class="line"><span>       before      after </span></span>
<span class="line"><span></span></span>
<span class="line"><span>Input:  1 -&gt; 2 -&gt; 3 -&gt; 4</span></span>
<span class="line"><span>Output: 2 -&gt; 1 -&gt; 4 -&gt; 3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个 dummy 结点，指向表头，以防交换后表头找不到了</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    /**</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *    1  -&gt;  2  -&gt;  3  -&gt; 4  -&gt;  5  -&gt; 6</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *    i     next   temp</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *   last   dummy</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *    2  -&gt;  1  -&gt;  3  -&gt; 4  -&gt;  5  -&gt; 6</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *   next    i     temp</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *   dummy   last</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *    2  -&gt;  1  -&gt;  3  -&gt; 4  -&gt;  5  -&gt; 6</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     *   dummy   last   i    next   temp</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     */</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">private</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ListNode </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">swapPairsByIteration</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">ListNode head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> dummyHead</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> last</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> head</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">!=</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        ListNode</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> temp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        last</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> temp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        last </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> dummyHead</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40)]))}const k=i(e,[["render",h],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/interview/ru4fi6m4/","title":"链表题思路","lang":"zh-CN","frontmatter":{"title":"链表题思路","comments":false,"createTime":"2024/10/23 23:28:04","permalink":"/interview/ru4fi6m4/","description":"链表操作的两个技巧： 尽量处理当前节点的下一个节点而非当前节点本身 建立一个虚拟节点 (dummy node)，使其指向当前链表的头节点，这样即使原链表，所有节点全被删除，也会有一个 dummy 存在，返回 dummy->next 即可 1. 反转链表 用三个变量 prev、curr、next 分别暂存上一个结点、当前结点、下一个结点，然后依次反转 递...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/interview/ru4fi6m4/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"链表题思路"}],["meta",{"property":"og:description","content":"链表操作的两个技巧： 尽量处理当前节点的下一个节点而非当前节点本身 建立一个虚拟节点 (dummy node)，使其指向当前链表的头节点，这样即使原链表，所有节点全被删除，也会有一个 dummy 存在，返回 dummy->next 即可 1. 反转链表 用三个变量 prev、curr、next 分别暂存上一个结点、当前结点、下一个结点，然后依次反转 递..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-23T15:38:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-23T15:38:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"链表题思路\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-23T15:38:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. 反转链表","slug":"_1-反转链表","link":"#_1-反转链表","children":[]},{"level":2,"title":"2. 从尾到头打印链表","slug":"_2-从尾到头打印链表","link":"#_2-从尾到头打印链表","children":[]},{"level":2,"title":"3. 删除链表的节点","slug":"_3-删除链表的节点","link":"#_3-删除链表的节点","children":[]},{"level":2,"title":"4. 链表中倒数第 k 个节点","slug":"_4-链表中倒数第-k-个节点","link":"#_4-链表中倒数第-k-个节点","children":[]},{"level":2,"title":"5. 链表中环的入口节点","slug":"_5-链表中环的入口节点","link":"#_5-链表中环的入口节点","children":[]},{"level":2,"title":"6. 合并两个有序的链表","slug":"_6-合并两个有序的链表","link":"#_6-合并两个有序的链表","children":[]},{"level":2,"title":"7. 给定一个矩阵，交换每个相邻的一对节点","slug":"_7-给定一个矩阵-交换每个相邻的一对节点","link":"#_7-给定一个矩阵-交换每个相邻的一对节点","children":[]}],"readingTime":{"minutes":3.16,"words":948},"git":{"createdTime":1729697898000,"updatedTime":1729697898000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/interview/algo/link/index.md"}');export{k as comp,d as data};

import{_ as p,c as d,f as n,a as i,b as a,d as t,e as l,r as k,o as r}from"./app-D22ydJtp.js";const g="/images/DataStructure/priorityqueue.png",y="/images/DataStructure/CBT.png",A="/images/DataStructure/k.png",c="/images/DataStructure/sink.png",o={};function u(v,s){const h=k("RouteLink"),e=k("font");return r(),d("div",null,[s[17]||(s[17]=n('<p>有时候我们会收集一些元素，然后处理当前键值最大的元素。然后再收集更多，再处理。例如，在手机来电、短信、游戏三个程序中，来电的优先级是最高的，我们总希望先处理来电请求。</p><p>满足这种场景的数据结构，需要支持两种操作：<strong>删除最大（或最小）元素</strong>、<strong>插入元素</strong>。这种数据类型，就叫<code>优先队列</code>。优先队列也是一种队列，但是跟前面提到的先进先出队列不同，优先队列的“出”，是根据优先级来的（最大或最小的先出）。</p><p><img src="'+g+'" alt="priorityqueue"></p><p>优先队列在很多地方有应用，例如：</p><ul><li><strong>数据压缩</strong>：哈夫曼编码算法</li><li><strong>最短路径算法</strong>：Dijkstra算法</li><li><strong>最小生成树算法</strong>：Prim算法</li><li><strong>事件驱动仿真</strong>：顾客排队算法</li><li><strong>选择问题</strong>：查找第k个最小元素</li></ul><hr><h1 id="初级实现" tabindex="-1"><a class="header-anchor" href="#初级实现"><span>初级实现</span></a></h1><h2 id="数组-无序" tabindex="-1"><a class="header-anchor" href="#数组-无序"><span>数组（无序）</span></a></h2>',8)),i("p",null,[s[1]||(s[1]=a("我们可以用 ")),t(h,{to:"/data-structure/leu82fhp/"},{default:l(()=>s[0]||(s[0]=[a("前面提到的")])),_:1}),s[2]||(s[2]=a(" 下压栈的方式来实现优先队列。 只是在其中加入一段内循环代码，将最大元素和栈顶元素交换，然后弹栈删除它。"))]),s[18]||(s[18]=i("h2",{id:"数组-有序",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#数组-有序"},[i("span",null,"数组（有序）")])],-1)),s[19]||(s[19]=i("p",null,[a("在"),i("strong",null,"插入操作"),a("中添加代码，将较大的元素往右边移动一格，以保证数组有序。这样，栈顶的元素永远是最大的，弹栈删除即可。")],-1)),s[20]||(s[20]=i("h2",{id:"链表实现",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#链表实现"},[i("span",null,"链表实现")])],-1)),i("p",null,[s[4]||(s[4]=a("可以用 ")),t(h,{to:"/data-structure/leu82fhp/"},{default:l(()=>s[3]||(s[3]=[a("前面提到的")])),_:1}),s[5]||(s[5]=a(" 基于链表的下压栈。 修改 ")),s[6]||(s[6]=i("code",null,"pop()",-1)),s[7]||(s[7]=a(" 找到并返回最大的元素， 或者修改 ")),s[8]||(s[8]=i("code",null,"push()",-1)),s[9]||(s[9]=a(" 保证所有元素逆序，并用 ")),s[10]||(s[10]=i("code",null,"pop()",-1)),s[11]||(s[11]=a(" 删除并返回链表的首元素（最大元素）。"))]),s[21]||(s[21]=n('<h2 id="不同实现的比较" tabindex="-1"><a class="header-anchor" href="#不同实现的比较"><span>不同实现的比较</span></a></h2><table><thead><tr><th>实现</th><th>插入</th><th>删除</th><th>寻找最小值</th></tr></thead><tbody><tr><td>无序数组</td><td>1</td><td>n</td><td>n</td></tr><tr><td>无序链表</td><td>1</td><td>n</td><td>n</td></tr><tr><td>有序数组</td><td>n</td><td>1</td><td>1</td></tr><tr><td>有序链表</td><td>n</td><td>1</td><td>1</td></tr><tr><td>二叉搜索树</td><td>logn(平均)</td><td>logn(平均)</td><td>logn(平均)</td></tr><tr><td>平衡二叉搜索树</td><td>logn</td><td>logn</td><td>logn</td></tr><tr><td>二叉堆</td><td>logn</td><td>logn</td><td>1</td></tr></tbody></table><hr><h1 id="完全二叉树" tabindex="-1"><a class="header-anchor" href="#完全二叉树"><span>完全二叉树</span></a></h1><p>在讨论堆之前，得先了解一下什么是 <strong>完全二叉树（Complete Binary Tree）</strong>。在一颗二叉树中，每一个结点都与深度为K的满二叉树中编号从 1 至 n 的结点一一对应，这样的二叉树称为完全二叉树。</p><p><img src="'+y+'" alt="CBT"></p><hr><h1 id="堆" tabindex="-1"><a class="header-anchor" href="#堆"><span>堆</span></a></h1><h2 id="什么是堆" tabindex="-1"><a class="header-anchor" href="#什么是堆"><span>什么是堆</span></a></h2>',9)),i("p",null,[s[13]||(s[13]=a("所谓堆，就是利用树的结构来维护一组数据。我们平时说的堆，一般都是指 ")),s[14]||(s[14]=i("strong",null,"二叉堆",-1)),s[15]||(s[15]=a(" 。")),t(e,{color:"red"},{default:l(()=>s[12]||(s[12]=[a("如果在一颗完全二叉树中，每个结点都 "),i("strong",null,"大于等于",-1),a(" 它的两个子节点，那么我们就说这个完全二叉树是 "),i("strong",null,"堆有序",-1),a(" 的")])),_:1}),s[16]||(s[16]=a("。一组能以堆有序的完全二叉树排序、并在数组中按层级存储的元素，我们就称为二叉堆。二叉堆能够比初级实现更好地实现优先队列。"))]),s[22]||(s[22]=n('<p>要点:</p><ul><li>完全二叉树</li><li>堆有序（父节点 &gt;= 两个子节点）</li></ul><h2 id="堆的性质" tabindex="-1"><a class="header-anchor" href="#堆的性质"><span>堆的性质</span></a></h2><p>在一个基于完全二叉树的堆中，如果下标从 1 开始，那么 k 的两个子节点分别为 2k 和 2k+1。如果下标从 0 开始，那么 k 的两个子节点分别为 2k+1 和 2(k+1)</p><p><img src="'+A+`" alt="k"></p><p>通过这个性质，我们可以轻易计算出某个节点的父节点以及子节点的下标。这也就是为什么可以直接用数组来存储堆的原因。</p><h2 id="堆有序化" tabindex="-1"><a class="header-anchor" href="#堆有序化"><span>堆有序化</span></a></h2><h3 id="上浮法实现堆有序化" tabindex="-1"><a class="header-anchor" href="#上浮法实现堆有序化"><span>上浮法实现堆有序化</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">private</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> swim</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    while</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> k</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &amp;&amp;</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> less</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">k</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)){</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        exch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">k</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        k  </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> k</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下沉法实现堆有序化" tabindex="-1"><a class="header-anchor" href="#下沉法实现堆有序化"><span>下沉法实现堆有序化</span></a></h3><p><img src="`+c+`" alt="sink"></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">private</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sink</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // k 是参考结点， 2*k 是左子结点， &lt;= N 确保子结点有元素</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    while</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">k </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // j 是子结点，我们要把参考结点跟比较大的子结点做比较</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        //由于不知道左子结点比较大还是右子结点比较大</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 默认为 左子结点</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">        int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> j</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 左右子节点比较，如果 左子 &lt; 右子，j改为右子</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> j</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">N </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&amp;&amp;</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> less</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">j</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">j</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">))</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  j</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">++</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 参考结点跟比较大的子结点比较，如果子结点比较小，直接退出</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> !</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">less</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">j</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">))</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> break</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 如果子结点比较大，把比较小的参考结点沉下去</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        exch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">j</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 把子结点作为参考结点，继续循环</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        k </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> j</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于堆的优先队列" tabindex="-1"><a class="header-anchor" href="#基于堆的优先队列"><span>基于堆的优先队列</span></a></h2><p>算法 2.6</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> MapPQ</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">key</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> extends</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Comparable</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">key</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;&gt;{</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    private</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> key</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> pq</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    private</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> MapPQ</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> MaxN</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        pq </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">key</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[])</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> Comparable</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">maxN</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">];</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> boolean</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> isEmpty</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(){</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> N </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">==</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> int</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> size</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(){</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> insert</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Key </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        pq</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">++</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        swim</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    public</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Key </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">delMax</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(){</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        Key</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> max</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> pq</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">];</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  //从根节点得到最大元素</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        exch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> N</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">--</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">     //将其和最后一个结点交换</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        pq</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">N</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">   //防止对象游离</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        sink</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">          //恢复堆有序</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> max</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="堆排序" tabindex="-1"><a class="header-anchor" href="#堆排序"><span>堆排序</span></a></h1><p>基于优先队列的排序方法：将所有元素插入一个查找最小元素的优先队列，然后重复调用删除最小元素的操作，将他们按顺序删去。</p><p>堆排序就是一种这样的方法。分为两个阶段：</p><ul><li>构造堆：将数组以堆的形式安排</li><li>下沉排序：按递减顺序取出所有元素，得到排序结果</li></ul><p>算法2.7</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sort</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Comparable</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">length</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">N</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> k</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">k</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">--</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> )</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sink</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    while</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">N</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        exch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> N</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">--</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        sink</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="排序算法总结" tabindex="-1"><a class="header-anchor" href="#排序算法总结"><span>排序算法总结</span></a></h1><table><thead><tr><th>算法</th><th>稳定性</th><th>原地</th><th>时间复杂度</th><th>空间复杂度</th><th>备注</th></tr></thead><tbody><tr><td>选择排序</td><td>不稳定</td><td>是</td><td>N²</td><td>1</td><td></td></tr><tr><td>插入排序</td><td>稳定</td><td>是</td><td>(N,N²)</td><td>1</td><td>取决于输入元素的排列情况</td></tr><tr><td>希尔排序</td><td>不稳定</td><td>是</td><td>NlogN ?</td><td>1</td><td></td></tr><tr><td>快速排序</td><td>不稳定</td><td>是</td><td>NlogN</td><td>lgN</td><td>效率由概率提供保证</td></tr><tr><td>三向快速排序</td><td>不稳定</td><td>是</td><td>(N,NlogN)</td><td>lgN</td><td></td></tr><tr><td>归并排序</td><td>稳定</td><td>否</td><td>NlogN</td><td>N</td><td></td></tr><tr><td>堆排序</td><td>不稳定</td><td>是</td><td>NlogN</td><td>1</td><td></td></tr></tbody></table><blockquote><p>快速排序是最快的通用排序算法。Java系统库中 java.util.Arrays.sort() 根据不同的类型参数使用了不同的排序方法。对于原始数据类型，Java选择了三向快速排序，而对于引用类型，则是用归并排序。这些选择实际上是用速度和空间来换取稳定性。</p></blockquote><hr><p>本文部分内容参考自：</p><ul><li><a href="https://www.cnblogs.com/wmyskxz/p/9301021.html" target="_blank" rel="noopener noreferrer">数据结构与算法(4)——优先队列和堆</a></li></ul>`,29))])}const D=p(o,[["render",u],["__file","index.html.vue"]]),m=JSON.parse('{"path":"/data-structure/zi5xvei4/","title":"数据结构（五）优先队列和堆排序","lang":"zh-CN","frontmatter":{"title":"数据结构（五）优先队列和堆排序","comments":true,"categories":"数据结构和算法","tags":["数据结构和算法"],"abbrlink":"18ede324","createTime":"2018/04/12 14:07:12","permalink":"/data-structure/zi5xvei4/","description":"有时候我们会收集一些元素，然后处理当前键值最大的元素。然后再收集更多，再处理。例如，在手机来电、短信、游戏三个程序中，来电的优先级是最高的，我们总希望先处理来电请求。 满足这种场景的数据结构，需要支持两种操作：删除最大（或最小）元素、插入元素。这种数据类型，就叫优先队列。优先队列也是一种队列，但是跟前面提到的先进先出队列不同，优先队列的“出”，是根据优...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/data-structure/zi5xvei4/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"数据结构（五）优先队列和堆排序"}],["meta",{"property":"og:description","content":"有时候我们会收集一些元素，然后处理当前键值最大的元素。然后再收集更多，再处理。例如，在手机来电、短信、游戏三个程序中，来电的优先级是最高的，我们总希望先处理来电请求。 满足这种场景的数据结构，需要支持两种操作：删除最大（或最小）元素、插入元素。这种数据类型，就叫优先队列。优先队列也是一种队列，但是跟前面提到的先进先出队列不同，优先队列的“出”，是根据优..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://jerrysheh.com/images/DataStructure/priorityqueue.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"数据结构和算法"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据结构（五）优先队列和堆排序\\",\\"image\\":[\\"https://jerrysheh.com/images/DataStructure/priorityqueue.png\\",\\"https://jerrysheh.com/images/DataStructure/CBT.png\\",\\"https://jerrysheh.com/images/DataStructure/k.png\\",\\"https://jerrysheh.com/images/DataStructure/sink.png\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"数组（无序）","slug":"数组-无序","link":"#数组-无序","children":[]},{"level":2,"title":"数组（有序）","slug":"数组-有序","link":"#数组-有序","children":[]},{"level":2,"title":"链表实现","slug":"链表实现","link":"#链表实现","children":[]},{"level":2,"title":"不同实现的比较","slug":"不同实现的比较","link":"#不同实现的比较","children":[]},{"level":2,"title":"什么是堆","slug":"什么是堆","link":"#什么是堆","children":[]},{"level":2,"title":"堆的性质","slug":"堆的性质","link":"#堆的性质","children":[]},{"level":2,"title":"堆有序化","slug":"堆有序化","link":"#堆有序化","children":[{"level":3,"title":"上浮法实现堆有序化","slug":"上浮法实现堆有序化","link":"#上浮法实现堆有序化","children":[]},{"level":3,"title":"下沉法实现堆有序化","slug":"下沉法实现堆有序化","link":"#下沉法实现堆有序化","children":[]}]},{"level":2,"title":"基于堆的优先队列","slug":"基于堆的优先队列","link":"#基于堆的优先队列","children":[]}],"readingTime":{"minutes":5.41,"words":1622},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/data-structure/5.数据结构（五）优先队列和堆排序.md"}');export{D as comp,m as data};

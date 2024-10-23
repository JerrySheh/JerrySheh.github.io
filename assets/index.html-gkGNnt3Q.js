import{_ as e,c as i,f as a,o as n}from"./app-D22ydJtp.js";const t="/images/middleware/redis.webp",l="/images/middleware/redis-list.png",p="/images/middleware/redis-quicklist.png",d="/images/middleware/redis-hash.png",r="/images/middleware/redis-zset.png",h={};function c(o,s){return n(),i("div",null,s[0]||(s[0]=[a('<p><img src="'+t+`" alt=""></p><h1 id="什么是redis" tabindex="-1"><a class="header-anchor" href="#什么是redis"><span>什么是Redis</span></a></h1><p><a href="https://redis.io/" target="_blank" rel="noopener noreferrer">Redis</a> 是 Remote Dictionary Service (远程字典服务)的简称，是一个开源的、使用内存存储数据的中间件。通常用作于内存数据库、缓存、消息中间件。</p><p>Redis 用于缓存比较多。我在公司接触过的几个项目中无一不是把 Redis 当缓存用，引入 Redis 的原因也很简单：有些数据是频繁查询但不经常更新的，这样的数据可以丢一份在 Redis 里，当查询请求进来时，直接从 Redis 里读取，这样就减轻了数据库的压力。在并发高的场景下非常有用。</p><p>此外，Redis 还可以用作于分布式锁。</p><h1 id="redis-的五种基本数据结构" tabindex="-1"><a class="header-anchor" href="#redis-的五种基本数据结构"><span>Redis 的五种基本数据结构</span></a></h1><p>字典服务的本质是 key-value 存储，我们给 Redis 一个 key，他返回一个 value 给我们，就这么简单。只不过说， Redis 的 value 可以是不同的数据结构，它可能是字符串，可能是链表，也可能是哈希表。</p><p>要体验 Redis 的功能，可以使用官方提供的 <a href="https://try.redis.io/" target="_blank" rel="noopener noreferrer">在线 redis 环境</a> 进行试用。</p><h2 id="string" tabindex="-1"><a class="header-anchor" href="#string"><span>string</span></a></h2><p>string存储字符数组，是一个动态的字符串，类似于Java的 <code>ArrayList&lt;Char&gt;</code>。常见的用法是把对象用 Json 序列化为字符串（又想起那句，Web开发的本质是拼接字符串hhh），再丢到 Redis 进去。查询的时候从 Redis 取出，再反序列化为对象。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 这里使用 fastjson 序列化和反序列化对象</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">User</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> user</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ...</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">String</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> userStr</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> JSON</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">toJSONString</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">user</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">redisClient</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">set</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">user</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">，userStr</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">String</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> redisClient</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">get</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">user</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">User</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> user</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> JSON</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parseObject</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> User</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">class</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在字符较少时，string会预留空间减少内存的频繁分配，小于1MB时，扩容是加倍现有空间（256KB -&gt; 512KB），大于1M时，每次扩容增加1MB空间（3MB -&gt; 4MB）。单个string最大支持512MB。</p><h2 id="list" tabindex="-1"><a class="header-anchor" href="#list"><span>list</span></a></h2><p>list 是双端链表，类似于 Java 的 <code>LinkedList&lt;String&gt;</code>。提供了 <code>rpush</code>、<code>lpush</code>、<code>lpop</code>、<code>rpop</code> 等操作方式，可用作队列或栈。操作 List 时，第一个字母 <code>l</code> 或 <code>r</code> 指定了要从左边还是右边开始读取。</p><p><img src="`+l+`" alt="books"></p><p>Redis 的 list 常用来做异步队列。将后续需要处理的数据序列化为字符串丢进列表，随后，另一个线程遍历列表依次读取数据进行处理。</p><p>list 的写入：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>&gt; rpush books python java cpp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>list 的读取：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span># 获取list下标为1的内容，需要遍历列表，越往后越慢，O(n)慎用</span></span>
<span class="line"><span>&gt; lindex books 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取所有元素，需要遍历列表，O(n)慎用</span></span>
<span class="line"><span>&gt; lrange books 0 -1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 保留下标为 1 到下标为 -1 之间的元素，O(n)慎用</span></span>
<span class="line"><span>&gt; ltrim books 1 -1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取长度</span></span>
<span class="line"><span>&gt; llen books</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>list 的删除</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span># 删除books队列最右边一个元素</span></span>
<span class="line"><span>&gt; rpop books</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>事实上，list不是简单的 Linkedlist，当元素较少的时候，Redis 会用连续的内存存储元素，这个结构称为 <code>ziplist</code>（压缩列表）。当元素变大后，再起一个 <code>ziplist</code>，两个 <code>ziplist</code> 之间串起来，这样的结构称为 <code>quicklist</code>。<code>quicklist</code> 既满足快速插入删除性能，又不会有太大空间冗余。</p><p><img src="`+p+'" alt="quicklist"></p><h2 id="hash" tabindex="-1"><a class="header-anchor" href="#hash"><span>hash</span></a></h2><p>hash 类似于 Java 的 <code>HashMap&lt;String,String&gt;</code>，value只可以存储 string 。</p><p><img src="'+d+`" alt="hash"></p><p>Java HashMap 的 rehash 需要一次完成， map 很大时比较耗时，而 Redis hash 的 rehash 是 <strong>渐进式</strong> 的。rehash 时会保留新旧两个 hash 结构，后续慢慢将旧hash一点点搬迁到新hash。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span># 存</span></span>
<span class="line"><span>&gt; hset book_1 name &quot;一往无前&quot;</span></span>
<span class="line"><span>&gt; hset book_1 author &quot;范海涛&quot;</span></span>
<span class="line"><span>&gt; hset book_1 category &quot;传记&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 取</span></span>
<span class="line"><span>&gt; hget book_1 name</span></span>
<span class="line"><span>&quot;一往无前&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="set" tabindex="-1"><a class="header-anchor" href="#set"><span>set</span></a></h2><p>set 类似于 Java 的 <code>HashSet&lt;String&gt;</code>，同样也是只能存储 string，set保证了里面存储的内容没有重复。内部实现相当于一个特殊的 hash，只不过只有 key，所有 value 都是 null。</p><h2 id="zset-sorted-sets" tabindex="-1"><a class="header-anchor" href="#zset-sorted-sets"><span>zset（sorted sets）</span></a></h2><p>zset 类似于 Java 的 <code>SortSet&lt;String&gt;</code> 和 <code>HashMap&lt;String,String&gt;</code> 的结合体，其本质是一个 set， 但同时还为 set 里的每一个元素维护了一个 score 权重值，用来排序。底层是用 <code>跳跃表</code> 的数据结构实现。zset 就是一种有权重的 set 。</p><p><img src="`+r+`" alt="zset"></p><p>zset 的应用场景可以是粉丝列表，value 是 user_id， score 是关注时间，这样我们就可以将某用户的粉丝列表按关注时间排序展示出来了。或者是考生成绩， value 是 学生ID， score 是成绩，这样就可以按成绩排序了。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span># 存</span></span>
<span class="line"><span>&gt; zadd winners 98.5 &quot;Jerry&quot;</span></span>
<span class="line"><span>&gt; zadd winners 95.0 &quot;Calm&quot;</span></span>
<span class="line"><span>&gt; zadd winners 89 &quot;Mary&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 范围取</span></span>
<span class="line"><span>&gt; zrange 0 -1</span></span>
<span class="line"><span>&gt; zreverange 0 -1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="通用规则" tabindex="-1"><a class="header-anchor" href="#通用规则"><span>通用规则</span></a></h1><p>五种基本数据结构中，除 string 外，剩下的都是容器型结构。他们遵循两个规则：</p><ol><li><strong>create if not exists</strong>：如果容器不存在，那就创建一个</li><li><strong>drop if no elements</strong>：如果容器没有元素了，那就销毁，释放内存</li></ol><hr><p>参考：</p><ul><li>《Redis 深度历险》 钱文品</li></ul>`,42)]))}const g=e(h,[["render",c],["__file","index.html.vue"]]),m=JSON.parse('{"path":"/article/347ny7mp/","title":"Redis的五种数据结构","lang":"zh-CN","frontmatter":{"title":"Redis的五种数据结构","categories":["中间件","redis"],"tags":["Redis"],"abbrlink":"dc895096","createTime":"2020/08/23 16:44:01","permalink":"/article/347ny7mp/","description":"什么是Redis Redis 是 Remote Dictionary Service (远程字典服务)的简称，是一个开源的、使用内存存储数据的中间件。通常用作于内存数据库、缓存、消息中间件。 Redis 用于缓存比较多。我在公司接触过的几个项目中无一不是把 Redis 当缓存用，引入 Redis 的原因也很简单：有些数据是频繁查询但不经常更新的，这样的...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/article/347ny7mp/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"Redis的五种数据结构"}],["meta",{"property":"og:description","content":"什么是Redis Redis 是 Remote Dictionary Service (远程字典服务)的简称，是一个开源的、使用内存存储数据的中间件。通常用作于内存数据库、缓存、消息中间件。 Redis 用于缓存比较多。我在公司接触过的几个项目中无一不是把 Redis 当缓存用，引入 Redis 的原因也很简单：有些数据是频繁查询但不经常更新的，这样的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://jerrysheh.com/images/middleware/redis.webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis的五种数据结构\\",\\"image\\":[\\"https://jerrysheh.com/images/middleware/redis.webp\\",\\"https://jerrysheh.com/images/middleware/redis-list.png\\",\\"https://jerrysheh.com/images/middleware/redis-quicklist.png\\",\\"https://jerrysheh.com/images/middleware/redis-hash.png\\",\\"https://jerrysheh.com/images/middleware/redis-zset.png\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"string","slug":"string","link":"#string","children":[]},{"level":2,"title":"list","slug":"list","link":"#list","children":[]},{"level":2,"title":"hash","slug":"hash","link":"#hash","children":[]},{"level":2,"title":"set","slug":"set","link":"#set","children":[]},{"level":2,"title":"zset（sorted sets）","slug":"zset-sorted-sets","link":"#zset-sorted-sets","children":[]}],"readingTime":{"minutes":4.09,"words":1228},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/middleware/redis/redis的五种数据结构.md","categoryList":[{"id":"18958e","sort":10000,"name":"posts"},{"id":"4ef5c3","sort":10022,"name":"middleware"},{"id":"9999a6","sort":10023,"name":"redis"}]}');export{g as comp,m as data};

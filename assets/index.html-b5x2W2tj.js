import{_ as i,c as a,f as n,o as e}from"./app-D22ydJtp.js";const t="/images/database/jdbc_delete_data.png",l="/images/database/high_performance_mysql_seg_query.png",h={};function k(p,s){return e(),a("div",null,s[0]||(s[0]=[n('<p>一张2亿数据的 MySQL InnoDB大表，现要对 <code>c_date</code> 时间字段的的某时间区间内，将 <code>client_name</code> 为 <code>null</code> 的数据进行删除。<code>c_date</code> 已建索引。</p><p><img src="'+t+`" alt=""></p><h1 id="分析" tabindex="-1"><a class="header-anchor" href="#分析"><span>分析</span></a></h1><p>显然，最简单的方式是写一个大的 DELETE 语句，类似这样：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">DELETE</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> FROM</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> table</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">WHERE</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> c_date </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">between</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2019-10-01</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> and</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2020-03-10</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">AND</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> client_name </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">is</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> NULL</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但这种方式是不建议的，因为会对 MySQL 服务器造成一定影响，参考《高性能MySQL》：</p><p><img src="`+l+`" alt=""></p><p>书中给我们的建议是，每次删除1万条数据：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">DELETE</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> FROM</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> table</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">WHERE</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> c_date </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">between</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2019-10-01</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> and</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2020-03-10</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">AND</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> client_name </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">is</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> NULL</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">LIMIT</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 10000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在应用层JDBC循环删除：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1000000</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">++</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> )</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  delCount </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> prepareStatement</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">executeUpdate</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">  if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">delCount </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    break</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式看似没毛病，但经过实践我们发现，MySQL越删越慢，到最后删了24个小时都没删完。究其原因，是 MySQL 每次执行 DELETE 时，总要先去查一遍：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">SELECT</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> id </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">FROM</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> table</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">WHERE</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> c_date </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">between</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2019-10-01</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> and</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2020-03-10</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">AND</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> client_name </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">is</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> NULL</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">LIMIT</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 10000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就导致一个问题，由于 InnoDB 是以 B+树 数据结构存放数据的，在 c_date 上建立索引，MySQL可以很快定位到 c_date = <code>2019-10-01</code> 的第一条数据，之后往右边逐条检索，直到凑足1万条符合条件的数据再返回。随着 for 循环的进行，越往后要凑满1万条需要检索的数据就越多（因为前面符合的已经在前几次循环删除了）。</p><h1 id="改进" tabindex="-1"><a class="header-anchor" href="#改进"><span>改进</span></a></h1><p>找到删除慢的根源后，优化思路如下：</p><p>1.先查出每一天、每一小时大概有多少数据，我这边查询大概一小时在1万-5万不等</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">SELECT</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> count</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) c, </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">t</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">.</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">date</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">FROM</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  (</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">SELECT</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> date_format</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(c_date, </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">%Y-%m-%d %H</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">date</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">   FROM</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> table</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">   WHERE</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> c_date </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">between</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2019-10-01</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> and</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2020-03-10</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">   AND</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> client_name </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">is</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> NULL</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) t</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">GROUP BY</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> t</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">.</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">date</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.按每一小时递进删除，每次删1万，直至该小时全部删完，再继续删除下一小时</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">final</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> long</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> ONE_HOUR</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 60</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 60</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1000</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">TimeStamp</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> getStart</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // 2019-10-01 00:00:00</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">TimeStamp</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> end</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> getStart</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ONE_HOUR</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">TimeStamp</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> finish</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> getFinish</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // 2020-03-10 23:59:59</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">long</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">getTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> finish</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">getTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ONE_HOUR </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  prepareStatement</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">setTimeStamp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  prepareStatement</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">setTimeStamp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> end</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  // 只要该小时内还有需要删除的数据，则重复做删除动作</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">  do</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> delCount</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> prepareStatement</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">executeUpdate</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">  }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> while</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">delCount </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  // 设置下一个小时</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  start </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> end</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">getTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  end </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">getTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ONE_HOUR</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DB 层如下:</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">DELETE</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> FROM</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> table</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">WHERE</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> c_date </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">between</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ? </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">and</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ?</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">AND</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> client_name </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">is</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> NULL</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">LIMIT</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 10000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22)]))}const r=i(h,[["render",k],["__file","index.html.vue"]]),g=JSON.parse('{"path":"/java/yvzdzi8g/","title":"JDBC + MySQL 如何正确地批量删除","lang":"zh-CN","frontmatter":{"title":"JDBC + MySQL 如何正确地批量删除","tags":["Java"],"categories":["Java","JDBC"],"abbrlink":"f215e4e1","createTime":"2020/03/14 21:57:26","permalink":"/java/yvzdzi8g/","description":"一张2亿数据的 MySQL InnoDB大表，现要对 c_date 时间字段的的某时间区间内，将 client_name 为 null 的数据进行删除。c_date 已建索引。 分析 显然，最简单的方式是写一个大的 DELETE 语句，类似这样： 但这种方式是不建议的，因为会对 MySQL 服务器造成一定影响，参考《高性能MySQL》： 书中给我们的建...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/java/yvzdzi8g/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"JDBC + MySQL 如何正确地批量删除"}],["meta",{"property":"og:description","content":"一张2亿数据的 MySQL InnoDB大表，现要对 c_date 时间字段的的某时间区间内，将 client_name 为 null 的数据进行删除。c_date 已建索引。 分析 显然，最简单的方式是写一个大的 DELETE 语句，类似这样： 但这种方式是不建议的，因为会对 MySQL 服务器造成一定影响，参考《高性能MySQL》： 书中给我们的建..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://jerrysheh.com/images/database/jdbc_delete_data.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JDBC + MySQL 如何正确地批量删除\\",\\"image\\":[\\"https://jerrysheh.com/images/database/jdbc_delete_data.png\\",\\"https://jerrysheh.com/images/database/high_performance_mysql_seg_query.png\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":2.11,"words":634},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/java/JDBC/JDBC-MySQL-如何正确地批量删除.md"}');export{r as comp,g as data};

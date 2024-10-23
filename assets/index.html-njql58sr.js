import{_ as i,c as a,f as e,o as t}from"./app-D22ydJtp.js";const n={};function l(p,s){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="ubuntu-下配置-shadowsocks-qt" tabindex="-1"><a class="header-anchor" href="#ubuntu-下配置-shadowsocks-qt"><span>Ubuntu 下配置 shadowsocks-qt</span></a></h1><p>注意：shadowsocks-qt只能用于SS，不能用于SSR</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>sudo add-apt-repository ppa:hzwhuang/ss-qt5</span></span>
<span class="line"><span>sudo apt update</span></span>
<span class="line"><span>sudo apt install shadowsocks-qt5</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>对于 UBuntu 18.04</p></blockquote><blockquote><p>ppa:hzwhuang/ss-qt5 并没有18.04版本的源，所以再执行update时会出现</p></blockquote><blockquote><p>E: 仓库 “http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu bionic Release” 没有 Release 文件 的错误。</p></blockquote><blockquote><p>这时，只要编辑 /etc/apt/sources.list.d/hzwhuang-ubuntu-ss-qt5-bionic.list 文件，将bionic (18.04版本代号)改成xenial（16.04版本代号）。</p></blockquote><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2><p>添加服务器地址、密码、连接方式。 gui友好界面。</p><h2 id="配置chrome-使用插件switchyomega" tabindex="-1"><a class="header-anchor" href="#配置chrome-使用插件switchyomega"><span>配置Chrome ，使用插件SwitchyOmega</span></a></h2><p>用你能想到的方法找到Chrome SwitchyOmega 插件的 crx 离线包</p><p>打开 Chrome 的扩展程序，将 crx 托进去及安装完毕</p><h3 id="第一步" tabindex="-1"><a class="header-anchor" href="#第一步"><span>第一步</span></a></h3><ol><li>新建一个情景模式，更名 shadowsock</li><li>代理协议选择 sock5，代理服务器 127.0.0.1， 代理端口 1080</li></ol><h3 id="第二步" tabindex="-1"><a class="header-anchor" href="#第二步"><span>第二步</span></a></h3><ol><li>选择 autoswitch</li><li>规则列表设置选择 Autoproxy</li><li>规则列表网址如下</li></ol><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="4"><li>立即更新情景模式</li><li>切换规则 - 规则列表规则选择 shadowsock</li></ol><p>Have fun 😃</p><hr><h1 id="使用-ssr-客户端" tabindex="-1"><a class="header-anchor" href="#使用-ssr-客户端"><span>使用 SSR 客户端</span></a></h1><h2 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1"><span>安装</span></a></h2><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>wget http://www.texfox.com/ssr  </span></span>
<span class="line"><span>sudo mv ssr /usr/local/bin</span></span>
<span class="line"><span>chmod 766 /usr/local/bin/ssr  </span></span>
<span class="line"><span>ssr install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>一般安装的或者自己写的把全局脚本放在 usr/local/bin 下，这样在终端任意位置可以使用脚本命令</p></blockquote><h2 id="配置-1" tabindex="-1"><a class="header-anchor" href="#配置-1"><span>配置</span></a></h2><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>ssr config</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>然后在弹出来的配置文件中填写你的服务器信息</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">server</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">0.0.0.0</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,        </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">//服务器ip  </span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">server_port</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">8388</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,        </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">//端口  </span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">password</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">m</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,            </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">//密码  </span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">protocol</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">origin</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,       </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">//协议插件  </span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">obfs</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">http_simple</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,      </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">//混淆插件  </span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">method</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">aes-256-cfb</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,    </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">//加密方式</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般配置完之后就会自动启动，如果没有，使用以下命令来启动</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>ssr start</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>使用以下命令来关闭</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>ssr stop</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Chrome 配置同SS</p>`,34)]))}const d=i(n,[["render",l],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/article/wj4lbdnm/","title":"Ubuntu 下配置SS和SSR","lang":"zh-CN","frontmatter":{"title":"Ubuntu 下配置SS和SSR","categories":"瞎折腾","tags":["Linux"],"abbrlink":"879f3462","createTime":"2017/09/12 10:40:00","permalink":"/article/wj4lbdnm/","description":"Ubuntu 下配置 shadowsocks-qt 注意：shadowsocks-qt只能用于SS，不能用于SSR 安装 对于 UBuntu 18.04 ppa:hzwhuang/ss-qt5 并没有18.04版本的源，所以再执行update时会出现 E: 仓库 “http://ppa.launchpad.net/hzwhuang/ss-qt5/ubu...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/article/wj4lbdnm/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"Ubuntu 下配置SS和SSR"}],["meta",{"property":"og:description","content":"Ubuntu 下配置 shadowsocks-qt 注意：shadowsocks-qt只能用于SS，不能用于SSR 安装 对于 UBuntu 18.04 ppa:hzwhuang/ss-qt5 并没有18.04版本的源，所以再执行update时会出现 E: 仓库 “http://ppa.launchpad.net/hzwhuang/ss-qt5/ubu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Ubuntu 下配置SS和SSR\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":2,"title":"配置Chrome ，使用插件SwitchyOmega","slug":"配置chrome-使用插件switchyomega","link":"#配置chrome-使用插件switchyomega","children":[{"level":3,"title":"第一步","slug":"第一步","link":"#第一步","children":[]},{"level":3,"title":"第二步","slug":"第二步","link":"#第二步","children":[]}]},{"level":2,"title":"安装","slug":"安装-1","link":"#安装-1","children":[]},{"level":2,"title":"配置","slug":"配置-1","link":"#配置-1","children":[]}],"readingTime":{"minutes":1.5,"words":449},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/toss/Ubuntu下配置SS和SSR.md","categoryList":[{"id":"18958e","sort":10000,"name":"posts"},{"id":"033bbb","sort":10011,"name":"toss"}]}');export{d as comp,r as data};

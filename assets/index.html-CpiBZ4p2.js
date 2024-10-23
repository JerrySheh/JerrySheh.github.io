import{_ as s,c as i,f as a,o as t}from"./app-D22ydJtp.js";const l={};function n(r,e){return t(),i("div",null,e[0]||(e[0]=[a('<p>在一个金融公司里干开发，通常会被安全同事吊打，开发属于“食物链”的最底端。因为金融行业的系统相对来说会更注重信息安全，安全部门通常也会有更高的话语权，时不时就甩一个安全工单过来，开发直呼活久见。</p><p>譬如，我们有一个系统，设定了特定后缀名的接口需要有登录态，结果有一次安全同事在接口后面加了个 <code>/</code> ，就直接绕过了登录。还有一次，安全同事往我们的接口参数里传了一个 <code>script</code>，结果页面直接弹窗了。</p><p>为了防止以后再被安全同事鄙视，或者被他们忽悠忽悠着又莫名其妙接了个大锅（lol），这一篇就通过常见的漏洞和防范聊一聊安全开发这个话题。</p><hr><h1 id="常见的web漏洞" tabindex="-1"><a class="header-anchor" href="#常见的web漏洞"><span>常见的Web漏洞</span></a></h1><h2 id="_1、注入-injections" tabindex="-1"><a class="header-anchor" href="#_1、注入-injections"><span>1、注入（injections）</span></a></h2><p>注入是指往程序里传入一段指令，从而使程序执行了非预期的行为。常见的注入有SQL注入、命令注入、CRLF注入等。</p><h3 id="sql注入" tabindex="-1"><a class="header-anchor" href="#sql注入"><span>SQL注入</span></a></h3><p>SQL注入通常利用程序拼接SQL语句的弱点，传入特定的SQL语句入参，语句被程序传进数据库中执行。现代Web框架一般都做了防SQL注入，其防范也很简单，例如，在 JDBC 中用 <code>PreparedStatement</code> 而不是 <code>Statement</code> ，在 Mybatis 中用 <code>#{}</code> 而不是 <code>${}</code> ，提前将参数预编译，就可以防止99%的SQL注入。</p><p>其次是记得对用户输入进行校验。尤其是一些排序的场景，有些开发同学为了省事，通常将排序字段交由前端输入，例如：</p><p>前端传入参 time，通过时间排序：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">select</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ... </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">order by</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> time</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>前端传入参 age ，通过年龄排序：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">select</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ... </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">order by</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> age</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>结果人家往 age 字段填了个<code> age; select * from ...</code>，就引发了SQL注入</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">select</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ... </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">order by</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> age; </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">select</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> from</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>有些同学说用 <code>PreparedStatement</code> 和 <code>#{}</code> 不会被拼接，确实，但这种习惯其实也不好，攻击者可以通过传入特定的值，通过是否报错来猜测你数据库表的字段名。所以最好是前端传值在后端进行映射，不要直接透传值，或者是做好入参校验。</p><h3 id="crlf注入" tabindex="-1"><a class="header-anchor" href="#crlf注入"><span>CRLF注入</span></a></h3><p>CRLF注入即回车符注入，攻击者可以向 Http Request 的字段注入恶意的换行符，就能将恶意数据输出在 Response 响应头中。这种只要后端做好 <code>\\r</code>、 <code>\\n</code> 等字符的过滤即可防范。</p><h3 id="命令注入" tabindex="-1"><a class="header-anchor" href="#命令注入"><span>命令注入</span></a></h3><p>即往程序中注入shell命令，从而在后端服务器中执行系统命令。防范方法：</p><ol><li>对用户输入进行过滤，删除不安全的字符</li><li>对用户输入做白名单、正则校验</li><li>重要的系统调用函数的参数，不要让用户控制（如 eval()、exec()、system 等）</li></ol><h2 id="_2、认证缺陷" tabindex="-1"><a class="header-anchor" href="#_2、认证缺陷"><span>2、认证缺陷</span></a></h2><h3 id="任意注册或登录" tabindex="-1"><a class="header-anchor" href="#任意注册或登录"><span>任意注册或登录</span></a></h3><p>比如注册时输入手机号A接收验证码，填写完验证码把手机号修改成B再点击提交，此时能注册成功且能用手机号B登录，就造成了任意注册。开发时，接口一定要注意身份验证和校验，切忌通过用户id来判断用户的身份，防止任意登录。</p><p>此外还要防止任意密码重置，密码重置场景应加入验证码、鉴权、流程正确性（重置密码接口不可直接访问，必须在用户信息校验后且有时效性）等因素。</p><h2 id="_3、暴力破解" tabindex="-1"><a class="header-anchor" href="#_3、暴力破解"><span>3、暴力破解</span></a></h2><p>某个后台接口的参数是有规律的数字，这样就可以被递增遍历调用，造成数据泄露。防止接口被暴力遍历，通常可以对参数进行加密，或者使用多参数校验。对于频繁的请求，加上验证码和单个ip访问限制。如果是集群系统，可以在前置负载里限流（如nginx）。</p><h2 id="_4、越权" tabindex="-1"><a class="header-anchor" href="#_4、越权"><span>4、越权</span></a></h2><p>越权就是用户访问了自己本没有权限访问的数据，分为 <strong>水平越权</strong> 和 <strong>垂直越权</strong>，水平越权即访问了其他用户的数据，垂直越权即低权限用户访问了高权限的数据。</p><p>防范越权问题，需要开发人员时刻记得在操作数据（增删改查）前，将数据与用户进行匹配，看 <strong>该用户对该数据是否有进行该操作的权限</strong>。对于暴露类似手机号、文件id、用户id的接口，在开发时，不妨想一下，将对应id修改成其他id，是否可以操作成功？</p><h2 id="_5、cross-site-scripting-xss" tabindex="-1"><a class="header-anchor" href="#_5、cross-site-scripting-xss"><span>5、Cross-Site Scripting (XSS)</span></a></h2><p>跨站脚本攻击，攻击者利用Web程序的动态数据展示，在html页面嵌入恶意代码，从而在html页面加载时被执行。XSS分为反射型XSS、存储型XSS和基于DOM型的XSS。</p><h3 id="反射型xss" tabindex="-1"><a class="header-anchor" href="#反射型xss"><span>反射型XSS</span></a></h3><p>在URL链接中嵌入恶意脚本，用户打开链接时被执行。</p><h3 id="存储型xss" tabindex="-1"><a class="header-anchor" href="#存储型xss"><span>存储型XSS</span></a></h3><p>在输入参数中嵌入恶意脚本，参数被存储到后端数据库中，当用户浏览存储的内容时，恶意脚本从数据库中取出并经后端传输到前端，从而被执行。</p><h3 id="基于dom型xss" tabindex="-1"><a class="header-anchor" href="#基于dom型xss"><span>基于DOM型XSS</span></a></h3><p>不规范使用 JavaScript 导致的根据用户输入显示html代码的恶意执行。</p><h3 id="xss的防范" tabindex="-1"><a class="header-anchor" href="#xss的防范"><span>XSS的防范</span></a></h3><ol><li>在html/xml中显示用户可控数据前，使用 escapeHTML 和 javascript escape 转义</li><li>在富文本中安全过滤</li><li>输出在url中的数据，做url安全输出</li><li>JSON接口返回 <code>Content-Type application/json</code></li></ol><h2 id="_6、cross-site-request-forgery-csrf" tabindex="-1"><a class="header-anchor" href="#_6、cross-site-request-forgery-csrf"><span>6、Cross-Site Request Forgery（CSRF）</span></a></h2><p>跨站请求伪造攻击。例如某网站有一个修改头像功能，恶意用户将其头像URL修改为此网站修改个性签名的链接，这样，当普通用户访问恶意用户的头像时，就会被迫发起一个修改个性签名的请求。CSRF也可以发生在站外，例如恶意用户自己搭建的服务器，当普通用户访问恶意用户的头像时，会被迫访问恶意用户的服务器，服务器上有一个修改个性签名的html页面。</p><p>防范CSRF攻击，可以在用户登录是设置一个随机token，并放在cookie中，在修改信息的表单中，有一个隐藏域，将token带上，并在后端跟session进行校验。若一致，才执行修改信息的业务逻辑。</p><p>如果觉得上述方法太麻烦，也可以通过验证referer的方式。</p><h2 id="_7、server-site-request-forgery-ssrf" tabindex="-1"><a class="header-anchor" href="#_7、server-site-request-forgery-ssrf"><span>7、Server-Site Request Forgery（SSRF）</span></a></h2><p>服务器端请求伪造攻击。这种漏洞通常出现的场景是，应用从用户指定的URL获取数据（并加工）后提供某些服务。这时候，该应用可能会被作为代理攻击远程或本地的服务器。</p><p>防范SSRF，同样要对用户提供的URL访问信息做校验和过滤，其次要统一错误信息以避免根据错误信息来判断远端服务器的端口状态，必要时，限制请求的端口为常见的http端口（80、443、8080等），同时禁用不需要的协议，例如只保留 http 和 https。</p><h2 id="_8、url重定向" tabindex="-1"><a class="header-anchor" href="#_8、url重定向"><span>8、URL重定向</span></a></h2><p>用户输入的URL是不可信的，永远对用户输入的URL进行规则校验。例如，只能输入可信任域名的URL。</p><h2 id="_9、文件上传和下载" tabindex="-1"><a class="header-anchor" href="#_9、文件上传和下载"><span>9、文件上传和下载</span></a></h2><p>对用户上传的文件进行校验，包括：文件名、扩展名、文件大小、路径等，对不符合业务限定条件的文件上传进行拦截。</p><p>上传建议：</p><ol><li>上传的文件存放目录，必须由后端进行处理，不由用户自定义</li><li>上传的文件，其目录名、文件名由系统生成，不由用户自定义</li><li>图片上传先做压缩，无异常后再保存</li></ol><p>下载建议：</p><ol><li>将用户要下载的文件地址保存在数据库中，用户提交文件id进行下载</li><li>文件放在Web应用无法直接访问的目录或远程存储中（如 NAS ）</li><li>下载前做用户权限判断</li></ol><h2 id="_10、弱口令" tabindex="-1"><a class="header-anchor" href="#_10、弱口令"><span>10、弱口令</span></a></h2><p>不要用简单密码，不要用简单密码，不要用简单密码。</p><h2 id="_11、external-entity-injection-xxe" tabindex="-1"><a class="header-anchor" href="#_11、external-entity-injection-xxe"><span>11、External Entity Injection（XXE）</span></a></h2><p>External Entity Injection，即 XML 外部实体注入。就是在解析用户输入的xml输入时，没有禁止外部实体的加载，从而可能被恶意加载外部文件和代码。防范方法：</p><ol><li>过滤和校验用户输入的xml数据；</li><li>过滤 <code>&lt;!DOCTYPE</code> 、 <code>&lt;!ENTITY</code>、<code>SYSTEM</code>、<code>PUBLIC</code> 等关键字；</li><li>不允许XML中含有自定义的DTD</li><li>在应用程序中禁用外部实体</li></ol><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">DocumentBuilderFactory</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> dbf</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> DocumentBuilderFactory</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">newInstance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">dbf</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">setFeature</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">https://apache.org/xml/features/disallow-doctype-decl</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> true</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="常用的上线前安全扫描" tabindex="-1"><a class="header-anchor" href="#常用的上线前安全扫描"><span>常用的上线前安全扫描</span></a></h1><h2 id="sonar" tabindex="-1"><a class="header-anchor" href="#sonar"><span>Sonar</span></a></h2><p>Sonar的定位是代码质量平台，通过Sonar扫描可以及时发现代码中的“坏味道”，帮助我们改善代码质量。当然，Sonar也可以帮我们分析出一些常见的bug，例如空指针、资源未关闭等。官网：https://www.sonarqube.org/</p><h2 id="fortify" tabindex="-1"><a class="header-anchor" href="#fortify"><span>Fortify</span></a></h2><p>Fortify 是一个静态的、白盒的软件源代码安全测试工具。可扫描出常见的安全漏洞，例如弱密码、弱加密、未经校验的前端传参。</p><h2 id="blackduck" tabindex="-1"><a class="header-anchor" href="#blackduck"><span>BlackDuck</span></a></h2><p>组件扫描，可以扫描出应用程序中引用的不安全的组件依赖。</p><h2 id="dast" tabindex="-1"><a class="header-anchor" href="#dast"><span>DAST</span></a></h2><p>DAST 全称 Dynamic Application Security Testing，属于黑盒扫描的一种。其原理就是模拟用户对前端页面进行探索点击，通过模拟攻击发现安全漏洞的过程。可以发现 SQL 注入、NoSQL 注入、XSS、不安全的登录等漏洞。</p><hr><h1 id="安全开发总结" tabindex="-1"><a class="header-anchor" href="#安全开发总结"><span>安全开发总结</span></a></h1><p>看了这么多常见的漏洞类型，是不是发现，大多数漏洞都是因为没有对用户输入做好校验造成的呢？作为一个合格且有经验的开发者，安全开发是绝对绕不过去的话题。就我个人来说，在开发一个程序或一个接口前，我通常会暗示自己跳出程序员思维，站在测试、安全、用户的角度，去假设输入的东西千奇百怪，此时我的程序会遭遇什么？只要多一分思考，程序就会少一个漏洞。</p><p>如果你记不住所有的漏洞类型，其实只要记住一点就好了：<strong>永远不要相信前端输入的内容</strong>。我曾经见过一个 Fortify 扫描出来的漏洞类型，叫 Log Forging，意思就是用户输入的参数，没有经过校验，就输出在日志中了。这样，恶意用户可以伪造（污染）日志信息，如果系统中有针对日志关键字的监控，这时候就会触发监控误报告警。严重时恶意用户甚至还可以通过日志输出来攻击系统。可见对用户输入做校验是多么重要。</p><p>再回到文章开头提到的只因安全同事在接口后加了一个 <code>/</code> 就绕过了登录态。这种就属于程序员对所使用的框架不熟悉导致的漏洞，比如程序员开发了一个过滤器，对匹配 <code>*.login</code> 的接口进行登录态保护，正常情况下，访问 <code>xxx.com/edit.login</code> 会经过过滤器校验，但因为某些Web框架设定了接口末尾加 <code>/</code> 与不加等效，于是访问 <code>xxx.com/edit.login/</code> 也是一样的，但却不会经过预设的登录校验过滤器。像 Springboot 这种开箱即用的框架，里面有大量的默认配置，例如对外暴露 endpoint， swagger 等等，稍不注意，就会因默认配置不符合项目实际导致漏洞出现，<strong>这就要求开发人员对所使用的框架有相对足够的了解</strong>，这样才不会一头栽进坑里去。</p><p>（完）</p>',78)]))}const h=s(l,[["render",n],["__file","index.html.vue"]]),p=JSON.parse('{"path":"/article/ibzm0tem/","title":"数说安全开发","lang":"zh-CN","frontmatter":{"title":"数说安全开发","categories":"信息安全","abbrlink":"f4864ac6","createTime":"2022/10/19 18:18:00","permalink":"/article/ibzm0tem/","description":"在一个金融公司里干开发，通常会被安全同事吊打，开发属于“食物链”的最底端。因为金融行业的系统相对来说会更注重信息安全，安全部门通常也会有更高的话语权，时不时就甩一个安全工单过来，开发直呼活久见。 譬如，我们有一个系统，设定了特定后缀名的接口需要有登录态，结果有一次安全同事在接口后面加了个 / ，就直接绕过了登录。还有一次，安全同事往我们的接口参数里传了...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/article/ibzm0tem/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"数说安全开发"}],["meta",{"property":"og:description","content":"在一个金融公司里干开发，通常会被安全同事吊打，开发属于“食物链”的最底端。因为金融行业的系统相对来说会更注重信息安全，安全部门通常也会有更高的话语权，时不时就甩一个安全工单过来，开发直呼活久见。 譬如，我们有一个系统，设定了特定后缀名的接口需要有登录态，结果有一次安全同事在接口后面加了个 / ，就直接绕过了登录。还有一次，安全同事往我们的接口参数里传了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数说安全开发\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1、注入（injections）","slug":"_1、注入-injections","link":"#_1、注入-injections","children":[{"level":3,"title":"SQL注入","slug":"sql注入","link":"#sql注入","children":[]},{"level":3,"title":"CRLF注入","slug":"crlf注入","link":"#crlf注入","children":[]},{"level":3,"title":"命令注入","slug":"命令注入","link":"#命令注入","children":[]}]},{"level":2,"title":"2、认证缺陷","slug":"_2、认证缺陷","link":"#_2、认证缺陷","children":[{"level":3,"title":"任意注册或登录","slug":"任意注册或登录","link":"#任意注册或登录","children":[]}]},{"level":2,"title":"3、暴力破解","slug":"_3、暴力破解","link":"#_3、暴力破解","children":[]},{"level":2,"title":"4、越权","slug":"_4、越权","link":"#_4、越权","children":[]},{"level":2,"title":"5、Cross-Site Scripting (XSS)","slug":"_5、cross-site-scripting-xss","link":"#_5、cross-site-scripting-xss","children":[{"level":3,"title":"反射型XSS","slug":"反射型xss","link":"#反射型xss","children":[]},{"level":3,"title":"存储型XSS","slug":"存储型xss","link":"#存储型xss","children":[]},{"level":3,"title":"基于DOM型XSS","slug":"基于dom型xss","link":"#基于dom型xss","children":[]},{"level":3,"title":"XSS的防范","slug":"xss的防范","link":"#xss的防范","children":[]}]},{"level":2,"title":"6、Cross-Site Request Forgery（CSRF）","slug":"_6、cross-site-request-forgery-csrf","link":"#_6、cross-site-request-forgery-csrf","children":[]},{"level":2,"title":"7、Server-Site Request Forgery（SSRF）","slug":"_7、server-site-request-forgery-ssrf","link":"#_7、server-site-request-forgery-ssrf","children":[]},{"level":2,"title":"8、URL重定向","slug":"_8、url重定向","link":"#_8、url重定向","children":[]},{"level":2,"title":"9、文件上传和下载","slug":"_9、文件上传和下载","link":"#_9、文件上传和下载","children":[]},{"level":2,"title":"10、弱口令","slug":"_10、弱口令","link":"#_10、弱口令","children":[]},{"level":2,"title":"11、External Entity Injection（XXE）","slug":"_11、external-entity-injection-xxe","link":"#_11、external-entity-injection-xxe","children":[]},{"level":2,"title":"Sonar","slug":"sonar","link":"#sonar","children":[]},{"level":2,"title":"Fortify","slug":"fortify","link":"#fortify","children":[]},{"level":2,"title":"BlackDuck","slug":"blackduck","link":"#blackduck","children":[]},{"level":2,"title":"DAST","slug":"dast","link":"#dast","children":[]}],"readingTime":{"minutes":10.17,"words":3052},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/security/数说安全开发.md","categoryList":[{"id":"18958e","sort":10000,"name":"posts"},{"id":"ada0cc","sort":10012,"name":"security"}]}');export{h as comp,p as data};

import{_ as d,c as r,f as i,a as s,d as n,e as l,b as a,r as h,o as p}from"./app-D22ydJtp.js";const o={};function k(g,t){const e=h("font");return p(),r("div",null,[t[9]||(t[9]=i('<h2 id="国密算法简介" tabindex="-1"><a class="header-anchor" href="#国密算法简介"><span>国密算法简介</span></a></h2><h3 id="什么是国密算法" tabindex="-1"><a class="header-anchor" href="#什么是国密算法"><span>什么是国密算法</span></a></h3><p>国密算法即国家密码局认定的国产加密算法，也称为“商用密码算法”，包括 SM1、SM2、SM3、SM4、SM7、SM9 等。SM 代表商密，即商业密码，是指用于商业的、不涉及国家秘密的密码技术。</p><p>国密算法的设计目标是保证安全性、高效性和 <strong>自主可控性</strong>，这些算法已经被广泛应用于中国政府和企业的信息安全领域，也逐渐得到了国际认可和应用。</p><p>除 SM1 和 SM7 的算法不公开外，其余算法都已成为 ISO/IEC 国际标准。</p><hr><h2 id="各种国密算法的特点" tabindex="-1"><a class="header-anchor" href="#各种国密算法的特点"><span>各种国密算法的特点</span></a></h2><table><thead><tr><th>算法</th><th>类型</th><th>对标算法</th><th>公开</th><th>适用场景</th></tr></thead><tbody><tr><td>SM1</td><td>对称</td><td>-</td><td>否</td><td>智能 IC 卡、智能密码钥匙、加密卡、加密机</td></tr><tr><td>SM2</td><td>非对称</td><td>RSA</td><td>是</td><td>数字签名、密钥交换、身份验证、安全通信</td></tr><tr><td>SM3</td><td>哈希</td><td>MD5/SHA</td><td>是</td><td>数字签名及验证、验证码、随机数生成</td></tr><tr><td>SM4</td><td>对称</td><td>DES/AES</td><td>是</td><td>适用于轻量级加密场景</td></tr><tr><td>SM7</td><td>对称</td><td>-</td><td>否</td><td>IC 门禁卡、票务，支付与一卡通等</td></tr><tr><td>SM9</td><td>非对称</td><td>-</td><td>是</td><td>将用户的标识作为公钥，用于用户身份认证</td></tr></tbody></table><blockquote><p>一般软件开发，重点关注 SM2 和 SM4 即可</p></blockquote><ul><li>参考：<a href="https://zhuanlan.zhihu.com/p/431263162" target="_blank" rel="noopener noreferrer">认识 SM1-SM9、ZUC 国密算法</a></li></ul><hr><h2 id="分组加密算法-aes-vs-sm4" tabindex="-1"><a class="header-anchor" href="#分组加密算法-aes-vs-sm4"><span>分组加密算法 AES vs SM4</span></a></h2><p>AES 和 SM4 都是安全性较高的对称分组加密算法，适用于金融、军事、物联网、移动设备等场景。</p><p>在这两个算法中，都有 <strong>加密模式</strong> 和 <strong>填充方式</strong> ，这两个概念可以看成是对称加密算法的参数和格式选择。</p><h3 id="加密模式" tabindex="-1"><a class="header-anchor" href="#加密模式"><span>加密模式</span></a></h3>',15)),s("ul",null,[s("li",null,[s("strong",null,[n(e,{color:"red"},{default:l(()=>t[0]||(t[0]=[a("CBC 模式")])),_:1})]),t[1]||(t[1]=a("：CBC（Cipher Block Chaining）模式是一种分组密码的工作模式，它需要一个初始向量（IV）进行加密。在 CBC 模式中，每个明文块都会与前一个密文块进行异或操作，然后再进行加密。由于个密文块都依赖于前一个密文块，因此 CBC 模式可以提供更好的安全性。但是，由于每个明文块都依赖于前一个密文块，因此 CBC 模式无法进行并行加密，因此速度较慢。"))]),t[2]||(t[2]=s("li",null,[s("strong",null,"CFB 模式"),a("：CFB（Cipher）模式是一种分组密码的工作模式，它可以将分组密码转换为流密码。在 CFB 模式中，加密器将前一个密文块作为输入，然后生成一个密钥流，再将密钥流与明文块进行异或操作，得到密文块。由于 CFB 模式可以将分组密码转换为流密码，因此它可以进行并行加密，速度较快。但是，由于每个密文块都依赖于前一个密文块，因此 CFB 模式无法提供与 CBC 模式相同的安全性。")],-1)),t[3]||(t[3]=s("li",null,[s("strong",null,"OFB 模式"),a("：OFB（Output Feedback）模式是一种分组密码的工作模式，它可以将分组密码转换为流密码。在 OFB 模式中，加密器将前一个密钥流作为输入，然后生成一个新的密钥流，再将密钥流与明文块进行异或操作，得到密文块。由于 OFB 模式可以将分组密码转换为流密码，因此它可以进行并行加密，速度较快。与 CFB 模式类似，OFB 模式也无法提供与 CBC 模式相同的安全性。")],-1)),t[4]||(t[4]=s("li",null,[s("strong",null,"ECB 模式"),a("：ECB（Electronic Codebook）模式是一种分组密码的工作模式，它将明文分成定长度的块，然后对每个块进行独立加密。由于 ECB 模式对于相同的明文块会生成相同的密文块，因此它容易受到密码分析攻击。ECB 模式可以进行并行加密，速度较快，但是安全性较差，不建议使用。")],-1))]),t[10]||(t[10]=s("blockquote",null,[s("p",null,"建议使用CBC模式")],-1)),t[11]||(t[11]=s("h3",{id:"填充方式",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#填充方式"},[s("span",null,"填充方式")])],-1)),s("ul",null,[s("li",null,[s("strong",null,[n(e,{color:"red"},{default:l(()=>t[5]||(t[5]=[a("PKCS5Padding 填充方式")])),_:1})]),t[6]||(t[6]=a("：PKCS5Padding 填充方式是一种填充方式，它会在明文末尾添加填充字节，以达到分组长度的数倍。填充字节的值等于需要填充的字节数。例如，如果明文长度为 14 字节，分组长度为 16 字节，则需要添加 2 个填充字节，值为 0x02。PKCS5Padding 填充方式可以提供良好的安全性，是最常用的填充方式之一。"))]),t[7]||(t[7]=s("li",null,[s("strong",null,"NoPadding 填充方式"),a("：NoPadding 填充方式不会对明文进行任何填充，因此明文长度必须是分组长度的整数倍。如果明文长度不是分组长度的整数倍，则需要在明文末尾添加空格或其他字符，使其长度达到分组长度的整数倍。由于 NoPadding 填充方式不会对明文进行任何填充，因此它可以提供更好的安全性。")],-1)),t[8]||(t[8]=s("li",null,[s("strong",null,"ISO10126Padding 填充方式"),a("：ISO10126Padding 填充方式会在明文末尾添加随机生成的填充字节，以达到分组长度的整数倍。由于 ISO10126Padding 填充方式会添加随机生成的填充字节，因此它可以提供更好的安全性。")],-1))]),t[12]||(t[12]=i(`<blockquote><p>建议使用 PKCS5Padding 填充方式</p></blockquote><h3 id="aes和sm4比较" tabindex="-1"><a class="header-anchor" href="#aes和sm4比较"><span>AES和SM4比较</span></a></h3><table><thead><tr><th>特点</th><th>AES</th><th>SM4</th></tr></thead><tbody><tr><td>密钥长度</td><td>128、192、256位</td><td>128位</td></tr><tr><td>块大小</td><td>128位</td><td>128位</td></tr><tr><td>加密模式</td><td>ECB、CBC、CFB、OFB、CTR等</td><td>ECB、CBC、CFB、OFB、CTR等</td></tr><tr><td>填充模式</td><td>NoPadding、PKCS5Padding、ISO10126Padding等</td><td>NoPadding、PKCS5Padding等</td></tr></tbody></table><hr><h2 id="非对称加密算法-rsa-vs-sm2" tabindex="-1"><a class="header-anchor" href="#非对称加密算法-rsa-vs-sm2"><span>非对称加密算法 RSA vs SM2</span></a></h2><p>RSA 和 SM2 都是安全性较高的非对称加密算法，适用于数字签名、密钥交换。</p><p>在这两个算法中，都有 <strong>公钥</strong> 和 <strong>私钥</strong> 的概念，公钥可以公开，私钥是私密的，这样一对公私钥称为 <strong>密钥对</strong>。</p><h3 id="非对称加密用于通讯" tabindex="-1"><a class="header-anchor" href="#非对称加密用于通讯"><span>非对称加密用于通讯</span></a></h3><p>一般来说，都是公钥加密，私钥解密，但这样只能单边通讯，如果系统双方需要相互通讯，可以生成两对密钥对。各自保存好自己的私钥和对方的公钥，用公钥加密，私钥进行解密。</p><p>但是非对称加密比对称加密要慢得多，在实际应用时，非对称加密总是和对称加密一起使用，例如非对称加密用来传输对称加密的密钥，随后用速度较快的对称加密来传输。</p><h3 id="非对称加密用于验签" tabindex="-1"><a class="header-anchor" href="#非对称加密用于验签"><span>非对称加密用于验签</span></a></h3><p>非对称加密还有另一种私钥加密，公钥解密的用法，但通常不用来传输密文，而是用于签名验签，原理是，如果一个密文公钥能解密出来，说明一定是私钥加密的，而不是其他人加密的。</p><hr><h2 id="摘要算法-md5-sha-vs-sm3" tabindex="-1"><a class="header-anchor" href="#摘要算法-md5-sha-vs-sm3"><span>摘要算法 MD5/SHA vs SM3</span></a></h2><p>信息摘要（Hash安全散列）算法，也叫哈希算法，哈希值也叫散列值，不可逆，不需要秘钥。</p><p>MD5 和 SHA-256 都是密码散列函数，加密不可逆。虽然都不能防止碰撞，但是相对而言，MD5比较容易碰撞，安全性没有SHA-256高。</p><p>据官方称，SM3安全性及效率与SHA-256相当.</p><hr><h2 id="java-将-aes-rsa-sha-md5-改造成-sm4-sm2-sm3" tabindex="-1"><a class="header-anchor" href="#java-将-aes-rsa-sha-md5-改造成-sm4-sm2-sm3"><span>Java 将 AES/RSA/SHA/MD5 改造成 SM4/SM2/SM3</span></a></h2><p>可使用 <code>bouncycastle</code> 库，在1.57版本之后，加入了对SM2、SM3、SM4算法的支持。</p><p>具体实现封装可见下文参考链接。</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">dependency</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">groupId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">org.bouncycastle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">groupId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">artifactId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">bcprov-jdk15on</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">artifactId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">version</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">1.70</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">version</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">dependency</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://segmentfault.com/a/1190000043402471" target="_blank" rel="noopener noreferrer">支付对接常用的加密方式介绍以及java代码实现</a></li><li><a href="https://www.liaoxuefeng.com/wiki/1252599548343744/1304227873816610" target="_blank" rel="noopener noreferrer">非对称加密算法</a></li></ul>`,25))])}const c=d(o,[["render",k],["__file","index.html.vue"]]),S=JSON.parse('{"path":"/article/8u738cor/","title":"数说国密算法","lang":"zh-CN","frontmatter":{"title":"数说国密算法","categories":"信息安全","abbrlink":"d769baf5","createTime":"2023/06/03 22:12:00","permalink":"/article/8u738cor/","description":"国密算法简介 什么是国密算法 国密算法即国家密码局认定的国产加密算法，也称为“商用密码算法”，包括 SM1、SM2、SM3、SM4、SM7、SM9 等。SM 代表商密，即商业密码，是指用于商业的、不涉及国家秘密的密码技术。 国密算法的设计目标是保证安全性、高效性和 自主可控性，这些算法已经被广泛应用于中国政府和企业的信息安全领域，也逐渐得到了国际认可和...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/article/8u738cor/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"数说国密算法"}],["meta",{"property":"og:description","content":"国密算法简介 什么是国密算法 国密算法即国家密码局认定的国产加密算法，也称为“商用密码算法”，包括 SM1、SM2、SM3、SM4、SM7、SM9 等。SM 代表商密，即商业密码，是指用于商业的、不涉及国家秘密的密码技术。 国密算法的设计目标是保证安全性、高效性和 自主可控性，这些算法已经被广泛应用于中国政府和企业的信息安全领域，也逐渐得到了国际认可和..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数说国密算法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"国密算法简介","slug":"国密算法简介","link":"#国密算法简介","children":[{"level":3,"title":"什么是国密算法","slug":"什么是国密算法","link":"#什么是国密算法","children":[]}]},{"level":2,"title":"各种国密算法的特点","slug":"各种国密算法的特点","link":"#各种国密算法的特点","children":[]},{"level":2,"title":"分组加密算法 AES vs SM4","slug":"分组加密算法-aes-vs-sm4","link":"#分组加密算法-aes-vs-sm4","children":[{"level":3,"title":"加密模式","slug":"加密模式","link":"#加密模式","children":[]},{"level":3,"title":"填充方式","slug":"填充方式","link":"#填充方式","children":[]},{"level":3,"title":"AES和SM4比较","slug":"aes和sm4比较","link":"#aes和sm4比较","children":[]}]},{"level":2,"title":"非对称加密算法 RSA vs SM2","slug":"非对称加密算法-rsa-vs-sm2","link":"#非对称加密算法-rsa-vs-sm2","children":[{"level":3,"title":"非对称加密用于通讯","slug":"非对称加密用于通讯","link":"#非对称加密用于通讯","children":[]},{"level":3,"title":"非对称加密用于验签","slug":"非对称加密用于验签","link":"#非对称加密用于验签","children":[]}]},{"level":2,"title":"摘要算法 MD5/SHA vs SM3","slug":"摘要算法-md5-sha-vs-sm3","link":"#摘要算法-md5-sha-vs-sm3","children":[]},{"level":2,"title":"Java 将 AES/RSA/SHA/MD5 改造成 SM4/SM2/SM3","slug":"java-将-aes-rsa-sha-md5-改造成-sm4-sm2-sm3","link":"#java-将-aes-rsa-sha-md5-改造成-sm4-sm2-sm3","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"readingTime":{"minutes":6.24,"words":1872},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/security/数说国密算法.md","categoryList":[{"id":"18958e","sort":10000,"name":"posts"},{"id":"ada0cc","sort":10012,"name":"security"}]}');export{c as comp,S as data};

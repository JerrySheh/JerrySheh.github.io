import{_ as o,c as i,f as t,a as s,d as n,e as r,r as l,o as d,b as p}from"./app-D22ydJtp.js";const c={};function m(h,e){const a=l("font");return d(),i("div",null,[e[1]||(e[1]=t(`<p>最近收到了一加推送的 OnePlus 5T 氢OS Android 10.0.1 的固件更新，不得不说一加还是很良心的，三年前的机型还保持着官方升级。立马更新尝鲜了，但是更新后，发现我的 ROOT 权限没了。于是到一加社区一番搜索，发现了 <a href="https://www.oneplusbbs.com/forum.php?mod=viewthread&amp;tid=5398217" target="_blank" rel="noopener noreferrer">这个帖子</a> 提到可以用 platform-tools （这个工具应该不陌生了，线刷必备） 手动刷 magisk.apk 和 magisk_patched.img。 magisk.apk 我知道是我们熟悉的面具软件，但直觉告诉我这个 img 应该是跟固件相关的，帖子里是 10.0 公测版的固件，img 肯定跟 10.0.1 不同了。</p><p>那么，从哪里制作对应固件的 magisk_patched.img 呢？</p><h1 id="google-it" tabindex="-1"><a class="header-anchor" href="#google-it"><span>Google It</span></a></h1><p>经过一番 Google，在 <a href="https://topjohnwu.github.io/Magisk/install.html" target="_blank" rel="noopener noreferrer">magisk 的官方文档</a> 里找到了这么一段话：</p><blockquote><p>You would want to choose this method if either your device does not have custom recoveries, your device is A/B and you don’t want to mix recovery and boot images, or your device is using system-as-root without A/B partitions.</p><p>To use this method, you are required to obtain a copy of the stock boot/recovery image, which can be found by extracting OEM provided factory images or extracting from OTA update zips. If you are unable to obtain one yourself, you might be able to find it somewhere on the internet. The following instructions will guide you through the process after you have the copy of boot/recovery image.</p></blockquote><p>意思是说，只要我们能拿到固件刷机包里的 boot image 文件， 用 Magisk 软件可以对其进行 patch， 实际上 magisk_patched.img 就是 boot.img 的修改。并给出了步骤：</p><ul><li>Copy the boot/recovery image to your device</li><li>Download and install the latest Magisk Manager</li><li>If you are patching a recovery image, manually check “Recovery Mode” in Advanced Settings!</li><li>Press Install → Install → Select and Patch a File, and select your stock boot/recovery image file</li><li>Magisk Manager will patch the image, and store it in [Internal Storage]/- Download/magisk_patched.img</li><li>Copy the patched image from your device to your PC. If you can’t find it via MTP, you can pull the file with ADB:</li><li>adb pull /sdcard/Download/magisk_patched.img Flash the patched boot/recovery image to your device and reboot. For most devices, here is the fastboot command:</li></ul><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>fastboot flash boot /path/to/magisk_patched.img</span></span>
<span class="line"><span># or</span></span>
<span class="line"><span>fastboot flash recovery /path/to/magisk_patched.img</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>刚刚下载固件时忘记保存安装包了，更新后被系统升级自动删除了。于是又到一加社区搜到了全量包的下载地址，解压后把里面的 boot.img 提取出来，照着上面的方法很快就制作好了 magisk_patched.img 。</p><h1 id="do-it" tabindex="-1"><a class="header-anchor" href="#do-it"><span>Do It</span></a></h1><p>简单复述下步骤，如下：</p><h2 id="_1-解锁bootloader" tabindex="-1"><a class="header-anchor" href="#_1-解锁bootloader"><span>1. 解锁BootLoader</span></a></h2>`,12)),s("blockquote",null,[n(a,{color:"red"},{default:r(()=>e[0]||(e[0]=[p("警告：解锁BootLoader会清空数据，请提前备份 ")])),_:1})]),e[2]||(e[2]=t(`<p>开发者选项OEM解锁打开，开启USB调试连接电脑，adb输入以下命令重启至 bootloader 模式</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>adb reboot bootloader</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>之后在手机上选择 unlock， 重启即解锁</p><h3 id="_2-提取-boot-img" tabindex="-1"><a class="header-anchor" href="#_2-提取-boot-img"><span>2. 提取 boot.img</span></a></h3><p>到官网下载固件全量包，如果是zip，解压缩能看到 boot.img， 直接把 boot.img 拖出来。如果是 payload.bin ，需要用 Payload_Dumber_x64 工具（网上下载）提取（源码参考 <a href="https://gist.github.com/ius/42bd02a5df2226633a342ab7a9c60f15" target="_blank" rel="noopener noreferrer">github</a> ）。</p><h3 id="_3-platform-tools" tabindex="-1"><a class="header-anchor" href="#_3-platform-tools"><span>3. platform-tools</span></a></h3><p>使用 platform-tools （网上下载）安装 magisk（网上下载），使用 adb 安装到手机</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>adb install magisk.apk</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_4-制作-magisk-patched-img" tabindex="-1"><a class="header-anchor" href="#_4-制作-magisk-patched-img"><span>4. 制作 magisk_patched.img</span></a></h3><p>就是在 magisk app 里面点安装，再点选择并修补一个文件，将前期提取的固件里的 boot.img 放到手机存储里面，选择你的 boot.img ，然后 magisk 会自动修复，并生成 magisk_patched.img，将 magisk_patched.img 提取到电脑 platform-tools 目录下。</p><h3 id="_5-刷入img" tabindex="-1"><a class="header-anchor" href="#_5-刷入img"><span>5. 刷入img</span></a></h3><p>重启到 bootloader，刷入img。这一步的意思是使用我们的 magisk_patched.img 来驱动手机启动。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>adb reboot bootloader</span></span>
<span class="line"><span>fastboot boot magisk_patched.img</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>手机自动重启后，即获得临时 root 权限。</p><h3 id="_6-直接安装" tabindex="-1"><a class="header-anchor" href="#_6-直接安装"><span>6. 直接安装</span></a></h3><p>到 magisk app 里面点安装，再点直接安装，即可获得永久 root 。</p>`,16))])}const u=o(c,[["render",m],["__file","index.html.vue"]]),b=JSON.parse('{"path":"/article/egxyv0jx/","title":"Android 10 ROOT","lang":"zh-CN","frontmatter":{"title":"Android 10 ROOT","tags":["Android"],"categories":"瞎折腾","abbrlink":"3903647e","createTime":"2020/08/21 23:25:16","permalink":"/article/egxyv0jx/","description":"最近收到了一加推送的 OnePlus 5T 氢OS Android 10.0.1 的固件更新，不得不说一加还是很良心的，三年前的机型还保持着官方升级。立马更新尝鲜了，但是更新后，发现我的 ROOT 权限没了。于是到一加社区一番搜索，发现了 这个帖子 提到可以用 platform-tools （这个工具应该不陌生了，线刷必备） 手动刷 magisk.ap...","head":[["meta",{"property":"og:url","content":"https://jerrysheh.com/article/egxyv0jx/"}],["meta",{"property":"og:site_name","content":"Jerry"}],["meta",{"property":"og:title","content":"Android 10 ROOT"}],["meta",{"property":"og:description","content":"最近收到了一加推送的 OnePlus 5T 氢OS Android 10.0.1 的固件更新，不得不说一加还是很良心的，三年前的机型还保持着官方升级。立马更新尝鲜了，但是更新后，发现我的 ROOT 权限没了。于是到一加社区一番搜索，发现了 这个帖子 提到可以用 platform-tools （这个工具应该不陌生了，线刷必备） 手动刷 magisk.ap..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T05:02:32.000Z"}],["meta",{"property":"article:tag","content":"Android"}],["meta",{"property":"article:modified_time","content":"2024-10-20T05:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Android 10 ROOT\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-20T05:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. 解锁BootLoader","slug":"_1-解锁bootloader","link":"#_1-解锁bootloader","children":[{"level":3,"title":"2. 提取 boot.img","slug":"_2-提取-boot-img","link":"#_2-提取-boot-img","children":[]},{"level":3,"title":"3. platform-tools","slug":"_3-platform-tools","link":"#_3-platform-tools","children":[]},{"level":3,"title":"4. 制作 magisk_patched.img","slug":"_4-制作-magisk-patched-img","link":"#_4-制作-magisk-patched-img","children":[]},{"level":3,"title":"5. 刷入img","slug":"_5-刷入img","link":"#_5-刷入img","children":[]},{"level":3,"title":"6. 直接安装","slug":"_6-直接安装","link":"#_6-直接安装","children":[]}]}],"readingTime":{"minutes":2.98,"words":894},"git":{"createdTime":1729400552000,"updatedTime":1729400552000,"contributors":[{"name":"jerrysheh","email":"jerrysheh@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/toss/Android-10-ROOT.md","categoryList":[{"id":"18958e","sort":10000,"name":"posts"},{"id":"033bbb","sort":10011,"name":"toss"}]}');export{u as comp,b as data};

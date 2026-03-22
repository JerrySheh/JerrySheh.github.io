---
description: 格式化 LeetCode 题解 Markdown 文件
---

# 格式化 LeetCode Markdown 文件

当用户要求格式化特定的 LeetCode 题解所在目录时，请执行以下步骤：

1. 创建一个 Python 脚本 `format_leetcode.py` (推荐放在当前工作目录或 `/tmp`)，代码如下。此代码将自动提取题目信息，清理无用 HTML，并在末尾追加解题模板。

```python
import os
import sys
import re

if len(sys.argv) < 2:
    print("Usage: python format_leetcode.py <directory>")
    sys.exit(1)

target_dir = sys.argv[1]
template = \"\"\"## 解题思路



## Java实现

```java

```
\"\"\"

for filename in os.listdir(target_dir):
    if not filename.endswith('.md') or filename == "index.md":
        continue
    filepath = os.path.join(target_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. 解析 frontmatter 提取信息
    title_match = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if not title_match:
        continue
    title_line = title_match.group(1).strip()
    
    if '_' not in title_line:
        continue
        
    problem_id = title_line.split('_')[0].strip()
    
    # 2. 更新 permalink
    content = re.sub(r'^permalink:\s*.*$', f'permalink: /interview/leetcode/{problem_id}/', content, flags=re.MULTILINE)
    
    # 3. 提取难度并添加到 title
    diff_match = re.search(r'\*\*难度:\*\*\s*(EASY|MEDIUM|HARD|简单|中等|困难)', content, re.IGNORECASE)
    difficulty = diff_match.group(1).upper() if diff_match else ""
    if difficulty == "简单": difficulty = "EASY"
    elif difficulty == "中等": difficulty = "MEDIUM"
    elif difficulty == "困难": difficulty = "HARD"
    
    if difficulty and '[' not in title_line:
        new_title_line = f"title: {title_line}[{difficulty}]"
        content = re.sub(r'^title:\s*.*$', new_title_line, content, flags=re.MULTILINE)
        
    # 4. 精简“题目描述”
    content = re.sub(r'##\s*\d+\.\s*.*?(?:\n|\\n)+\*\*难度:\*\*.*?(?:\n|\\n)+##\s*题目描述(?:\n|\\n)+', '', content, flags=re.MULTILINE)
    
    # 5. 删除非 img 解析的 html 标签
    content = re.sub(r'<(?!\s*/?\s*img\b)[^>]+>', '', content)
    
    # 6. 删除示例中的加粗，并将输入输出部分使用 ``` 包裹
    content = re.sub(r'\*\*(输入[：:])\*\*', r'\1', content)
    content = re.sub(r'\*\*(输出[：:])\*\*', r'\1', content)
    content = re.sub(r'\*\*(解释[：:])\*\*', r'\1', content)
    content = re.sub(r'\*\*(示例\s*\d+[：:])\*\*', r'\1', content)
    content = re.sub(r'(示例\s*\d+[：:])\*\*', r'\1', content)
    content = re.sub(r'\*\*(提示[：:])\*\*', r'\1', content)
    
    parts = content.split("## 解题思路")
    if len(parts) == 2:
        body = parts[0]
        tail = "## 解题思路" + parts[1]
        
        # 移除非 Java 模版原有的反引号，避免嵌套和排版错乱
        body = body.replace('```', '')
        
        def wrap_example(match):
            text = match.group(0).strip()
            return f"```\n{text}\n```\n\n"
            
        # 匹配"输入："到其后的第一个空行或下一个区块标记(<img, 示例)
        body = re.sub(r'(输入：(?:(?!\n\s*\n|<img|示例).)*)', wrap_example, body, flags=re.DOTALL)
        content = body + tail
    
    # 7. 从 "提示:" 行截断，并添加固定模板
    hint_match = re.search(r'^(?:\*\*)?提示[：:]', content, re.MULTILINE)
    if hint_match:
        content = content[:hint_match.start()]
        content += template
        
    # 清理多余空行
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Formatted: {filepath}")

```

2. 运行该脚本，将目标目录传递给它：

// turbo-all
```bash
python format_leetcode.py "<目标目录绝对路径>"
```

3. 验证格式化结果是否准确。由于此脚本清理和替换较多内容，请务必查看一两个文件以确认没有意外损坏内容。完成后可以删除创建的临时 python 脚本。

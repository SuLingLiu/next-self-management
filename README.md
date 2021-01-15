

## 配置环境变量
``` js
"scripts": {
    "dev": " next dev --port 80",
    "build": "cross-env NODE_ENV=production next build",
    "start": "next start  --port 80",
    "uat": "cross-env NODE_ENV=test next build"
  },
```

再参考next.config.js 里env变量

## 修改moongoodb的文件是config.js里的MONGODB_URI变量

## 添加接口请求的路径可以在config.js

## 入口文件 _app.js
引用公共的全局样式，以及一些公用的东西，如react-redux等等

## 配置端口号
参照 package.json 的 scripts 的--port 80

## fetch 
fetch post请求的参数要放到body里，且数据要字符串化

fetch 的地址要带协议，官方demo里不带协议会报错
``` js
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
.then((res) => res.json())
.then((json) => json.data)
```

## less引用的问题
less 引用参考 next.config.js，引用了antd+less以后就不能再使用cssModel也就局部样式
## 解决报错总结

1. <font color='red'>[antd key报错 Each child in a list should have a unique “key“ prop.](https://www.cnblogs.com/scott-j/p/13840992.html) </font>

>解决方案：for循环的时候react 需要给key赋唯一值key={item._id}，如果是表格要给rowKey赋值

2. <font color="red">OverwriteModelError: Cannot overwrite `listProject` model once compiled.</font>

>mongoose model如果只写 `mongoose.model('ListProject', projectSchema);`会报错，因为这样写不是单例模式，
>解决方案：要写成`export default mongoose.models.ListProject || mongoose.model('ListProject', projectSchema);`

3. <font color="red">react-dom.development.js?61bb:13231 Uncaught Error: Objects are not valid as a React child (found: object with keys {_isAMomentObject, _isUTC, _pf, _locale, _d, _isValid}). If you meant to render a collection of children, use an array instead.</font>


> 是因为用了map循环，数据里有对象，且又setData了,如：<code>const newData = data?.map((item) => ({ ...item })) || [];setData(newData);</code>
>解决方案：用const newData = JSON.parse(JSON.stringify(data));代替map

4. <font color="red">react-redux Syntax error: Support for the experimental syntax 'decorators-legacy' isn't currently enabled</font>
解答：装 npm install @babel/plugin-proposal-decorators --save-dev
> 解决方案：
在package.json里加
``` js
"babel": {
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ]
  },
```
如果有.babelrc文件则
``` js
    
{
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
}

```
除了以上还提示装 npm i @babel/core --save-dev

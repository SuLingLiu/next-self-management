[antd key报错 Each child in a list should have a unique “key“ prop.](https://www.cnblogs.com/scott-j/p/13840992.html)

//写成这样的方式会报错，OverwriteModelError: Cannot overwrite `listProject` model once compiled.
export default mongoose.models.ListProject || mongoose.model('ListProject', projectSchema);

配置环境变量

引用公共的全局样式 _app.js

配置端口号

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

less引用的问题

react-dom.development.js?61bb:67 Warning: React does not recognize the `scrollLocker` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `scrolllocker` instead. If you accidentally passed it from a parent component, remove it from the DOM element.



react-dom.development.js?61bb:13231 Uncaught Error: Objects are not valid as a React child (found: object with keys {_isAMomentObject, _isUTC, _pf, _locale, _d, _isValid}). If you meant to render a collection of children, use an array instead.

是因为用了map循环，数据里有对象，且又setData了

const newData = data?.map((item) => ({ ...item })) || [];
setData(newData);

用const newData = JSON.parse(JSON.stringify(data));代替map
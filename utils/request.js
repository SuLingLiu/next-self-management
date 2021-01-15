
export default async function (url,param={ method: "GET"}) {
    url = process.env.domainUrl + url //请求地址要求完整的地址，官方给的demo例子不对
    
    const res = await fetch(url,param)
    const data = await res.json()
    return data
}

// const fetcher = (query) =>
//   fetch('/api/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({ query }),
//   })
//     .then((res) => res.json())
//     .then((json) => json.data)
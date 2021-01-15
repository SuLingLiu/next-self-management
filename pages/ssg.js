
  
    //   import cookie from 'react-cookies'
    //   let _erm_sso = cookie.load('_erm_sso') || 'a214e64d-51dc-456d-b28f-e93ede7837cc'
  
      let _erm_sso = 'ecc8b2fd-98ea-4a5d-864d-25f3ae3ed961'
      let DEFAULT_OPTIONS = {
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
          'token': _erm_sso
        },
      }
  
  export default function Home({stars}) {
      console.log(stars)
    let aa = JSON.stringify(stars);
    return (
      <div>{aa}</div>

    )
  }
  
  export async function getStaticProps() {
    const res = await fetch('http://crp.uat.gomedc.com/mshop/dealVshop/queryFansList?upUserId=100054959529&pageSize=10&pageNumber=1&fansType=',DEFAULT_OPTIONS)
    const json = await res.json()

    return {
      props: {
        stars : json.data
      },
    }
  }
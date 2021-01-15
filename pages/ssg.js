
  
    //   import cookie from 'react-cookies'
    //   let _erm_sso = cookie.load('_erm_sso') || 'a214e64d-51dc-456d-b28f-e93ede7837cc'
  
      let _erm_sso = '7d259a68-0acb-4700-951e-2a443d1509f3'
      let DEFAULT_OPTIONS = {
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
          'token': _erm_sso
        },
      }
      console.log('ssg1---',process.env.domainUrl)
  export default function Home({stars}) {
    let aa = JSON.stringify(stars);
    console.log('ssg2---',process.env.domainUrl)
    return (
      <div>
          <p>{process.env.domainUrl}</p>
      
          <div>{aa}</div>
      
      </div>

    )
  }
  
  export async function getStaticProps() {
    const res = await fetch('http://crp.uat.gomedc.com/mshop/dealVshop/queryFansList?upUserId=100054959529&pageSize=10&pageNumber=1&fansType=',DEFAULT_OPTIONS)
    const json = await res.json()
    console.log('ssg0---',process.env.domainUrl)
    return {
      props: {
        stars : json.data
      },
    }
  }
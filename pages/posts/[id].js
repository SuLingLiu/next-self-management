
  
    //   import cookie from 'react-cookies'
    //   let _erm_sso = cookie.load('_erm_sso') || 'a214e64d-51dc-456d-b28f-e93ede7837cc'
  
    let _erm_sso = '2ed83966-2bbf-4e09-920f-8d2a15a56000'
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
    <div>
        <p>{process.env.domainUrl}</p>
        {aa}
    </div>

  )
}

export function getStaticPaths() {
    return {
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
      fallback: true,
    }
  }

export async function getStaticProps({ params }) {
  const res = await fetch(`http://crp.uat.gomedc.com/mshop/dealVshop/queryFansList?upUserId=100054959529&pageSize=${params.id}&pageNumber=1&fansType=`,DEFAULT_OPTIONS)
  const json = await res.json()

  return {
    props: {
      stars : json.data
    },
  }
}
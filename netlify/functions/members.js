import fetch from 'node-fetch';

export const handler = async (event) => {

    let res = await fetch(`https://whois.fdnd.nl/api/v1/members`)
    let data = await res.json();

    for (var i = 0; i < data.length; ++i) {
      var memberName = data[i];
     
      if (memberName.members.name == event.rawQuery) {
        let res2 = await fetch(`https://whois.fdnd.nl/api/v1/member?id=` + memberName.members.id);
        let data2 = await res2.json();
        
        return {
          statusCode: 200,
          headers: {
            /* Required for CORS support to work */
            'Access-Control-Allow-Origin': '*',
            /* Required for cookies, authorization headers with HTTPS */
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({
            data: data2
          })
        }

        break;
      }
    }
  }
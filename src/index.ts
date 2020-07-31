import fetch from 'isomorphic-unfetch'

const radikoApp = 'pc_html5'
const radikoAppVersion = '0.0.1'
const radikoUser = 'dummy_user'
const radikoDevice = 'pc'
const radikoAuthKey = 'bcd151073c03b352e1ef2fd66c32209da9ca0afa'

const createPartialKey = (keyOffset: number, keyLength: number) => {
  const baseKey = radikoAuthKey.substring(keyOffset, keyOffset + keyLength)
  const partialKey = Buffer.from(baseKey).toString('base64')

  return partialKey
}

export const getAuthToken = async () => {
  try {
    const auth1Response = await fetch('https://radiko.jp/v2/api/auth1', {
      headers: {
        'X-Radiko-App': radikoApp,
        'X-Radiko-App-Version': radikoAppVersion,
        'X-Radiko-User': radikoUser,
        'X-Radiko-Device': radikoDevice,
      },
    })

    const authToken = auth1Response.headers.get('x-radiko-authtoken')
    const keyLength = auth1Response.headers.get('x-radiko-keylength')
    const keyOffset = auth1Response.headers.get('x-radiko-keyoffset')

    if (
      auth1Response.ok == false ||
      authToken == undefined ||
      keyLength == undefined ||
      keyOffset == undefined
    ) {
      throw 'Failed auth1'
    }

    const auth2Response = await fetch('https://radiko.jp/v2/api/auth2', {
      headers: {
        'X-Radiko-AuthToken': authToken,
        'X-Radiko-PartialKey': createPartialKey(
          Number(keyOffset),
          Number(keyLength)
        ),
        'X-Radiko-Device': 'pc',
        'X-Radiko-User': 'dummy_user',
      },
    })

    if (!auth2Response.ok) throw 'Failed auth2'

    return authToken
  } catch (error) {
    console.error(error)
  }
}

import { getAuthToken } from './index'

describe('x-radiko-authtoken', () => {
  test('is string', () => {
    return getAuthToken().then((authToken) => {
      expect(typeof authToken == 'string').toBeTruthy()
    })
  })

  test('have 22 letters', () => {
    return getAuthToken().then((authToken) => {
      expect(authToken).toHaveLength(22)
    })
  })
})

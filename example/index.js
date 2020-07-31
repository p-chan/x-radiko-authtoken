const xRadikoAuthtoken = require('../dist')

;(async () => {
  xRadikoAuthtoken.getAuthToken().then((authToken) => {
    console.log(authToken)
  })
})()

import axios from 'axios'

export async function login(login, password) {
  console.log(login)
  const jsonToken = await (
    await axios.post(
      'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/authentication/actions/login',
      {
        username: login,
        password: password,
        escopo: 'string',
      }
    )
  ).data.jsonToken

  return JSON.parse(jsonToken).access_token
}

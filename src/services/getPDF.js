import axios from "axios"

export async function getPDF(token) {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const fornecedorResponse = await axios.get(process.env.REACT_APP_WSPDFBASE64_URL, config)

  return fornecedorResponse.data
}
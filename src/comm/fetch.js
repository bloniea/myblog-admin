import QS from 'qs'
import router from '@/router'
const api = '/adminApi'
export const fetchApi = async (url, options = {}) => {
  try {

    if ((!options.method || options.method == 'get') && options.params) url = url + '?' + QS.stringify(options.params)
    const token = localStorage.getItem('token')
    const data = await fetch(url, {
      ...options,
      headers: {
        authorization: token || '',
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    // 401为用户名或密码错误和token失效
    if (data.status == 401) {
      // 将上一次请求失败的请求内容存储起来，刷新token后以便重新请求
      window.localStorage.setItem('url', url)
      window.localStorage.setItem('options', JSON.stringify(options))
      const refresh_token = window.localStorage.getItem('refresh_token')
      if (refresh_token && refresh_token != 'undefined') {
        const t = await fetchApi(api + '/refresh_token?refresh_token=' + refresh_token, { method: 'post' })
        if (t.status === 200 && t.ok) {
          window.localStorage.setItem('token', t.data.data.token)
          if (t.data.data.refresh_token && t.data.data.refresh_token != 'undefined') {
            window.localStorage.setItem('refresh_token', t.data.data.refresh_token)
          }
          // 获取上一次请求失败的内容，执行重新请求
          let Nurl = window.localStorage.getItem('url')
          let Noptions = window.localStorage.getItem('options')
          return await fetchApi(Nurl, JSON.parse(Noptions))
        } else if (t.status === 402) { //402为refresh_token已过期
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('userInfo')
          window.localStorage.removeItem('refresh_token')
          router.push({ name: 'Login' })
        }
      }
    }
    const dataJson = await data.json()
    data.data = dataJson
    return data
  } catch (error) {
    console.log(error)
  }
}


export const login = async (params) => {
  const url = api + '/login'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}

export const getInfo = async () => {
  const url = api + '/info'
  return await fetchApi(url)
}

export const editMeApi = async (id, params) => {
  const url = api + '/me/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}
export const getUserApi = async (id) => {
  const url = api + '/user/' + id
  return await fetchApi(url)
}
export const getUsersApi = async (params) => {
  const url = api + '/users'
  return await fetchApi(url, { params: params })
}
export const addUserApi = async (params) => {
  const url = api + '/user'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
export const delUserApi = async (id) => {
  const url = api + '/user/' + id
  return await fetchApi(url, { method: 'delete' })
}
export const updateUserApi = async (id, params) => {
  const url = api + '/user/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}

export const getRolesApi = async (params) => {
  const url = api + '/roles'
  return await fetchApi(url, { params: params })
}

export const delRoleApi = async (id) => {
  const url = api + '/role/' + id
  return await fetchApi(url, { method: 'delete' })
}
export const addRoleApi = async (params) => {
  const url = api + '/role'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}

export const getRightsApi = async () => {
  const url = api + '/rights'
  return await fetchApi(url)
}

export const updateRoleApi = async (id, params) => {
  const url = api + '/role/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}

export const getCategoriesApi = async (params) => {
  const url = api + '/categories'
  return await fetchApi(url, { params: params })

}
export const addCategoryApi = async (params) => {
  const url = api + '/category'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
export const delCategoryApi = async (id) => {
  const url = api + '/category/' + id
  return await fetchApi(url, { method: 'delete' })
}
export const editCategoryApi = async (id, params) => {
  const url = api + '/category/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}

export const getLabelsApi = async (params) => {
  const url = api + '/labels'
  return await fetchApi(url, { params: params })
}
export const addLabelApi = async (params) => {
  const url = api + '/label'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
export const delLabelApi = async (id) => {
  const url = api + '/label/' + id
  return await fetchApi(url, { method: 'delete' })
}
export const editLabelApi = async (id, params) => {
  const url = api + '/label/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}

export const getFriendsApi = async (params) => {
  const url = api + '/friends/'
  return await fetchApi(url, { params: params })
}
export const addFriendApi = async (params) => {
  const url = api + '/friend'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
export const delFriendApi = async (id) => {
  const url = api + '/friend/' + id
  return await fetchApi(url, { method: 'delete' })
}
export const editFriendApi = async (id, params) => {
  const url = api + '/friend/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}
export const getArticlesApi = async (params) => {
  const url = api + '/articles/'
  return await fetchApi(url, { params: params })
}
export const getArticleApi = async (id) => {
  const url = api + '/article/' + id
  return await fetchApi(url)
}
export const delArticleApi = async (id) => {
  const url = api + '/article/' + id
  return await fetchApi(url, { method: 'delete' })
}
export const addArticleApi = async (params) => {
  const url = api + '/article/'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
export const editArticleApi = async (id, params) => {
  const url = api + '/article/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}
export const addAboutArticle = async (params) => {
  const url = api + '/aboutArticle'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}

export const getAboutArticles = async (params) => {
  const url = api + '/aboutArticles'
  return await fetchApi(url, { params: params })
}

export const getAboutArticle = async (id) => {
  const url = api + '/aboutArticle/' + id
  return await fetchApi(url)
}

export const editAboutArticle = async (id, params) => {
  const url = api + '/aboutArticle/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}
export const delAboutArticle = async (id) => {
  const url = api + '/aboutArticle/' + id
  return await fetchApi(url, { method: 'delete' })
}

export const addAnime = async (params) => {
  const url = api + '/anime'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
export const getAnimesApi = async (params) => {
  const url = api + '/animes'
  return await fetchApi(url, { params: params })
}

export const getAnimeApi = async (id) => {
  const url = api + '/anime/' + id
  return await fetchApi(url)
}

export const editAnimeApi = async (id, params) => {
  const url = api + '/anime/' + id
  return await fetchApi(url, { method: 'put', body: JSON.stringify(params) })
}

export const delAnimeApi = async (id) => {
  const url = api + '/anime/' + id
  return await fetchApi(url, { method: 'delete' })
}
//example api request: replace with your API request here in folder API

export const getAlbumList = async () => {
  try {
    const res = await fetch(
      'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
    )
    const data = await res.json()
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}

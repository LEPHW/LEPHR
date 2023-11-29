const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.useInfo.userId,
  name: state => state.user.useInfo.username,
  avatar: state => state.user.useInfo.staffPhoto,

}
export default getters

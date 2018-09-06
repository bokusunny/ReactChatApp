import request from 'superagent'
import Dispatcher from '../dispatcher'
import MessagesAction from './messages'
import { ActionTypes, APIEndpoints, CSRFToken } from '../constants/app'

export default {
  createFriend(toUserId) {
    return new Promise(() => {
      request
      .post(`${APIEndpoints.FRIENDSHIP}/create_friendship`)
      .set('X-CSRF-Token', CSRFToken())
      .send({ to_user_id: toUserId })
      .end((error, res) => {
        // HACK(Sunny): SearchFormから飛んだ時はOpenchatIDを最初からつけてあげたい
        MessagesAction.changeOpenChat(toUserID)
        if (error || !(res.status === 200)) {
          alert('その人は既に友達です')
        }
      })
    })
  },

  destroyFriendship(toUserId) {
    debugger
    return new Promise(() => {
      request
      .del(`${APIEndpoints.FRIENDSHIP}/destroy_friendship`)
      .set('X-CSRF-Token', CSRFToken())
      .send({ to_user_id: toUserId })
      .end((error, res) => {
        if (error || !(res.status === 200)) {
          alert('友達解除に失敗しました')
        }
      })
    })
  },
}

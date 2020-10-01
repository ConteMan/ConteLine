import request from "@/request/http"
import base from "@/api/base"

const worldline = {
  worldline(data) {
    const requestData = {
      offset: data.offset || 0,
      limit: data.limit || 5,
    }
    return request({
      url: `${base.api}/api/worldline`,
      method: 'get',
      params: requestData
    })
  },
}

export default worldline;

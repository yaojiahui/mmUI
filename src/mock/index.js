import Mock from 'mockjs';

export default function initMock() {
  Mock.mock('/api/getChooseSeatInfo', _ => (
    {
      "code": "0000",
      "result": {
        "msgCode": "100",
        "msgInfo": "请求成功",
        "trainNo": "D3126",
        "seatInfo": ["4", "3"],
        "seats":"4"
      }
    }
  ));
  Mock.mock('/api/getChooseSeatInfo2', _ => (
    {
      "code": "0000",
      "result": {
        "msgCode": "100",
        "msgInfo": "请求成功",
        "trainNo": "G24",
        "seatInfo": ["4", "3"],
        "seats":"3"
      }
    }
  ));
};


export default {
  'POST /api/login': (req, res) => {
    const { username, password } = req.body
    if ( username === 'admin' && password === '000000' ) {
      res.send({
        code: 'OK'
      })
    } else {
      res.send({
        code: 'ERR'
      })
    }
  },
  'GET /api/getOrder': (req, res) => {
    const {page, num} = req.query
    let start =(page-1) * num
    let end = page * num
    let arr = []
    for ( start; start < end; start++ ) {
      let obj = {
        id: start + 1,
        name: '订单'+ (start + 1),
      }
      arr.push(obj)
    }
    res.send(arr)
  }
};

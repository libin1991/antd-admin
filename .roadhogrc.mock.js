
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
  }
};

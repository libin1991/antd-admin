import React from 'react'

/* 
  将表格或列表中搜索和分页的功能提取出来，
  type 代表获取数据后需要 dispatch 的model的type
*/

export default type => WrapComponent => {
  return class extends React.Component {
    state = {
      formValues: {},
      page: 1,
      num: 10
    }

    resetData = () => {
      this.props.form && this.props.form.resetFields()
      this.setState({
        page: 1,
        formValues: {}
      }, this.getData)
    }

    getData = ()=> {
      let elseSearchParams
      if (this.warpCom.getSearchParams) {
        elseSearchParams = this.warpCom.getSearchParams()
      } else {
        elseSearchParams = {}
      }
      const { page, num, formValues } = this.state
      this.props.dispatch({
        type,
        payload: {
          page,
          num,
          ...formValues,
          ...elseSearchParams
        }
      })
    }

    searchData = formValues=> {
      this.setState({
        page: 1,
        formValues
      }, this.getData)
    }

    handlePageChange = (page, num) => {
      this.setState({
        page,
        num
      }, this.getData)
    }

    render() {
      return <WrapComponent
              ref={com => this.warpCom = com}
                {...this.props}
                {...this.state}
                resetData={this.resetData}
                searchData={this.searchData}
                handlePageChange={this.handlePageChange}
              />
    }
  }
}
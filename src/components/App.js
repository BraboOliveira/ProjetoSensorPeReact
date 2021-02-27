import React, { Component } from 'react'
import UsersList from './UsersList'
import { Provider } from './Context'

class App extends Component {
  state = {
    post_found: true,
    new_user: false,
  }

  addNewUser = (id, name, email) => {
    if (this.state.post_found) {
      this.setState({
        new_user: { id: id, user_name: name, user_email: email },
      })
    } else {
      this.setState({
        post_found: true,
      })
    }
  }

  postShow = (show) => {
    this.setState({
      post_found: show,
    })
  }

  render() {
    const contextValue = {
      new_user: this.state.new_user,
      addNewUser: this.addNewUser,
      post_show: this.postShow,
    }

    let showUsers
    if (this.state.post_found) {
      showUsers = (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Frente</th>
              <th>Tras</th>
              <th>Distancia</th>
              <th>Tempo</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            <UsersList />
          </tbody>
        </table>
      )
    } else {
      showUsers = (
        <div className="alert alert-light" role="alert">
          <h4 className="alert-heading">Nenhum dado encontrado!</h4>
          <hr />
          <p>Insira dados no banco.</p>
        </div>
      )
    }
    return (
      <Provider value={contextValue}>
        {/* <div className="card shadow-sm"> */}
        <div className="d-flex justify-content-center mt-3" >
          <a href='http://vendebelem.com/givago/php/exportar.php' type="button" className="btn btn-secondary">Baixar como .xls</a>
        </div>
          <div className="card-body container-xxl ">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10 ">{showUsers}</div>
            </div>
          </div>
        {/* </div> */}
      </Provider>
    )
  }
}
export default App

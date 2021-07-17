import React, { Component } from 'react';


class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      precio: '',
      _id: '',
      platos: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addPlato = this.addPlato.bind(this);
  }

  handleChange(e) { // se necesita solo el name del elemento y su valor
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addPlato(e) {
    e.preventDefault();
    if (this.state._id) {
      fetch(`/api/platos/${this.state._id}`, { // en lugar de /api/tasks (local) puede ir la url externa 
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
          precio: this.state.precio
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({ html: 'Plato Actualizado Correctamente' });
          this.setState({ _id: '', title: '', description: '', precio: '' });
          this.fetchPlatos();//refresca documentos
        });
    } else {
      fetch('/api/platos', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({ html: 'Plato Guardado Correctamente' });
          this.setState({ title: '', description: '', precio: '' });
          this.fetchPlatos();
        })
        .catch(err => console.error(err));
    }

  }

  deletePlato(id) {
    if (confirm('Está seguro que desea eliminar este plato de su menú?')) {
      fetch(`/api/platos/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: 'El Plato ha sido Eliminado de su menú' });
          this.fetchPlatos();
        });
    }
  }

  editPlato(id) {
    fetch(`/api/platos/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          precio: data.precio,
          _id: data._id
        });
      });
  }

  componentDidMount() { // cuando la aplicación cargue
    this.fetchPlatos();
  }

  fetchPlatos() {
    fetch('/api/platos')
      .then(res => res.json())
      .then(data => {
        this.setState({ platos: data });
        console.log(this.state.platos);
      });
  }

  render() {
    return (
      <div>
        {/* Carrousel */}
        <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "200px",
          backgroundImage:
            "url(https://estaticos-cdn.elperiodico.com/clip/8167edb8-cfa1-4a34-ab2e-3e458cec6dd6_alta-libre-aspect-ratio_default_0.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        </div>
        {/* NAVIGATION */}
        <nav className="light-greenblue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">MongoDB Express React Node - MERN Stack - Restaurante</a>
            </div>
          </div>
        </nav>

        <div className="container" style={{ marginBottom: '30px' }}> </div>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addPlato}>
                    <div className="row">
                      <h3 style={{ textAlign: "center", color: "blue" }} >Comanda</h3>
                      <div className="input-field col s12">
                        <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Nombre del Plato" autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Descripción Plato" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="precio" onChange={this.handleChange} value={this.state.precio} cols="30" rows="10" placeholder="Precio del Plato" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Crear Plato
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7 bg-info card card-content" style={{ backgroundColor: "gray", marginTop: "10px" }}>
              <div><h4 style={{ textAlign: "center", color: "red" }}> Listado de Platos</h4>
                <table >
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center", color: "white" }}>Nombre Plato</th>
                      <th style={{ textAlign: "center", color: "white" }}>Descripción</th>
                      <th style={{ textAlign: "center", color: "white" }}>Precio</th>
                      <th style={{ textAlign: "center", color: "white" }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.platos.map(plato => {
                        return (
                          <tr key={plato._id} className="table-dark">
                            <td style={{ textAlign: "center"}}>{plato.title}</td>
                            <td style={{ textAlign: "center"}}>{plato.description}</td>
                            <td style={{ textAlign: "center"}}>{plato.precio}</td>
                            <td style={{ textAlign: "center"}}>
                              <button onClick={() => this.deletePlato(plato._id)} className="btn light-red darken-2" style={{alignItems:"center", color:"red"}}>
                                <i className="material-icons">delete</i>
                              </button>
                              <button onClick={() => this.editPlato(plato._id)} className="btn light-red darken-2" style={{color:"yellowgreen", marginTop:"2px" }}>
                                <i className="material-icons">edit</i>
                              </button>
                            </td>

                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;

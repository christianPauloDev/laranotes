
import React, { useState, useEffect } from 'react';
import './App.css';
import api from "./services/api";
import { Modal } from "react-bootstrap";


function App() {

  const [categories, setCategories] = useState([]);

  const [spendings, setSpendings] = useState([]);

  const [showModalSplend, setShowModalSplend] = useState(false);
  const handleModalSplend = () => setShowModalSplend(!showModalSplend);

  const [showModalCategory, setShowModalCategory] = useState(false);
  const handleModalCategory = () => setShowModalCategory(!showModalCategory);

  const [filters, setFilters] = useState({
    date: '',
    category: 0,
  })


  const [formSplend, setFormSplend] = useState({
    description: '',
    value: '',
    date: ''
  });
  const handleFormSplend = event => setFormSplend({ ...formSplend, [event.target.name]: event.target.value });


  const [formCategory, setFormCategory] = useState('');
  const handleFormCategory = event => setFormCategory(event.target.value);


  useEffect(() => {
    async function fetchCategories() {
      const { data } = await api.get(`categories`);
      setCategories(data)
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSpending() {
      const { data } = await api.get(`spending`);
      setSpendings(data)
    }
    fetchSpending();
  }, []);

  const handleFilter = event => {
    setFilters({ ...filters, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1"> <i className='fas fa-address-book'></i> LaraNotes</span>
        </div>
      </nav>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className='col-12 col-lg-4 mb-3'>
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" onClick={handleModalSplend} className="btn btn-success"><i className='fas fa-money-check-alt'></i> Adicionar Gastos</button>
              <button type="button" onClick={handleModalCategory} className="btn btn-primary"><i className='fas fa-wallet'></i> Criar Categorias</button>
            </div>
          </div>
          <div className='col-12 col-lg-4 mb-3'>
            <div className="input-group">
              <span className="input-group-text text-white bg-dark" id="inputGroup-sizing-default">Filtrar por</span>
              <input type="date" className="form-control" name='date' value={filters.date} onChange={handleFilter} />
            </div>
          </div>
          <div className='col-12 col-lg-4 mb-3'>
            <div className="input-group">
              <span className="input-group-text text-white bg-dark" id="inputGroup-sizing-default">Gastos com</span>
              <select defaultChecked={filters.category} name='category' value={filters.category} onChange={handleFilter} className='form-select'>
                <option selected defaultValue={0} >Escolha a categoria</option>
                {categories.map(categorySelect => (
                  <option value={categorySelect.id} key={categorySelect.id}>{categorySelect.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <h3 className='mt-3'>Meus Gastos</h3>
        <div className="row my-3">
          {categories.map(categorie => (
            <div key={categorie.id} className='col-12 col-sm-12 col-md-6 col-lg-4  mb-4'>
              <div className='card shadow-sm'>
                <div className="card-header bg-dark">
                  <div className='row align-items-center'>
                    <div className='col-6'>
                      <h5 className='m-0 text-white'>
                        {categorie.title}
                      </h5>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {spendings.map(spending => (
                    spending.category_fk === categorie.id && (
                      <li className="list-group-item" key={spending.id}>
                        <i className='fas fa-dollar-sign text-success'></i>
                        <span className='text-success fw-bold'> {spending.total_spent} </span> -  {spending.description}
                      </li>
                    )
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <Modal show={showModalSplend} onHide={handleModalSplend}>
          <div className="modal-header bg-success">
            <h5 className="modal-title text-white" id="exampleModalLabel"> <i className='fas fa-money-check-alt'></i> &nbsp; Adicionar Gastos</h5>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label for="splendDesc"> Descrição do Gasto </label>
              <input type="text" name="description" id="splendDesc" value={formSplend.description} onChange={handleFormSplend}
                placeholder="Ex: Bolsa Presente, Hidratante, etc." className="form-control" />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label for="splendValue"> Valor do Gasto </label>
                  <input type="number" name="value" id="splendValue" placeholder="R$xx,xx" value={formSplend.value} onChange={handleFormSplend}
                    className="form-control" />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label for="splendDate"> Data do Gasto </label>
                  <input type="date" name="date" id="splendDate"
                    placeholder="Ex: Bolsa Presente, Hidratante, etc." className="form-control" value={formSplend.date} onChange={handleFormSplend} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link text-danger" onClick={handleModalSplend} >Cancelar</button>
            <button type="button" className="btn btn-success"> <i className='fas fa-plus'></i>  Cadastrar Gasto</button>
          </div>
        </Modal>

        <Modal show={showModalCategory} onHide={handleModalCategory}>
          <div className="modal-header bg-primary">
            <h5 className="modal-title text-white" id="exampleModalLabel"> <i className='fas fa-wallet'></i> &nbsp; Adicionar Categoria</h5>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label for="categoryTitle"> Título da Categoria </label>
              <input type="text" name="categoryTitle" id="categoryTitle"
                placeholder="Ex: Bolsa Presente, Hidratante, etc." className="form-control" value={formCategory} onChange={handleFormCategory} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link text-danger" onClick={handleModalCategory} >Cancelar</button>
            <button type="button" className="btn btn-primary"> <i className='fas fa-plus'></i>  Cadastrar Categoria</button>
          </div>
        </Modal>

      </div>

    </div>

  );
}

export default App;

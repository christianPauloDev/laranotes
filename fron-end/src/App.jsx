
import React, { useState, useEffect } from 'react';
import './App.css';
import api from "./services/api";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import CurrencyInput from 'react-currency-input';
import { Load } from './components/Load';

function App() {

  // ALL STATES, FUNCTIONS AND METHODS FROM CATEGORIES

  const [categories, setCategories] = useState([]);


  async function fetchCategories() {
    const { data } = await api.get(`categories`);
    setCategories(data)
  }

  useEffect(() => {
    fetchCategories();
  }, []);


  const [showModalCategory, setShowModalCategory] = useState(false);

  const [formCategory, setFormCategory] = useState({
    title: '',
    period: ''
  });

  const handleModalCategory = () => {
    setShowModalCategory(!showModalCategory);
    setFormCategory({
      title: '',
      period: ''
    });
  }

  const handleFormCategory = event => setFormCategory({ ...formCategory, [event.target.name]: event.target.value });


  const [showAlertWarningCategory, setShowAlertWarningCategory] = useState(false);
  const [showAlertSuccessCategory, setShowAlertSuccessCategory] = useState(false);


  const sendFormCategory = () => {
    if ((formCategory.title && formCategory.period) === '') {
      setShowAlertWarningCategory(true)
      setTimeout(() => {
        setShowAlertWarningCategory(false)
      }, 5000);
    } else {
      api.post('categories/', formCategory).then(response => {
        if (response.status >= 200) {

          fetchCategories();

          setShowAlertSuccessCategory(true)

          setFormCategory({
            title: '',
            period: ''
          });

          setTimeout(() => {
            setShowAlertSuccessCategory(false)
          }, 5000);

        }
      })
    }
  }

  // ALL STATES, FUNCTIONS AND METHODS FROM SPENDINGS


  const [spendings, setSpendings] = useState([]);


  async function fetchSpending() {
    const { data } = await api.get(`spending`);
    setSpendings(data)
  }
  useEffect(() => {
    fetchSpending();
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);


  const [showModalSpend, setShowModalSpend] = useState(false);

  const [formSpend, setFormSpend] = useState({
    category_fk: '',
    description: '',
    total_spent: '',
    closing_date: '',
  });

  const handleModalSpend = () => {
    setShowModalSpend(!showModalSpend);
    setFormSpend({
      category_fk: '',
      description: '',
      total_spent: '',
      closing_date: '',
    })
  }

  const handleFormSpend = event => setFormSpend({ ...formSpend, [event.target.name]: event.target.value });
  const handleSpendValue = (event, maskedvalue, floatvalue) => {
    setFormSpend({ ...formSpend, total_spent: floatvalue })
  }

  const [showAlertWarningSpend, setShowAlertWarningSpend] = useState(false);
  const [showAlertSuccessSpend, setShowAlertSuccessSpend] = useState(false);


  const sendFormSpend = () => {
    if ((formSpend.description && formSpend.value && formSpend.date) === '') {

      setShowAlertWarningSpend(true)

      setTimeout(() => {
        setShowAlertWarningSpend(false)
      }, 5000);

    } else {
      api.post('spending', formSpend).then(response => {

        if (response.status >= 200) {

          fetchSpending();

          setShowAlertSuccessSpend(true)

          setFormSpend({
            category_fk: '',
            description: '',
            total_spent: '',
            closing_date: '',
          })

          setTimeout(() => {
            setShowAlertSuccessSpend(false)
          }, 5000);

        }
      })
    }
  }

  // EDIT SPEND

  const [editSpend, setEditSpend] = useState({});

  const [showModalEditSpend, setShowModalEditSpend] = useState(false);
  const handleModalEditSpend = (spending) => {
    setShowModalEditSpend(true);
    setEditSpend(spending)
  }

  const hideModalEditSpend = () => {
    setShowModalEditSpend(false);
  }

  const handleFormEditSpend = event => setEditSpend({ ...editSpend, [event.target.name]: event.target.value });
  const handleFormEditSpendValue = (event, maskedvalue, floatvalue) => {
    setEditSpend({ ...editSpend, total_spent: floatvalue })
  }

  const [showAlertSuccessEditSpend, setShowAlertSuccessEditSpend] = useState(false);

  const sendFormEditSpend = () => {

    api.put(`spending/${editSpend.id}`, editSpend).then(response => {

      if (response.status >= 200) {

        fetchSpending();

        setShowAlertSuccessEditSpend(true)

        setTimeout(() => {
          setEditSpend({
            id: '',
            category_fk: '',
            closing_date: '',
            description: '',
            total_spent: '',
          });
          hideModalEditSpend();
          setShowAlertSuccessEditSpend(false);
        }, 2000);

      }
    })

  }

  // FILTERS 

  const [filters, setFilters] = useState({
    period: '',
    category: '',
  })

  const [filtered, setFiltered] = useState([]);

  const handleFilter = event => {
    setFilters({ ...filters, [event.target.name]: event.target.value })
  }

  const searchFilters = event => {
    if ((filters.category && filters.period) !== '') {

      const filteredFull = categories.filter(category => category.id == filters.category && category.period == filters.period)

      if (filteredFull.length > 0) {
        setFiltered(filteredFull)
      }

    } else if (filters.category !== '') {

      const filteredCategories = categories.filter(category => category.id == filters.category)
      setFiltered(filteredCategories)

    }
    else if (filters.period !== '') {

      const filteredPeriod = categories.filter(category => category.period == filters.period)
      setFiltered(filteredPeriod)
    }
  }

  const clearFilters = event => {
    setFilters({ period: '', category: '', })
    setFiltered([])
  }

  // SECONDARIES FUNCTIONS

  const [load, setLoad] = useState(true)

  const alertWarning = () => {
    return <motion.div animate={{ y: 10 }} className='alert alert-warning'> <i className='fas fa-exclamation-triangle'></i>  Preencha todos os campos!  </motion.div>
  }

  const alertSuccess = () => {
    return <motion.div animate={{ y: 10 }} className='alert alert-success'> <i className='fas fa-check'></i>  Cadastro Realizado com Sucesso!  </motion.div>
  }

  const alertEditSuccess = () => {
    return <motion.div animate={{ y: 10 }} className='alert alert-success'> <i className='fas fa-check-double'></i>  Dados editados com Sucesso!  </motion.div>
  }

  const formatDate = value => {
    let year = value.split('-')[0];
    let month = value.split('-')[1];
    let day = value.split('-')[2];
    let newDate = `${day}/${month}/${year}`;
    return newDate;
  }

  const formatCurrency = value => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    load ? <Load /> :
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand mb-0 h1"> <i className='fas fa-address-book'></i> LaraNotes</span>
          </div>
        </nav>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className='col-12 col-lg-4 mb-4 text-center'>
              <div className="btn-group" >
                <button type="button" onClick={handleModalCategory} className="btn btn-primary"><i className='fas fa-wallet'></i> &nbsp; Criar Categorias</button>
                <button type="button" onClick={handleModalSpend} className="btn btn-success"><i className='fas fa-money-check-alt'></i> &nbsp; Adicionar Gastos</button>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-4 mb-3'>
              <div className="input-group">
                <span className="input-group-text text-white bg-dark" id="inputGroup-sizing-default">Filtrar por</span>
                <select defaultChecked='' name='period' value={filters.period} onChange={handleFilter} className='form-select'>
                  <option selected value='' >Escolha a período</option>
                  <option value='Diário'>Diário</option>
                  <option value='Semanal'>Semanal</option>
                  <option value='Mensal'>Mensal</option>
                  <option value='Anual'>Anual</option>
                </select>
              </div>
            </div>
            <div className='col-12 col-lg-4 mb-3'>
              <div className="input-group">
                <span className="input-group-text text-white bg-dark" id="inputGroup-sizing-default">Gastos com</span>
                <select defaultChecked={filters.category} name='category' value={filters.category} onChange={handleFilter} className='form-select'>
                  <option selected value='' >Escolha a categoria</option>
                  {categories.map(categorySelect => (
                    <option value={categorySelect.id} key={categorySelect.id}>{categorySelect.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-12 col-lg-4 text-center text-lg-end'>
              {filtered.length > 0 && <motion.button animate={{ x: -20 }} className="btn btn-warning" onClick={clearFilters} > <i className='fas fa-trash'></i> &nbsp; Limpar Filtros  </motion.button>}
              <button className="btn btn-info" onClick={searchFilters} > <i className='fas fa-search'></i> &nbsp; Pesquisar  </button>
            </div>
          </div>

          <h3 className='mt-3'>Meus Gastos</h3>
          <div className="row my-3">
            {(filtered.length > 0 ? filtered : categories).map(categorie => (
              <div key={categorie.id} className='col-12 col-sm-12 col-md-6 col-lg-4  mb-4'>
                <div className='card shadow-sm'>
                  <div className="card-header bg-dark">
                    <div className='row align-items-center'>
                      <div className='col-8'>
                        <h5 className='m-0 text-white'>
                          {categorie.title}
                        </h5>
                      </div>
                      <div className='col-4 text-end'>
                        <div className='badge text-dark bg-light'>
                          {categorie.period}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    {spendings.map(spending => (
                      spending.category_fk === categorie.id && (
                        <button className="list-group-item list-group-item-action" onClick={() => handleModalEditSpend(spending)} key={spending.id}>
                          <div className="row justify-content-center align-items-center">
                            <div className="col-8">
                              <span className='text-success fw-bold'> {formatCurrency(spending.total_spent)} </span> -  {spending.description}
                            </div>
                            <div className="col-4 text-end">
                              <div className="badge bg-dark "><i className="far fa-calendar"></i> &nbsp; {formatDate(spending.closing_date)} </div>
                            </div>
                          </div>
                        </button>
                      )
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <Modal show={showModalCategory} onHide={handleModalCategory}>
            <div className="modal-header bg-primary">
              <h5 className="modal-title text-white" id="exampleModalLabel"> <i className='fas fa-wallet'></i> &nbsp; Adicionar Categoria</h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="categoryTitle"> Título da Categoria </label>
                <input type="text" name="title" id="categoryTitle"
                  placeholder="Ex: Viajens, Mês, Gasolina, etc" className="form-control" value={formCategory.title} onChange={handleFormCategory} />
              </div>
              <div className="mb-3">
                <label htmlFor="categoryPeriod"> Período do Gasto </label>
                <select defaultChecked='' name='period' value={formCategory.period} onChange={handleFormCategory} className='form-select'>
                  <option selected value='' >Escolha o período</option>
                  <option value='Diário'>Diário</option>
                  <option value='Semanal'>Semanal</option>
                  <option value='Mensal'>Mensal</option>
                  <option value='Anual'>Anual</option>
                </select>
              </div>
              {showAlertWarningCategory && alertWarning()}
              {showAlertSuccessCategory && alertSuccess()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-link text-danger" onClick={handleModalCategory} >Fechar</button>
              <button type="button" className="btn btn-primary" onClick={sendFormCategory} > <i className='fas fa-plus'></i>  Cadastrar Categoria</button>
            </div>
          </Modal>

          <Modal show={showModalSpend} onHide={handleModalSpend}>
            <div className="modal-header bg-success">
              <h5 className="modal-title text-white" id="exampleModalLabel"> <i className='fas fa-money-check-alt'></i> &nbsp; Adicionar Gastos</h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="spendCategory"> Categoria do Gasto </label>
                <select defaultChecked={formSpend.category_fk} name='category_fk' value={formSpend.category_fk}
                  onChange={handleFormSpend} className='form-select'>
                  <option selected value='' >Escolha a categoria</option>
                  {categories.map(categorySelectFK => (
                    <option value={categorySelectFK.id} key={categorySelectFK.id}>{categorySelectFK.title} - {categorySelectFK.period} </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="spendDesc"> Descrição do Gasto </label>
                <input type="text" name="description" id="spendDesc" value={formSpend.description} onChange={handleFormSpend}
                  placeholder="Ex: Bolsa Presente, Hidratante, etc." className="form-control" />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="spendValue"> Valor do Gasto </label>
                    <CurrencyInput
                      className="form-control" prefix="R$" decimalSeparator="," thousandSeparator="."
                      value={formSpend.total_spent} onChangeEvent={handleSpendValue}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="spendDate"> Data do Gasto </label>
                    <input type="date" name="closing_date" id="spendDate"
                      className="form-control" value={formSpend.closing_date} onChange={handleFormSpend} />
                  </div>
                </div>
              </div>
              {showAlertWarningSpend && alertWarning()}
              {showAlertSuccessSpend && alertSuccess()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-link text-danger" onClick={handleModalSpend}> Fechar</button>
              <button type="button" className="btn btn-success" onClick={sendFormSpend}> <i className='fas fa-plus'></i>  Cadastrar Gasto</button>
            </div>
          </Modal>

          <Modal show={showModalEditSpend} onHide={hideModalEditSpend}>
            <div className="modal-header bg-success">
              <h5 className="modal-title text-white" id="exampleModalLabel"> <i className='fas fa-money-check-alt'></i> &nbsp; Editar Gastos</h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="spendCategory"> Categoria do Gasto </label>
                <select disabled defaultChecked={editSpend.category_fk} name='category_fk' value={editSpend.category_fk}
                  className='form-select'>
                  <option selected value='' >Escolha a categoria</option>
                  {categories.map(categorySelectFK => (
                    <option value={categorySelectFK.id} key={categorySelectFK.id}>{categorySelectFK.title} - {categorySelectFK.period} </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="spendDesc"> Descrição do Gasto </label>
                <input type="text" name="description" id="spendDesc" value={editSpend.description} onChange={handleFormEditSpend}
                  placeholder="Ex: Bolsa Presente, Hidratante, etc." className="form-control" />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="spendValue"> Valor do Gasto </label>
                    <CurrencyInput
                      className="form-control" prefix="R$" decimalSeparator="," thousandSeparator="." placeholder="R$xx,xx"
                      value={editSpend.total_spent} onChangeEvent={handleFormEditSpendValue}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="spendDate"> Data do Gasto </label>
                    <input disabled type="date" name="closing_date" id="spendDate"
                      placeholder="Ex: Bolsa Presente, Hidratante, etc." className="form-control"
                      value={editSpend.closing_date} />
                  </div>
                </div>
              </div>
              {showAlertSuccessEditSpend && alertEditSuccess()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-link text-danger" onClick={hideModalEditSpend}> Fechar</button>
              <button type="button" className="btn btn-success" onClick={sendFormEditSpend}> <i className='fas fa-edit'></i>  Editar Gasto</button>
            </div>
          </Modal>

        </div>

      </div>

  );
}

export default App;

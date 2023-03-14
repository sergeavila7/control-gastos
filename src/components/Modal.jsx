import { useState, useEffect } from 'react';
import CloseBtn from '../assets/img/cerrar.svg';
import Alert from './Alert';

const options = [
  { label: '- Seleccione -', value: '' },
  { label: 'Ahorro', value: 'ahorro' },
  { label: 'Comida', value: 'comida' },
  { label: 'Casa', value: 'casa' },
  { label: 'Gastos', value: 'gastos' },
  { label: 'Ocio', value: 'ocio' },
  { label: 'Salud', value: 'salud' },
  { label: 'Suscripciones', value: 'suscripciones' },
];

const Modal = ({ handleNewBudget, animateModal, saveBudget, budgetUpdate }) => {
  const id = budgetUpdate.id;
  const date = budgetUpdate.date;

  const [newBudget, setNewBudget] = useState({
    name: '',
    amount: 0,
    category: '',
  });
  useEffect(() => {
    if (Object.keys(budgetUpdate).length > 0) {
      setNewBudget(budgetUpdate);
    }
  }, []);

  const { name, amount, category } = newBudget;

  const handleChange = (e) => {
    setNewBudget({
      ...newBudget,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveBudget({ name, amount, category, id, date });
    handleNewBudget();
  };

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img
          src={CloseBtn}
          alt='icono cerrar modal'
          onClick={handleNewBudget}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
      >
        <legend>
          {Object.keys(budgetUpdate).length > 0
            ? 'Editar Gasto'
            : 'Nuevo Gasto'}
        </legend>
        {amount < 0 && (
          <Alert type='error'>{'No es un presupuesto valido'}</Alert>
        )}
        <div className='campo'>
          <label htmlFor='name'>Nombre</label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Añade el nombre de la categoria'
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className='campo'>
          <label htmlFor='amount'>Cantidad</label>
          <input
            id='amount'
            name='amount'
            type='number'
            placeholder='Añade la cantidad del gasto: ej. $2,000'
            value={amount}
            onChange={handleChange}
          />
        </div>
        <div className='campo'>
          <label htmlFor='category'>category</label>
          <select
            id='category'
            name='category'
            onChange={handleChange}
            value={category}
          >
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <button disabled={!(name && amount && category) || amount < 0}>
          {Object.keys(budgetUpdate).length > 0
            ? 'Editar Gasto'
            : 'Añadir Gasto'}
        </button>
      </form>
    </div>
  );
};

export default Modal;

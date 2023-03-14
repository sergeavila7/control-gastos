import { useState } from 'react';
import Alert from './Alert';

const NewBudget = ({ props }) => {
  const { budget, setBudget, setIsValidBudget } = props;
  const [message, setMessage] = useState('');

  const handleBudget = (e) => {
    e.preventDefault();
    setIsValidBudget(true);
  };

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form className='formulario' onSubmit={handleBudget}>
        <div className='campo'>
          <label>Definir presupuesto</label>
          <input
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu presupuesto'
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
          <button type='submit' value='Añadir' disabled={budget <= 0}>
            Añadir
          </button>
        </div>
        {budget < 0 && (
          <Alert type='error'>{'No es un presupuesto valido'}</Alert>
        )}
      </form>
    </div>
  );
};

export default NewBudget;

import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({ props }) => {
  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const { budget, budgets } = props;
  useEffect(() => {
    const totalSpent = budgets.reduce(
      (total, budget) => Number(budget.amount) + total,
      0
    );
    const totalAvailable = budget - totalSpent;
    // Calcular el porcentaje
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(
      2
    );

    setAvailable(totalAvailable);
    setSpent(totalSpent);
    setTimeout(() => {
      setPercentage(newPercentage);
    }, 1000);
  }, [budgets]);

  const currencyFormat = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleResetApp = () => {
    const result = confirm('¿Deseas reinicar presupuesto y gastos?');
    if (result) {
      localStorage.clear();
      window.location.reload();
    }
  };
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            // Colors
            pathColor: percentage > 100 ? '#c0404c' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: percentage > 100 ? '#c0404c' : '#3B82F6',
          })}
          value={percentage}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleResetApp}>
          Reiniciar App
        </button>
        <p>
          <span>Presupuesto: </span>
          {currencyFormat(budget)}
        </p>
        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>
          {currencyFormat(available)}
        </p>
        <p>
          <span>Gastado: </span>
          {currencyFormat(spent)}
        </p>
      </div>
    </div>
  );
};

export default BudgetControl;

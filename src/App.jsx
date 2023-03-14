import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Budgets from './components/Budgets';
import Modal from './components/Modal';
import { generateId } from './helpers';
import IconNewBudget from './assets/img/nuevo-gasto.svg';
import Filters from './components/Filters';
function App() {
  const [budgets, setBudgets] = useState(
    localStorage.getItem('budgets')
      ? JSON.parse(localStorage.getItem('budgets'))
      : []
  );
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget' ?? 0))
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [budgetUpdate, setBudgetUpdate] = useState({});
  const [filter, setFilter] = useState('');
  const [spentsFilters, setSpentsFilters] = useState([]);

  useEffect(() => {
    if (Object.keys(budgetUpdate).length > 0) {
      setModal((modal) => !modal);
      setTimeout(() => {
        setAnimateModal((animateModal) => !animateModal);
      }, 500);
    }
  }, [budgetUpdate]);

  useEffect(() => {
    localStorage.setItem('budget', budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets) ?? []);
  }, [budgets]);

  useEffect(() => {
    if (filter) {
      const spentsFilters = budgets.filter(
        (budget) => budget.category === filter
      );
      setSpentsFilters(spentsFilters);
    }
  }, [filter]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;
    if (budgetLS > 0) {
      setIsValidBudget(true);
    }
  }, []);

  const handleNewBudget = () => {
    setModal((modal) => !modal);
    setBudgetUpdate({});
    setTimeout(() => {
      setAnimateModal((animateModal) => !animateModal);
    }, 500);
  };

  const saveBudget = (budget) => {
    if (budget.id) {
      const budgetsUpdate = budgets.map((budgetState) =>
        budgetState.id === budget.id ? budget : budgetState
      );
      setBudgets(budgetsUpdate);
    } else {
      budget.id = generateId();
      budget.date = Date.now();
      setBudgets([...budgets, budget]);
    }
  };

  const deleteBudget = (id) => {
    const budgetsUpdate = budgets.filter((budget) => budget.id !== id);
    setBudgets(budgetsUpdate);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budgets={budgets}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && (
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter} />
            <Budgets
              budgets={budgets}
              setBudgetUpdate={setBudgetUpdate}
              deleteBudget={deleteBudget}
              filter={filter}
              spentsFilters={spentsFilters}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconNewBudget}
              alt='icono nuevo gasto'
              onClick={handleNewBudget}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          handleNewBudget={handleNewBudget}
          animateModal={animateModal}
          saveBudget={saveBudget}
          budgetUpdate={budgetUpdate}
        />
      )}
    </div>
  );
}

export default App;

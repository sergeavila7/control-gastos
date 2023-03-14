import Budget from './Budget';

const Budgets = (props) => {
  const { budgets, setBudgetUpdate, deleteBudget, filter, spentsFilters } =
    props;
  return (
    <div className='listado-gastos contenedor'>
      {filter ? (
        <>
          <h2>
            {spentsFilters.length ? 'Gastos' : `No hay gastos aún de ${filter}`}
          </h2>
          {spentsFilters.map((budget) => (
            <Budget
              key={budget.id}
              budget={budget}
              setBudgetUpdate={setBudgetUpdate}
              deleteBudget={deleteBudget}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{budgets.length ? 'Gastos' : 'No hay gastos aún'}</h2>
          {budgets.map((budget) => (
            <Budget
              key={budget.id}
              budget={budget}
              setBudgetUpdate={setBudgetUpdate}
              deleteBudget={deleteBudget}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Budgets;

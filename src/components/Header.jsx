import BudgetControl from './BudgetControl';
import NewBudget from './NewBudget';

const Header = (props) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
      {props.isValidBudget ? (
        <BudgetControl props={props} />
      ) : (
        <NewBudget props={props} />
      )}
    </header>
  );
};

export default Header;

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from '../helpers';

import IconAhorro from '../assets/img/icono_ahorro.svg';
import IconCasa from '../assets/img/icono_casa.svg';
import IconComida from '../assets/img/icono_comida.svg';
import IconGastos from '../assets/img/icono_gastos.svg';
import IconOcio from '../assets/img/icono_ocio.svg';
import IconSalud from '../assets/img/icono_salud.svg';
import IconSuscripciones from '../assets/img/icono_suscripciones.svg';

const catalogueIcons = {
  ahorro: IconAhorro,
  comida: IconComida,
  casa: IconCasa,
  gastos: IconGastos,
  ocio: IconOcio,
  salud: IconSalud,
  suscripciones: IconSuscripciones,
};

const Budget = ({ budget, setBudgetUpdate, deleteBudget }) => {
  const { category, name, date, amount, id } = budget;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setBudgetUpdate(budget)}>Editar</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteBudget(id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img src={catalogueIcons[category]} alt='Icon Gasto' />
            <div className='descripcion-gasto'>
              <p className='categoria'>{category}</p>
              <p className='nombre-gasto'>{name}</p>
              <p className='fecha-gasto'>
                Agregado el: <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Budget;

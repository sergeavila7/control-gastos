const options = [
  { label: 'Todas las categorias', value: '' },
  { label: 'Ahorro', value: 'ahorro' },
  { label: 'Comida', value: 'comida' },
  { label: 'Casa', value: 'casa' },
  { label: 'Gastos', value: 'gastos' },
  { label: 'Ocio', value: 'ocio' },
  { label: 'Salud', value: 'salud' },
  { label: 'Suscripciones', value: 'suscripciones' },
];
const Filters = ({ filter, setFilter }) => {
  return (
    <div className='filtros sombra contenedor'>
      <form>
        <div className='campo'>
          <label>Filtrar Gastos</label>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;

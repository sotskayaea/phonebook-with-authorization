import { useSelector, useDispatch } from 'react-redux';
import { filterValue } from '../../redux/filterSliceReducer';
import style from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <label className={style.filter}>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={e => dispatch(filterValue(e.currentTarget.value))}
        className={style.filterInput}
      />
    </label>
  );
};

export default Filter;

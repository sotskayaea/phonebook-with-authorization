import { useDispatch, useSelector } from 'react-redux';
import style from './UserMenu.module.css';
import { logOut } from '../../redux/auth/operations';

const UserMenu = () => {
  const userName = useSelector(state => state.auth.user.name);
  const dispatch = useDispatch();

  const onHandleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className={style.wrap}>
      <p className={style.name}>Hello,{userName}</p>
      <button className={style.button} type="button" onClick={onHandleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;

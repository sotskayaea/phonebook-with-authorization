import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';
import { useAuth } from 'hooks';

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  const isActiveStyle = isActive => {
    if (isActive) {
      return {
        color: 'red',
        fontWeight: 600,
      };
    }
  };
  return (
    <div>
      <nav className={style.nav_list}>
        {!isLoggedIn ? (
          <>
            <NavLink
              to="/"
              className={style.nav_link}
              style={({ isActive }) => isActiveStyle(isActive)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={style.nav_link}
              style={({ isActive }) => isActiveStyle(isActive)}
            >
              Register
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/phonebook"
            className={style.nav_link}
            style={({ isActive }) => isActiveStyle(isActive)}
          >
            Phonebook
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Navigation;

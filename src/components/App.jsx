import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import style from './App.module.css';
import Navigation from './Navigation/Navigation';
import UserMenu from './UserMenu/UserMenu';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
import { useAuth } from 'hooks';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const Login = lazy(() => import('../pages/Login/Login'));
  const Phonebook = lazy(() => import('../pages/Phonebook/Phonebook'));
  const Register = lazy(() => import('../pages/Register/Register'));
  return (
    <div className={style.phonebook}>
      <header className={style.header}>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </header>

      <Suspense fallback={<p>Loading...</p>}>
        {isRefreshing ? (
          <b>Refreshing user...</b>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoute
                  redirectTo="/phonebook"
                  component={<Login />}
                />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute redirectTo="/" component={<Register />} />
              }
            />

            <Route
              path="/phonebook"
              element={
                <PrivateRoute redirectTo="/" component={<Phonebook />} />
              }
            />
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </Suspense>
    </div>
  );
};

export default App;

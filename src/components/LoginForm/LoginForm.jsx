import style from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { useState } from 'react';
import passwordOpen from '../../image/password_open.png';
import passwordClose from '../../image/password_close.png';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={style.contactForm}>
        <label className={style.label} for="username">
          Email
          <div className={style.password_wrap}>
            <input
              id="username"
              type="email"
              name="email"
              className={style.input}
              required
            />
          </div>
        </label>
        <label className={style.label} for="userpassword">
          Password
          <div className={style.password_wrap}>
            <input
              id="userpassword"
              className={style.input}
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              required
            />
            <button
              type="button"
              className={style.password_eye}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <img
                  className={style.password_icon}
                  src={passwordClose}
                  alt="password eye close"
                />
              ) : (
                <img
                  className={style.password_icon}
                  src={passwordOpen}
                  alt="password eye open"
                />
              )}
            </button>
          </div>
        </label>
        <button className={style.button} type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

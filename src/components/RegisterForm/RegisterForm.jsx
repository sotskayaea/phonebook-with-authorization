import style from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import passwordOpen from '../../image/password_open.png';
import passwordClose from '../../image/password_close.png';
import { useState } from 'react';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState('password');
  const onHandleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };
  return (
    <div>
      <form onSubmit={onHandleSubmit} className={style.contactForm}>
        <label className={style.label}>
          Name
          <input type="text" name="name" className={style.input} required />
        </label>
        <label className={style.label}>
          Email
          <input type="email" name="email" className={style.input} required />
        </label>
        <label className={style.label} for="userpassword">
          Password
          <div className={style.password_wrap}>
            <input
              id="userpassword"
              className={style.input}
              type={passwordType}
              name="password"
              required
            />
            <button
              type="button"
              className={style.password_eye}
              onClick={() => {
                if (passwordType === 'password') {
                  setPasswordType('text');
                }
                if (passwordType === 'text') {
                  setPasswordType('password');
                }
              }}
            >
              {passwordType === 'password' ? (
                <img
                  className={style.password_icon}
                  src={passwordOpen}
                  alt="password eye open"
                />
              ) : (
                <img
                  className={style.password_icon}
                  src={passwordClose}
                  alt="password eye close"
                />
              )}
            </button>
          </div>
        </label>
        <button className={style.button} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

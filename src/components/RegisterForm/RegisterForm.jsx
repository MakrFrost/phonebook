import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import css from './RegisterForm.module.css';
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [typeInput, setTypeInput] = useState('password');
  const [noPassId, setNoPassId] = useState('pass');
  const [closedEyeIcon, setClosedEyeIcon] = useState(true);

  function LookPassword(e) {
    if (e.currentTarget.id === 'pass') {
      setTypeInput('text');
      setNoPassId('noPass');
      setClosedEyeIcon(false);
    } else {
      setTypeInput('password');
      setNoPassId('pass');
      setClosedEyeIcon(true);
    }
  }

  function FormSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form);

    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );

    form.reset();
  }

  return (
    <form onSubmit={FormSubmit} className={css.reg_form}>
      <label className={css.reg_name}>
        Username
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <AiOutlineUser className={css.reg_icon_name} />
      </label>
      <label className={css.reg_mail}>
        Email
        <input type="email" name="email" required />
      </label>
      <label className={css.reg_pass}>
        Password
        <input type={typeInput} name="password" required />
        {closedEyeIcon ? (
          <AiFillEyeInvisible
            className={css.reg_icon_pass}
            onClick={LookPassword}
            id={noPassId}
          />
        ) : (
          <AiFillEye
            className={css.reg_icon}
            onClick={LookPassword}
            id={noPassId}
          />
        )}
      </label>
      <button type="submit">Registered</button>
    </form>
  );
};

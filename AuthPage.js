import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles/AuthPage.module.css';
import FormLogin from './Form/FormLogin';
import FormRegister from './Form/FormRegister';
import GmailIcon from './images/gmail.svg';

export default function AuthPage() {
  const { user, isLoading, error } = useSelector((state) => state.userReducer);

 
  const [isCreateNew, setIsCreateNew] = useState(false);
  const toggleIsCreateNew = () => setIsCreateNew(!isCreateNew);


  useEffect(() => {
    if (user.email) {
      toggleIsCreateNew();
      alert('Account successfully created!');
    }
    // eslint-disable-next-line
  }, [user.email]);

  return (
    <div className={styles.page}>
      <img src={GmailIcon} alt='Gmail' />

      {isCreateNew ? (
        <Fragment>
          <FormRegister isLoading={isLoading} error={error} />
          <button className={styles.link} onClick={toggleIsCreateNew}>
            Login an existing account
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <FormLogin isLoading={isLoading} error={error} user={user} />
          <button className={styles.link} onClick={toggleIsCreateNew}>
            Create a new account
          </button>
        </Fragment>
      )}

    </div>
  );
}

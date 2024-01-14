import { useState } from 'react';
import CheckBox from '../Checkbox/CheckBox';
import styles from './Notification.module.scss';

const Notification = () => {
  const [notificationState, setNotificationState] = useState<boolean>(false);
  const [soundedState, setSoundedState] = useState<boolean>(false);

  const handleCheckboxChangeNotification = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationState(event.target.checked);
  };
  const handleCheckboxChangeSounds = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSoundedState(event.target.checked);
  };
  return (
    <div className={styles.container}>
      <CheckBox
        handleCheckboxChange={handleCheckboxChangeNotification}
        state={notificationState}
        id="notification"
      >
        <span>Notification</span>
      </CheckBox>

      <CheckBox handleCheckboxChange={handleCheckboxChangeSounds} state={soundedState} id="sounds">
        <span>Sounds</span>
      </CheckBox>
    </div>
  );
};

export default Notification;

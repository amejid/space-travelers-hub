import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Rocket.module.css';
import { toggleReservedStatus } from '../../redux/rockets/rockets';

const Rocket = ({
  id, name, description, image, reserved,
}) => {
  const dispatch = useDispatch();

  const toggleReserved = () => {
    dispatch(toggleReservedStatus(id));
  };

  const btnStyles = `${styles.btn} ${reserved ? styles['btn-secondary'] : styles['btn-primary']}`;
  const btnText = reserved ? 'Cancel Reservation' : 'Reserve Rocket';

  return (
    <div className={styles.rocket}>
      <img src={image} alt="Rocket" className={styles['rocket-image']} />
      <div className={styles['rocket-right']}>
        <p className={styles.name}>{name}</p>
        <p className={styles.desc}>
          {reserved && <span className={styles.badge}>Reserved</span>}
          {description}
        </p>
        <button type="button" onClick={toggleReserved} className={btnStyles}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

Rocket.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default Rocket;

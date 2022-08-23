import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRockets } from '../../redux/rockets/rockets';
import Rocket from './Rocket';
import styles from './Rockets.module.css';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets);

  useEffect(() => {
    dispatch(getRockets());
  }, []);

  return (
    <div className={styles.rockets}>
      {rockets.map((rocket) => (
        <Rocket
          key={rocket.id}
          id={rocket.id}
          name={rocket.name}
          description={rocket.description}
          image={rocket.image}
          reserved={rocket.reserved}
        />
      ))}
    </div>
  );
};

export default Rockets;

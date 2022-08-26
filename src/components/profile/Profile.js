import { useSelector } from 'react-redux';
import styles from './Profile.module.css';

const Profile = () => {
  const rockets = useSelector((state) => state.rockets);
  const missions = useSelector((state) => state.missions);

  const rocketsFiltered = rockets.filter((rocket) => rocket.reserved === true);
  const missionsFiltered = missions.filter((mission) => mission.reserved === true);

  return (
    <div className={styles.profile}>
      <div>
        <p className={styles.title}>My Missions</p>
        <ul className={styles.box}>
          {missionsFiltered.map((mission) => (
            <li key={mission.id}>{mission.name.trim()}</li>
          ))}
        </ul>
      </div>
      <div className={styles.title}>
        <p className={styles.title}>My Rockets</p>
        <ul className={styles.box}>
          {rocketsFiltered.map((rocket) => (
            <li key={rocket.id}>{rocket.name.trim()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;

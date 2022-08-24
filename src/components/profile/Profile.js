import { useSelector } from 'react-redux';

const Profile = () => {
  const missions = useSelector((state) => state.missions);
  const reservedMissions = missions.filter((mission) => mission.reserved === true);

  return (
    <div className="profile-table-container">
      <hr />
      <table className="profile-table">
        <thead>
          <tr>
            <th className="profile-th">My Missions</th>
          </tr>
        </thead>
        <tbody>
          {reservedMissions.length > 0 && reservedMissions.map(({ id, name }) => (
            <tr key={id}>
              <td className="profile-td">{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;

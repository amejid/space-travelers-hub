import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetMissionsFromApi } from '../../redux/missions/missions';
import DisplayMission from './DisplayMissions';

let isInitial = true;

const Missions = () => {
  const missions = useSelector((state) => state.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      dispatch(GetMissionsFromApi());
      isInitial = false;
    }
  }, []);

  return (
    <div className="mission-container">
      <table className="mission-table">
        <thead>
          <tr className="display-mission-tr">
            <th className="display-mission-bold">Missions</th>
            <th className="display-mission-bold">Description</th>
            <th className="display-mission-bold">Status</th>
            <th> </th>
          </tr>
        </thead>
        {missions.map((mission) => (
          <DisplayMission
            id={mission.id}
            name={mission.name}
            description={mission.description}
            reserved={mission.reserved}
            key={mission.id}
          />
        ))}
      </table>
    </div>
  );
};
export default Missions;

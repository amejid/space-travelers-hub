import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetMissionsFromApi } from '../../redux/missions/missions';
import DisplayMission from './DisplayMissions';

const Missions = () => {
  const missions = useSelector((state) => state.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetMissionsFromApi());
  },
  [dispatch]);

  return (
    <div className="mission-container">
      <hr />
      <table className="mission-table">
        <tr className="display-mission-tr">
          <th className="display-mission-bold">Missions</th>
          <th className="display-mission-bold">Description</th>
          <th className="display-mission-bold">Status</th>
          <th>{' '}</th>
        </tr>
        {missions.map((itemArr) => (
          itemArr.map((mission) => (
            <DisplayMission
              name={mission.mission_name}
              description={mission.description}
              key={mission.mission_id}
            />
          ))))}
      </table>
    </div>
  );
};
export default Missions;

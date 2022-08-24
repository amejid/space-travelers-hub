import axios from 'axios';
import MISSIONS_API from '../../api/API';

const GET_MISSIONS_SUCCESS = 'spaceApp/missions/GET_CURRENT_MISSIONS_SUCCESS';
const JOIN_MISSION = 'spaceApp/missions/JOIN_MISSION';

const initialMissions = [];
const missionsReducer = (state = initialMissions, action) => {
  switch (action.type) {
    case GET_MISSIONS_SUCCESS:
      return action.organizedMission;

    case JOIN_MISSION:
      return state.map((mission) => {
        if (mission.id !== action.id) {
          return mission;
        }
        return { ...mission, reserved: !mission.reserved };
      });

    default:
      return state;
  }
};

export default missionsReducer;

export const fetchMission = (data) => {
  const organizedMission = [];
  data.forEach((obj) => {
    const newMission = {
      id: obj.mission_id,
      name: obj.mission_name,
      description: obj.description,
      reserved: false,
    };
    organizedMission.push(newMission);
  });

  return {
    type: GET_MISSIONS_SUCCESS,
    organizedMission,
  };
};

export const GetMissionsFromApi = () => async (dispatch) => {
  const missions = await axios.get(MISSIONS_API);
  const { data } = missions;
  return dispatch(fetchMission(data));
};

export const becomeMember = (id) => ({
  type: JOIN_MISSION,
  id,
});

import axios from 'axios';
import MISSIONS_API from '../../api/API';

const GET_CURRENT_MISSIONS_SUCCESS = 'spaceApp/missions/GET_CURRENT_MISSIONS_SUCCESS';

const initialMissions = [];
const missionsReducer = (state = initialMissions, action) => {
  switch (action.type) {
    case GET_CURRENT_MISSIONS_SUCCESS:
      return [...state, action.missions];

    default:
      return state;
  }
};

export default missionsReducer;

export const fetchMission = (missions) => ({
  type: GET_CURRENT_MISSIONS_SUCCESS,
  missions,
});

export const GetMissionsFromApi = () => async (dispatch) => {
  const missions = await axios.get(MISSIONS_API);
  const { data } = missions;
  dispatch(fetchMission(data));
};

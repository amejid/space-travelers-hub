const GET_CURRENT_MISSIONS_SUCCESS = 'spaceApp/missions/GET_CURRENT_MISSIONS_SUCCESS';
const initialMissions = [];
const missionsReducer = (state = initialMissions, action) => {
  switch (action.type) {
    case GET_CURRENT_MISSIONS_SUCCESS:
      return [...state, action.books];

    default:
      return state;
  }
};

export default missionsReducer;

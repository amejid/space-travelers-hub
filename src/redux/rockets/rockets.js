const GET_CURRENT_ROCKETS_SUCCESS = 'spaceApp/rockets/GET_CURRENT_MISSIONS_SUCCESS';
const initialRockets = [];
const rocketsReducer = (state = initialRockets, action) => {
  switch (action.type) {
    case GET_CURRENT_ROCKETS_SUCCESS:
      return null;

    default:
      return state;
  }
};

export default rocketsReducer;

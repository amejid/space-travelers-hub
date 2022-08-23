const GET_ROCKETS = 'spaceApp/rockets/GET_ROCKETS';

const initialRockets = [];
const rocketsReducer = (state = initialRockets, action) => {
  switch (action.type) {
    case GET_ROCKETS:
      return null;

    default:
      return state;
  }
};

export default rocketsReducer;

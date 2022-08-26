import { createAsyncThunk } from '@reduxjs/toolkit';
import { ROCKETS_URL } from '../../api/API';

const GET_ROCKETS = 'spaceApp/rockets/GET_ROCKETS';
const TOGGLE = 'spaceApp/rockets/TOGGLE';

const initialRockets = [];
const rocketsReducer = (state = initialRockets, action) => {
  switch (action.type) {
    case `${GET_ROCKETS}/fulfilled`:
      return action.payload;
    case TOGGLE:
      return state.map((rocket) => {
        if (rocket.id !== action.payload) {
          return rocket;
        }
        return { ...rocket, reserved: !rocket.reserved };
      });
    default:
      return state;
  }
};

const transformData = (data) => {
  const transformed = [];

  data.forEach((obj) => {
    const newObj = {
      id: obj.id,
      name: obj.rocket_name,
      description: obj.description,
      image: obj.flickr_images[0],
      reserved: false,
    };

    transformed.push(newObj);
  });

  return transformed;
};

export const toggleReservedStatus = (id) => ({ type: TOGGLE, payload: id });

export const getRockets = createAsyncThunk(GET_ROCKETS, async () => {
  const res = await fetch(ROCKETS_URL);
  const data = await res.json();

  const transformed = transformData(data);

  return transformed;
});

export default rocketsReducer;

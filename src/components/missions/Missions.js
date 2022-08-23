import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetMissionsFromApi } from '../../redux/missions/missions';

const Missions = () => {
  useSelector((state) => state.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetMissionsFromApi());
  },
  [dispatch]);

  return (
    <div />
  );
};

export default Missions;

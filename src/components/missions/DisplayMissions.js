import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { becomeMember } from '../../redux/missions/missions';

const DisplayMission = (props) => {
  const {
    id, name, description,
  } = props;
  const dispatch = useDispatch();
  const joinMission = () => dispatch(becomeMember(id));

  return (
    <tr className="display-mission-tr">
      <th className="display-mission-bold">{name}</th>
      <th className="display-mission-font">{description}</th>
      <th>NOT A MEMBER</th>
      <th><button type="button" onClick={joinMission}>Join Mission</button></th>
    </tr>
  );
};

DisplayMission.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DisplayMission;

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { becomeMember } from '../../redux/missions/missions';

const DisplayMission = (props) => {
  const {
    id, name, description, reserved,
  } = props;
  const dispatch = useDispatch();
  const joinMission = () => dispatch(becomeMember(id));
  const btnBadge = reserved ? 'Leave Mission' : 'Join Mission';
  const memberBadge = reserved ? 'Active Member' : 'NOT A MEMBER';
  return (
    <tbody>
      <tr className="display-mission-tr">
        <th className="display-mission-bold">{name}</th>
        <th className="display-mission-font">{description}</th>
        <th>{memberBadge}</th>
        <th>
          <button
            type="button"
            onClick={joinMission}
          >
            {btnBadge}
          </button>
        </th>
      </tr>
    </tbody>
  );
};

DisplayMission.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default DisplayMission;

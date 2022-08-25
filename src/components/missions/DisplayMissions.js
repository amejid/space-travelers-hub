import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { becomeMember } from '../../redux/missions/missions';

const DisplayMission = (props) => {
  const {
    id, name, description, reserved,
  } = props;
 
  const dispatch = useDispatch();
  const joinMission = () =>  dispatch(becomeMember(id));

  const btnBadge = reserved ? 'Leave Mission' : 'Join Mission';
  const memberBadge = reserved ? 'Active Member' : 'NOT A MEMBER';

  return (
    <tbody>
      <tr className="display-mission-tr">
        <td className="display-mission-bold">{name}</td>
        <td className="display-mission-font">{description}</td>
        <td>{memberBadge}</td>
        <td>
          <button
            type="button"
            onClick={joinMission}
          >
            {btnBadge}
          </button>
        </td>
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

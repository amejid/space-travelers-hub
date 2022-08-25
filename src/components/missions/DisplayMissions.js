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

  const btnStyles = `btn-mission ${reserved ? 'btn-mission-sec' : ''}`;
  const badgeStyles = `badge ${reserved ? 'badge-secondary' : 'badge-primary'}`;

  return (
    <tbody>
      <tr className="display-mission-tr">
        <th className="display-mission-bold">{name}</th>
        <th className="display-mission-font">{description}</th>
        <th className="badge-section">
          <span className={badgeStyles}>{memberBadge}</span>
        </th>
        <th className="badge-section">
          <button type="button" className={btnStyles} onClick={joinMission}>
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

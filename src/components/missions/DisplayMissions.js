import PropTypes from 'prop-types';

const DisplayMission = (props) => {
  const { name, description } = props;
  return (
    <tr className="display-mission-tr">
      <th className="display-mission-bold">{name}</th>
      <th className="display-mission-font">{description}</th>
      <th><button type="button">NOT A MEMBER</button></th>
      <th><button type="button">Join Mission</button></th>
    </tr>
  );
};

DisplayMission.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DisplayMission;

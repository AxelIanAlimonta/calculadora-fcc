import PropTypes from "prop-types";

function Display({ id, value }) {
  return <div id={id}>{value}</div>;
}

Display.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
};

export default Display;

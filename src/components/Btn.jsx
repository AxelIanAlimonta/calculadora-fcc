import PropTypes from "prop-types";

function Btn({ id, value, onClick }) {
  return (
    <div id={id} className="btn" onClick={() => onClick(value)}>
      {value}
    </div>
  );
}

Btn.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Btn;

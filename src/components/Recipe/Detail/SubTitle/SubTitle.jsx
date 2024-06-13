import PropTypes from "prop-types";
import styles from "./SubTitle.module.css";

SubTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

function SubTitle({ children }) {
  const { subTitle } = styles;
  return <h3 className={subTitle}>{children}</h3>;
}

export default SubTitle;

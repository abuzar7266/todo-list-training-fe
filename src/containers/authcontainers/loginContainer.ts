import { RootState } from "redux/store";
import Login from "components/login";
import { login, logout, refresh } from "redux/feature/auth/authSlice";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      login,
      logout,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

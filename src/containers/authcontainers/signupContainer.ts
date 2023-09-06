import { RootState } from "redux/store";
import Signup from "components/signup";
import { signup, refresh } from "redux/feature/auth/authSlice";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      signup,
      refresh,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Label, Form, Alert, Input, FormFeedback } from 'reactstrap';
// Removed image logo imports; showing brand text instead
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import PropTypes from "prop-types";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from 'components/Common/withRouter';

// actions
import { loginUser, socialLogin } from "../../store/actions";
import { loginToNodeServer } from '../../helpers/nodeAuth_helper';

const Login = props => {
  document.title = "Login | Power Robotics - Responsive Bootstrap 5 Admin Dashboard";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      try {
        await loginToNodeServer(values.username, values.password);
        props.router.navigate('/products'); // Redirect to products page on success
      } catch (err) {
        // Show error message
        alert(err);
      }
    }
  });


  const selectLoginState = (state) => state.Login;
  const LoginProperties = createSelector(
    selectLoginState,
    (login) => ({
      error: login.error
    })
  );

  const {
    error
  } = useSelector(LoginProperties);

  const signIn = type => {
    dispatch(socialLogin(type, props.router.navigate));
  };

  //for facebook and google authentication
  const socialResponse = type => {
    signIn(type);
  };

  const sendToWhatsApp = (phone, message, url) => {
    const text = encodeURIComponent(`${message}\n${url}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };


  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">

                  <h3 className="text-center mt-5 mb-4">
                    <Link to="/" className="d-block auth-logo text-dark fw-bold" aria-label="Power Robotics" title="Power Robotics">
                      <i className="mdi mdi-robot me-2"></i>
                      Power Robotics
                    </Link>
                  </h3>

                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">Welcome Back to Power Robotics!</h4>
                    <p className="text-muted text-center">Sign in to continue to Power Robotics.</p>
                    <Form
                      className="form-horizontal mt-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}
                      <div className="mb-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          name="username"
                          className="form-control"
                          placeholder="Enter username"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username ? true : false
                          }
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="userpassword">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3 mt-4">
                        <div className="col-6">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customControlInline" />
                            <label className="form-check-label" htmlFor="customControlInline">Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                        </div>
                      </Row>
                      <Row className="form-group mb-0">
                        <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</Link>
                        <div className="col-12 mt-4 d-flex justify-content-center">
                          <Link
                            to="#"
                            className="social-list-item bg-danger text-white border-danger"
                            onClick={e => {
                              e.preventDefault();
                              socialResponse("google");
                            }}
                          >
                            <i className="mdi mdi-google" />
                          </Link>
                        </div>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>Don't have an account ? <Link to="/register" className="text-primary"> Signup Now </Link></p>
                © {new Date().getFullYear()} Power Robotics <span className="d-none d-sm-inline-block"> - Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand.</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </React.Fragment>
  )
}

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};

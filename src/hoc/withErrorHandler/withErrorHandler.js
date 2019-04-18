import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";
/**
 *
 * @param {React.Component} WrappedComponent
 */
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
      this.state = {
        error: null
      };
    }

    errorConfirmedHandler = () => {
      this.setState({ error: false });
    };
    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;

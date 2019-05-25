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
      this.state = {
        error: null
      };
      this.reqInterSetup = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterSetup = axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
    }

    componentWillUnmount() {
      console.log("Will Unmount", this.reqInterSetup, this.resInterSetup);
      axios.interceptors.request.eject(this.reqInterSetup);
      axios.interceptors.response.eject(this.resInterSetup);
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

import React, { Component } from "react";
import { connect } from "react-redux";

import Logo from "../../assets/logo.png";
import { getRepository, removeRepository } from "../../store/actions";

import { Container, Form } from "./styles";

import CompareList from "../../components/CompareList";

class Main extends Component {
  
  state = {
    repositoryInput: "",
  };

  handleChangeRepository = ({ target }) => {
    this.setState({
      repositoryInput: target.value
    });
  };

  handleAddRepository = event => {
    event.preventDefault();
    this.props.getRepository(this.state.repositoryInput);
    this.setState({ repositoryInput: "" });
  };

  render() {
    const { repositoryInput } = this.state;

    const { repository: { repositories, loading, error } } = this.props;

    return (
      <Container>
        <img src={Logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository} withError={error}>
          <input
            type="text"
            placeholder="user/repository"
            value={repositoryInput}
            onChange={this.handleChangeRepository}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : "OK"}
          </button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepository={this.props.removeRepository}
          loading={loading}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  repository: state.repository
});

const mapDispatchToProps = dispatch => ({
  getRepository: payload => dispatch(getRepository(payload)),
  removeRepository: payload => dispatch(removeRepository(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

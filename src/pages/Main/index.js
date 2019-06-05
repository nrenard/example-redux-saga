import React, { Component } from "react";
import { connect } from "react-redux";

import Logo from "../../assets/logo.png";
import api from "../../services/api";
import { getRepository, removeRepository } from "../../store/actions";

import { Container, Form } from "./styles";

import CompareList from "../../components/CompareList";

class Main extends Component {
  constructor(props) {
    super(props);

    const repositories = JSON.parse(localStorage.getItem("repositories")) || [];

    this.state = {
      loading: false,
      repositoryInput: "",
      repositoryError: false,
      repositories
    };
  }

  handleChangeRepository = ({ target }) => {
    this.setState({
      repositoryInput: target.value
    });
  };

  handleAddRepository = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      this.props.getRepository(this.state.repositoryInput);

      this.setState(
        {
          repositoryInput: "",
          repositoryError: false
        },
        () => {
          localStorage.setItem(
            "repositories",
            JSON.stringify(this.state.repositories)
          );
        }
      );
    } catch (err) {
      this.setState({
        repositoryError: true
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  updateRepository = async id => {
    const repositoryLocal = this.state.repositories.filter(
      repository => repository.id === id
    )[0];

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${repositoryLocal.full_name}`
      );
      const repositories = this.state.repositories.filter(
        repos => repos.id !== repository.id
      );

      this.setState(
        {
          repositories: [...repositories, repository]
        },
        () => {
          localStorage.setItem(
            "repositories",
            JSON.stringify(this.state.repositories)
          );
        }
      );
    } catch (err) {
      this.setState({
        repositoryError: false
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { repositoryInput, repositoryError, loading } = this.state;

    const { repositories } = this.props;

    return (
      <Container>
        <img src={Logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository} withError={repositoryError}>
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
          updateRepository={this.updateRepository}
          loading={loading}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  repositories: state.repositories
});

const mapDispatchToProps = dispatch => ({
  getRepository: payload => dispatch(getRepository(payload)),
  removeRepository: payload => dispatch(removeRepository(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

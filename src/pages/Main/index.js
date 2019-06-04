import React, { Component } from 'react';
import moment from 'moment';

import Logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import api from '../../services/api';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  constructor(props) {
    super(props);

    const repositories = JSON.parse(localStorage.getItem('repositories')) || [];

    console.log('repositories: ', repositories);

    this.state = {
      loading: false,
      repositoryInput: '',
      repositoryError: false,
      repositories,
    };
  }

  handleChangeRepository = ({ target }) => {
    this.setState({
      repositoryInput: target.value,
    });
  };

  handleAddRepository = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState(
        {
          repositories: [...this.state.repositories, repository],
          repositoryInput: '',
          repositoryError: false,
        },
        () => {
          localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
        },
      );
    } catch (err) {
      this.setState({
        repositoryError: true,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  removeRepository = id => {
    const { repositories } = this.state;
    const newRepositories = repositories.filter(repository => repository.id !== id);

    this.setState(
      {
        repositories: newRepositories,
      },
      () => {
        localStorage.setItem('repositories', JSON.stringify(newRepositories));
      },
    );
  };

  updateRepository = async id => {
    const repositoryLocal = this.state.repositories.filter(repository => repository.id === id)[0];

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryLocal.full_name}`);
      const repositories = this.state.repositories.filter(repos => repos.id !== repository.id);

      this.setState(
        {
          repositories: [...repositories, repository],
        },
        () => {
          localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
        },
      );
    } catch (err) {
      this.setState({
        repositoryError: false,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { repositories, repositoryInput, repositoryError, loading } = this.state;

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
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepository={this.removeRepository}
          updateRepository={this.updateRepository}
          loading={loading}
        />
      </Container>
    );
  }
}

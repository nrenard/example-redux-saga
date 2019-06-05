import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";

import { Creators as RepositoriesActions } from "../../store/ducks/repositories";

import Logo from "../../assets/logo.png";

import { Container, Form } from "./styles";

import CompareList from "../../components/CompareList";
import { connect } from "react-redux";

const Main = ({
  repositories: { error: repositoryError, loading, list: repositories },
  ...props
}) => {
  const [repositoryInput, handleChangeRepository] = useState("");

  const getRepositoriePromise = event => {
    event.preventDefault();
    props.getRepositorie(repositoryInput);

    handleChangeRepository("");
  };

  useEffect(() => {
    if (!repositories.lenght) {
      props.getRepositories();
    }
  }, []);

  return (
    <Container>
      <img src={Logo} alt="Github Compare" />

      <Form onSubmit={getRepositoriePromise} withError={repositoryError}>
        <input
          type="text"
          placeholder="user/repository"
          value={repositoryInput}
          onChange={({ target }) => handleChangeRepository(target.value)}
        />
        <button type="submit">
          {loading ? <i className="fa fa-spinner fa-pulse" /> : "OK"}
        </button>
      </Form>

      <CompareList
        repositories={repositories}
        removeRepository={id => props.removeRepositorie(id)}
        loading={loading}
      />
    </Container>
  );
};

const mapStateToProps = ({ repositories }) => ({ repositories });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRepositorie: RepositoriesActions.getRepositorie,
      removeRepositorie: RepositoriesActions.removeRepositorie,
      getRepositories: RepositoriesActions.getRepositories
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: 50px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  button {
    background: #63f5b8;
    color: #fff;
    height: 40px;
    padding: 0 10px;
    border: 0;
    font-size: 15px;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.4s all ease;

    &:hover {
      background: #52d89f;
    }
  }
`;

export const Repository = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px 20px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 18px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #eee;
      }
    }
  }
`;

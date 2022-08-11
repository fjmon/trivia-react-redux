import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
// import { rootReducer } from "../../redux/store";
// import { getToken } from "../../API/getInfo";

import App from "../../App";
import Store from "../../redux/store"


describe('Testes na página de LOGIN', () => {
  it('Testes no componente LOGIN', async () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ Store }>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    )

    history.push('/')

    const nameLabel = screen.getByText(/usuário/i)
    const emailLabel = screen.getByText(/email/i)
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();

    const nameInput = screen.getByTestId("input-player-name")
    const emailInput = screen.getByTestId("input-gravatar-email")
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();


    const playButton = screen.getByRole('button', {
      name: /play/i,
    })

    const settingsButton = screen.getByRole('button', {
      name: /settings/i,
    })

    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();

    expect(playButton).toBeDisabled();
    expect(settingsButton).not.toBeDisabled();

    userEvent.type(nameInput, '');
    userEvent.type(emailInput, 'email');

    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, 'Teste');
    userEvent.type(emailInput, 'email@teste');

    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, 'Teste');
    userEvent.type(emailInput, 'email@teste.com');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    history.push('/play')

    const playPageElement = screen.getByTestId(/game-page/i)

    expect(playPageElement).toBeInTheDocument();
  });
})
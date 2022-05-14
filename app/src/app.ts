import { NegociacaoController } from "./controllers/negociacao-controller.js";
import { NegociacoesView } from "./views/negociacoes-view.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    controller.adicionar();
  });
} else {
  throw Error('Form é Null.')
}

const botaoImporta = document.querySelector('#botao-importa');
if (botaoImporta) {
  botaoImporta.addEventListener('click', () => {
    controller.importarDados();
  });
} else {
  throw Error('Botão "importa" não foi encontrado!');
}
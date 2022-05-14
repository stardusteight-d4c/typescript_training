import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  private inputData:  HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView', true);
  private mensagemView = new MensagemView('#mensagemView', true);

  constructor() {
    this.inputData = <HTMLInputElement>document.querySelector('#data');
    this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
    this.inputValor = document.querySelector('#valor') as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

  public adicionar(): void {
    const negociacao = Negociacao.criarNegociacao(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.validarDiaUtil(negociacao.data)) {
      this.mensagemView
      .update('Apenas negociações em dias úteis são aceitas!');
      return;
    } 
    this.negociacoes.adicionar(negociacao);
    this.limparFormulario();
    this.atualizarView();
  }

  private validarDiaUtil(data: Date) {
    return data.getDay() > DiaDaSemana.domingo 
    && data.getDay() < DiaDaSemana.sabado;
  }

  private limparFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualizarView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso!');
  }
}
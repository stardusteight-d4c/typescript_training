import { domInjector } from "../decorators/dom-injector.js";
import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  @domInjector('#data')
  private inputData:  HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;
  private negociacaoDeHoje = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');
  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.atualizar(this.negociacaoDeHoje);
  }

  public adicionar(): void {
    const negociacao = Negociacao.criarNegociacao(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.validarDiaUtil(negociacao.data)) {
      this.mensagemView
      .atualizar('Apenas negociações em dias úteis são aceitas!');
      return;
    } 
    
    this.negociacaoDeHoje.adicionarNegociacao(negociacao);
    imprimir(negociacao, this.negociacaoDeHoje);
    this.limparFormulario();
    this.atualizarView();
  }

  public importarDados(): void {
    this.negociacoesService.obterNegociacoesDoDia()
    .then(negociacoes => {
      return negociacoes.filter(negociacoesRealizadas => {
        return !this.negociacaoDeHoje
        .listaDeNegociacoes()
        .some(negociacao => negociacao
          .encontrarNegociacoesIguais(negociacoesRealizadas));
      });
    })
    .then(negociacoes => {
      for(let negociacao of negociacoes) {
        this.negociacaoDeHoje.adicionarNegociacao(negociacao);
      }
      this.negociacoesView.atualizar(this.negociacaoDeHoje);
    });  
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
    this.negociacoesView.atualizar(this.negociacaoDeHoje);
    this.mensagemView.atualizar('Negociação adicionada com sucesso!');
  }
}
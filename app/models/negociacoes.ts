import { Negociacao } from "./negociacao.js";

export class Negociacoes {
  private negociacoes: Array<Negociacao> = [];

  public adicionar(negociacao: Negociacao): void {
    this.negociacoes.push(negociacao);
  }

  public listaDeNegociacoes(): ReadonlyArray<Negociacao> {
    return this.negociacoes;
  }
 }

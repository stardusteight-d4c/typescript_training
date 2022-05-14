import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> {
  private negociacoes: Array<Negociacao> = [];

  public adicionarNegociacao(negociacao: Negociacao): void {
    this.negociacoes.push(negociacao);
  }

  public listaDeNegociacoes(): ReadonlyArray<Negociacao> {
    return this.negociacoes;
  }

  public exibirLog(): string {
    return JSON.stringify(this.negociacoes, null, 2);
  }

  public encontrarNegociacoesIguais(negocioes: Negociacoes): boolean {
    return JSON.stringify(this.negociacoes) === JSON.stringify(negocioes.listaDeNegociacoes());
  }
}

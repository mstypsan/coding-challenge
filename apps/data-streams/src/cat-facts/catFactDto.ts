export class CatFactDto {
  public constructor(fact: string, length: number) {
    this.fact = fact;
    this.length = length;
  }

  fact: string;

  length: number;
}

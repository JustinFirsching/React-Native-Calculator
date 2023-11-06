interface IExpression {
  lastTerm: string;
  operator: string;
  currentTerm: string;
  isReady(): boolean;
  toString(): string;
};

export class Expression implements IExpression {
  static fromExpression(otherExpression: IExpression): Expression {
    return new Expression(
      otherExpression.lastTerm,
      otherExpression.operator,
      otherExpression.currentTerm,
    )
  }

  constructor(
    public lastTerm: string = "",
    public operator: string = "",
    public currentTerm: string = ""
  ) { }

  isReady(): boolean {
    const hasLastTerm = this.lastTerm.length !== 0
    const hasOperator = this.operator.length !== 0
    const hasCurrentTerm = this.currentTerm.length !== 0
    return hasLastTerm && hasCurrentTerm && hasOperator
  }

  toString(): string {
    return `${this.lastTerm} ${this.operator} ${this.currentTerm}`
  }

  withCurrentTerm(currentTerm: string): Expression {
    const newExpression = Expression.fromExpression(this)
    newExpression.currentTerm = currentTerm
    return newExpression
  }

  withOperator(operator: string): Expression {
    const newExpression = Expression.fromExpression(this)
    newExpression.operator = operator
    return newExpression
  }

  withLastTerm(lastTerm: string): Expression {
    const newExpression = Expression.fromExpression(this)
    newExpression.lastTerm = lastTerm
    return newExpression
  }
}

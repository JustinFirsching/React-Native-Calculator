import { evaluate } from 'mathjs';

export function evaluateExpression(expression: string | string[]): number | null {
  var expr: string
  if (Array.isArray(expression)) {
    expr = expression.join(" ")
  } else {
    expr = expression
  }

  console.log(`Attempting to evaluate expression: ${expr}`)
  try {
    const result = evaluate(expr)
    if (typeof result === 'number' && !isNaN(result)) {
      return result;
    }
    throw new Error("Invalid expression result");
  } catch (error) {
    console.error("Unable to evaluate expression", error);
    return null;
  }
}

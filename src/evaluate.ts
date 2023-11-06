import { evaluate } from 'mathjs';
import { Expression } from './expression'

export function evaluateExpression(expression: Expression): number | null {
  if (!expression.isReady()) {
    return null
  }

  const expr = expression.toString()
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

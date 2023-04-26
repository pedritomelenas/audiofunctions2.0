var MathExpression = require("math-expressions");
var lescape = require("escape-latex");
var fnCompiler = require("interval-arithmetic-eval");

class FunctionValidator {
  validate(latexFnString) {
    console.log("da passare latex " + latexFnString);
    const res = MathExpression.fromLatex(latexFnString).toString();
    console.log("da passare a function plot " + res);
    try {
      const compileRes = fnCompiler(res);
      compileRes.eval({ x: 0 });
      console.log("formula compilation success");
    } catch {
      console.error("Failed to compile");
    }
    // const eLatex = lescape(latexFnString);
    // console.log("da valutare escaped " + eLatex);
  }
}

const functionValidator = new FunctionValidator();

export default ({ app }, inject) => {
  inject("functionValidator", functionValidator);
};

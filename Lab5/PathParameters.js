export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseFloat(a) + parseFloat(b);
    res.send(sum.toString());
  };

  const subtract = (req, res) => {
    const { a, b } = req.params;
    const result = parseFloat(a) - parseFloat(b);
    res.send(result.toString());
  };

  const multiply = (req, res) => {
    const { a, b } = req.params;
    const result = parseFloat(a) * parseFloat(b);
    res.send(result.toString());
  };

  const divide = (req, res) => {
    const { a, b } = req.params;
    const divisor = parseFloat(b);
    if (divisor === 0) {
      return res.status(400).send('Cannot divide by zero');
    }
    const result = parseFloat(a) / divisor;
    res.send(result.toString());
  };

  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}

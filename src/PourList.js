export const PourList = ({ coffeeAmount, ratioAmount }) => {
  const steps = calculatePours(coffeeAmount, ratioAmount);
  return (
    <div>
      {steps.map((step, idx) => (
        <Pour key={idx} step={step} />
      ))}
    </div>
  );
};

const Pour = ({ step }) => (
  <div className="mb-4 text-center">
    <div className="text-sm text-center font-thin uppercase pt-3 text-white">
      {step.label} Pour to
    </div>
    <div className="text-4xl text-center font-bold text-white">{step.amount}g</div>
  </div>
);

const calculatePours = (coffeeAmount, ratioAmount) => {
  // subtract bloom from total
  const total = coffeeAmount * ratioAmount;
  const bloom = 2 * coffeeAmount;
  const pourAmount = total / 5;
  const steps = Array(4)
    .fill(1)
    .map((i, idx) => ({
      label: indexToLabel(idx),
      amount: Math.floor( pourAmount * (idx + 2)),
    }));
  const bloomStep = { label: "Bloom", amount: bloom };
  return [bloomStep, ...steps];
};

const indexToLabel = (idx) => {
  switch (idx + 2) {
    case 2:
      return "Second";
    case 3:
      return "Third";
    case 4:
      return "Fourth";
    case 5:
      return "Final";
    default:
      return "";
  }
};

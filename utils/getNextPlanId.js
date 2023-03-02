import plans from "../helpers/plans";

export default function getNextPlanId(totalTopUp) {
  let highPlan = plans.reduce((acc, plan, index) => {
    if (plan.minimum > totalTopUp && plans[acc].minimum <= totalTopUp) {
      acc = index;
    }
    return acc;
  }, 0);

  return plans[highPlan === 0 ? 0 : highPlan - 1];
}

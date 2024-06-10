export default function getBestSet(set) {
  const reps = set?.reps;
  const weight = set?.weight;
  const calculateOneRepMax = Math.floor(weight / (1.0278 - 0.0278 * reps));
  return calculateOneRepMax;
}

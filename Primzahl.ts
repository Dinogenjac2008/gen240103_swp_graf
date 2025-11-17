function istPrimzahl(n: number): number {
  if (n <= 1) return 0;
  if (n === 2) return 1;
  if (n % 2 === 0) return 0;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return 0;
  }
  return 1;
}

// Beispiel:
const zahl = 17;
if (istPrimzahl(zahl) === 1) {
  console.log(zahl + " ist eine Primzahl.");
} else 
  console.log(zahl + " ist keine Primzahl.");

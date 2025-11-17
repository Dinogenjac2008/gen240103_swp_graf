
function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  // Teste i und i+2 (6k ± 1 Optimierung)
  const r = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= r; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Sieve of Eratosthenes
 * Liefert ein Array mit allen Primzahlen <= limit
 * @param {number} limit
 * @returns {number[]}
 */
function primesUpTo(limit) {
  if (!Number.isInteger(limit) || limit < 2) return [];
  const sieve = new Uint8Array(limit + 1); // 0 = vermutlich prime, 1 = nicht prime
  const primes = [];
  sieve[0] = 1;
  sieve[1] = 1;
  const max = Math.floor(Math.sqrt(limit));
  for (let p = 2; p <= max; p++) {
    if (sieve[p] === 0) {
      for (let multiple = p * p; multiple <= limit; multiple += p) {
        sieve[multiple] = 1;
      }
    }
  }
  for (let i = 2; i <= limit; i++) {
    if (sieve[i] === 0) primes.push(i);
  }
  return primes;
}

/**
 * Generator für Primzahlen: gibt nacheinander Primzahlen zurück.
 * Achtung: nicht optimal für sehr große Primzahlen, aber praktisch.
 */
function* primeGenerator() {
  yield 2;
  let candidate = 3;
  const found = []; // gespeicherte Primzahlen zur schnellen Teilbarkeitstestung
  while (true) {
    let isP = true;
    const limit = Math.sqrt(candidate);
    for (const p of found) {
      if (p > limit) break;
      if (candidate % p === 0) { isP = false; break; }
    }
    if (isP) {
      found.push(candidate);
      yield candidate;
    }
    candidate += 2; // nur ungerade Kandidaten
  }
}

// --- Beispielnutzung (wenn direkt mit Node ausgeführt) ---
if (typeof require !== 'undefined' && require.main === module) {
  console.log('isPrime(97) =>', isPrime(97)); // true
  console.log('Primes up to 100 =>', primesUpTo(100));
  // erster Generator-Beispiel: die ersten 10 Primzahlen
  const gen = primeGenerator();
  const first10 = [gen.next().value]; // enthält 2
  for (let i = 1; i < 10; i++) first10.push(gen.next().value);
  console.log('First 10 primes (generator) =>', first10);
}

// Export (Node / ES Module kompatibel)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isPrime, primesUpTo, primeGenerator };
}
export { isPrime, primesUpTo, primeGenerator }; // unterstützt Browser mit Bundlern / moderne Umgebungen

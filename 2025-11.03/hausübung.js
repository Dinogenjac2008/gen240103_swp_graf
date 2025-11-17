export class Bruch {
  constructor(zaehler, nenner) {
    if (nenner === 0) {
      throw new Error("Nenner darf nicht 0 sein");
    }
    // Vorzeichen in den Zähler bringenö
    if (nenner < 0) {
      zaehler = -zaehler;
      nenner = -nenner;
    }
    const g = Bruch.ggt(Math.abs(zaehler), Math.abs(nenner));
    this.zaehler = zaehler / g;
    this.nenner = nenner / g;
  }

  static ggt(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a === 0 ? 1 : a;
  }

  toString() {
    return `${this.zaehler}/${this.nenner}`;
  }

  add(other) {
    const z = this.zaehler * other.nenner + other.zaehler * this.nenner;
    const n = this.nenner * other.nenner;
    return new Bruch(z, n);
  }

  sub(other) {
    const z = this.zaehler * other.nenner - other.zaehler * this.nenner;
    const n = this.nenner * other.nenner;
    return new Bruch(z, n);
  }

  mul(other) {
    return new Bruch(this.zaehler * other.zaehler, this.nenner * other.nenner);
  }

  div(other) {
    if (other.zaehler === 0) {
      throw new Error("Division durch 0");
    }
    return new Bruch(this.zaehler * other.nenner, this.nenner * other.zaehler);
  }

  equals(other) {
    return this.zaehler === other.zaehler && this.nenner === other.nenner;
  }
}

/* Beispiel (entfernen oder auskommentieren, wenn die Klasse importiert wird):
const a = new Bruch(2, 4);
console.log(a.toString()); // "1/2"
*/
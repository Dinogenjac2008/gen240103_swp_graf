let bruch1 = "1_2/5";
let bruch2 = "5_3/10";

// Hilfsfunktion: Bruch-String zu unechtem Bruch umwandeln
function parseBruch(bruch: string) {
    let ganze = 0, zaehler = 0, nenner = 1, unechterZaehler = 0;
    if (bruch.includes("_")) {
        const [ganz, bruchteil] = bruch.split("_");
        const [z, n] = bruchteil.split("/");
        ganze = Number(ganz);
        zaehler = Number(z);
        nenner = Number(n);
        unechterZaehler = ganze * nenner + zaehler;
    } else {
        const [z, n] = bruch.split("/");
        zaehler = Number(z);
        nenner = Number(n);
        unechterZaehler = zaehler;
    }
    return { ganze, zaehler, nenner, unechterZaehler };
}

// KGV berechnen
function kgv(a: number, b: number): number {
    let max = Math.max(a, b);
    while (max % a !== 0 || max % b !== 0) {
        max++;
    }
    return max;
}

// ggT berechnen
function ggt(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Brüche parsen
const b1 = parseBruch(bruch1);
const b2 = parseBruch(bruch2);

console.log(`Erster Bruch als unechter Bruch: ${b1.unechterZaehler}/${b1.nenner}`);
console.log(`Zweiter Bruch als unechter Bruch: ${b2.unechterZaehler}/${b2.nenner}`);

// Gemeinsamen Nenner finden
const gemeinsamerNenner = kgv(b1.nenner, b2.nenner);
console.log(`Gemeinsamer Nenner: ${gemeinsamerNenner}`);

// Brüche erweitern
const erweiterterZaehler1 = b1.unechterZaehler * (gemeinsamerNenner / b1.nenner);
const erweiterterZaehler2 = b2.unechterZaehler * (gemeinsamerNenner / b2.nenner);

// Brüche addieren
const summeZaehler = erweiterterZaehler1 + erweiterterZaehler2;
console.log(`Summe der Brüche: ${summeZaehler}/${gemeinsamerNenner}`);

// Bruch kürzen
const teiler = ggt(summeZaehler, gemeinsamerNenner);
const gekuerztZaehler = summeZaehler / teiler;
const gekuerztNenner = gemeinsamerNenner / teiler;
console.log(`Gekürzter Bruch: ${gekuerztZaehler}/${gekuerztNenner}`);

// Als gemischte Zahl ausgeben (optional)
if (gekuerztZaehler > gekuerztNenner) {
    const ganze = Math.floor(gekuerztZaehler / gekuerztNenner);
    const rest = gekuerztZaehler % gekuerztNenner;
    if (rest === 0) {
        console.log(`Als ganze Zahl: ${ganze}`);
    } else {
        console.log(`Als gemischte Zahl: ${ganze}_${rest}/${gekuerztNenner}`);
    }
}
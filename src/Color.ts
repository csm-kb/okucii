export default class Color {

    static transparent() { return new Color(0,0,0,0); }
    static black() { return new Color(0,0,0,1); }
    static white() { return new Color(255,255,255,1); }

    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;
    private cssString: string;

    constructor(
        r: number = 255,
        g: number = 255,
        b: number = 255,
        a: number = 1) {
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a;

            this.makeCssString();
    }

    get r() { return this._r; }
    get g() { return this._g; }
    get b() { return this._b; }
    get a() { return this._a; }

    set r(val: number) { this._r = val; this.makeCssString(); }
    set g(val: number) { this._g = val; this.makeCssString(); }
    set b(val: number) { this._b = val; this.makeCssString(); }
    set a(val: number) { this._a = val; this.makeCssString(); }

    private makeCssString() {
        this.cssString = `rgba(${this._r},${this._g},${this._b},${this._a})`;
    }

    toCssString() {
        return this.cssString;
    }

    clone() {
        return new Color(this._r, this._g, this._b, this._a);
    }
}
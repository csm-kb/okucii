export default class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    add (v: Vector) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    static add (v1: Vector, v2: Vector) {
        return v1.clone().add(v2);
    }

    static zero() { return new Vector(0,0); }
    static one() { return new Vector(1,1); }
}
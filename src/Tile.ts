import Color from "./Color";
import Vector from "./Vector";

interface TileConstructorOptions {
    char?: string;
    color?: Color;
    background?: Color;
    pos?: Vector;
    isVisible?: boolean;
}

export default class Tile {
    char: string;
    color: Color;
    background: Color;
    pos: Vector;
    isVisible: boolean;

    readonly id: string = Math.random().toString(36).slice(2);

    constructor(options: TileConstructorOptions) {
        this.char = options.char ?? ' ';
        this.color = options.color ?? Color.white();
        this.background = options.background ?? Color.black();
        this.pos = options.pos ?? Vector.zero();
        this.isVisible = options.isVisible ?? true;
    }
}
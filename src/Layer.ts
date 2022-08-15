import Color from "./Color";
import Tile from "./Tile";
import Vector from "./Vector";

interface DrawingOperation {
    tile: Tile;
    char: string;
    color: Color;
    background: Color;
    pos: Vector;
    isVisible: boolean;
}

const drawingOperation = (tile: Tile): DrawingOperation => ({
    tile: tile,
    char: tile.char,
    color: tile.color.clone(),
    background: tile.background.clone(),
    pos: tile.pos.clone(),
    isVisible: tile.isVisible,
});

interface LayerConstructorOptions {
    opacity?: number;
    isVisible?: boolean;
    pos?: Vector;
    size: Vector;
    zindex?: number;
}

export default class Layer {
    opacity: number;
    isVisible: boolean;
    pos: Vector;
    size: Vector;
    zindex: number;
    operations: Array<DrawingOperation>;

    constructor(options: LayerConstructorOptions) {
        if (options.size.x < 0 || options.size.y < 0)
            throw new Error("Size cannot be less than zero");

        this.opacity = options.opacity ?? 1;
        this.isVisible = options.isVisible ?? true;
        this.pos = options.pos ?? Vector.zero();
        this.size = options.size;
        this.zindex = options.zindex ?? 0;
        this.operations = new Array<DrawingOperation>();
    }

    draw(tile: Tile) {
        this.operations.push(drawingOperation(tile));
    }

    clear() {
        this.operations = [];
    }
}
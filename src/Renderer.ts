import Layer from "./Layer";
import { sort } from "fast-sort";

export default class Renderer {
    private _namedLayers: Record<string, Layer> = {};
    private _drawOrder: Array<Layer> = [];
    private _layerElements: Record<string, HTMLElement> = {};

    private _fontSize: number = 20;

    frameCount: number = 0;

    private _beforeDraw: () => void = () => {};

    addLayer(name: string, layer: Layer) {
        if (name in this._namedLayers)
            return new Error(`Layer "${name}" already exists`);

        this._namedLayers[name] = layer;
        this._drawOrder.push(layer);
        this.sortDrawOrder();

        return this;
    }

    onBeforeDraw = (cb: () => void) => this._beforeDraw = cb;

    commit() {
        this._beforeDraw();
        for (let [name, layer] of Object.entries(this._namedLayers)) {
            let layerEl = this._layerElements[name];

            if (!layerEl) {
                layerEl = document.createElement('div');
                layerEl.classList.add('okucii-layer');

                layerEl.style.fontSize = `${this._fontSize}px`;
                layerEl.style.top = `${layer.pos.y * this._fontSize}px`;
                layerEl.style.left = `${layer.pos.x * this._fontSize / 2}px`;
                layerEl.style.height = `${layer.size.y * this._fontSize}px`;
                layerEl.style.width = `${layer.size.x * this._fontSize/ 2}px`;
                layerEl.style.zIndex = `${layer.zindex}`;

                document.getElementById('okucii-layer-container').appendChild(layerEl);
                this._layerElements[name] = layerEl;
            }

            layer.operations.forEach(op => {
                let opEl = document.getElementById(`okucii-tile-${op.tile.id}`);
                if (!opEl) {
                    opEl = document.createElement('div');
                    opEl.id = `okucii-tile-${op.tile.id}`;
                    opEl.classList.add(`okucii-tile`);
                    
                    layerEl.appendChild(opEl);
                }

                if (op.isVisible) {
                    opEl.textContent = op.char;
                    opEl.style.color = op.color.toCssString();
                    opEl.style.background = op.background.toCssString();
                    opEl.style.top = `${op.pos.y * this._fontSize}px`;
                    opEl.style.left = `${op.pos.x * this._fontSize/2}px`;
                    opEl.style.display = 'block';
                } else {
                    opEl.style.display = 'none';
                }
            });

            layer.clear();
        }
        this.frameCount++;
    }

    private sortDrawOrder = () => {
        this._drawOrder = sort(this._drawOrder).asc(l => l.zindex);
    }
}
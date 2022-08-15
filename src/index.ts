// renderer
// tiles

import Color from "./Color";
import Layer from "./Layer";
import Renderer from "./Renderer";
import Tile from "./Tile";
import Vector from "./Vector";

const layerBaseSize = new Vector(80,24);

const layers: Record<string, Layer> = {
    "background": new Layer({ size: layerBaseSize }),
    "actor": new Layer({ size: layerBaseSize })
};

const player = new Tile({
    char: '@',
    color: new Color(255),
    background: Color.transparent(),
    isVisible: true,
    pos: new Vector(
        Math.floor(layerBaseSize.x/2),
        Math.floor(layerBaseSize.y/2))
});

const backgroundTiles = Array.from(
    {length: layerBaseSize.x*layerBaseSize.y},
    (_, i) => {
        const x = i % layerBaseSize.x;
        const y = Math.floor(i / layerBaseSize.x);

        return new Tile({
            char: '.',
            color: new Color(80,80,80,1),
            pos: new Vector(x,y)
        });
    }
    );

const renderer = new Renderer();
Object.entries(layers).forEach(([name, layer]) => renderer.addLayer(name, layer));

renderer.onBeforeDraw(() => {
    layers.background.operations.forEach(op => {
        const newAlpha = (Math.sin(op.pos.x + op.pos.y + renderer.frameCount/10)+1)/2;
        op.color.a = newAlpha;
    });
});

const draw = () => {
    backgroundTiles.forEach(tile => layers.background.draw(tile));
    layers.actor.draw(player);
    renderer.commit();

    requestAnimationFrame(draw);
};
draw();

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': player.pos.add(new Vector(0,-1)); break;
        case 'ArrowDown': player.pos.add(new Vector(0,1)); break;
        case 'ArrowLeft': player.pos.add(new Vector(-1,0)); break;
        case 'ArrowRight': player.pos.add(new Vector(1,0)); break;
    }
});
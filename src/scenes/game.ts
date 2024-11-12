import { Application, Container, TilingSprite, Sprite } from 'pixi.js';

// A simple clamping function, used below to make sure the sprite stays within the frame/window
const clamp = (num:number, min:number, max:number) => Math.min(max, Math.max(min, num));

export class Game extends Container {
    app: Application;
    sprite: Sprite;
    background: TilingSprite;
    state: { velocity: { x: number; y: number } };

    constructor(app: Application) {
        super();

        this.app = app;
        this.state = { velocity: { x: 4, y: 4 } };
        this.update = this.update.bind(this);

        // A simple tiled background going across the entire viewport
        this.background = TilingSprite.from('assets/background.png', { width: app.screen.width, height: app.screen.height});
        this.addChild(this.background);

        this.sprite = Sprite.from('assets/sicp.png');

        // Set the transform anchor to the middle so that scaling doesn't change the position
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        // Start with the sprite in the center
        this.sprite.x = window.innerWidth / 2;
        this.sprite.y = window.innerHeight / 2;

        this.addChild(this.sprite);

        // Handle update
        app.ticker.add(this.update);
    }

    update() {
        const min_x = this.sprite.width / 2;
        const min_y = this.sprite.height / 2;
        const max_x = window.innerWidth - min_x;
        const max_y = window.innerHeight - min_y;

        // When the sprite collides the edge we invert the velocity
        if (this.sprite.x <= min_x || this.sprite.x >= max_x) {
            this.state.velocity.x = -this.state.velocity.x;
        }
        if (this.sprite.y <= min_y || this.sprite.y >= max_y) {
            this.state.velocity.y = -this.state.velocity.y;
        }

        // Scale the sprite depending on it's velocity
        this.sprite.scale.x = this.state.velocity.x >= 0 ? 1 : -1;
        this.sprite.scale.y = this.state.velocity.y >= 0 ? 1 : -1;

        // Clamp the sprite position since otherwise it could get stuck outside the viewable area due to resizes
        this.sprite.x = clamp(this.sprite.x + this.state.velocity.x, min_x, max_x);
        this.sprite.y = clamp(this.sprite.y + this.state.velocity.y, min_y, max_y);
    }
}

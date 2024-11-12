import { Application, Assets } from 'pixi.js';
import { Game } from './scenes/game';

const initPixiApplication = async () => {
    const app = new Application();

    // Intialize the application.
    await app.init({ background: '#000000', resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
    document.body.style.margin = '0';

    return app;
};

const loadAssets = async () => {
    await Assets.load('assets/sicp.png');
    await Assets.load('assets/background.png');
};

const main = async () => {
    const app = await initPixiApplication();

    await loadAssets();

    // Switch to the Game scene
    const scene = new Game(app);
    app.stage.addChild(scene);
};

// Use setTimeout instead of calling main directly to give some time for the event loop to run
setTimeout(main, 0);

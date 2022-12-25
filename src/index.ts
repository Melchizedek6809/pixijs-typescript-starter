import { Application } from 'pixi.js';
import { Game } from './scenes/game';

const initPixiApplication = () => {
    const app = new Application();
    document.body.appendChild(app.view as HTMLCanvasElement);

    // Ensure that the canvas will fill the entire area
    document.body.style.margin = '0';
    if(app.renderer?.view?.style) {
        app.renderer.view.style.width = `100%`;
        app.renderer.view.style.height = `100%`;

        // Workaround for the minimal ICanvasType type
        (app.renderer?.view?.style as any).display = 'block';
    }

    // Change the canvas size on every resize so that things won't be stretched
    app.renderer.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', e => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    return app;
};

const main = () => {
    const app = initPixiApplication();

    // Switch to the Game scene
    const scene = new Game(app);
    app.stage.addChild(scene);
};

// Use setTimeout instead of calling main directly to give some time for the event loop to run
setTimeout(main, 0);

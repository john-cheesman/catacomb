import { run } from 'runjs';
import watch from 'watch';

const vendorScriptsOutput = `dist/js/vendor`;
const scriptsOutput = `dist/js/bundle.js`;
const mapsOutput = `dist/maps`;
const imagesOutput = `dist/images`;

const task = {
    'build:scripts': () => {
        run(`rimraf dist/js && mkdirp dist/js`);
        run(`cpy node_modules/phaser/build/phaser.min.js ${vendorScriptsOutput}`);

        if (process.env.NODE_ENV === `production`) {
            run(`browserify src/ts/index.ts -p [ tsify ] -t uglifyify > ${scriptsOutput}`);
        }
        else {
            run(`browserify src/ts/index.ts -p [ tsify ] --debug > ${scriptsOutput}`);
        }
    },
    'build:maps': () => {
        run(`rimraf ${mapsOutput} && mkdirp ${mapsOutput}`);
        run(`cpy src/maps/*.json ${mapsOutput}`);
    },
    'build:images': () => {
        run(`rimraf ${imagesOutput} && mkdirp ${imagesOutput}`);
        run(`cpy src/images/*.png ${imagesOutput}`);
    },
    'build': () => {
        task[`build:scripts`]();
        task['build:maps']();
        task['build:images']();
    },
    'serve': () => {
        run(`http-server dist -o -p ${process.env.PORT || 8080}`, { async: true });
    },
    'watch:scripts': () => {
        watch.watchTree(`src/ts`, () => {
            task[`build:scripts`]();
        });
    },
    'watch': () => {
        task[`watch:scripts`]();
    },
    'start': () => {
        task[`build`]();
        task[`watch`]();
        task[`serve`]();
    }
};

export default task

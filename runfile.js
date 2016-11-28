import { run } from 'runjs';
import watch from 'watch';

const vendorScriptsOutput = `dist/js/vendor`;
const scriptsOutput = `dist/js/bundle.js`;

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
    'build': () => {
        task[`build:scripts`]();
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

const dimensions = {
    tileSize: 32,
    gameWidth: 320,
    gameHeight: 288
};

const sprites = {
    tileSet: {
        name: 'tiny32',
        key: 'map',
        path: '/images/tiny32.png'
    }
}

const animations = {
    player: {
        walk: {
            up: [180, 179, 181, 179],
            down: [132, 131, 133, 131],
            left: [148, 147, 149, 147],
            right: [164, 163, 165, 163]
        }
    },
    fire: {
        flame: [96, 97, 98, 97]
    },
    chest: {
        open: [36, 37, 38, 39],
        close: [39, 38, 37, 36]
    },
    torch: {
        flame: [205, 206, 207, 206]
    },
    spikes: {
        active: [157, 158, 159, 159, 159, 159, 159, 158, 157, 157, 157, 157]
    },
    switch: {
        throw: [48, 49, 66],
        reset: [66, 65, 48]
    }
}

const frames = {
    player: {
        up: 179,
        down: 131,
        left: 147,
        right: 163
    },
    spikes: {
        disabled: 157
    }
}

const levels = 2;

export { dimensions, sprites, animations, frames, levels }

const dimensions: any = {
    tileSize: 32,
    gameWidth: 320,
    gameHeight: 288
};

const sprites: any = {
    tileSet: {
        name: 'tiny32',
        key: 'map',
        path: '/images/tiny32.png'
    },
    spinner: {
        name: 'pacman',
        key: 'spinner',
        path: '/images/pacman.png'
    }
}

const animations: any = {
    player: {
        // Girl
        // walk: {
        //     up: [180, 179, 181, 179],
        //     down: [132, 131, 133, 131],
        //     left: [148, 147, 149, 147],
        //     right: [164, 163, 165, 163]
        // }
        // Boy
        walk: {
            up: [177, 176, 178, 176],
            down: [129, 128, 130, 129],
            left: [145, 144, 146, 144],
            right: [161, 160, 162, 160]
        }
    },
    ghost: {
        float: {
            up: [246, 247, 246, 248],
            down: [198, 199, 198, 200],
            left: [214, 215, 214, 216],
            right: [230, 231, 230, 232]
        }
    },
    skeleton: {
        walk: {
            up: [182, 183, 182, 184],
            down: [134, 135, 134, 136],
            left: [150, 151, 150, 152],
            right: [166, 167, 166, 168]
        }
    },
    fire: {
        flame: [96, 97, 98, 97]
    },
    chest: {
        open: [36, 37, 38, 39],
        close: [39, 38, 37, 36]
    },
    larva: [87, 88],
    torch: {
        yellow: [205, 206, 207, 206],
        blue: [221, 222, 221, 223],
        red: [237, 238, 237, 239],
        green: [253, 254, 253, 255]
    },
    spikes: {
        active: [157, 158, 159, 159, 159, 159, 159, 158, 157, 157, 157, 157]
    },
    switch: {
        throw: [48, 49, 66],
        reset: [66, 65, 48]
    },
    spinner: {
        spin: [0, 1, 2, 3, 4, 5, 6, 7]
    }
}

const frames: any = {
    // Girl
    // player: {
    //     up: 179,
    //     down: 131,
    //     left: 147,
    //     right: 163,
    //     dead: 186
    // },
    // Boy
    player: {
        up: 176,
        down: 128,
        left: 144,
        right: 160,
        dead: 170
    },
    spikes: {
        disabled: 157
    },
    gold: 153,
    gems: 154
}

const levelData: any = [
    {
        levelID: 1,
        gems: 1,
        gold: 0
    },
    {
        levelID: 2,
        gems: 1,
        gold: 5
    },
    {
        levelID: 3,
        gems: 1,
        gold: 10
    },
    {
        levelID: 4,
        gems: 1,
        gold: 0
    }
];

const playerSpeed: number = 120;

const colours: any = {
    white: 0xdeeed6,
    black: 0x140c1c,
    blue: 0x597dce
};

export { dimensions, sprites, animations, frames, levelData, playerSpeed, colours }

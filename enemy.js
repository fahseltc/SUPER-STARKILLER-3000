class Enemy {
    constructor(type, x, y) {
        this.type = type;
        this.sprite = game.add.sprite(x, y, type);
        this.sprite.anchor.setTo(0.5, 0.5);
    }
}
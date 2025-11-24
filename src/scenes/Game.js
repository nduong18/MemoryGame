// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class Game extends Phaser.Scene {
    constructor() {
        super('Game');

        this.col = 3;
        this.row = 4;
        this.cardTypes = ['cat', 'elephant', 'frog', 'lion', 'pig', 'rabbit'];
        this.cardTypesCount = this.cardTypes.length;
        this.selectedCard = null;
        this.maxScore = this.col * this.row;
        this.currentScore = 0;
    }

    create() {
        // Add background
        this.cameras.main.setBackgroundColor(0x71a45f);
        const logo = this.add.image(400, 100, 'logo').setScale(0.8);
        this.tweens.add({
            targets: logo,
            scaleX: 0.9,
            scaleY: 0.9,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
             
        this.cards = [];
        this.addCards();

        this.winText = this.add.text(400, 600, 'YOU WIN!', {
            fontFamily: 'Arial Black', fontSize: 70, color: '#ffff00',
            stroke: '#000000', strokeThickness: 8
        }).setOrigin(0.5).setVisible(false);
    }

    generateCardList(){
        let cards = [];
        const selectedTypes = this.cardTypes.slice(0, this.cardTypesCount);
        selectedTypes.forEach(type => {
            cards.push(type);
            cards.push(type);
        })
        // Shuffle cards
        Phaser.Utils.Array.Shuffle(cards);
        return cards;
    }

    addCards(){
        let spacingX = 150;
        let spacingY = 300;
        let gap = 250;

        const cardList = this.generateCardList();
        let index = 0;

        for (let i = 0; i < this.col; i++){
            for (let j = 0; j < this.row; j++){
                const cardType = cardList[index];
                const card = this.createCard(spacingX + gap * i, spacingY + gap * j, cardType);
                this.cards.push(card);
                index++;
            }
        }      
    }

    createCard(x, y, cardType){
        const card = this.add.image(x, y, 'back');
        card.type = cardType;
        card.isFlipped = false;
        card.setInteractive();
        card.on('pointerdown', () => this.selectCard(card));
        return card;
    }

    flipCard(card, mode){
        if (mode === 'flip'){
            if (card.isFlipped) return;
            this.tweens.add({
                targets: card,
                scaleX: 0,
                duration: 200,
                onComplete: () => {
                    card.setTexture(card.type);
                    this.tweens.add({
                        targets: card,
                        scaleX: 1,
                        duration: 200
                    })
                }
            });
            card.isFlipped = true;
        }
        else if (mode === 'backflip'){
            if (!card.isFlipped) return;
            this.tweens.add({
                targets: card,
                scaleX: 0,
                duration: 200,
                onComplete: () => {
                    card.setTexture('back');
                    this.tweens.add({
                        targets: card,
                        scaleX: 1,
                        duration: 200
                    })
                }
            });
            card.isFlipped = false;
        }
    }

    selectCard(card){
        if (this.locked) return;

        if (card.isFlipped) return;

        this.flipCard(card, 'flip');

        if (this.selectedCard === null){
            this.selectedCard = card;
            return;
        }

        if (this.selectedCard.type === card.type){
            this.currentScore += 2;

            card.disableInteractive();
            this.selectedCard.disableInteractive();
            this.selectedCard = null;

            if (this.currentScore === this.maxScore){
                this.time.delayedCall(500, () => {
                    this.winText.setVisible(true);
                    this.input.on('pointerdown', () => {
                        console.log("Restart Game");
                        this.scene.start('Game');
                    });
                });
            }
        }
        else {
            this.locked = true;
            this.time.delayedCall(700, () => {
                this.flipCard(card, 'backflip');
                this.flipCard(this.selectedCard, 'backflip');
                this.selectedCard = null;
                this.locked = false;
            });
        }
    }

}

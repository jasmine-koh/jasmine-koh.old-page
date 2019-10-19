
//   _____ _    _          _____            _____ _______ ______ _____   _____
//  / ____| |  | |   /\   |  __ \     /\   / ____|__   __|  ____|  __ \ / ____|
// | |    | |__| |  /  \  | |__) |   /  \ | |       | |  | |__  | |__) | (___
// | |    |  __  | / /\ \ |  _  /   / /\ \| |       | |  |  __| |  _  / \___ \
// | |____| |  | |/ ____ \| | \ \  / ____ \ |____   | |  | |____| | \ \ ____) |
//  \_____|_|  |_/_/    \_\_|  \_\/_/    \_\_____|  |_|  |______|_|  \_\_____/

class Characters {
    constructor(company) {
        this.company = company;
    }
}

class Villagers extends Characters {
    constructor(company, name, character) {
        super(company);
        this.company = company;
        this.name = name;
        this.character = `villager`;
    }
}

class Werewolves extends Characters {
    constructor(company, name, character) {
        super(company);
        this.company = company;
        this.name = name;
        this.character = `werewolf`;
    }
}

class Seers extends Characters {
    constructor(company, name, character) {
        super(company);
        this.company = company;
        this.name = name;
        this.character = `seer`;
    }
}

class Witches extends Characters {
    constructor(company, name, character) {
        super(company);
        this.company = company;
        this.name = name;
        this.character = `witch`;
    }
}


// add generate for the remaining types of characters
class Factory {
    constructor (company) {
        this.company = company;
    }
    generateVillagers (num) {
        for (let i=1; i<=num; i++) {
            const villagers = new Villagers (`Human`, `Villager ${i}`);
            characterArray.push(villagers);
        }
    }
    generateWerewolves (num) {
        for (let i=1; i<=num; i++) {
            const werewolves = new Werewolves (`Werewolves`, `Werewolf ${i}`);
            characterArray.push(werewolves);
        }
    }
    generateSeers (num) {
        for (let i=1; i<=num; i++) {
            const seers = new Seers (`Superhuman`, `Seer ${i}`);
            characterArray.push(seers);
        }
    }
    generateWitches (num) {
        for (let i=1; i<=num; i++) {
            const witches = new Witches (`Superhuman`, `Witch ${i}`);
            characterArray.push(witches);
        }
    }

}


 //   _____          _____  _____   _____
 //  / ____|   /\   |  __ \|  __ \ / ____|
 // | |       /  \  | |__) | |  | | (___
 // | |      / /\ \ |  _  /| |  | |\___ \
 // | |____ / ____ \| | \ \| |__| |____) |
 //  \_____/_/    \_\_|  \_\_____/|_____/


let gameCards = [
{
    character: "villager",
    type: "Human",
    cardImage: "images/card-villager.jpg",
    deadImage: "images/card-villager-killed.jpg"
},
{
    character: "werewolf",
    type: "Werewolves",
    cardImage: "images/card-werewolf.jpg",
    deadImage: "images/card-werewolf-killed.jpg"
},
{
    character: "seer",
    type: "Superhuman",
    cardImage: "images/card-seer.jpg",
    deadImage: "images/card-seer-killed.jpg"
},
{
    character: "witch",
    type: "Superhuman",
    cardImage: "images/card-witch.jpg",
    deadImage: "images/card-witch-killed.jpg"
}
];


 //   _____ ______ _______   _    _ _____
 //  / ____|  ____|__   __| | |  | |  __ \
 // | (___ | |__     | |    | |  | | |__) |
 //  \___ \|  __|    | |    | |  | |  ___/
 //  ____) | |____   | |    | |__| | |
 // |_____/|______|  |_|     \____/|_|


let characterArray = [];
let playerArray = [];
let humanArray = [];
let superHumanArray = [];
let werewolfArray = [];


// Shuffling the Array
const shuffle = function() {
    for (let i = characterArray.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = characterArray[i];
        characterArray[i] = characterArray[j];
        characterArray[j] = temp;
    }
}



// Number of Players
const numOfPlayers = function() {
    playerNumber = ($(`#playerNumber`).val());
}

// Character for Players
const createCharacters = function() {

        werewolvesNum = ($(`#werewolvesNumber`).val());
        villagersNum = ($(`#villagerNumber`).val());
        seersNum = ($(`#seersNumber`).val());
        witchesNum = ($(`#witchesNumber`).val());

        const seersPlayers = new Factory (`Seers`);
        seersPlayers.generateSeers(seersNum);
        const witchesPlayers = new Factory (`Witches`);
        witchesPlayers.generateWitches(witchesNum);
        const villagerPlayers = new Factory (`Villagers`);
        villagerPlayers.generateVillagers(villagersNum);
        const werewolvesPlayers = new Factory (`Werewolves`);
        werewolvesPlayers.generateWerewolves(werewolvesNum);
        // console.log(characterArray);

// Check if number of players = number of characters created
        if ( characterArray.length < playerNumber ) {
            alert(`You only created ${characterArray.length} characters, please check your input.`);
            characterArray = [];
        } else if ( characterArray.length > playerNumber ) {
            alert(`You have created ${characterArray.length} characters, please check your input.`);
            characterArray = [];
        } else if ( characterArray.length == playerNumber) {
            alert(`You have created ${characterArray.length} characters, it is now good to go.`);
        }
        // console.log(characterArray);
        shuffle();
}



// function to find the card image based on the type of character
const arrayPosition = function(array, input) {

    for (let i=0; i< array.length; i++) {
        // console.log(gameCards[i].character);
        if (array[i].character === input) {
            return array[i];
        };
    }
}


// Create Cards
const createCard = function() {

    for (let i=0; i< characterArray.length; i++) {

        // to get the type of character for card image
        let cardProperty = Object.getOwnPropertyDescriptor(characterArray[i], 'character').value;
        // console.log(cardProperty);

        // assigning attributes to the element
        let cardElement = $(`<img>`).attr(`src`,`images/card-back.jpg`).attr(`id`,cardProperty).appendTo($(`#cards`));

        $(cardElement).on(`click`,flipCard);

    }
}


const flipCard = function() {
    // getting the type of character
    let characterId = this.getAttribute(`id`);

    // to display the character card
    this.setAttribute(`src`, arrayPosition(gameCards, characterId).cardImage);

    // push character into player array to store player's character
    playerArray.push(arrayPosition(gameCards, characterId));

    if (characterId === `witch` || characterId === `seer`) {
        superHumanArray.push(arrayPosition(gameCards, characterId));
    } else if (characterId === `werewolf`) {
        werewolfArray.push(arrayPosition(gameCards, characterId));
    } else if (characterId === `villager`) {
        humanArray.push(arrayPosition(gameCards, characterId));
    }

    setTimeout( () => {
        this.remove();
    },2000);

            // console.log(playerArray);
}



// Creating divs for two columns required for game play
const players = function() {

    console.log(playerArray);
    console.log(superHumanArray);
    console.log(werewolfArray);
    console.log(humanArray);

        for (let i=0; i< playerArray.length; i++) {

            // to get the type of character for card image
            let cardProperty = Object.getOwnPropertyDescriptor(playerArray[i], 'character').value;

            // assigning attributes to the element
            $(`<img>`).attr(`src`, arrayPosition(gameCards, cardProperty).cardImage).attr(`id`,cardProperty).addClass(`char`).appendTo($(`#displayPlayerCharacter`));

        }
    }


// Update if killed
const deathImage = (event) => {

    if ($(event.currentTarget).hasClass(`dead`)) {

            let cardId = $(event.currentTarget).attr(`id`);

        // assigning attributes to the element
        $(event.currentTarget).removeClass(`dead`).attr(`src`, arrayPosition(gameCards, cardId).cardImage);

    } else {

            let cardId = $(event.currentTarget).attr(`id`);

        // assigning attributes to the element
        $(event.currentTarget).addClass(`dead`).attr(`src`, arrayPosition(gameCards, cardId).deadImage);
    }

}


const speechTime = function() {

    $(`#nextButton7`).remove();

    let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton8`).appendTo($(`#modDiv`));
    let end = $(`<button>`).text(`End`).addClass(`btn btn-primary`).attr(`id`,`end`).appendTo($(`#modDiv`));

    // console.log(`day time`);

    // $(`.char`).on(`click`, deathImage);
    $(`#moderator`).html(`Mod, announce players that were killed. Starting from first living player, players give their speech. <br/> After introduction, vote to kill a player. <br/> Please click on the player that is killed. <br/> Moderator, please check and announce if game has ended.`);
    $(`#nextButton8`).on(`click`, nightTime);
    $(`#end`).on(`click`, function() {
        location.reload();
    });

    // console.log(`day to night time`);
}


const wolfTime = function() {

    $(`#nextButton2`).remove();

    // console.log(`wolf time`);

    let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton3`).appendTo($(`#modDiv`));

    // $(`.char`).on(`click`, deathImage);
    $(`#moderator`).html(`Werewolves, please open your eyes. Pick someone to kill. <br/> Mod, please click on the player that is killed. <br/> Werewolves, please close your eyes.`);
    $(`#nextButton3`).on(`click`, witchPotionTime);

    // console.log(`wolf to potion time`);
}


const witchPotionTime = function() {

    $(`#nextButton3`).remove();

    let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton4`).appendTo($(`#modDiv`));

    // console.log(`potion time`);
    // $(`.char`).on(`click`, deathImage);
    $(`#moderator`).html(`Witch, please open your eyes. <br/> This player has been killed. Would you like to save the player? <br/> If the witch decides to save the player, please click on the player.`);

    $(`#nextButton4`).on(`click`, witchPoisonTime);

    // console.log(`potion to poison time`);


}


const witchPoisonTime = function() {

    $(`#nextButton4`).remove();

    let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton5`).appendTo($(`#modDiv`));

    // console.log(`poison time`);

    // $(`.char`).on(`click`, deathImage);
    $(`#moderator`).html(`Would you like to use your poison? </br> If the witch decides to use the poison, please click on the player. </br> Witch, please close your eyes.`);
    $(`#nextButton5`).on(`click`, seerTime);

    // console.log(`poison to seer time`);

}


const seerTime = function() {

    $(`#nextButton5`).remove();

    let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton6`).appendTo($(`#modDiv`));

    // console.log(`seer time`);
    $(`#moderator`).html(`Seer, please open your eyes. Pick someone to ask about. <br/> If person is a werewolf, show thumbs down. Otherwise, show thumbs up. <br/> Seer, please close your eyes.`);
    $(`#nextButton6`).on(`click`, dayTime);

    // console.log(`seer to day time`);
}


const dayTime = function() {

    $(`#nextButton6`).remove();

    day ++;

    let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton7`).appendTo($(`#modDiv`));

    $(`#moderator`).html(`Open your eyes, it is now day time.`);
    $(`#nextButton7`).on(`click`, speechTime);
}


// night time script for Moderator
const nightTime = function() {

    $(`button`).remove();

    night ++;

   let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton2`).appendTo($(`#modDiv`));

    // console.log(`night time`)
    $(`#moderator`).html(`Close your eyes, it is now night time.`);
    $(`#nextButton2`).on(`click`, wolfTime);

    // console.log(`night to wolf time`);

}


const removeButton = function() {

    $(`#nextButton0`).remove();
    $(`.char`).on(`click`, deathImage);
    nightTime();
}

const gameStart = function() {

    let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton0`).appendTo($(`#modDiv`));

    $(`#nextButton0`).on(`click`, removeButton);

}




 //   _____          __  __ ______ _____  _           __     __
 //  / ____|   /\   |  \/  |  ____|  __ \| |        /\\ \   / /
 // | |  __   /  \  | \  / | |__  | |__) | |       /  \\ \_/ /
 // | | |_ | / /\ \ | |\/| |  __| |  ___/| |      / /\ \\   /
 // | |__| |/ ____ \| |  | | |____| |    | |____ / ____ \| |
 //  \_____/_/    \_\_|  |_|______|_|    |______/_/    \_\_|

let playerNumber = 0;
let werewolvesNum = 0;
let villagersNum = 0;
let seersNum = 0;
let witchesNum = 0;
let night = 0;
let day = 0;
let arrayCount = 0;

// let timeArray = [
//     function() {nightTime()},
//     function() {wolfTime()},
//     function() {witchPotionTime()},
//     function() {witchPoisonTime()},
//     function() {seerTime()},
//     function() {dayTime()}
// ]



$(() => {

// Determine number of players
    $(`#playerNos`).on(`click`, numOfPlayers);

// Creating Character for Players
    $(`#characterAllocation`).on(`click`, createCharacters);

// Setting Up The Game
    $(`#start`).on(`click`, createCard);

// Create layout for Game
    $(`#continue`).on(`click`, players);

// Start Game
    $(`#continue`).on(`click`, gameStart);

})
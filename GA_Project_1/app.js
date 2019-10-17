
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
}


// Shuffling the Array
const shuffle = function() {
    for (let i = characterArray.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = characterArray[i];
        characterArray[i] = characterArray[j];
        characterArray[j] = temp;
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

    // function to find the card image based on the type of character
    const arrayPosition = function() {
        for (let i=0; i< gameCards.length; i++) {
            // console.log(gameCards[i].character);
            if (gameCards[i].character === characterId) {
                return gameCards[i];
            };
        }
    }

    // to display the character card
    this.setAttribute(`src`, arrayPosition().cardImage);

    // push character into player array to store player's character
    playerArray.push(arrayPosition());

    setTimeout( () => {
        this.remove();
    },2000);

            // console.log(playerArray);
}



// Creating divs for two columns required for game play
const players = function() {

        for (let i=0; i< playerArray.length; i++) {

            // to get the type of character for card image
            let cardProperty = Object.getOwnPropertyDescriptor(playerArray[i], 'character').value;

                const arrayPosition = function() {
                    for (let i=0; i< gameCards.length; i++) {

                        // console.log(gameCards[i].character);
                        if (gameCards[i].character === cardProperty) {
                            return gameCards[i];
                        };

                    }
                }


            // assigning attributes to the element
            $(`<img>`).attr(`src`, arrayPosition().cardImage).attr(`id`,cardProperty).addClass(`char`).appendTo($(`#displayPlayerCharacter`));

        }
    }


// Update if killed
const deathImage = (event) => {

    if ($(event.currentTarget).hasClass(`dead`)) {

            let cardId = $(event.currentTarget).attr(`id`);

            const arrayPosition = function() {
                for (let i=0; i< gameCards.length; i++) {

                    // console.log(gameCards[i].character);
                    if (gameCards[i].character === cardId) {
                        return gameCards[i];
                    };
                }
            }
        // assigning attributes to the element
        $(event.currentTarget).removeClass(`dead`).attr(`src`, arrayPosition().cardImage);

    } else {

            let cardId = $(event.currentTarget).attr(`id`);

            const arrayPosition = function() {
                for (let i=0; i< gameCards.length; i++) {

                    // console.log(gameCards[i].character);
                    if (gameCards[i].character === cardId) {
                        return gameCards[i];
                    };
                }
            }
        // assigning attributes to the element
        $(event.currentTarget).addClass(`dead`).attr(`src`, arrayPosition().deadImage);
    }

}






const dayTime = function() {

    $(`#moderator`).text(`<Announce the players that were killed. The players should not reveal their character.>`);
    $(`#nextButton`).on(`click`, () => {
        $(`#moderator`).text(`<Starting from the first living player, players start introducing themselves.>`);
        $(`#nextButton`).on(`click`, () => {
            $(`#moderator`).text(`<After introduction, players will need to vote to kill a player who they think is a wolf.>`);
            $(`#nextButton`).on(`click`, () => {
                $(`#moderator`).text(`<Please click on the player that is killed.>`);
                $(`.char`).on(`click`, deathImage);
                $(`#nextButton`).on(`click`, nightTime);
            })
        })
    })
}



const wolfTime = function() {

    $(`#moderator`).text(`Werewolves, please open your eyes.`);
    $(`#nextButton`).on(`click`, () => {
        $(`#moderator`).text(`Werewolves, please pick someone to kill.`);
        $(`#nextButton`).on(`click`, () => {
            $(`#moderator`).text(`<Please click on the player that is killed.>`);
            $(`.char`).on(`click`, deathImage);
            $(`#nextButton`).on(`click`, () => {
                $(`#moderator`).text(`Werewolves, please close your eyes.`);
                $(`#nextButton`).on(`click`, witchTime)
            })
        })
    })

}


const witchTime = function() {

    $(`#moderator`).text(`Witch, please open your eyes.`);
    $(`#nextButton`).on(`click`, () => {
        $(`#moderator`).text(`This player has been killed. Would you like to save the player?`);
        $(`#nextButton`).on(`click`, () => {
            $(`#moderator`).text(`<If the witch decides to save the player, please click on the player.>`);
            $(`.char dead`).on(`click`, deathImage);
            $(`#nextButton`).on(`click`, () => {
                $(`#moderator`).text(`Would you like to use your poison?`);
                $(`#nextButton`).on(`click`, () => {
                    $(`#moderator`).text(`<If the witch decides to use the poison, please click on the player.>`);
                    $(`.char`).on(`click`, deathImage);
                    $(`#nextButton`).on(`click`, () => {
                        $(`#moderator`).text(`Witch, please close your eyes.`);
                        $(`#nextButton`).on(`click`, seerTime);
                    })
                })
            })
        })
    })

}


const seerTime = function() {

    $(`#moderator`).text(`Seer, please open your eyes.`);
    $(`#nextButton`).on(`click`, () => {
        $(`#moderator`).text(`Seer, please pick someone to ask about.`);
        $(`#nextButton`).on(`click`, () => {
            $(`#moderator`).text(`<If the person is a werewolf, show a thumbs down. Otherwise, show a thumbs up.>`);
            $(`#nextButton`).on(`click`, () => {
                $(`#moderator`).text(`Seer, please close your eyes.`);
                $(`#nextButton`).on(`click`, () => {
                    $(`#moderator`).text(`Open your eyes, it is now day time.`);
                    $(`#nextButton`).on(`click`, dayTime);
                })
            })
        })
    })

}



// night time script for Moderator
const nightTime = function() {

        $(`#moderator`).text(`Close your eyes, it is now night time.`);
        $(`#nextButton`).on(`click`, wolfTime)

}


const nextButton = function() {

        let next = $(`<button>`).text(`Next`).addClass(`btn btn-primary`).attr(`id`,`nextButton`).attr(`float`,`right`).appendTo($(`#modDiv`));

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






// how to win and who wins
    // if wolf kills all human or all supernatural character, evil wins
    // if all wolves are killed, good wins



$(() => {

// Determine number of players
    $(`#playerNos`).on(`click`, numOfPlayers);

// Creating Character for Players
    $(`#characterAllocation`).on(`click`, createCharacters);

// Setting Up The Game
    $(`#start`).on(`click`, shuffle);
    $(`#start`).on(`click`, createCard);

// Create layout for Game
    $(`#continue`).on(`click`, players);
    // $(`#continue`).on(`click`, generateProps);
    $(`#continue`).on(`click`, nextButton);
    $(`#continue`).on(`click`, nightTime);


})
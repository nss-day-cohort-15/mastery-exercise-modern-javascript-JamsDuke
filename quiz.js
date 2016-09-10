"use strict";
// Im using mechs instead of robots, just FYI
var Battledome = function (battledome) {
// Player variables
let playerOneName = null;
let playerTwoName = null;
let playerOneMechSelect = null;
let playerTwoMechSelect = null;
let playerOne = null;
let playerTwo = null;
// Make Player One
function generatePlayerOne () {
  console.log("generatePlayerOne is ready to battle!");
  let playerOneName = $("#playerOneName").val();
  let playerOneMechSelect = $("#playerOneSelect option:selected").val();
  playerOne = new Hangar[playerOneMechSelect]();
  playerOne.name = playerOneName;
  console.log("New Player", playerOne);
}
// Make Player Two
function generatePlayerTwo () {
  console.log("generatePlayerTwo is ready to battle!");
  let playerTwoName = $("#playerTwoName").val();
  let playerTwoMechSelect = $("#playerTwoSelect option:selected").val();
  playerTwo = new Hangar[playerTwoMechSelect]();
  playerTwo.name = playerTwoName;
  console.log("New Player", playerTwo);
}
// Get functions needed for battle
function beginBattle () {
  generatePlayerOne();
  generatePlayerTwo();
  displayOutput();
}
// Empty object for the mechs to live, much like Guildhall in Gauntlet
let Hangar = {};
// Base Robot Function
Hangar.Mech = function() {
  this.origin = "Mechwarrior";
};
Hangar.Mech.prototype.setAttack = function (num) {this.attack = num;};
Hangar.Mech.prototype.setHealth = function (num) {this.health = num;};
Hangar.Mech.prototype.dealDamage = function (target) {target.health -= this.attack;};
// Display robots and their variations
// Light Mechs
Hangar.LightMech = function () {
  this.class = "Scout";
};
Hangar.LightMech.prototype = new Hangar.Mech();

Hangar.Locust = function () {
  this.setAttack.call(this, 125);
  this.setHealth.call(this, 550);
  this.weapon = "Short Range Missiles";
};
Hangar.Locust.prototype = new Hangar.LightMech();

Hangar.Raven = function () {
  this.setAttack.call(this, 150);
  this.setHealth.call(this, 500);
  this.weapon = "Flamer";
};
Hangar.Raven.prototype = new Hangar.LightMech();

// Medium Mechs
Hangar.MediumMech = function () {
  this.class = "Brawler";
};
Hangar.MediumMech.prototype = new Hangar.Mech();

Hangar.Centurion = function () {
  this.setAttack.call(this, 200);
  this.setHealth.call(this, 750);
  this.weapon = "Auto Cannon";
};
Hangar.Centurion.prototype = new Hangar.MediumMech();

Hangar.Shadowhawk = function () {
  this.setAttack.call(this, 175);
  this.setHealth.call(this, 700);
  this.weapon = "Pulse Laser";
};
Hangar.Shadowhawk.prototype = new Hangar.MediumMech();

// Heavy Mechs
Hangar.HeavyMech = function () {
  this.class = "Executor";
};
Hangar.HeavyMech.prototype = new Hangar.Mech();

Hangar.Warhammer = function () {
  this.setAttack.call(this, 200);
  this.setHealth.call(this, 1000);
  this.weapon = "Particle Cannon";
};
Hangar.Warhammer.prototype = new Hangar.HeavyMech();

Hangar.Marauder = function () {
  this.setAttack.call(this, 175);
  this.setHealth.call(this, 900);
  this.weapon = "Gauss Rifle";
};
Hangar.Marauder.prototype = new Hangar.HeavyMech();

// Attack button
let attackButton = `<button id="attackButton">ATTACK!</button>`;
// Display robot information to the DOM
function displayOutput () {
  $("#mechOneOutput").html(`
      <section class="statCard">
        <article class="mechStats">
          <p>Name: ${playerOne.name}</p>
          <p>Attack: ${playerOne.attack}</p>
          <p>Health: ${playerOne.health}</p>
          <p>Weapon: ${playerOne.weapon}</p>
          <p>Class: ${playerOne.class}</p>
        </article>
      </section>
    `);
    $("#btnAttack").html(attackButton);
    $("#mechTwoOutput").html(`
      <section class="statCard">
        <article class="mechStats">
          <p>Name: ${playerTwo.name}</p>
          <p>Attack: ${playerTwo.attack}</p>
          <p>Health: ${playerTwo.health}</p>
          <p>Weapon: ${playerTwo.weapon}</p>
          <p>Class: ${playerTwo.class}</p>
        </article>
      </section>
    `);
    $("#attackButton").on("click", mechAttack);
}
// Deal damage to each other
function resolveDamage () {
  if (playerOne.health <= 0 || playerTwo.health <= 0) {
    if (playerOne.health > playerTwo.health) {
      alert(`${playerOne.name} has defeated ${playerTwo.name}!`);
    } else {
      alert(`${playerOne.name} was defeated by ${playerTwo.name}`);
    }
  }
}
// Function to run the battle
function mechAttack () {
  playerOne.dealDamage(playerTwo);
  playerTwo.dealDamage(playerOne);
  displayOutput();
  resolveDamage();
}
// This button starts the battle
$("#readyBtn").on("click", beginBattle);

}(Battledome || {});
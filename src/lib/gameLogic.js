//Note for Carla - Could not figure out how to integrate a time limit on answering questions, but everything else should be done

import chalk from 'chalk';
import { select } from "@inquirer/prompts";

export async function showMainMenu(gameState) {
  const action = await select({
    message: "Main Menu",
    choices: [
      { name: "Start Game", value: "start" },
      { name: "See High Score", value: "score" },
      { name: "Reset High Score", value: "reset" },
      { name: "Quit", value: "quit" },
    ],
  });

  switch (action) {
    case "start":
      await startQuiz(gameState);
      break;
    case "score":
      highScore(gameState);
      await select({ message: "Press Enter to go back", choices: [{ name: "Back", value: "back" }] });
      showMainMenu(gameState);
      break;
    case "reset":
      resetScore(gameState);
      console.log(chalk.blue("High Score has been reset."));
      showMainMenu(gameState);
      break;
    case "quit":
      console.log("Goodbye!");
      process.exit(0);
  }
}

export async function startQuiz(gameState) {
    let question = Math.floor(Math.random() * 5);
    let score = 0;
    for (let i = 0; i < 5; i++){
        const answer = await userAnswer(question);
        const solution = checkSolution(question, answer);
        if (solution){
            console.log(chalk.blue(`Correct answer! Congratulations!`));
            score ++;
        } else {
            console.log(chalk.blue(`Incorrect.`));
        }
        question ++;
        if (question > 4){
            question = 0;
        }
        if (i < 2){
            console.log(chalk.blue(`Onto the next question.`));
        } else if (i == 3){
            console.log(chalk.blue(`Onto the final question.`));
        }
    }
    console.log(chalk.blue(`Quiz complete! Your score was...`));
    overallScoreCalculations(score, gameState);
    showMainMenu(gameState);
}

function highScore(gameState) {
  console.log(chalk.blue(`Highest Score: ${gameState.highScore}`));
}

function resetScore(gameState) {
  gameState.stats = 0;
}

async function userAnswer(qnNumber){
    let choice;
    switch (qnNumber) {
        case 0:
            choice = await select({
            message: "What is the capital of Australia?",
            choices: [{name: "A: Sydney", value: "A"}, {name: "B: Vienna", value: "B"}, {name: "C: Canberra", value: "C"}, {name: "D: Kangaroo Island", value: "D"}],
            });
            break;
        case 1:
            choice = await select({
            message: "In what year did Columbus reach America?",
            choices: [{name: "A: 1492", value: "A"}, {name: "B: 1294", value: "B"}, {name: "C: 1496", value: "C"}, {name: "D: 1500", value: "D"}],
            });
            break;
        case 2:
            choice = await select({
            message: "Who wrote The Great Gatsby?",
            choices: [{name: "A: Charles Dickens", value: "A"}, {name: "B: F. Scott Fitzgerald", value: "B"}, {name: "C: Jay Gatsby", value: "C"}, {name: "D: Stephen King", value: "D"}],
            });
            break;
        case 3:
            choice = await select({
            message: "What is two to the power of 13?",
            choices: [{name: "A: 26", value: "A"}, {name: "B: 8192", value: "B"}, {name: "C: 16384", value: "C"}, {name: "D: 132", value: "D"}],
            });
            break;
        case 4:
            choice = await select({
            message: "What is the chemical symbol for gold?",
            choices: [{name: "A: Go", value: "A"}, {name: "B: H20", value: "B"}, {name: "C: G0", value: "C"}, {name: "D: Au", value: "D"}],
            });
            break;
    }
    return choice;
}

function checkSolution(question, answer){
    if (question == 0 && answer == 'C'){
        return true;
    } else if (question == 1 && answer == 'A'){
        return true;
    } else if (question == 2 && answer == 'B'){
        return true;
    } else if (question == 3 && answer == 'B'){
        return true;
    } else if (question == 4 && answer == 'D'){
        return true;
    } else {
        return false;
    }
}

function overallScoreCalculations(score, gameState){
    if (score > gameState.highScore){
        console.log("New high score!")
        gameState.highScore = score;
    }
    switch (score){
        case 0:
            console.log("0...oof. Maybe you're not cut out for this.");
            break;
        case 1:
            console.log("1!\n...Well, at least you got one of them. Maybe study up on some other subjects.");
            break;
        case 2:
            console.log("2!\nGood try! You've got some more learning to do, but that's okay!");
            break;
        case 3:
            console.log("3!\nNot bad! You've got some potential! Just brush up on your weak subjects, and you'll do great!");
            break;
        case 4:
            console.log("4!\nAlmost perfect! Just got unlucky on the one question. I know you can do it next time!");
            break;
        case 5:
            console.log("5!!!\nWow! A perfect score! You're a true trivia master!");
            break;
    }
}
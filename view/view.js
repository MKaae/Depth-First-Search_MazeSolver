"use-strict"

window.addEventListener("DOMContentLoaded", renderView);

import { getMaze } from "../model/model.js"

async function renderView(){
    const model = await getMaze();
    updateView(model);
}
function updateView(model){
    document.documentElement.style.setProperty('--ROW', model.rows);
    const board = document.getElementById('board');
    for(let i = 0; i < model.maze.length; i++){
        const row = model.maze[i];
        for(let j = 0; j < model.maze[i].length; j++){
            const cellState = row[j];
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if(cellState.row == model.start.row && cellState.col === model.start.col){
                cell.classList.add('start');
            }
            if(cellState.row == model.goal.row && cellState.col ===  model.goal.col){
                cell.classList.add('goal');
            }
            if(cellState.north){
                cell.classList.add('wall-north')
            }
            if(cellState.south){
                cell.classList.add('wall-south')
            }
            if(cellState.west){
                cell.classList.add('wall-west')
            }
            if(cellState.east){
                cell.classList.add('wall-east')
            }
            board.appendChild(cell);
        }
    }
}
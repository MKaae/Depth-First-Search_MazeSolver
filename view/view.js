"use-strict"

renderView();

import { startSolve } from "../controller/controller.js";
import { getMaze } from "../model/model.js"

async function renderView(){
    const model = await getMaze();
    updateView(model);
    document.getElementById('start-solve').addEventListener('click', () => startSolve());
}
export function updateView(model){;
    document.documentElement.style.setProperty('--ROW', model.rows);
    const board = document.getElementById('board');
    board.innerHTML = "";
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
export function visualizePath(nodes, cols){
    let remainingNodes = nodes;
    remainingNodes.reverse();
    const cells = document.getElementById("board").getElementsByClassName("cell");

    function processNextNode() {
        if (remainingNodes.length !== 0) {
            const currentNode = remainingNodes.pop();
            const row = currentNode.row;
            const col = currentNode.col;
            const index = row * cols + col;
            const cell = cells[index];
            cell.classList.add('visited');

            setTimeout(processNextNode, 300);
        }
    }
    processNextNode();
}
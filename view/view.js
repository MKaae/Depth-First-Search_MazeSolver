"use-strict"

buttonListeners();

import { startSolve } from "../controller/controller.js";
import { getMaze, createMaze } from "../model/model.js"

function buttonListeners(){
    document.getElementById('upload-own').addEventListener('click', () => renderMaze())
    document.getElementById('test-btn').addEventListener('click', () => renderView())
}
function renderMaze(){
    document.getElementById('test-btn').classList.add('hidden');
    document.getElementById('upload-own').classList.add('hidden');
    document.getElementById('input-field').classList.remove('hidden');
    const sendJsonBtn = document.getElementById('send-json');
    sendJsonBtn.classList.remove('hidden');
    sendJsonBtn.addEventListener('click', () => uploadMaze());
}
function uploadMaze(){
    document.getElementById('send-json').classList.add('hidden');
    document.getElementById('start-solve').classList.remove('hidden');
    const JsonText = document.getElementById('input-field').value;
    document.getElementById('input-field').classList.add('hidden');
    document.getElementById('path-show').classList.remove('hidden');
    document.getElementById('path-opt').classList.remove('hidden');
    document.getElementById('board').classList.add('border-board');
    const model = createMaze(JSON.parse(JsonText));
    updateView(model);
    document.getElementById('start-solve').addEventListener('click', ()=> startSolve());
}

async function renderView(){
    const start = document.getElementById('start-solve');
    start.classList.remove('hidden');
    document.getElementById('path-show').classList.remove('hidden');
    document.getElementById('path-opt').classList.remove('hidden');
    document.getElementById('upload-own').classList.add('hidden');
    document.getElementById('test-btn').classList.add('hidden');
    document.getElementById('board').classList.add('border-board');
    const model = await getMaze();
    updateView(model);
    start.addEventListener('click', () => startSolve());
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
export function visualizePath(nodes, cols, optimal){
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
        } else {
            showOptimalPath(cols, optimal);
        }
    }
    processNextNode();
}
function showOptimalPath(cols, optimal){
    let optimalPath = optimal;
    optimalPath.reverse();
    const cells = document.getElementById("board").getElementsByClassName("cell");

    function processNextNodeOptimal() {
        if (optimalPath.length !== 0) {
            const currentNode = optimalPath.pop();
            const row = currentNode.row;
            const col = currentNode.col;
            const index = row * cols + col;
            const cell = cells[index];
            cell.classList.add('optimal');

            setTimeout(processNextNodeOptimal, 300);
        }
    }
    processNextNodeOptimal();
}
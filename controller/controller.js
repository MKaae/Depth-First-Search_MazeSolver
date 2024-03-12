"use-strict";

import { getModel } from "../model/model.js";
import { visualizePath } from "../view/view.js"

export function startSolve(){
    const board = getModel();
    const startNode = board.start;
    const goalNode = board.goal;
    let unvisitedNodes = [];
    let visitedNodesInOrder = [];

    unvisitedNodes.push(startNode);

    while(unvisitedNodes.length !== 0){
        let closestNode = unvisitedNodes.pop();
        
        if(closestNode.isVisited) continue;

        visitedNodesInOrder.push(closestNode);
        closestNode.isVisited = true;

        if(closestNode.row === goalNode.row && closestNode.col === goalNode.col) {
            return visualizePath(visitedNodesInOrder, board.cols);
        }

        let unvisitedNeighbours = getUnvisitedNeighbours(closestNode, board);
        for(let unvisitedNeighbour of unvisitedNeighbours){
            unvisitedNeighbour.previousNode = closestNode;
            unvisitedNodes.push(unvisitedNeighbour);
        }
    }
    return visualizePath(visitedNodesInOrder, board.cols);
}

function getUnvisitedNeighbours(node, board){
    let neighbours = [];
    let { row, col } = node;

    if(row !== 0 && !board.maze[row][col].north) neighbours.push(board.maze[row - 1][col]);
    if(col !== board.cols - 1 && !board.maze[row][col].east) neighbours.push(board.maze[row][col + 1]);
    if(row !== board.rows - 1 && !board.maze[row][col].south) neighbours.push(board.maze[row + 1][col]);
    if(col !== 0 && !board.maze[row][col].west) neighbours.push(board.maze[row][col - 1]);

    return neighbours.filter((neighbour) => !neighbour.isVisited && !neighbour.isWall);
}

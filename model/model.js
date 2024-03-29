"use-strict"

let model;

export async function getMaze(){
    try {
        let response = await fetch("maze.json");
        let data = await response.json();
        model = data;
    } catch (error) {
        console.error('Error:', error);
    }
    return model;
}
export function createMaze(json){
    model = json;
    return model;
}
export function getModel(){
    return model;
}
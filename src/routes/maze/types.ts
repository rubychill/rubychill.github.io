import { Vector } from "./util";

export interface MazeWall {
    p1: Vector;
    p2: Vector;
}

export interface MazeMap {
    walls: MazeWall[];
}
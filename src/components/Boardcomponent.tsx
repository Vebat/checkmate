import React, { FC, useEffect, useState } from 'react';
import { Player } from '../models/Player';
import {Board} from './../models/Board'
import {Cell} from './../models/Cell'
import CellComponent from './Cellcomponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board)=>void;
    currentPlayer: Player | null;
    swapPlayers: ()=>void;

}

const BoardComponent: FC<BoardProps> = ({board: Board, setBoard, currentPlayer:Player, swapPlayers}) => {

    const [selectedCell, setSelectedCell] =useState<Cell | null>(null);

    function click(cell: Cell){
        if(selectedCell && selectedCell!==cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            swapPlayers();
        } else{
            if(cell.figure?.color===Player?.color){
                setSelectedCell(cell)
            }
        }
       
    }
    
    useEffect(()=>{
        highlightCells()
    }, [selectedCell])

    

    function highlightCells(){
        Board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard=Board.getCopyBoard()
        setBoard(newBoard)
    }

    return(
        <div>
            <h3>Текущий игрок: {Player?.color}</h3>
            <div className='board'>
           {Board.cells.map((row: Cell[], index: number)=>{
            return(
            <React.Fragment key={index}>
                {row.map(cell=>{
                    return(
                        <CellComponent
                        click={click}
                        cell={cell}
                        key={cell.id}
                        selected={cell.x === selectedCell?.x && cell.y ===selectedCell?.y}
                        />
                    )
                   
                })}
            </React.Fragment>
            )
           })}
        </div>
        </div>

    );
};

export default BoardComponent;
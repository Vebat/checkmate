import React, {FC} from 'react';
import {Cell} from './../models/Cell'

interface CellProps {
    cell: Cell;
    selected: boolean
    click: (cell: Cell)=>void;
}

const CellComponent: FC<CellProps> = ({cell: Cell, selected: selected, click}) => {
    return(
        <div className={['cell', Cell.color, selected ? 'selected' : ''].join(' ')}
        onClick={() => click(Cell)}
        style={{background: Cell.available && Cell.figure ? 'green' : ''}}
        >
            {Cell.available && !Cell.figure && <div className={'available'}></div>}
            {Cell.figure?.logo && <img src={Cell.figure.logo} alt=''/>}
        </div>
    );
};

export default CellComponent;
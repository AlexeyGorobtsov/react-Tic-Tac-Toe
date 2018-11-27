import React, {Component} from 'react';
import Square from './Square';
import calculateWinner from './calculateWinner';

class Board extends Component {
    getClass() {

    }
    renderSquare(i) {
        const sq = this.props.winner;
        let classWinner;
        if(sq) {
            classWinner = (
                sq.win[0] === i ||
                sq.win[1] === i ||
                sq.win[2] === i)
                ? 'green'
                : '';
            
        } else {
            classWinner = '';
        }
        console.log(classWinner);
        return<Square
            wC={classWinner}
            key={i}
            val = {i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }


    render() {
        let count = 0;
        const index = [1, 2, 3];
        return (
            <div>
                {index.map((v, i) => {
                    return (
                        <div key={i} className="board-row">
                            {index.map((v2, i2) => {
                                return this.renderSquare(count++);
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Board;
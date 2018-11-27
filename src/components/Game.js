import React, {Component} from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
let arr = [];

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            row: [],
            isMovesSortReversed: false,
            active: false
        };
        // console.log(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        if ([0, 1, 2].includes(i)) {
            arr.push(` (1, ${i + 1})`);
            this.setState({
                row: arr
            });
        } else if ([3, 4, 5].includes(i)) {
            arr.push(` (2, ${i - 2})`);
        } else {
            arr.push(` (3, ${i - 5})`);
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        arr = this.state.row.slice();
        arr.length = step;
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            color: 'blue'
        });
    }

    changeMoveSort(isMovesSortReversed) {
        //console.log(this)
        this.setState({
            isMovesSortReversed: !isMovesSortReversed,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const getArray = (arr, move) => {
            if(arr[move - 1] !== undefined) {
                return arr[move - 1];
            } else {
                return '';
            }
        };
        const moves = history.map((step, move) => {

            const desc = move
                ? 'Go to move #' + move
                : 'Go to game start';
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                        <span>{getArray(arr, move)}</span>
                    </button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner.sq;

        } else {
            if (this.state.stepNumber === 9) {
                status = 'Draw';
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
            }
        }
        const {isMovesSortReversed} = this.state;
        return(
            <div className={'game'}>
                <div className={'game-board'}>
                    <Board
                        winner={winner}
                        squares = {current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className={'game-info'}>
                    <button
                        onClick={() => this.changeMoveSort(isMovesSortReversed)}
                    >
                        order
                    </button>
                    <div>{status}</div>
                    <ol
                    >{isMovesSortReversed ? moves.reverse() : moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
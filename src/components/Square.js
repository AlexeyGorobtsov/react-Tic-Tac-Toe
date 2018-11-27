import React, {Component} from 'react';
import obj from './obj';

// class Square extends Component {
//     constructor(props) {
//         super(props);
//         console.log(this);
//     }
//     render() {
//         return (
//             <button
//                 className={'square'}
//                 // onClick={() => this.setState({value: obj.val})}
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
     //console.log(props)
    return (
        <button
            id={props.val}
            className={props.wC + ' square'}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;
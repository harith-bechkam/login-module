import { Component } from "react";
import { connect } from 'react-redux';
import { increment, decrement, signin, notsignin } from './actions'

class Home extends Component {

    fun1 = () => {
        this.props.dispatch(increment())
        this.props.dispatch(signin())
    }

    fun2 = () => {
        this.props.dispatch(decrement())
        this.props.dispatch(notsignin())
    }
    render() {
        return (
            <>
                <h2>{this.props.value}</h2>
                <h2>{this.props.count}</h2>

                <button onClick={() => this.fun1()}>step1</button>
                <button onClick={() => this.fun2()}>step2</button>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.counterReducer,
        value: state.loggedReducer
    }
}

export default connect(
    mapStateToProps
)(Home);



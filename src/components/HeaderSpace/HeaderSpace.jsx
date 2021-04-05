import './HeaderSpace.css'
import {titles} from '../../titles'
import React from 'react';

export class HeaderSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "начнем",
            current: 0
        }
    }

    componentDidMount() {
        setInterval(
            () => this.guess(),
            1500
        );
    }

    componentDidUpdate(prevProps, prevState) {
        // Популярный пример (не забудьте сравнить пропсы):
        // alert("prev" + prevProps)
        // if (this.state.current !== prevState.current) {
        //     alert('not eaual')
        //     // this.state.current = this.props.current
        //     this.setState({
        //         title: titles[this.state.current].title
        //     });
        // }
    }

    componentWillUnmount() {
        this.state.current = 0
    }

    guess() {
        alert(this.props.current)
        if (this.state.current < titles.length - 1)
            this.state.current = this.state.current + 1
        this.setState({
            title: titles[this.state.current].title
        });
    }

    render() {
        return (
            <div className={'header-space-container'}>
                <h1>Заголовок:</h1>
                <p className={'header-space'}>{this.state.title}</p>
            </div>
        );
    }
}

export default HeaderSpace
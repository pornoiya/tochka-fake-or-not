import './App.css';
import './components/HeaderSpace/HeaderSpace.css'
import Button from './components/Button/Button';
import { titles } from "./titles";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: titles[0].title,
            currentNumber: 0
        };
        this.status = 'not_guessed'
        this.showResult = false
    }

    componentDidMount() {
        setInterval(
            () => {
                this.changeHeader()
            },
            100
        );
    }

    changeHeader() {
        this.setState({
            header: titles[this.state.currentNumber].title
        });
    }

    curHeaderIncrement = () => {
        if (this.state.currentNumber < titles.length - 1)
            this.state.currentNumber += 1
        else
            this.showResult = true
    }

    stateSetter = (buttonIsReal) => {
        titles[this.state.currentNumber].guessed = titles[this.state.currentNumber].isReal === buttonIsReal
        titles[this.state.currentNumber].shown = true
        let explanation = ''
        if (titles[this.state.currentNumber].isReal === buttonIsReal)
        {
            this.status = 'guessed'
            explanation = 'Верно. '
        }
        else
        {
            this.status = 'not_guessed'
            explanation = 'А вот и нет. '
        }
        titles[this.state.currentNumber].comment = explanation + titles[this.state.currentNumber].comment
    }

    onclick = () => {
        setTimeout(
            () => {
                this.curHeaderIncrement()
                document.querySelectorAll("button")
                    .forEach(el => el.removeAttribute('disabled'));
            },
            1060
        )
        document.querySelectorAll("button")
            .forEach(el => el.setAttribute('disabled', 'disabled'));
    }

    fakeHandler = () => {
        titles[this.state.currentNumber].shown = true
        this.stateSetter(false)
        this.onclick()
    }

    realHandler = () => {
        titles[this.state.currentNumber].shown = true
        this.stateSetter(true)
        this.onclick()
    }

    render() {
        return (
            <div className={'App'}>
                <div className={'header-space-container'}>
                    <h1>Заголовок:</h1>
                    <p className={'header-space'}>{this.state.header}</p>
                    { titles[this.state.currentNumber].isReal ?
                        <a className={this.status} href={titles[this.state.currentNumber].link}>
                            { titles[this.state.currentNumber].shown
                                ? titles[this.state.currentNumber].comment : null }
                        </a>
                        :
                        <p className={this.status}>
                            { titles[this.state.currentNumber].shown
                                ? titles[this.state.currentNumber].comment : null }
                        </p>
                    }
                </div>
                { ! this.showResult ?
                    <div className={'button-area'}>
                        <Button title={'фейк'}
                                modificator={'app-button fake'}
                                onClick={e => this.fakeHandler(e)}
                        />
                        <Button title={'правда'}
                                modificator={'app-button real'}
                                onClick={e => this.realHandler(e) }
                        />
                    </div>
                    :
                    <div className={'result-page'}>
                        <h1>Ваш результат: </h1>
                        <h2>{titles.filter(title => title.guessed === true).length}/{titles.length}</h2>
                        <p>FLAG: MEMBERSHEEP</p>
                        <div className={'result-image'} />
                    </div>
                }
            </div>
        );
    };
}

export default App;
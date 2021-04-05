import './Button.css'

export default function Button(props) {
    return (
        <button
            className={props.modificator}
            onClick={props.onClick}>
            {props.title}
        </button>
    );
}
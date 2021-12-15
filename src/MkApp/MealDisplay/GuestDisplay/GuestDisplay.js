import './GuestDisplay.css';

function GuestDisplay(props) {
    return(
        <>
            <div className="guest">
                <img alt="Guest Picture"/>
                <span>{props.guest.name}</span>
            </div>
        </>
    )
}

export default GuestDisplay;
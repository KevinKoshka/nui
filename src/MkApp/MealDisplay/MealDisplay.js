import './MealDisplay.css';
import GuestDisplay from './GuestDisplay/GuestDisplay';
import { connect } from 'react-redux';

function MealDisplay(props) {

    function showGuests() {
        if (props.guest_list.length > 0) {
            return props.guest_list.map((guest) =>{
                return (<GuestDisplay guest={guest} key={guest.uid} ></GuestDisplay>);
            });
        } else {
            return (<span className="meal__body--no-guests">No hay invitados aún.</span>)
        }
    }
    return (
        <>
            <div className="meal">
                <div className="meal__header">
                    <img className="meal__header__mealpic" alt="Meal Picture"/>
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                    <img className="meal__header__dessertpic" alt="Dessert Picture"/>
                    <h4>{props.dessert}</h4>
                </div>
                <div className="meal__body">
                    {showGuests()}
                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    const meal = state.meals.value[state.activeMeal.value];
    return {...meal};
}

export default connect(mapStateToProps)(MealDisplay);
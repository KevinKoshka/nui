import './Landing.css';
import { eq } from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMeals } from '../slices/mealsSlice';
import { setActiveMeal } from '../slices/activeMealSlice';
import { mealsGET } from '../services/services';
import MkLogo from '../helpers/MkLogo';
import MealDisplay from './MealDisplay/MealDisplay';

function Landing({ store }) {
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let [listLength, setListLength] = useState(0)
    let mealsSelector = useSelector((state) => state.meals.value);
    let activeMealSelector = useSelector((state) => state.activeMeal.value);
    const storeDispatch = store.dispatch;
    
    useEffect(() => {
        mealsGET().then((mealsData) => {
            storeDispatch(setMeals(mealsData));
            storeDispatch(setActiveMeal(mealsData.length - 1));
            setListLength(mealsData.length - 1);
        });
    }, []);
    
    function dateFormat(date) {
        const newDate = new Date(date).toLocaleDateString('es-AR', dateOptions)
        return newDate.charAt(0).toUpperCase() + newDate.slice(1);
    }

    function nothinHere() {
        if (!mealsSelector.length) {
            return (<span key="bla">Nothing to see here</span>);
        }
    }

    function traverseMeals(mod) {
        return () => {
            let res = activeMealSelector + mod;
            if (res >= 0 && res <= listLength) {
                storeDispatch(setActiveMeal(res));
            }
        }
    }

    function removeFileExt(word) {
        return word.slice(0, word.length - 4);
    }

    function meal() {
        return mealsSelector[activeMealSelector];
    }

    function getDessert() {
        return meal().dessert && (<>
            <dt className="meal-description_list-dessert">Postre</dt>
            <dd className="meal-description_list-dish-d">{meal().dessert}</dd>
        </>);
    }

    function showGuests() {
        if (meal().guest_list.length > 0) {
            return meal().guest_list.map((guest) =>{
                return (
                    <div className="meal-guestlist_container_guest" key={guest.uid}>
                        <img className="guest_pic" srcSet="./lilman.png" alt={guest.name} />
                        <span className="guest_name">{guest.name}</span>
                    </div>
                );
            });
        } else {
            return (<span className="meal__body--no-guests">No hay invitados aún.</span>)
        }
    }
    
    return (
        <>{
            !listLength ? <div>Loading...</div> : 
            <main className="meal-container">
                <nav className="meal-left-button">
                    <button onClick={traverseMeals(-1)} disabled={activeMealSelector <= 0 ? true : false}>
                        <img src="./arrow-left.svg" alt="go left" />
                    </button>
                </nav>

                <header className="meal-head">
                    <div className="meal-head_landing-logo">
                        <MkLogo />
                    </div>
                    <h3 className="meal-head_subtitle">Disfrutá de la comida casera...</h3>
                    <div className="meal-head_divider"></div>
                </header>
                <article className="meal-img">
                    <img src={`./meal-img/${meal().img}`} alt={removeFileExt(meal().img)} />
                </article>
                <section className="meal-description">
                    <time className="meal-description_date" dateTime={meal().date}>{dateFormat(meal().date)}</time>
                    <dl className="meal-description_list">
                        <dt className="meal-description_list-dish">{meal().name}</dt>
                        <dd className="meal-description_list-d">{meal().description}</dd>
                        {getDessert()}
                    </dl>
                </section>
                <section className="meal-guestlist">
                    <div className="meal-guestlist_head">
                        <h3 className="meal-guestlist_head_subtitle">Invitados</h3>
                        <div className="meal-guestlist_head_divider"></div>
                    </div>
                    <div className="meal-guestlist_container">
                        {showGuests()}
                    </div>
                    <div className="meal-guestlist_assistance">
                        <a className="button primary-button">¡Voy!</a>
                    </div>
                </section>
                {/* <div className="list-container">
                    <MealDisplay />
                    {nothinHere()}
                </div> */}
                <nav className="meal-right-button">
                    <button onClick={traverseMeals(1)} disabled={activeMealSelector >= listLength ? true : false}>
                        <img src="./arrow-left.svg" alt="go right" />
                    </button>
                </nav>
            </main>
        }</>
    );
}

export default Landing;
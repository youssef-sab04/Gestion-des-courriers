import Formdepart from './formdepart';
import Formarrive from './formarrive';
const Typeform = ({ onFormSelect }) => {

const handleclick = (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="genre"]:checked');
    if (selected) {
        onFormSelect(selected.value); 
    } else {
        alert("Veuillez sélectionner un type de formulaire");
    }
};

    return (
        <div className="Typef">
            <form>
                <label htmlFor="genre">Type de formulaire :</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="genre" value="depart" id="radioDisabled" />
                    <label className="form-check-label" htmlFor="radioDisabled">
                        Depart
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="genre" value="arrivee" id="radioCheckedDisabled" />
                    <label className="form-check-label" htmlFor="radioCheckedDisabled">
                        Arrivee
                    </label>
                </div>
                <button onClick={handleclick}  className="btntype">Valider</button>


            </form>

        </div>
    )
}

export default Typeform;
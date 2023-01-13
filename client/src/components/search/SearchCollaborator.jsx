import { useState, useEffect } from "react";
import Card from "../card/Card";
import '../../style/card.css'
import '../../style/form.css'

const SearchCollaborator = () => {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [filterParam, setFilterParam] = useState("All");
    const [filter, setFilter] = useState("All");

    const data = Object.values(items);

    const fetchCollaborators = async () => {
        const url = 'http://localhost:9000/api/collaborateurs'
        const localToken = localStorage.getItem('token');

        const options = {
            method:'get',
            headers: {
                'Authorization': localToken
            }
        }
        const response = await fetch(url, options)
        const results = await response.json();

        setItems(results);
        setIsLoaded(true);
    }
        // Tableau d'objets d'informations.
        const informationsOptions = [
            {value: "All", text: "Tous"}, 
            {value: "firstname", text: "Prénom"}, 
            {value: "lastname", text: "Nom"}, 
            {value: "city", text: "Ville"}, 
            {value: "country", text: "Pays"}, 
          ]
    
        // Tableau d'objets de catégories.
        const categoriesOptions = [
            {value: "All", text: "Tous"}, 
            {value:'Marketing', text:'Marketing'},
            {value:'Technique', text:'Technique'},
            {value:'Client', text:'Client'}
        ]
    
        // Fonction qui renvoie la liste des options de genres.
        const optionsInformations = informationsOptions.map((option, i) => {
                    
            return <option key={i} value={option.value}>{option.text}</option>
        })
    
        // Fonction qui renvoie la liste des catégories.
        const optionsCategories = categoriesOptions.map((option, i) => {
            return <option key={i} value={option.value}>{option.text}</option>
        })

    useEffect(() => {
        fetchCollaborators()
    }, []);

    // Fonction de rechercher récupérant la liste des collaborateurs. 
    const search = (items) => {
        return items
          .filter(
            // Le filtre doit être différent de all, et correspondre au service choisi. Ou alors on laisse le filtre par défaut sur All.
            (item) => (filterParam !== "All" && item.service == filterParam) || filterParam == "All"
          )
          .filter(
            // Le fitre doit être différent de All et ce qui est entré en barre de recherche doit correspondre à la ville, ou au pays, au prénom, au nom et le filtre doit être le select correspondant.
            (item) => (filter !== "All" && (
                item.city.toLowerCase().trim() == q.toLowerCase().trim() && filter == 'city' || 
                item.country.toLowerCase().trim() == q.toLowerCase().trim() && filter == 'country' ||
                item.firstname.toLowerCase().trim() == q.toLowerCase().trim() && filter == 'firstname' ||
                item.lastname.toLowerCase().trim() == q.toLowerCase().trim() && filter == 'lastname'
            )) || filter == "All"
          )
          .filter(
            // Le filtre doit s'effectuer sur tous les éléments entrés dans la barre de recherche.
            (item) => `${item.firstname} ${item.lastname} ${item.city} ${item.country} `.toLowerCase().includes( q.toLowerCase())
          )
    }

    if (error) 
    {
        return (
            <p>
                Une erreur s'est produite.
            </p>
        );
    } 
    else if (!isLoaded) 
    {
        return <>Chargement...</>;
    } 
    else 
    {
        return (
            <div className="">
                <div className="">
                    <div>
                        <span className="">Rechercher un collaborateur</span>
                    </div>
                    <br />
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search"
                            id=""
                            className=""
                            placeholder="Rechercher"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            style={{fontSize:'16px'}}
                        />
                    </label>
                    <br />
                    <br />
                    <div>
                        <select
                            onChange={(e) => {
                                setFilter(e.target.value);
                            }}
                            className="select"
                        >
                            {optionsInformations}
                        </select>
                        <select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="select"
                        >
                            {optionsCategories}
                        </select>
                        <span className="focus"></span>
                    </div>
                </div>
                <br />
                <div className="List-card">
                    {search(data).map((item) => (
                        <div className="Card" key={item.id}>
                            <Card collaborator={item}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SearchCollaborator;
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

    const search = (items) => {
        return items
          .filter(
            (item) => (filterParam !== "All" && item.service == filterParam) || filterParam == "All"
          )
          .filter(
            (item) => (filter !== "All" && (
                item.city == q && filter == 'city' || 
                item.country == q && filter == 'country' ||
                item.firstname == q && filter == 'firstname' ||
                item.lastname == q && filter == 'lastname'
            )) || filter == "All"
          )
          .filter(
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
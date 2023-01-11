import { useState, useEffect } from "react";
import Card from "../card/Card";

const SearchCollaborator = () => {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [filterParam, setFilterParam] = useState("All");
    const [filter, setFilter] = useState("All");

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

    useEffect(() => {
        fetchCollaborators()
    }, []);

    const data = Object.values(items);

    const search = (items) => {
        return items
          .filter(
            (item) => (filterParam !== "All" && item.service == filterParam) || filterParam == "All"
          )
          .filter(
            (item) => (filter !== "All" && (
                item.city == q && filter == 'city' || 
                item.country == q && filter == 'country'
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
            <div className="wrapper">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search"
                            id="search-form"
                            className="search-input"
                            placeholder="Rechercher"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <div>
                            <span className="sr-only">Rechercher un collaborateur</span>
                        </div>
                    </label>
                    <div className="select">
                    <select
                            onChange={(e) => {
                                setFilter(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Countries By Region"
                        >
                            <option value="All">Tous</option>
                            <option value="lastname">Nom</option>
                            <option value="city">Ville</option>
                            <option value="country">Pays</option>
                        </select>
                        <select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Countries By Region"
                        >
                            <option value="All">Tous</option>
                            <option value="Technique">Technique</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Client">Client</option>
                        </select>
                        <span className="focus"></span>
                    </div>
                </div>
                <ul className="card-grid">
                    {search(data).map((item) => (
                        <div key={item.id}>
                            <Card collaborator={item}/>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SearchCollaborator;
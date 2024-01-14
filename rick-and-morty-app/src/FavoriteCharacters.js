import { useEffect, useState } from "react";

function FavoriteCharacters() {
    const [list, setList] = useState([]);

    useEffect(() => {
        getFavoriteCharacters();
    }, [])

    function getFavoriteCharacters() {
        const getFavoriteCharacterListString = localStorage.getItem("favoriteCharacters");
        if (getFavoriteCharacterListString) {
            const favoriteCharaterList = JSON.parse(getFavoriteCharacterListString);
            setList(favoriteCharaterList);
            localStorage.setItem("favoriteCharacters",JSON.stringify(favoriteCharaterList))
        } else {
            setList([]);
            localStorage.setItem("favoriteCharacters",JSON.stringify([]))
        }


    }

    function removeCharacter(val) {
        const result = window.confirm("Do you want to remove this character to favorite list?")
        if(result){
            const newList = list.filter(p => p !== val);
            setList(newList);
            localStorage.setItem("favoriteCharacters",JSON.stringify(newList))
        }      
    }

    return (
        <>
            <h1>Favorite Character List</h1>
            <hr />
            <ol>
                {list.map((val, i) => {
                    return <li>
                        <span>{val.name}</span>
                        <button className="btn btn-sm btn-outline-danger ms-1" onClick={() => removeCharacter(val)}>Remove</button>
                    </li>
                })}
            </ol>
        </>
    )
}

export default FavoriteCharacters;
import axios from "axios";
import { useEffect, useState } from "react";

function Detail() {
    const [episode, setEpisode] = useState({});
    const [orjCharacters, setOrjCharacters] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        getUrlParameter();
    }, [])

    function getUrlParameter() {
        const lastIndex = document.URL.lastIndexOf("=") + 1;
        const lenght = document.URL.length;
        // setId(document.URL.substring(lastIndex,lenght));
        getEpisodeInformation(document.URL.substring(lastIndex, lenght));
    }

    async function getEpisodeInformation(id) {
        const result = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
        setEpisode(result.data);

        //Karakterlerin API isteği ile bilgilerini almak için
        const characterPromises = result.data.characters.map(url => axios.get(url));
        const characterResults = await Promise.all(characterPromises);

        const characterList = characterResults.map(response => response.data);
        setOrjCharacters(characterList);

        //Sayfa sayısını tespit için
        const pageNumbers = Math.ceil(characterList.length / 5);
        const numbers = [];
        for (let i = 1; i < pageNumbers; i++) {
            numbers.push(i);
        }

        setPages(numbers);

        const list = [];
        const startNumber = 0;
        const endNumber = 8 > characterList.length ? characterList.length : 8;
        for (let i = startNumber; i < endNumber; i++) {
            const element = characterList[i];
            list.push(element);
        }

        setCharacters(list);
    }

    function getListByPagination(page){
        setPageNumber(page);
        if(page < 1){
            setPageNumber(1);
            page = 1;
        }

        if(page > pages.length) {
            setPageNumber(pages.length)
            page = pages.length;
        };

        const list = [];
        const startNumber = (page - 1) * 8;
        const endNumber = (startNumber + 8) > orjCharacters.length ? orjCharacters.length : (startNumber + 8);
        for (let i = startNumber; i < endNumber; i++) {
            const element = orjCharacters[i];
            list.push(element);
        }

        setCharacters(list);
    }

    function search(event){
        const search = event.target.value;
        const newList = orjCharacters.filter(p=> p.name.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setCharacters(newList);     
      }

      function addFavoriteCharacter(val){
        const getFavoriteCharacterListString = localStorage.getItem("favoriteCharacters");
        if(getFavoriteCharacterListString){
            const favoriteCharaterList = JSON.parse(getFavoriteCharacterListString);
            const findFavoriteCharacter = favoriteCharaterList.find(p=> p.id == val.id);
            if(findFavoriteCharacter){
                alert("This character already choosen")
                return;
            }
            if(favoriteCharaterList.length <= 9){                
                const newFavoriteCharacterList =  {
                    id: val.id,
                    name: val.name
                }
                favoriteCharaterList.push(newFavoriteCharacterList)
                localStorage.setItem("favoriteCharacters", JSON.stringify(favoriteCharaterList));
                alert("Character successfully added to favorite list")
            }else{
                alert("You can add up to 10 favorite characters!");
                return;
            }
        }else{
            const newFavoriteCharacterList = [
                {
                    id: val.id,
                    name: val.name
                }
            ]

            localStorage.setItem("favoriteCharacters", JSON.stringify(newFavoriteCharacterList));
            alert("Character successfully added to favorite list")
        }

      }

    return (
        <>
            <div className="text-center">
                <h1>Episode: {episode.episode} - {episode.name}</h1>
                <p>Date: {episode.air_date}</p>
                <h3>Character List</h3>
            </div>
            <hr />
            <input onKeyUp={(e)=> search(e)} type='search' className='form-control mt-2' placeholder='Search something...'/>
            <div className="row">
                {characters.map((val, i) =>
                    <div key={i} className="col-3 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <img src={val?.image} style={{ width: "100%" }} />
                            </div>
                            <div className="card-body d-flex align-items-center" style={{ flexDirection: "column", gap: "2px" }}>
                                <h6>{val?.name}</h6>
                                <span>{val?.species}</span>
                                <a href={val.url} target="_blank" className="btn btn-success w-100">Detail</a>
                                <button onClick={()=> addFavoriteCharacter(val)} className="btn btn-dark  w-100">
                                    Add Favorite Chracter
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className='d-flex justify-content-center mt-2'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#" onClick={() => getListByPagination(pageNumber - 1)}>Previous</a></li>
                        {pages.map((val, i) => {
                            if (val === pageNumber) {
                                return (<li key={i} className="page-item active"><a className="page-link" href="#" onClick={() => getListByPagination(val)}>{val}</a></li>)
                            } else {
                                return (<li key={i} className="page-item"><a className="page-link" href="#" onClick={() => getListByPagination(val)}>{val}</a></li>)
                            }
                        }
                        )}
                        <li className="page-item"><a className="page-link" href="#" onClick={() => getListByPagination(pageNumber + 1)}>Next</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Detail;
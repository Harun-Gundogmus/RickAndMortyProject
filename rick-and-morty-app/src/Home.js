import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [orjList, setOrjList] = useState([]);
  const [list, setList] = useState([]);
  const [listInformation, setListInformation] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getAllEpisode();
  }, [])

  function getAllEpisode(pageNumber = 1) {
    if (pageNumber < 1) pageNumber = 1;

    if (pageNumber > listInformation.pages) pageNumber = listInformation.pages;

    setPageNumber(pageNumber);

    axios.get(`https://rickandmortyapi.com/api/episode?page=${pageNumber}`).then(res => {
      const data = res.data.results;
      setOrjList(data);
      setList(data);
      setListInformation(res.data.info);
      setListNumberByPageNumber(res.data.info.pages);
    });
  }

  function setListNumberByPageNumber(page) {
    setPages([]);
    const list = [];
    for (let i = 1; i <= page; i++) {
      list.push(i);
    }

    setPages(list);
  }

  function search(event){
    const search = event.target.value;
    const newList = orjList.filter(p=> p.name.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    setList(newList);     
  }

  return (
    <>
    <input onKeyUp={(e)=> search(e)} type='search' className='form-control mt-2' placeholder='Search something...'/>
      <div className='row'>
        {list.map((value, index) =>
          <div className='col-3 mt-2 text-center' key={index}>
            <div className='card'>
              <div className='card-header'>
                <img src="https://m.media-amazon.com/images/I/71WicKDKUgL._AC_UF1000,1000_QL80_.jpg" width={100} />
              </div>
              <div className='card-body d-flex' style={{ flexDirection: "column" }}>
                <b>Name: {value.name}</b>
                <span>Episode: {value.episode}</span>
                <span style={{ fontSize: '12px' }}>Date: {value.air_date}</span>
                <Link to={"/detail?id=" + value.id} className='btn btn-sm btn-success'>Go to detail</Link>
              </div>
            </div>
          </div>)}
      </div>
      <div className='d-flex justify-content-center mt-2'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#" onClick={() => getAllEpisode(pageNumber - 1)}>Previous</a></li>
            {pages.map((val, i) => {
              if (val === pageNumber) {
                return (<li key={i} className="page-item active"><a className="page-link" href="#" onClick={() => getAllEpisode(val)}>{val}</a></li>)
              } else {
                return (<li key={i} className="page-item"><a className="page-link" href="#" onClick={() => getAllEpisode(val)}>{val}</a></li>)
              }
            }
            )}
            <li className="page-item"><a className="page-link" href="#" onClick={() => getAllEpisode(pageNumber + 1)}>Next</a></li>
          </ul>
        </nav>
      </div>
    </>

  );
}

export default Home;


// air_date
// : 
// "October 4, 2015"
// characters
// : 
// ["https://rickandmortyapi.com/api/character/1", "https://rickandmortyapi.com/api/character/2",…]
// created
// : 
// "2017-11-10T12:56:35.875Z"
// episode
// : 
// "S02E10"
// id
// : 
// 21
// name
// : 
// "The Wedding Squanchers"
// url
// : 
// "https://rickandmortyapi.com/api/episode/21"
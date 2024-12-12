import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://mealmate-ffyx.onrender.com/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();

    // console.log("API Response:", response); // Added for debugging
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <div> <Navbar /> </div>
      {/* carousel code  start */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !important' }}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: '10' }}>
            <div className="d-flex justify-content-center gap-3">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&h=700&w=900"
              className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=700&w=900"
              className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="pizza" />
          </div>
          <div className="carousel-item">
            <img src="https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&h=700&w=900"
              className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Barbecue" />
          </div>

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* carousel code  end */}

      <div className='container'>
        {
          foodCat && foodCat.length !== 0 ? // Check for both null and empty array
            foodCat.map((data) => {
              return <div className='row mb-3'>
                <div key={data._id} className='fs-3 m3'>{data.CategoryName}</div>
                <hr />
                {foodItem && foodItem.length !== 0
                  ?
                  foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card 
                            foodItem = {filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      )
                    })
                  : " <div>no such data found</div>"}
              </div>
            })
            : ""
        }
      </div>
      <div> <Footer /> </div>
    </div>
  )
}

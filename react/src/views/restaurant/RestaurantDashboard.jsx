import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

import BarChartBox from "../../components/restaurant/BarChartBox";
import BigChartBox from "../../components/restaurant/BigChartBox";
import PieChartBox from "../../components/restaurant/PieChartBox";
import ChartBox1 from "../../components/restaurant/ChartBox1";
import ChartBox2 from "../../components/restaurant/ChartBox2";
import ChartBox3 from "../../components/restaurant/ChartBox3";
import ChartBox4 from "../../components/restaurant/ChartBox4";



// import {chartBox} from "../../components/restaurant/chartBox";


export default function RestaurantDashboard() {

  const {user, setUser} = useStateContext();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
}, []);

  useEffect(() => {
    if (user && user.id) {
    axiosClient.get(`/getReservationsByUser/${user.id}`)
      .then(({ data }) => {
        setReservations(data);
        // console.log("reservation:", data)
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [user]);





  return (
    <>
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="home">
              <div className="box box1">
                <div className="topBox">
                  <h1>Top Deals</h1>
                  <div className="list">

                  {/* Top deals menu start */}
                    {reservations.map( (reservations) =>(
                      <div className="listItem" key={reservations.id}>
                        <div className="user">
                          <img src="src/assets/slide2.png" alt="" />
                          {/* <img src={user.img} alt="" /> */}
                          <div className="userTexts">
                            <span className="username">{reservations.name}</span>
                            <span className="email">{reservations.email}</span>
                          </div>
                        </div>
                        <span className="amount">$500</span>
                        {/* <span className="amount">${user.amount}</span> */}
                      </div>
                    ))}
                  {/* top deals menu stops */}  

                  </div>
                </div>
              </div>
              <div className="box box2">
                <ChartBox1 />
              </div>
              <div className="box box3">
                <ChartBox2 />
              </div>
              <div className="box box4">
                <PieChartBox />
              </div>
              <div className="box box5">
                <ChartBox3 />
              </div>
              <div className="box box6">
                <ChartBox4 />
              </div>
              <div className="box box7">
                <BigChartBox />
              </div>
              <div className="box box8">
                <BarChartBox />
              </div>
              <div className="box box9">
                <BarChartBox />
              </div>
            </div>
          </div>
        </main>
    </>
  )
}


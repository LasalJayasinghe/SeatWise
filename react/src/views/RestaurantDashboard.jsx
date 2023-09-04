import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

import BarChartBox from "../components/BarChartBox";
import BigChartBox from "../components/BigChartBox";
import PieChartBox from "../components/PieChartBox";
import ChartBox from "../components/chartBox";



// import {chartBox} from "../components/chartBox";


export default function RestaurantDashboard() {

  const {user, setUser} = useStateContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
}, []);

  // useEffect(() => {
  //   if (user && user.id) {
  //   axiosClient.get(`/getTotalUserCount/${user.restaurant_id}`)
  //     .then(({ data }) => {
  //       setCount1(data);
  //       console.log(data)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   }
  // }, [user]);





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
                    {/* {topDealUsers.map(user=>(
                      <div className="listItem" key={user.id}>
                        <div className="user">
                          <img src={user.img} alt="" />
                          <div className="userTexts">
                            <span className="username">{user.username}</span>
                            <span className="email">{user.email}</span>
                          </div>
                        </div>
                        <span className="amount">${user.amount}</span>
                      </div>
                    ))} */}
                    {/* Top deals menu start */}
                    <div className="listItem">
                      <div className="user">
                        <img src="src/assets/slide2.png" alt="" />
                        <div className="userTexts">
                          <span className="username">John Doe</span>
                          <span className="email">johndoe@gmail.com</span>
                        </div>
                      </div>
                      <span className="amount">$500</span>
                    </div>

                    <div className="listItem">
                      <div className="user">
                        <img src="src/assets/slide2.png" alt="" />
                        <div className="userTexts">
                          <span className="username">Frank Mark</span>
                          <span className="email">franckmark@gmail.com</span>
                        </div>
                      </div>
                      <span className="amount">$700</span>
                    </div>

                    <div className="listItem">
                      <div className="user">
                        <img src="src/assets/slide2.png" alt="" />
                        <div className="userTexts">
                          <span className="username">Shanel Dovy</span>
                          <span className="email">shaneldovy@gmail.com</span>
                        </div>
                      </div>
                      <span className="amount">$300</span>
                    </div>

                    <div className="listItem">
                      <div className="user">
                        <img src="src/assets/slide2.png" alt="" />
                        <div className="userTexts">
                          <span className="username">Marina Bay</span>
                          <span className="email">marinabay@gmail.com</span>
                        </div>
                      </div>
                      <span className="amount">$100</span>
                    </div>

                    <div className="listItem">
                      <div className="user">
                        <img src="src/assets/slide2.png" alt="" />
                        <div className="userTexts">
                          <span className="username">Devon Mark</span>
                          <span className="email">devonmark@gmail.com</span>
                        </div>
                      </div>
                      <span className="amount">$500</span>
                    </div>

                    <div className="listItem">
                      <div className="user">
                        <img src="src/assets/slide2.png" alt="" />
                        <div className="userTexts">
                          <span className="username">Devon Mark</span>
                          <span className="email">devonmark@gmail.com</span>
                        </div>
                      </div>
                      <span className="amount">$500</span>
                    </div>
                    {/* top deals menu stops */}
                  </div>
                </div>
              </div>
              <div className="box box2">
                <ChartBox />
              </div>
              <div className="box box3">
                <ChartBox />
              </div>
              <div className="box box4">
                <PieChartBox />
              </div>
              <div className="box box5">
                <ChartBox />
              </div>
              <div className="box box6">
                <ChartBox />
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


import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="menu">
        <div className="item">
          {/* <span className="title">MAIN</span> */}
          <br />
          <br />
          <br />
          <br />
            <Link to="/orders" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Orders</span>
            </Link>
            <Link to="/orderhistory" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Order History</span>
            </Link>
            <Link to="/people" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Upcomming</span>
            </Link>
            <Link to="/requests" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Requests</span>
            </Link>
            <Link to="/settings" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Settings</span>
            </Link>
        </div>
    </div>
  )
}

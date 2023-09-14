import { Link } from "react-router-dom";
import TechnicalAssistance from "../views/TechnicalAssistance";

export default function SettingsBar() {
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
              <span className="listItemTitle">Discounts</span>
            </Link>
            <Link to="/addOffer" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Offers</span>
            </Link>
            <Link to="/orderhistory" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Advertisements</span>
            </Link>
            <Link to="/ViewComplaints" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Complaints</span>
            </Link>
            <Link to="/home" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Ratings</span>
            </Link>
            <Link to="/TechnicalAssistance" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Technical Assistance</span>
            </Link>
        </div>
    </div>
  )
}

import { Link } from "react-router-dom";

export default function SettingsBar() {
  return (
    <div className="menu" >
        <div className="item" >
          {/* <span className="title">MAIN</span> */}
          <br />
          <br />
          <br />
          <br />
         
            <Link to="/ViewOffers" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Offers</span>
            </Link>

            <Link to="/adds" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Advertisements</span>
            </Link>

            <Link to="/ViewComplaints" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Complaints</span>
            </Link>

            <Link to="/Ratings" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Ratings</span>
            </Link>

            <Link to="/TechnicalAssistance" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Technical Assistance</span>
            </Link>

            <Link to="/payments" className="listItem">
              <img src="" alt="" />
              <span className="listItemTitle">Payments</span>
            </Link>
        </div>
    </div>
  )
}

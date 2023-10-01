import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTCards from "../../../components/tablefortwo/recievedCard.jsx";

export default function Recieved(){
	return (
		<div>
		  <div className="users-container">
			<Sidebar />
			<div className="content-container">
				<p className="text-zinc-900 text-3xl font-semibold leading-normal">Requests</p>
				<p className="text-gray-500 text-base font-normal leading-normal">History of accepted invitations</p>
			</div>
		  </div>
		</div>
	  );
}

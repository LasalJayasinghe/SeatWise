import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import TFTCards from "../../components/tablefortwo/recievedCard.jsx";

export default function Recieved(){
	return (
		<div>
		  <div className="users-container">
			<Sidebar />
			<div className="content-container">
					<p class="text-zinc-900 text-3xl font-semibold leading-normal">Requests</p>
					<p class="text-gray-500 text-base font-normal leading-normal">Discover people to share your dining table with</p>

				<div className="grid grid-cols-3 gap-4">
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
				</div>
			</div>
		  </div>
		</div>
	  );
}

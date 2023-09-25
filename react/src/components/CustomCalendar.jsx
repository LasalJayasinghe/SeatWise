// import dayjs from "dayjs";
// import React, { useState } from "react";
// import { generateDate, months } from "../util/calendar";
// import cn from "./util/cn";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";

// export default function Calendar() {
// 	const days = ["S", "M", "T", "W", "T", "F", "S"];
// 	const currentDate = dayjs();
// 	const [today, setToday] = useState(currentDate);
// 	const [selectDate, setSelectDate] = useState(currentDate);
// 	return (
// 		<div className="flex flex-col items-center justify-center h-screen gap-10 mx-auto sm:divide-x sm:w-1/2 sm:flex-row">
// 			<div className="w-96 h-96 ">
// 				<div className="flex items-center justify-between">
// 					<h1 className="font-semibold select-none">
// 						{months[today.month()]}, {today.year()}
// 					</h1>
// 					<div className="flex items-center gap-10 ">
// 						<GrFormPrevious
// 							className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
// 							onClick={() => {
// 								setToday(today.month(today.month() - 1));
// 							}}
// 						/>
// 						<h1
// 							className="transition-all cursor-pointer hover:scale-105"
// 							onClick={() => {
// 								setToday(currentDate);
// 							}}
// 						>
// 							Today
// 						</h1>
// 						<GrFormNext
// 							className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
// 							onClick={() => {
// 								setToday(today.month(today.month() + 1));
// 							}}
// 						/>
// 					</div>
// 				</div>
// 				<div className="grid grid-cols-7 ">
// 					{days.map((day, index) => {
// 						return (
// 							<h1
// 								key={index}
// 								className="grid text-sm text-center text-gray-500 select-none h-14 w-14 place-content-center"
// 							>
// 								{day}
// 							</h1>
// 						);
// 					})}
// 				</div>

// 				<div className="grid grid-cols-7 ">
// 					{generateDate(today.month(), today.year()).map(
// 						({ date, currentMonth, today }, index) => {
// 							return (
// 								<div
// 									key={index}
// 									className="grid p-2 text-sm text-center border-t h-14 place-content-center"
// 								>
// 									<h1
// 										className={cn(
// 											currentMonth ? "" : "text-gray-400",
// 											today
// 												? "bg-red-600 text-white"
// 												: "",
// 											selectDate
// 												.toDate()
// 												.toDateString() ===
// 												date.toDate().toDateString()
// 												? "bg-black text-white"
// 												: "",
// 											"h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
// 										)}
// 										onClick={() => {
// 											setSelectDate(date);
// 										}}
// 									>
// 										{date.date()}
// 									</h1>
// 								</div>
// 							);
// 						}
// 					)}
// 				</div>
// 			</div>
// 			<div className="h-96 w-96 sm:px-5">
// 				<h1 className="font-semibold ">
// 					Schedule for {selectDate.toDate().toDateString()}
// 				</h1>
// 				<p className="text-gray-400">No meetings for today.</p>
// 			</div>
// 		</div>
// 	);
// }

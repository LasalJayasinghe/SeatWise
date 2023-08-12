import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,

} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, GifIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { Link ,useLocation} from "react-router-dom";
 
export function SidebarWithContentSeparator() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const location = useLocation();

  return (
    <Card className="min-h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">

      </div>
      <List>
        
      <Link to="/tablefortwo">
      <ListItem
            className={`${
              location.pathname === "/tablefortwo" ? "text-green-500" : "text-blue-gray-500 hover:text-green-500"
            }`}
          >
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          People
          <ListItemSuffix>
            {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" /> */}
          </ListItemSuffix>
        </ListItem>
      </Link>


      <Link to="/tablefortwo/suggestions">
      <ListItem
            className={`${
              location.pathname === "/tablefortwo/suggestions" ? "text-green-500" : "text-blue-gray-500 hover:text-green-500"
            }`}
          >
          <ListItemPrefix>
            <IdentificationIcon className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          Suggestions
        </ListItem>
      </Link>

        <hr className="my-2 border-blue-gray-50" />

        <Accordion
          open={open === 1}
          className={`${
            location.pathname === "/tablefortwo/sent" || location.pathname === "/tablefortwo/requests" ? "text-green-500" : "text-blue-gray-500 hover:text-green-500"
          }`}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
 <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography
                color={
                  location.pathname.includes("/tablefortwo/")
                    ? "green-500"
                    : "blue-gray"
                }
                className="mr-auto font-normal"
              >
                Requests
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="/tablefortwo/requests">
                <ListItem
                  className={`${
                    location.pathname === "/tablefortwo/requests"
                      ? "text-green-500"
                      : "text-blue-gray-500 hover:text-green-500"
                  }`}
                >
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Received
                </ListItem>
              </Link>
              <Link to="/tablefortwo/sent">
                <ListItem
                  className={`${
                    location.pathname === "/tablefortwo/sent"
                      ? "text-green-500"
                      : "text-blue-gray-500 hover:text-green-500"
                  }`}
                >
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Sent
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
};

export default SidebarWithContentSeparator;
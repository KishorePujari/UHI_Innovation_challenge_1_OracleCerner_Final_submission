import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LocCard from "./LocCard";
import DocCard from "./DoctorCard";
import GMap from "./GMap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const getDoctorList = (locations) => {
  let doctors = locations.map((location) => {
    return location.doctors
      ? location.doctors.map((doctor) => ({
          ...doctor,
          fee: location.fee,
          locationName: location.name,
        }))
      : [];
  });
  doctors = Array.prototype.concat.apply([], doctors);
  return doctors;
};

const compareValues = (key, order = "asc") => {
  return (a, b) => {
    if (
      !Object.prototype.hasOwnProperty.call(a, key) ||
      !Object.prototype.hasOwnProperty.call(b, key)
    ) {
      // property doesn't exist on either object
      return 0;
    }
    let varA = Number(a[key]);
    let varB = Number(b[key]);
    // if (!Number.isNaN(Number(varA)) && !Number.isNaN(Number(varB))) {
    //   varA = Number(varA);
    //   varB = Number(varB);
    // }

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [sortKey, setSortKey] = React.useState("rating");
  let allDoctors = getDoctorList(props.apiResp);
  allDoctors = allDoctors.sort(compareValues("rating", "desc"));
  const [doctors, setDoctors] = React.useState(allDoctors);

  const setSort = (event) => {
    console.log(event.target.value);
    setSortKey(event.target.value);
    const sortingKey = event.target.value;
    let doctorList = doctors;

    if (sortingKey === "rating")
      doctorList = doctorList.sort(compareValues("rating", "desc"));
    else doctorList = doctorList.sort(compareValues("fee"));

    setDoctors(doctorList);
  };

  const displayAllDoctors = (docDisplay) => {
    if (docDisplay.length === 0)
      return (
        <>
          <div className="locationCards">
            <DocCard status="No Doctors" />
          </div>
        </>
      );

    return (
      <>
        <div style={{ float: "right" }}>
          <FormControl variant="outlined" size="small">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortKey} onChange={setSort} label="Sort By">
              <MenuItem value={"price"}>Price</MenuItem>
              <MenuItem value={"rating"}>Rating</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="locationCards">
          {docDisplay.map((doc) => (
            <DocCard docDetails={doc} />
          ))}
        </div>
      </>
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          // variant="scrollable"
          // scrollButtons="auto"
          centered
          allowScrollButtonsMobile
          aria-label="basic tabs example"
        >
          <Tab label="Maps" {...a11yProps(0)} />
          <Tab label="Doctors" {...a11yProps(1)} />
          <Tab label="Hospitals" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GMap
          style={{ borderRadius: "0px", width: "90%", height: "70%" }}
          currentLoc={props.currentLoc}
          locDetails={props.apiResp}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {displayAllDoctors(doctors)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="">
          {props.apiResp.map((loc) => (
            <LocCard
              locDetails={loc}
              setMapDisplay={null}
              setDocDisplay={null}
            />
          ))}
        </div>
      </TabPanel>
    </Box>
  );
}

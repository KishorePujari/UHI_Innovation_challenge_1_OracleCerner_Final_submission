import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Fade from "@mui/material/Fade";

import "./App.css";

const noDoctorsCard = (
  <Fade style={{ transformOrigin: "0 0 0" }} {...{ timeout: 500 }} in>
    <Card
      sx={{
        width: "100%",
        paddingBottom: "0.3em",
        borderRadius: "20px",
        marginBottom: "5%",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          No Doctors Present
        </Typography>
      </CardContent>
    </Card>
  </Fade>
);

function DoctorCard(props) {
  if (props.status === "No Doctors") return noDoctorsCard;

  const { name, image, rating, method, fee, locationName } = props.docDetails;
  return (
    <>
      <Fade style={{ transformOrigin: "0 0 0" }} {...{ timeout: 500 }} in>
        <Card
          sx={{
            display: "flex",
            width: "95%",
            paddingBottom: "0.1em",
            borderRadius: "20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {name}
                </Typography>
                <Typography variant="body1" sx={{ color: "green" }}>
                  Rating: {rating}/5
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {method}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ₹{fee}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {locationName}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Box>
          <CardMedia
            component="img"
            height="140"
            image={"data:image/png;base64," + image}
            alt="green iguana"
            sx={{ width: "40%", height: "100%" }}
          />
        </Card>
      </Fade>
      <br />
    </>
  );
}

export default DoctorCard;

import * as React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { CircularProgress } from "@mui/material";

const LoadingContainer = (props) => (
  <div className="search-icon">
    {" "}
    <CircularProgress color="inherit" size={60} />
  </div>
);

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    console.log(this.props.locDetails);
    return (
      <Map
        style={this.props.style}
        google={this.props.google}
        initialCenter={{
          lat: this.props.currentLoc[0],
          lng: this.props.currentLoc[1],
          //   lat: this.props.locDetails[0].lat,
          //   lng: this.props.locDetails[0].long,
        }}
        zoom={14}
      >
        {this.props.currentLoc.length === 2 ? (
          <Marker
            // onClick={this.onMarkerClick}
            title={"The marker`s title will appear as a tooltip."}
            name={"SOMA"}
            position={{
              lat: this.props.currentLoc[0],
              lng: this.props.currentLoc[1],
            }}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/147/147140.png",
              anchor: new window.google.maps.Point(32, 32),
              scaledSize: new window.google.maps.Size(34, 34),
            }}
          />
        ) : null}
        {this.props.locDetails.map((location) => {
          return (
            <Marker
              onClick={this.onMarkerClick}
              {...location}
              position={{
                lat: Number(location.lat),
                lng: Number(location.long),
              }}
            />
          );
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <span style={{ fontWeight: "900" }}>
              {this.state.selectedPlace.name}
            </span>
          </div>
          <div>
            <span>{this.state.selectedPlace.distance / 1000} km</span>
          </div>
          <div>
            <span>₹{this.state.selectedPlace.fee}</span>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDcQkh38-aEEJTNYfKhGfetE5ygAXAJzTk",
  LoadingContainer: LoadingContainer,
})(MapContainer);

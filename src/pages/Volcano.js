import { useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import classes from "./Homepage.module.css";
import { Map, Marker } from "pigeon-maps";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Volcano({ token }) {
  const params = useParams();
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const color = `rgb(100% 0% 0%)`;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true
      }
    }
  };

  const labels = ["5km", "10km", "30km", "100km"];

  const [charData, setCharData] = useState({
    labels,
    datasets: [
      {
        label: "Population density",
        data: data,
        backgroundColor: "rgba(99, 99, 99, 0.5)"
      }
    ]
  });
  useEffect(() => {
    setCharData({
      labels,
      datasets: [
        {
          label: "Population density",
          data: data,
          backgroundColor: "rgba(99, 99, 99, 0.5)"
        }
      ]
    });

}, [data]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let headers  = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    
    if (token == "") {
      headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      };
    }

    fetch("http://sefdb02.qut.edu.au:3001/volcano/" + params.id, {
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          const response2 = response.clone();
          return response
            .json()
            .then(text => {
              setErrorMessage("Error : " + text.message);
            })
            .then(text =>
              response2.text().then(text => {
                throw new Error(text);
              })
            );
        } else {
          return response.json().then(text => {
            setErrorMessage("");
            setResults(text);
            if (token!="" && text.hasOwnProperty("population_5km"))
              setData([ 
                +text.population_5km,
                +text.population_10km,
                +text.population_30km,
                +text.population_100km
              ]);
              
          });
        }
      })
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      {errorMessage != "" && (
        <div className={classes.error}> {errorMessage} </div>
      )}
      <div className={classes.content}>
        <div className={classes.left}>
          <h1>{results.name}</h1>
          <p>
            <span>Conutry: </span>
            {results.country}
          </p>
          <p>
            <span>Region: </span>
            {results.region}
          </p>
          <p>
            <span>Subregion: </span>
            {results.subregion}
          </p>
          <p>
            <span>Last Eruption:</span>
            {results.last_eruption}
          </p>
          <p>
            <span>Summit:</span>
            {results.summit} m
          </p>
          <p>
            <span>Elevation:</span>
            {results.elevation} ft
          </p>
        </div>
        <div className={classes.right}>
          <Map height={350} defaultCenter={[50.879, 4.6997]} defaultZoom={1}>
            <Marker
              width={40}
              color={color}
              anchor={[+results.latitude, +results.longitude]}
            />
          </Map>
        </div>

        <div></div>
      </div>
      
      {data.length > 0 && (
        <div className={classes.density} key={JSON.stringify(data)+token}>
          <h1>Population Density</h1>
          <p className={classes.chart}>
            <Bar
              key={JSON.stringify(data)+token+"3333"}
              options={options}
              data={charData}
            />
          </p>
         </div>
      ) }
    </>
  );
}
export default Volcano;
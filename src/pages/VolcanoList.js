import { useEffect, useState, useCallback } from "react";
import classes from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
function VolcanoList() {
  const [list, setList] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const [country, setCountry] = useState("Algeria");
  const [populatedWithin, setPopulatedWithin] = useState("100km");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("http://sefdb02.qut.edu.au:3001/countries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            setList(data);
            
            console.log(data);
          });
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const data = { country: country, populatedWithin: populatedWithin };
    fetch(
      "http://sefdb02.qut.edu.au:3001/volcanoes?" + new URLSearchParams(data),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
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
          });
        }
      })
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [country, populatedWithin]);

  const columnDefs = [
    { field: "name", sortable: true, filter: true },
    { field: "region", sortable: true, filter: true },
    { field: "subregion", sortable: true, filter: true }
  ];
  const selectClick = useCallback(e => {
    navigate("/Volcano/" + e.data.id);
  });
  const getRowId = params => params.data.id;

  const [kmsraw] = useState(["100km", "30km", "10km","5km" ]);
  const kms = kmsraw.map(Add => Add);
  const handleKmChange = e => {
    setPopulatedWithin(kmsraw[e.target.value]);
  };
  const handleCountryChange = e => {
    setCountry(e.target.value);
  };

  return (
    <div>
      {errorMessage != "" && (
        <div className={classes.error}> {errorMessage} </div>
      )}

      <div>
        {list.length > 0 && (
          <>
            <select
              className={classes.padding}
              onChange={e => handleCountryChange(e)}
            >
              >
              {list.map(text => (
                <option key={text}>{text}</option>
              ))}
            </select>
            <span className={classes.padding}>Populated within:</span>
            <select
              className={classes.padding}
              onChange={e => handleKmChange(e)}
            >
              {kms.map((address, key) => (
                <option value={key}>{address}</option>
              ))}
            </select>
            <div style={{ height: 500 }}>
              <AgGridReact
                getRowId={getRowId}
                onCellClicked={selectClick}
                className="ag-theme-alpine"
                rowData={results}
                columnDefs={columnDefs}
                rowSelection="single"
                pagination={true}
                paginationAutoPageSize={true}
              ></AgGridReact>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default VolcanoList;

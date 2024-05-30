import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const CareersList = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [toggleSection, setToggleSection] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "5rem" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const columnDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: "left",
      },
      {
        field: "role_id",
        headerName: "Role ID",
        width: 135,
        cellRenderer: ({ value }) => (
          <p
            onClick={() =>
              window.location.replace(`/redirect-to-application/${value}`)
            }
            className="role-id-cell"
          >
            {value}
          </p>
        ),
      },
      { field: "role", headerName: "Role" },
      { field: "department", headerName: "Department" },
      { field: "location", headerName: "Location", width: 150 },
      { field: "experience", headerName: "Experience", width: 180 },
      { field: "Eligibility", headerName: "Eligibility", width: 300 },
      { field: "hiring_manager", headerName: "Hiring Manager", width: 280 },
      {
        field: "hiring_manager_email",
        headerName: "Hiring Manager Email",
        width: 300,
      },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: ["Open", "Close"] },
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      editable: false,
      filter: true,
    }),
    []
  );

  const handleCellEdit = useCallback(async (event) => {
    const {
      data,
      newValue,
      colDef: { field },
    } = event;
    try {
      await axios.put(`${baseUrl}/update-careersStatus`, {
        newValue,
        role_id: data.role_id,
        field,
      });
      toast.success("Data Updated Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Data Not Updated");
    }
  }, []);

  const onGridReady = useCallback(
    (params) => {
      setGridApi(params.api);
      axios
        .get(`${baseUrl}/get-careers_data-table/${email}`)
        .then((response) => setRowData(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    },
    [email]
  );

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("TOKENS");
      navigate("/hiring-managerLogin");
    }
  };

  const changeStatusForSelectedRows = async (e) => {
    const newStatus = e.target.value;  
    if (!gridApi) return;
    if (newStatus !== "Change Status") {
      const selectedNodes = gridApi.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const selectedData = selectedNodes.map(node => node.data);
        const promises = selectedData.map(row => {
          if (row.status !== newStatus) { 
            console.log(newStatus);
            return axios.put(`${baseUrl}/update-careersStatus`, {
              newValue: newStatus,
              role_id: row.role_id,
              field: "status",
            });
          }
          return null; 
        }).filter(promise => promise !== null); 

        if (promises.length > 0) {
          try {
            await Promise.all(promises);
            toast.success("Selected rows updated successfully");
            setToggleSection(false)
          } catch (err) {
            console.error("Error updating selected rows: ", err);
            toast.error("Error updating selected rows");
          }
        } else {
          toast.warn("No rows were updated as the selected status is the same as the current status.");
        }
      } else {
        toast.warn("Please select rows");
      }
    }
  };
  
  const onRowSelect = () => {
    if (!gridApi) return;
  
    const selectedNodes = gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      setToggleSection(true); 
    } else {
      setToggleSection(false); 
    }
  };
  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="hmDashBoard-container">
        <h5>ALL Role List</h5>
        <img
          src="../assets/plus_icon.webp"
          alt="plus-icon"
          className="hmDashBoard-container__img1"
          onClick={() => navigate("/role-details")}
        />
        <img
          src="../assets/Home.webp"
          alt="home_icon"
          onClick={() => navigate("/")}
        />
        <img
          src="../assets/careers.webp"
          alt="careers_icon"
          onClick={() => navigate(`/hiring-Manager-DashBoard/${email}`)}
        />
      </div>
      <div className="careers-main-container__agGrid">
        <div style={containerStyle}>
          <div style={gridStyle} className="ag-theme-quartz">
            <button className="CareerListBtn" onClick={handleLogout}>
              Logout
            </button>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              onCellValueChanged={handleCellEdit}
              onSelectionChanged={onRowSelect}
              rowSelection="multiple"
              pagination
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 50, 100, 200, 500]}
            />
            {toggleSection &&
            <select
              className="CareerListSelect"
              onClick={changeStatusForSelectedRows}
            >
              <option value="Change Status">Change Status</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>

            }
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersList;

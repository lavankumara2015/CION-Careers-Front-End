import React, { useCallback, useMemo, useState, useEffect } from "react";
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

export const RedirectToApplications = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const containerStyle = useMemo(() => ({ width: "100%", height: "5rem" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "role_id",
      headerName: "Role ID",
      width: "140px",
      cellStyle: { textAlign: "center" },
    },
    { field: "role", headerName: "Role" },
    { field: "department", headerName: "Department" },
    { field: "first_name", headerName: "First Name"},
    { field: "last_name", headerName: "Last Name" },
    { field: "mobile_number", headerName: "Mobile Number" },
    {
      field: "years_of_experience",
      headerName: "Experience",
  
      cellStyle: { textAlign: "center" },
    },
    { field: "DOB", headerName: "Date of Birth"},
    {
      field: "highest_graduation",
      headerName: "Highest Graduation",
      width:"220px"
    },
    {
      field: "graduation_year",
      headerName: "Graduation Year",
      cellStyle: { textAlign: "center" },
      width:"220px"

    },
    {
      field: "CGPA",
      headerName: "CGPA",

      cellStyle: { textAlign: "center" },
    },
    { field: "current_address", headerName: "Current Address" },
    {
      field: "reason_for_applying",
      headerName: "Reason For Applying",
    width:"300px"
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Applied", "Under Consideration", "Accepted", "Rejected"],
      },
    },
  ]);

  const handleCellEdit = useCallback(async (event) => {
    const { data, newValue } = event;
    try {
      const response = await axios.put(`${baseUrl}/update-applicationStatus`, {
        newValue,
        role_id: data.role_id,
        field: event.colDef.field,
      });
      if (response.status === 200) {
        toast.success("Data Updated Successfully");
      } else {
        throw new Error("Failed to update data");
      }
    } catch (err) {
      console.error("Error updating data:", err);
      toast.error("Data Not Updated");
    }
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      filter: true,
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${baseUrl}/get-SelectedApplicationDetails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setRowData(response.data.data); 
          console.log(response.data.data)
        } else {
          console.error("Error fetching data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("TOKENS");
      navigate("/hiring-managerLogin");
    }
  };

  const paginationPageSizeSelector = [10, 50, 100, 200, 500];

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="redirectToApplications-container">
        <h5>Application Details</h5>
        <div style={containerStyle}>
          <div style={gridStyle} className="ag-theme-quartz">
            <button
              className="redirectToApplications-container__Btn"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </button>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onCellValueChanged={handleCellEdit}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={paginationPageSizeSelector}
            />
          </div>
        </div>
      </div>
    </>
  );
};

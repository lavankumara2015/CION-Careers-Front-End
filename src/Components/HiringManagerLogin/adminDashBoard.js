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
import "./index.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const HiringManagerDashBoard = () => {
  const navigate = useNavigate();
  const { hr } = useParams();

  const containerStyle = useMemo(() => ({ width: "100%", height: "5rem" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [toggleSection, setToggleSection] = useState(false);
  const [columnDefs] = useState([
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      pinned: "left",
    },
    { field: "role_id", headerName: "Role ID", width: "140px", cellStyle: { textAlign: "center" } },
    { field: "role", headerName: "Role", width: "220px" },
    { field: "department", headerName: "Department", width: "200px" },
    { field: "first_name", headerName: "First Name", width: "180px" },
    { field: "last_name", headerName: "Last Name", width: "180px" },
    { field: "mobile_number", headerName: "Mobile Number", width: "220px" },
    { field: "years_of_experience", headerName: "Experience", width: "180px", cellStyle: { textAlign: "center" } },
    { field: "DOB", headerName: "Date of Birth", width: "180px" },
    { field: "highest_graduation", headerName: "Highest Graduation", width: "250px" },
    { field: "graduation_year", headerName: "Graduation Year", width: "220px", cellStyle: { textAlign: "center" } },
    { field: "CGPA", headerName: "CGPA", width: "120px" },
    { field: "current_address", headerName: "Current Address", width: "250px" },
    { field: "reason_for_applying", headerName: "Reason For Applying", width: "250px" },
    {
      field: "applicant_cv",
      headerName: "Applicant CV",
      width: "200px",
      cellRenderer: (params) => {
        if (params.data.applicant_cv) {
          return (
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleView(params.data.applicant_email)}
            >
              View CV
            </a>
          );
        }
        return <span>No CV available</span>;
      },
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
    const { data, oldValue, newValue } = event;
    if (oldValue !== newValue) {
      try {
        const options = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newValue,
            role_id: data.role_id,
            field: event.colDef.field,
          }),
        };
        await fetch(`${baseUrl}/update-applicationStatus`, options);
        toast.success("Data Updated Successfully");
      } catch (err) {
        console.log(err);
        toast.error("Data Not Updated");
      }
    }
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback(
    (params) => {
      setGridApi(params.api);
      const token = Cookies.get("token");
      axios
        .get(`${baseUrl}/get-adminDashboard-data/${hr}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setRowData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    [hr]
  );

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("token");
      navigate("/hiring-managerLogin");
    }
  };

  const handleView = async (email) => {
    try {
      const response = await axios.get(`${baseUrl}/downloadCV/${email}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error viewing CV:", error);
      toast.error("Error viewing CV");
    }
  };

  const changeStatusForSelectedRows = async (e) => {
    const newStatus = e.target.value;
    const selectedRows = gridApi.getSelectedRows();

    if (newStatus !== "Change Status" && selectedRows.length > 0) {
      const alreadyUpdated = selectedRows.every((row) => row.status === newStatus);
      if (alreadyUpdated) {
        toast.warn("Status is already set to the selected value for all selected rows.");
        return;
      }

      try {
        const promises = selectedRows.map(async (row) => {
          const response = await axios.put(
            `${baseUrl}/update-applicationStatus`,
            {
              newValue: newStatus,
              role_id: row.role_id,
              field: "status",
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          return response.data;
        });
        await Promise.all(promises);
        const updatedData = rowData.map((row) =>
          selectedRows.some((selected) => selected.role_id === row.role_id)
            ? { ...row, status: newStatus }
            : row
        );
        setRowData(updatedData);
        toast.success("Status Updated Successfully");
        setToggleSection(false)
      } catch (err) {
        console.log(err);
        toast.error("Error Updating Status");
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
      <div className="hmDashBoard-container">
        <h5>Role Applications Details</h5>
      </div>
      <div style={containerStyle}>
        <div style={gridStyle} className={"ag-theme-quartz"}>
          <button
            className="hmDashBoard-containerBtn"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </button>

          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onCellValueChanged={handleCellEdit}
            onSelectionChanged={onRowSelect}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={paginationPageSizeSelector}
            rowSelection="multiple"
          />

          {toggleSection && (
            <select
              className="CareerListSelect"
              onChange={changeStatusForSelectedRows}
            >
              <option value="Change Status">Change Status</option>
              <option value="Under Consideration">Under Consideration</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          )}
        </div>
      </div>
    </>
  );
};

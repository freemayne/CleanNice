import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableContentAdmin from "../components/tables/TableContentAdmin";
import AlertDialog, {
  confirmDialog,
} from "../components/manageCustomers/AlertDialogCustomer";
import RegisterEmployeeModal from "../components/manageEmployees/RegisterEmployeeModal";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";

const ManageEmployeesPage = () => {
  const URL = "http://localhost:3500/api/employee/";
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(URL, {
        credentials: "include",
      });

      const data = await res.json();

      setEmployeeData(data);
      console.log(employeeData);
    };
    fetchUsers();
  }, []);

  for (let i = 0; i < employeeData.length; i++) {
    if (employeeData[i].role === "Admin") {
      setEmployeeData(
        employeeData.filter(
          (employee) => employee.employeeId !== employeeData[i].employeeId
        )
      );
    }
  }



  return (
    <>
      <Header
        url1="/adminpage/"
        link1Name="Översikt"
        url2="/adminpage/employees"
        link2Name="Administrera anställda"
        url3="/adminpage/customer"
        link3Name="Administrera kunder"
        url4="#"
        link4Name="Faktura"
      />
      <Box sx={{ display: "flex", mt: 4 }}>
        <Box sx={{ flexGrow: 1, mx: 5 }}>
          <Title color={"darkgreen"}>Anställda</Title>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <RegisterEmployeeModal />
          </Box>

          <TableContentAdmin
            employeeData={employeeData}
            setEmployeeData={setEmployeeData}
          />
        </Box>
      </Box>
    </>
  );
};

export default ManageEmployeesPage;

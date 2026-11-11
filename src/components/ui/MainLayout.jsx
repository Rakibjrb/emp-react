import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import EmployeeDetails from "./EmployeeDetails";
import AddEmployeeModal from "../common/AddEmployeeModal";
import UpdateEmployeeModal from "../common/UpdateEmployeeModal";
import ConfirmationModal from "../common/ConfirmationModal";

const MainLayout = () => {
  const [reloadData, setReloadData] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Modal open states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSelectEmployee = async (id) => {
    let employeeDetails = {};
    try {
      const res = await fetch(
        `https://emp-nestjs.onrender.com/api/employees/${id}`,
      );
      const data = await res.json();
      employeeDetails = data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedEmployeeId(id);
      setSelectedEmployee(employeeDetails);
    }
  };

  const handleUpdateEmployee = async (data) => {
    try {
      const res = await fetch(
        `https://emp-nestjs.onrender.com/api/employees/${selectedEmployeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      console.log(result);
      setReloadData(true);
      setIsUpdateModalOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message || "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  const handleCreateEmployee = async (data) => {
    try {
      const res = await fetch("https://emp-nestjs.onrender.com/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log(result);
      setReloadData(true);
      setIsAddModalOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Created",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message || "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(
        `https://emp-nestjs.onrender.com/api/employees/${selectedEmployeeId}`,
        {
          method: "DELETE",
        },
      );
      setReloadData(true);
      setSelectedEmployeeId(0);
      setSelectedEmployee(null);
      setIsDeleteModalOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message || "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  // fetch employee data from api
  useEffect(() => {
    const queries = new URLSearchParams();
    if (searchQuery) queries.append("search", searchQuery);
    if (roleFilter !== "all") queries.append("role", roleFilter);
    fetch(`https://emp-nestjs.onrender.com/api/employees?${queries.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data?.data);
      })
      .catch((e) => {
        console.log(e);
        setEmployees([]);
      });

    setReloadData(false);
  }, [searchQuery, roleFilter, reloadData]);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden font-sans antialiased text-gray-900">
      {/* Sidebar with Search, Filter & List */}
      <Sidebar
        employees={employees}
        selectedEmployeeId={selectedEmployeeId}
        onSelectEmployee={handleSelectEmployee}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onFilterChange={setRoleFilter}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Area - Employee Details */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <EmployeeDetails
          employee={selectedEmployee}
          onEdit={() => setIsUpdateModalOpen(true)}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
      </main>

      {/* Modals */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateEmployee}
      />

      <UpdateEmployeeModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        employee={selectedEmployee}
        onSubmit={handleUpdateEmployee}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.name || "this employee"}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default MainLayout;

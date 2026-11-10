import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import EmployeeDetails from "./EmployeeDetails";
// import AddEmployeeModal from "../common/AddEmployeeModal";
// import UpdateEmployeeModal from "../common/UpdateEmployeeModal";
// import ConfirmationModal from "../common/ConfirmationModal";

const MainLayout = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Modal open states
  // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleOpenAdd = () => {};

  const handleOpenEdit = () => {};

  const handleOpenDelete = () => {};

  const handleDeleteConfirm = () => {};

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
  }, [searchQuery, roleFilter]);

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
        onAddClick={handleOpenAdd}
      />

      {/* Main Content Area - Employee Details */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <EmployeeDetails
          employee={selectedEmployee}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </main>

      {/* Modals */}
      {/* <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      /> */}

      {/* <UpdateEmployeeModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        employee={selectedEmployee}
      /> */}

      {/* <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.name || "this employee"}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      /> */}
    </div>
  );
};

export default MainLayout;

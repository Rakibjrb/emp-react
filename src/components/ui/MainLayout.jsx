import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import EmployeeDetails from './EmployeeDetails';
import AddEmployeeModal from '../common/AddEmployeeModal';
import UpdateEmployeeModal from '../common/UpdateEmployeeModal';
import ConfirmationModal from '../common/ConfirmationModal';

// Dummy data matching the specified schema
const INITIAL_EMPLOYEES = [
  {
    id: 1,
    name: 'Rakibul Hasan',
    email: 'rakibul@gmail.com',
    image: 'https://randomuser.me/api/portraits/men/69.jpg',
    department: 'Software Development',
    role: 'admin',
    position: 'Software Developer',
    createdAt: '2026-07-10T10:00:00Z',
    updatedAt: '2026-07-10T10:00:00Z',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    email: 'sarah.j@company.com',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    department: 'Product Management',
    role: 'manager',
    position: 'Senior Product Manager',
    createdAt: '2026-05-15T09:30:00Z',
    updatedAt: '2026-08-01T14:20:00Z',
  },
  {
    id: 3,
    name: 'Alex Rivera',
    email: 'alex.r@company.com',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    department: 'UI/UX Design',
    role: 'employee',
    position: 'Product Designer',
    createdAt: '2026-08-02T11:00:00Z',
    updatedAt: '2026-08-02T11:00:00Z',
  },
  {
    id: 4,
    name: 'Priya Sharma',
    email: 'priya.s@company.com',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    department: 'Software Development',
    role: 'employee',
    position: 'Frontend Engineer',
    createdAt: '2026-09-12T08:15:00Z',
    updatedAt: '2026-09-12T08:15:00Z',
  },
];

const MainLayout = () => {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modal open states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected employee object
  const selectedEmployee = useMemo(() => {
    return employees.find((emp) => emp.id === selectedEmployeeId) || null;
  }, [employees, selectedEmployeeId]);

  // Filtered employees list based on search and role
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === 'all' || emp.role.toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [employees, searchQuery, roleFilter]);

  const handleSelectEmployee = (emp) => {
    setSelectedEmployeeId(emp.id);
  };

  const handleOpenAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = () => {
    setIsUpdateModalOpen(true);
  };

  const handleOpenDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== selectedEmployeeId));
    setIsDeleteModalOpen(false);
    // Select first available employee if exists
    const remaining = employees.filter((emp) => emp.id !== selectedEmployeeId);
    if (remaining.length > 0) {
      setSelectedEmployeeId(remaining[0].id);
    } else {
      setSelectedEmployeeId(null);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden font-sans antialiased text-gray-900">
      {/* Sidebar with Search, Filter & List */}
      <Sidebar
        employees={filteredEmployees}
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
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <UpdateEmployeeModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        employee={selectedEmployee}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.name || 'this employee'}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default MainLayout;

import React from "react";
import { FiSearch, FiUserPlus, FiBriefcase } from "react-icons/fi";

const roleBadgeColors = {
  admin: "bg-purple-50 text-purple-700 border-purple-200",
  manager: "bg-blue-50 text-blue-700 border-blue-200",
  employee: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const Sidebar = ({
  employees = [],
  selectedEmployeeId,
  onSelectEmployee,
  searchQuery,
  onSearchChange,
  roleFilter,
  onFilterChange,
  onAddClick,
}) => {
  return (
    <aside className="w-full md:w-84 lg:w-96 h-full flex flex-col bg-white border-r border-gray-200 shrink-0">
      {/* Sidebar Header & Actions */}
      <div className="p-4 border-b border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Employees
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {employees.length} {employees.length === 1 ? "member" : "members"}{" "}
              found
            </p>
          </div>
          {onAddClick && (
            <button
              type="button"
              onClick={onAddClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <FiUserPlus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, department..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Role Filter Selectable */}
        <div>
          <select
            value={roleFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors cursor-pointer capitalize"
          >
            <option value="all">All Roles</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Employee List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50 p-2 space-y-1">
        {employees.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">
            <p>No employees match your search.</p>
          </div>
        ) : (
          employees.map((emp) => {
            const isSelected = emp.id === selectedEmployeeId;
            const badgeClass =
              roleBadgeColors[emp.role?.toLowerCase()] ||
              "bg-gray-50 text-gray-700 border-gray-200";

            return (
              <button
                key={emp.id}
                type="button"
                onClick={() => onSelectEmployee(emp.id)}
                className={`cursor-pointer w-full text-left p-3 rounded-xl transition-all flex items-center gap-3.5 ${
                  isSelected
                    ? "bg-blue-50/80 border border-blue-200/80 shadow-xs"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="w-11 h-11 rounded-full object-cover border border-gray-200 bg-gray-100"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        emp.name,
                      )}&background=random`;
                    }}
                  />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3
                      className={`text-sm font-semibold truncate ${
                        isSelected ? "text-blue-900" : "text-gray-900"
                      }`}
                    >
                      {emp.name}
                    </h3>
                    <span
                      className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border shrink-0 ${badgeClass}`}
                    >
                      {emp.role}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {emp.position}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1 truncate">
                    <FiBriefcase className="w-3 h-3 shrink-0" />
                    <span className="truncate">{emp.department}</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

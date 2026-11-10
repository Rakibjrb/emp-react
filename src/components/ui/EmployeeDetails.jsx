import React from "react";
import {
  FiMail,
  FiBriefcase,
  FiShield,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

const roleStyles = {
  admin: "bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/20",
  manager: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20",
  employee:
    "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20",
};

const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return isoString;
  }
};

const EmployeeDetails = ({ employee, onEdit, onDelete }) => {
  if (!employee) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4 border border-gray-200">
          <FiUser className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold text-gray-800">
          No Employee Selected
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mt-1">
          Select an employee from the sidebar to view their full profile,
          contact info, and role.
        </p>
      </div>
    );
  }

  const roleStyle =
    roleStyles[employee.role?.toLowerCase()] ||
    "bg-gray-50 text-gray-700 border-gray-200 ring-gray-400/20";

  return (
    <div className="h-full overflow-y-auto bg-gray-50/60 p-6 lg:p-10">
      <div className=" mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          {/* Header Banner */}
          <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-700 relative" />

          {/* Avatar and Top Actions */}
          <div className="px-6 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 mb-4 gap-4">
              <div className="relative">
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-gray-100"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      employee.name,
                    )}&background=random`;
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(employee)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
                  >
                    <FiEdit2 className="w-4 h-4 text-gray-500" />
                    <span>Edit Profile</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(employee)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {employee.name}
                </h1>
                <span
                  className={`text-xs uppercase font-semibold px-2.5 py-0.5 rounded-full border ring-1 ${roleStyle}`}
                >
                  {employee.role}
                </span>
              </div>
              <p className="text-base font-medium text-gray-600">
                {employee.position}
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Work & Organization Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Job Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FiBriefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">
                    Department
                  </span>
                  <p className="text-sm font-semibold text-gray-800">
                    {employee.department}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <FiShield className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">
                    System Role
                  </span>
                  <p className="text-sm font-semibold text-gray-800 capitalize">
                    {employee.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Timestamps */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Contact & Activity
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <FiMail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">
                    Email Address
                  </span>
                  <p className="text-sm font-semibold text-gray-800">
                    {employee.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <FiCalendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">
                    Joined On
                  </span>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(employee.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `rounded-lg px-4 py-2 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100 dark:hover:bg-slate-800"
    }`;

  return (
    <aside className="flex flex-col gap-2 pt-5 border-r border-gray-200 dark:border-slate-700">
      <NavLink to="/" end className={linkClass}>
        Dashboard
      </NavLink>

      <NavLink to="/leads" className={linkClass}>
        Leads
      </NavLink>

      <NavLink to="/sales" className={linkClass}>
        Sales
      </NavLink>

      <NavLink to="/agents" className={linkClass}>
        Agents
      </NavLink>

      <NavLink to="/reports" className={linkClass}>
        Reports
      </NavLink>

      <NavLink to="/settings" className={linkClass}>
        Settings
      </NavLink>
    </aside>
  );
};

export default Sidebar;
import { NavLink } from "react-router-dom";

const sidebarCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

  .e360-sidebar {
    font-family: 'Outfit', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 24px 12px;
    min-height: calc(100vh - 56px);
    width: 200px;
    border-right: 1px solid rgba(255,255,255,0.06);
    background: rgba(8,12,28,0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .e360-nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 13.5px;
    font-weight: 600;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    transition: all 0.18s;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
  }

  .e360-nav-link:hover {
    color: rgba(255,255,255,0.85);
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.08);
  }

  .e360-nav-link.active {
    color: #fff;
    background: rgba(124,58,237,0.18);
    border-color: rgba(167,139,250,0.3);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
  }

  .e360-nav-link.active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: linear-gradient(135deg,#7C3AED,#A78BFA);
    box-shadow: 0 0 8px rgba(167,139,250,0.6);
  }

  .e360-nav-icon {
    font-size: 16px;
    flex-shrink: 0;
  }

  .e360-nav-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 8px 0;
  }
`;

const NAV_ITEMS = [
  { to: "/",        label: "Dashboard", icon: "⬡", end: true },
  { to: "/leads",   label: "Leads",     icon: "◈" },
  { to: "/agents",  label: "Agents",    icon: "◉" },
  { to: "/reports", label: "Reports",   icon: "▦" },
  { to: "/settings",label: "Settings",  icon: "⚙" },
];

const Sidebar = () => (
  <>
    <style>{sidebarCss}</style>
    <aside className="e360-sidebar">
      {NAV_ITEMS.map((item, i) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `e360-nav-link${isActive ? " active" : ""}`
          }
        >
          <span className="e360-nav-icon">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </aside>
  </>
);

export default Sidebar;

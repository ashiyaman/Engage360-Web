import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

const bodyCss = `
  .e360-body-wrap {
    min-height: 100vh;
    background: #080C1A;
  }

  /* Push content below fixed header */
  .e360-body-content {
    display: flex;
    flex-direction: row;
    padding-top: 56px; /* header height */
    min-height: 100vh;
  }

  /* Desktop sidebar */
  .e360-sidebar-desktop {
    display: none;
    flex-shrink: 0;
    position: sticky;
    top: 56px;
    height: calc(100vh - 56px);
    overflow-y: auto;
  }

  @media (min-width: 768px) {
    .e360-sidebar-desktop { display: block; }
  }

  /* Mobile sidebar overlay */
  .e360-sidebar-mobile {
    position: fixed;
    top: 56px;
    left: 0;
    width: 200px;
    height: calc(100vh - 56px);
    background: rgba(8,12,28,0.97);
    backdrop-filter: blur(20px);
    z-index: 40;
    box-shadow: 4px 0 24px rgba(0,0,0,0.5);
  }

  /* Mobile toggle button */
  .e360-sidebar-toggle {
    display: flex;
    position: fixed;
    top: 68px;
    left: 8px;
    z-index: 50;
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(124,58,237,0.25);
    border: 1px solid rgba(167,139,250,0.3);
    color: #A78BFA;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    transition: all 0.18s;
  }

  .e360-sidebar-toggle:hover {
    background: rgba(124,58,237,0.4);
  }

  @media (min-width: 768px) {
    .e360-sidebar-toggle { display: none; }
  }

  /* Main outlet area */
  .e360-outlet {
    flex: 1;
    min-width: 0;
    overflow-x: hidden;
  }
`;

const Body = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <style>{bodyCss}</style>
      <div className="e360-body-wrap">
        <Header />
        <div className="e360-body-content">

          {/* Desktop sidebar — always visible */}
          <div className="e360-sidebar-desktop">
            <Sidebar />
          </div>

          {/* Mobile toggle button */}
          <button
            className="e360-sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen
              ? <HiChevronLeft className="text-lg" />
              : <HiChevronRight className="text-lg" />
            }
          </button>

          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div className="e360-sidebar-mobile">
              <Sidebar />
            </div>
          )}

          {/* Page content */}
          <main className="e360-outlet">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Body;


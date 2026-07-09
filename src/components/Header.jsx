const headerCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

  .e360-header-bar {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    z-index: 50;
    background: rgba(8,12,28,0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .e360-header-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 24px;
  }

  .e360-header-logo {
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #A78BFA, #38BDF8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .e360-header-dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #34D399;
    box-shadow: 0 0 8px #34D399;
    margin-left: 6px;
    vertical-align: middle;
    position: relative;
    top: -2px;
  }
`;

const Header = () => (
  <>
    <style>{headerCss}</style>
    <header className="e360-header-bar">
      <div className="e360-header-inner">
        <span className="e360-header-logo">Engage 360</span>
        <span className="e360-header-dot" />
      </div>
    </header>
  </>
);

export default Header;

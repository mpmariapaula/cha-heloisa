import { NAV_ITEMS, type AdminPage } from "./shared";

export function Sidebar({ active, setPage, onLogout, mobileOpen, setMobileOpen }: { active: AdminPage; setPage: (p: AdminPage) => void; onLogout: () => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col" style={{ width: 220, background: "white", borderRight: "1px solid #eadde5", minHeight: "100svh", position: "fixed", left: 0, top: 0, bottom: 0 }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #f2e8ed" }}>
          <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "2rem", color: "#a85f78" }}>Heloisa</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#917b86", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Admin</p>
        </div>
        <nav style={{ flex: 1, padding: "12px 12px" }}>
          {NAV_ITEMS.map(({ page, label, icon }) => {
            const isActive = active === page;
            return (
              <button key={page} onClick={() => setPage(page)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", border: "none", cursor: "pointer", marginBottom: 2, background: isActive ? "linear-gradient(135deg, #f7ded5, #f2e8f0)" : "transparent", color: isActive ? "#a85f78" : "#7d6873", transition: "all 0.15s" }}
                className={isActive ? "" : "hover:bg-pink-50"}
              >
                <span style={{ fontSize: "1rem", opacity: 0.8 }}>{icon}</span>
                {label}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "16px 12px", borderTop: "1px solid #f2e8ed" }}>
          <a href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#917b86", textDecoration: "none", borderRadius: 8, marginBottom: 4 }} className="hover:bg-pink-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Ver convite
          </a>
          <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#c0404a", background: "none", border: "none", cursor: "pointer", borderRadius: 8, width: "100%" }} className="hover:bg-red-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50" style={{ background: "white", borderBottom: "1px solid #eadde5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
        <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.6rem", color: "#a85f78" }}>Heloisa Admin</p>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#a85f78", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40" style={{ background: "rgba(84,67,76,0.28)" }} onClick={() => setMobileOpen(false)}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 260, background: "white", boxShadow: "4px 0 20px rgba(84,67,76,0.13)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #f2e8ed" }}>
              <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.8rem", color: "#a85f78" }}>Heloisa</p>
            </div>
            <nav style={{ padding: "12px" }}>
              {NAV_ITEMS.map(({ page, label, icon }) => (
                <button key={page} onClick={() => { setPage(page); setMobileOpen(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 12px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer", marginBottom: 2, background: active === page ? "linear-gradient(135deg, #f7ded5, #f2e8f0)" : "transparent", color: active === page ? "#a85f78" : "#7d6873" }}
                >
                  <span>{icon}</span>{label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

  import { useEffect, useState } from "react";
  import {
    NAV_ITEMS,
    MOCK_GUESTS,
    MOCK_MESSAGES,
    MOCK_DIAPERS,
    MOCK_GIFTS,
    MOCK_SETTINGS,
    type AdminPage,
    type Guest,
    type Message,
    type DiapersConfig,
    type GiftConfig,
    type EventSettings,
  } from "./admin/shared";
  import { AdminLogin } from "./admin/AdminLogin";
  import { Sidebar } from "./admin/Sidebar";
  import { Dashboard } from "./admin/Dashboard";
  import { Guests } from "./admin/Guests";
  import { DiapersAdmin } from "./admin/DiapersAdmin";
  import { GiftsAdmin } from "./admin/GiftsAdmin";
  import { MessagesAdmin } from "./admin/MessagesAdmin";
  import { GalleryAdmin } from "./admin/GalleryAdmin";
  import { SettingsAdmin } from "./admin/SettingsAdmin";
  import { getGuests } from "./services/guestsService";
  import { getDiapers } from "./services/diapersService";
  import { getGifts } from "./services/giftsService";

  export default function AdminApp() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState<AdminPage>("dashboard");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [guestsLoading, setGuestsLoading] = useState(false);
    const [guestsError, setGuestsError] = useState("");


useEffect(() => {
  if (!loggedIn) return;

  async function loadData() {
    setGuestsLoading(true);
    setGuestsError("");

    try {
      const [guestsData, diapersData, giftsData] = await Promise.all([
        getGuests(),
        getDiapers(),
        getGifts(),
      ]);

      setGuests(guestsData);
      setDiapers(diapersData);
      setGifts(giftsData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setGuestsError("Não foi possível carregar os dados do Supabase.");
    } finally {
      setGuestsLoading(false);
    }
  }

  loadData();
}, [loggedIn]);


    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [diapers, setDiapers] = useState<DiapersConfig[]>(MOCK_DIAPERS);
    const [gifts, setGifts] = useState<GiftConfig[]>(MOCK_GIFTS);
    const [settings, setSettings] = useState<EventSettings>(MOCK_SETTINGS);

    if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />;

    const pageTitle = NAV_ITEMS.find((n) => n.page === page)?.label || "";

    return (
      <div style={{ background: "#fbf7f8", minHeight: "100svh" }}>
        <Sidebar active={page} setPage={setPage} onLogout={() => setLoggedIn(false)} mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

        {/* Main content */}
        <div className="md:ml-[220px]" style={{ padding: "0" }}>
          <div style={{ paddingTop: 60 }} className="md:pt-0">
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.25rem" }}>
              {page === "dashboard" && <Dashboard guests={guests} messages={messages} diapers={diapers} />}
              {page === "guests" && (
                <>
                  {guestsLoading ? (
                    <p>Carregando convidados...</p>
                  ) : guestsError ? (
                    <p role="alert">{guestsError}</p>
                  ) : (
                    <Guests guests={guests} setGuests={setGuests} />
                  )}
                </>
              )}
              {page === "diapers" && <DiapersAdmin diapers={diapers} setDiapers={setDiapers} />}
              {page === "gifts" && <GiftsAdmin gifts={gifts} setGifts={setGifts} />}
              {page === "messages" && <MessagesAdmin messages={messages} setMessages={setMessages} />}
              {page === "gallery" && <GalleryAdmin />}
              {page === "settings" && <SettingsAdmin settings={settings} setSettings={setSettings} />}
            </div>
          </div>
        </div>
      </div>
    );
  }

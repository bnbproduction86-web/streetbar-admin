import { useState, useCallback } from 'react';
import {
  LayoutDashboard,
  Receipt,
  Coffee,
  Tags,
  Building2,
  Bike,
  Ticket,
  Image,
  Map,
  CreditCard,
  Settings,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Crown,
} from 'lucide-react';
import './App.css';

// ── Types ──────────────────────────────────────────────────────────────────────

type TabId =
  | 'dashboard'
  | 'transactions'
  | 'menu-stock'
  | 'categories'
  | 'outlets'
  | 'fleet'
  | 'promos'
  | 'media'
  | 'maps-config'
  | 'payment'
  | 'settings';

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

// ── Navigation Config ──────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'UTAMA',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'transactions', label: 'Pesanan & Transaksi', icon: Receipt },
    ],
  },
  {
    title: 'MANAJEMEN PRODUK',
    items: [
      { id: 'menu-stock', label: 'Menu & Stok', icon: Coffee },
      { id: 'categories', label: 'Kategori', icon: Tags },
    ],
  },
  {
    title: 'OPERASIONAL',
    items: [
      { id: 'outlets', label: 'Outlet & Hub', icon: Building2 },
      { id: 'fleet', label: 'Armada Gerobak', icon: Bike },
    ],
  },
  {
    title: 'PEMASARAN',
    items: [
      { id: 'promos', label: 'Promo & Voucher', icon: Ticket },
      { id: 'media', label: 'Media Promosi', icon: Image },
    ],
  },
  {
    title: 'KONFIGURASI',
    items: [
      { id: 'maps-config', label: 'API Maps', icon: Map },
      { id: 'payment', label: 'Pembayaran', icon: CreditCard },
      { id: 'settings', label: 'Pengaturan Umum', icon: Settings },
    ],
  },
];

const TAB_TITLES: Record<TabId, string> = {
  dashboard: 'Dashboard',
  transactions: 'Pesanan & Transaksi',
  'menu-stock': 'Menu & Stok',
  categories: 'Kategori',
  outlets: 'Outlet & Hub',
  fleet: 'Armada Gerobak',
  promos: 'Promo & Voucher',
  media: 'Media Promosi',
  'maps-config': 'Konfigurasi API Maps',
  payment: 'Pembayaran',
  settings: 'Pengaturan Umum',
};

// ── Real View Components ──────────────────────────────────────────────────────
import { DashboardView } from './components/DashboardView';
import { TransactionView } from './components/TransactionView';
import { MenuStockView } from './components/MenuStockView';
import { CategoryView } from './components/CategoryView';
import { OutletView } from './components/OutletView';
import { FleetView } from './components/FleetView';
import { PromoView } from './components/PromoView';
import { MediaPromoView } from './components/MediaPromoView';
import { MapsConfigView } from './components/MapsConfigView';
import { PaymentView } from './components/PaymentView';
import { SettingsView } from './components/SettingsView';

// ── Main App Component ─────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={(tab: any) => setActiveTab(tab)} />;
      case 'transactions':
        return <TransactionView />;
      case 'menu-stock':
        return <MenuStockView />;
      case 'categories':
        return <CategoryView />;
      case 'outlets':
        return <OutletView />;
      case 'fleet':
        return <FleetView />;
      case 'promos':
        return <PromoView />;
      case 'media':
        return <MediaPromoView />;
      case 'maps-config':
        return <MapsConfigView />;
      case 'payment':
        return <PaymentView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onNavigate={(tab: any) => setActiveTab(tab)} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F9FA' }}>
      {/* ── Mobile Overlay ── */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: 260,
          minWidth: 260,
          background: '#1C1917',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '24px 20px 20px',
            borderBottom: '1px solid #292524',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #D4AF37 0%, #B38F2A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}
            >
              👑
            </div>
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                StreetBar
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#D4AF37',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                }}
              >
                Admin Panel
              </div>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#9CA3AF',
              cursor: 'pointer',
              padding: 4,
            }}
            className="sidebar-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} style={{ marginBottom: 8 }}>
              {/* Section Title */}
              <div
                style={{
                  padding: '12px 20px 6px',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#57534E',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                }}
              >
                {section.title}
              </div>

              {/* Nav Items */}
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    className="nav-item"
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 20px',
                      border: 'none',
                      background: isActive
                        ? 'rgba(212, 175, 55, 0.1)'
                        : 'transparent',
                      borderLeft: isActive
                        ? '3px solid #D4AF37'
                        : '3px solid transparent',
                      color: isActive ? '#D4AF37' : '#9CA3AF',
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      textAlign: 'left' as const,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    <IconComponent
                      size={18}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #292524',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              background: '#292524',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37 0%, #E6C665 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <User size={16} color="#1C1917" strokeWidth={2.5} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#E7E5E4',
                  whiteSpace: 'nowrap' as const,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Admin StreetBar
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#78716C',
                }}
              >
                Super Admin
              </div>
            </div>
            <button
              onClick={() => {}}
              style={{
                background: 'none',
                border: 'none',
                color: '#78716C',
                cursor: 'pointer',
                padding: 4,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Keluar"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div
        style={{
          flex: 1,
          marginLeft: 260,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Top Header Bar */}
        <header
          style={{
            height: 72,
            background: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Left: Hamburger (mobile) + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#1C1917',
                cursor: 'pointer',
                padding: 4,
              }}
              className="mobile-menu-btn"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1C1917',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {TAB_TITLES[activeTab]}
              </h1>
              <p
                style={{
                  fontSize: 12,
                  color: '#7D756D',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                StreetBar Luxury Mobile Coffee Bar
              </p>
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Notifications */}
            <button
              style={{
                position: 'relative',
                background: '#F8F9FA',
                border: '1px solid #E5E7EB',
                borderRadius: 10,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#57524C',
              }}
            >
              <Bell size={18} />
              <span
                className="pulse"
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#EF4444',
                  border: '2px solid #FFFFFF',
                }}
              />
            </button>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '6px 12px 6px 6px',
                  border: '1px solid #E5E7EB',
                  borderRadius: 10,
                  background: '#F8F9FA',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background:
                      'linear-gradient(135deg, #D4AF37 0%, #E6C665 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User size={16} color="#1C1917" strokeWidth={2.5} />
                </div>
                <div style={{ textAlign: 'left' as const }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#1C1917',
                      lineHeight: 1.2,
                    }}
                  >
                    Admin
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: '#7D756D',
                      lineHeight: 1.2,
                    }}
                  >
                    Super Admin
                  </div>
                </div>
                <ChevronDown
                  size={14}
                  color="#7D756D"
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: profileDropdownOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                />
              </button>

              {/* Dropdown */}
              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 6,
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: 12,
                    boxShadow:
                      '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)',
                    minWidth: 180,
                    padding: 6,
                    zIndex: 100,
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setProfileDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      border: 'none',
                      background: 'transparent',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 13,
                      color: '#1C1917',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = '#F8F9FA')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    <Settings size={16} color="#7D756D" />
                    Pengaturan
                  </button>
                  <div
                    style={{
                      height: 1,
                      background: '#E5E7EB',
                      margin: '4px 8px',
                    }}
                  />
                  <button
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      border: 'none',
                      background: 'transparent',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 13,
                      color: '#EF4444',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = '#FEF2F2')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="main-content"
          style={{
            flex: 1,
            overflow: 'auto',
          }}
          onClick={() => profileDropdownOpen && setProfileDropdownOpen(false)}
        >
          {renderContent()}
        </main>
      </div>

      {/* ── Responsive Styles (injected) ── */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .sidebar-close-btn {
            display: flex !important;
          }
          div[style*="marginLeft: 260px"],
          div[style*="margin-left: 260px"] {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

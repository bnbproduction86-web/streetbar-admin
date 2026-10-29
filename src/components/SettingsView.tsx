import React, { useState } from 'react';
import {
  Settings,
  Building,
  Phone,
  Mail,
  Clock,
  Shield,
  Save,
  Globe,
  Bell,
  CheckCircle,
  MessageSquare
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [companyName, setCompanyName] = useState('PT. StreetBar Mobilitas Indonesia');
  const [tagline, setTagline] = useState('Luxury Mobile Coffee Bar on Wheels');
  const [waHotline, setWaHotline] = useState('6281299001101');
  const [supportEmail, setSupportEmail] = useState('concierge@streetbar.id');
  const [operatingHours, setOperatingHours] = useState('06:00 - 22:00 WIB');
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
          Pengaturan Umum Sistem & Profil StreetBar
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
          Konfigurasi identitas entitas legal, nomor hotline WhatsApp concierge, preferensi notifikasi, dan operasional aplikasi.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Company Identity */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #EFECE6' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#1C1917', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="#B38F2A" /> Identitas Perusahaan & Entitas Legal
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                Nama Perusahaan Terdaftar
              </label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                Slogan / Tagline Brand
              </label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                Nomor WhatsApp Hotline Concierge (Format Internasional)
              </label>
              <input
                type="text"
                value={waHotline}
                onChange={e => setWaHotline(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                Email Layanan Pelanggan
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={e => setSupportEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
              />
            </div>
          </div>
        </div>

        {/* Operational Preferences */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #EFECE6' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#1C1917', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#B38F2A" /> Preferensi Jam Operasional & Notifikasi
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoAcceptOrders}
                onChange={e => setAutoAcceptOrders(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <span>
                <strong>Terima Pesanan Otomatis (Auto-Accept)</strong> - Pesanan masuk langsung ditugaskan ke gerobak listrik terdekat tanpa konfirmasi manual kasir.
              </span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={e => setSoundAlerts(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <span>
                <strong>Bunyikan Nada Lonceng Pesanan Baru (Audio Chime)</strong> - Notifikasi suara dual-tone saat pesanan baru dari aplikasi diterima.
              </span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#DC2626' }}>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={e => setMaintenanceMode(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <span>
                <strong>Mode Perawatan Aplikasi (Maintenance Mode)</strong> - Tutup sementara penerimaan pesanan customer (gerobak sedang recharge/event internal).
              </span>
            </label>
          </div>
        </div>

        {isSaved && (
          <div style={{ padding: '12px', borderRadius: '10px', background: '#ECFDF5', color: '#059669', fontSize: '12px', fontWeight: 700, textAlign: 'center' }}>
            ✅ Pengaturan umum berhasil disimpan ke database StreetBar!
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            style={{
              padding: '11px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #E6C665, #D4AF37)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)'
            }}
          >
            <Save size={16} /> Simpan Semua Pengaturan
          </button>
        </div>
      </form>
    </div>
  );
};


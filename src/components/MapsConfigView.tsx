import React, { useState } from 'react';
import {
  Map,
  Key,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Save,
  RefreshCw,
  Compass,
  Sliders,
  ExternalLink,
  Layers,
  MapPin
} from 'lucide-react';
import { mapsConfig, MapsConfig } from '../data/adminData';

export const MapsConfigView: React.FC = () => {
  const [config, setConfig] = useState<MapsConfig>(mapsConfig);
  const [apiKey, setApiKey] = useState('AIzaSyD-StreetBar-GoogleMapsKey-LiveProduction8892');
  const [showKey, setShowKey] = useState(false);
  const [deliveryRadiusKm, setDeliveryRadiusKm] = useState(3.5);
  const [centerLat, setCenterLat] = useState(-6.2088);
  const [centerLng, setCenterLng] = useState(106.8227);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'success' | 'error'; message: string } | null>({
    status: 'success',
    message: 'Google Maps JavaScript API & Geocoding API terhubung normal (Latency 42ms).'
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleTestConnection = () => {
    setIsTestingApi(true);
    setTimeout(() => {
      setIsTestingApi(false);
      setTestResult({
        status: 'success',
        message: 'Koneksi ke Google Maps Platform API berhasil. Kuota aktif & tagihan terverifikasi.'
      });
    }, 1200);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const quotaPercent = ((config.quotaUsed / config.quotaLimit) * 100).toFixed(1);

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Konfigurasi Google Maps Platform API
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Atur kredensial peta, pelacakan live GPS armada gerobak, radius layanan bebas ongkir, dan monitoring kuota request.
          </p>
        </div>

        <button
          onClick={handleTestConnection}
          disabled={isTestingApi}
          style={{
            background: '#FBF8F1',
            border: '1px solid #E8DCC4',
            borderRadius: '12px',
            padding: '10px 18px',
            color: '#B38F2A',
            fontWeight: 800,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RefreshCw size={15} className={isTestingApi ? 'animate-spin' : ''} />
          {isTestingApi ? 'Memeriksa API...' : 'Test Ping Google Maps'}
        </button>
      </div>

      {/* Quota & Status Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
        {/* Status Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '22px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669'
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1C1917' }}>
                  Provider: Google Maps Platform (JavaScript API v3)
                </div>
                <div style={{ fontSize: '11px', color: '#7D756D' }}>
                  Diaktifkan untuk: Autocomplete Places, Geocoding, Distance Matrix, Maps SDK
                </div>
              </div>
            </div>

            <span
              style={{
                background: '#ECFDF5',
                color: '#059669',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800
              }}
            >
              Aktif & Beroperasi
            </span>
          </div>

          {testResult && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: testResult.status === 'success' ? '#F0FDF4' : '#FEF2F2',
                border: `1px solid ${testResult.status === 'success' ? '#BBF7D0' : '#FECACA'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: testResult.status === 'success' ? '#166534' : '#991B1B'
              }}
            >
              {testResult.status === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Quota Usage */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '22px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#7D756D' }}>
              <span>PEMAKAIAN KUOTA API BULAN INI</span>
              <strong style={{ color: '#B38F2A' }}>{quotaPercent}%</strong>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#1C1917', margin: '6px 0' }}>
              {config.quotaUsed.toLocaleString('id-ID')} / {config.quotaLimit.toLocaleString('id-ID')} Request
            </div>
            <div style={{ width: '100%', height: '8px', background: '#F2EDE4', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${quotaPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #E6C665, #D4AF37)',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#8C847A' }}>
            Estimasi sisa kuota cukup hingga 18 hari ke depan. Reset kuota tanggal 1 setiap bulan.
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '26px',
          border: '1px solid #EFECE6',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
          Parameter API & Titik Pusat Peta
        </h3>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* API Key */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#1C1917' }}>
                Google Maps API Key (Server & Client Restricted)
              </label>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{ background: 'none', border: 'none', color: '#B38F2A', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                {showKey ? 'Sembunyikan Key' : 'Tampilkan Key Lengkap'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                style={{
                  flex: 1,
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E8DCC4',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  background: '#FAF9F6'
                }}
              />
            </div>
            <div style={{ fontSize: '11px', color: '#8C847A', marginTop: '4px' }}>
              Pastikan key di-restrict ke HTTP Referrers domain aplikasi StreetBar dan IP backend untuk keamanan.
            </div>
          </div>

          {/* Map Centers & Radius */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                Latitude Pusat Peta (Jakarta)
              </label>
              <input
                type="number"
                step="0.0001"
                value={centerLat}
                onChange={e => setCenterLat(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
              />
              <span style={{ fontSize: '10px', color: '#8C847A' }}>Default: -6.2088 (Sudirman Center)</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                Longitude Pusat Peta (Jakarta)
              </label>
              <input
                type="number"
                step="0.0001"
                value={centerLng}
                onChange={e => setCenterLng(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
              />
              <span style={{ fontSize: '10px', color: '#8C847A' }}>Default: 106.8227 (SCBD Area)</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                Maksimal Radius Panggil Bebas Ongkir (KM)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="10"
                value={deliveryRadiusKm}
                onChange={e => setDeliveryRadiusKm(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
              />
              <span style={{ fontSize: '10px', color: '#8C847A' }}>Pelanggan di luar radius ini disarankan pesan jadwal</span>
            </div>
          </div>

          {/* Map Feature Toggles */}
          <div style={{ background: '#FAF9F6', padding: '16px 20px', borderRadius: '14px', border: '1px solid #EFECE6' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1C1917', marginBottom: '10px' }}>
              Fitur Peta & Pelacakan Armada yang Diaktifkan:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '12px', color: '#57524C' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Pelacakan Real-Time Lokasi Gerobak (Interval 5 detik)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Geofencing Area Bisnis Segitiga Emas (SCBD - Sudirman - Thamrin)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Kalkulasi Otomatis ETA Waktu Tiba Barista (Google Distance Matrix)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Kompensasi Pengalihan Rute Trotoar Pejalan Kaki untuk Gerobak Listrik</span>
              </label>
            </div>
          </div>

          {isSaved && (
            <div
              style={{
                padding: '12px',
                borderRadius: '10px',
                background: '#ECFDF5',
                color: '#059669',
                fontSize: '12px',
                fontWeight: 700,
                textAlign: 'center'
              }}
            >
              ✅ Pengaturan API Google Maps berhasil disimpan dan disinkronkan ke aplikasi customer & barista!
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
              <Save size={16} /> Simpan Konfigurasi Maps
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


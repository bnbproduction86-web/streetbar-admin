import React, { useState } from 'react';
import {
  Bike,
  Plus,
  BatteryCharging,
  Phone,
  Star,
  MapPin,
  Wrench,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  X,
  Save,
  Coffee
} from 'lucide-react';
import { cartUnits, CartUnit } from '../data/adminData';

export const FleetView: React.FC = () => {
  const [fleets, setFleets] = useState<CartUnit[]>(cartUnits);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFleet, setEditingFleet] = useState<CartUnit | null>(null);
  const [formData, setFormData] = useState<Partial<CartUnit>>({
    code: '',
    baristaName: '',
    baristaTitle: '',
    phone: '',
    assignedOutlet: 'Hub Sudirman',
    battery: 100,
    cupsRemaining: 50,
    status: 'idle',
    locationName: 'Lobby Menara Astra'
  });

  const filteredFleets = fleets.filter(f =>
    f.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.baristaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.locationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (id: string, newStatus: CartUnit['status']) => {
    setFleets(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
  };

  const handleOpenAdd = () => {
    setEditingFleet(null);
    setFormData({
      code: `STREETBAR-EV-0${fleets.length + 1}`,
      baristaName: '',
      baristaTitle: 'StreetBarista Profesional',
      phone: '0812-',
      assignedOutlet: 'Hub Sudirman',
      battery: 100,
      cupsRemaining: 60,
      status: 'idle',
      locationName: 'Area Operasi Jakarta'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (fleet: CartUnit) => {
    setEditingFleet(fleet);
    setFormData({ ...fleet });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.baristaName) return;

    if (editingFleet) {
      setFleets(prev => prev.map(f => f.id === editingFleet.id ? { ...f, ...formData } as CartUnit : f));
    } else {
      const newUnit: CartUnit = {
        id: `cart-${Date.now()}`,
        code: formData.code || 'STREETBAR-EV-XX',
        baristaName: formData.baristaName || 'Barista Baru',
        baristaTitle: formData.baristaTitle || 'StreetBarista',
        phone: formData.phone || '0812-0000',
        rating: 5.0,
        totalOrders: 0,
        lat: -6.2088,
        lng: 106.8227,
        battery: Number(formData.battery) || 100,
        speedKmh: 0,
        status: formData.status || 'idle',
        cupsRemaining: Number(formData.cupsRemaining) || 50,
        locationName: formData.locationName || 'Jakarta Pusat',
        lastMaintenance: new Date().toISOString().split('T')[0],
        nextMaintenance: '2026-12-01',
        assignedOutlet: formData.assignedOutlet || 'Hub Sudirman'
      };
      setFleets(prev => [...prev, newUnit]);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Armada Gerobak Baterai Listrik (Mobile Bar)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Pantau status operasional gerobak ramah lingkungan, barista penanggung jawab, kapasitas cup & baterai.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          style={{
            background: 'linear-gradient(135deg, #E6C665 0%, #D4AF37 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 18px',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
          }}
        >
          <Plus size={16} /> Daftarkan Unit Gerobak Baru
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #EFECE6' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7D756D' }}>TOTAL ARMADA</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#1C1917', marginTop: '4px' }}>
            {fleets.length} Unit Gerobak
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #EFECE6' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7D756D' }}>SIAP JALAN / IDLE</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {fleets.filter(f => f.status === 'active' || f.status === 'idle').length} Unit
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #EFECE6' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7D756D' }}>RATA-RATA BATERAI</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#D4AF37', marginTop: '4px' }}>
            {(fleets.reduce((a, b) => a + b.battery, 0) / fleets.length).toFixed(0)}%
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #EFECE6' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7D756D' }}>TOTAL CUP TERSEDIA</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#1C1917', marginTop: '4px' }}>
            {fleets.reduce((a, b) => a + b.cupsRemaining, 0)} Cup
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '14px 20px',
          border: '1px solid #EFECE6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FAF9F6',
            border: '1px solid #E8DCC4',
            borderRadius: '10px',
            padding: '8px 12px',
            width: '320px'
          }}
        >
          <Search size={15} color="#B38F2A" />
          <input
            type="text"
            placeholder="Cari kode armada, nama barista, lokasi..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', fontSize: '12px', width: '100%' }}
          />
        </div>

        <span style={{ fontSize: '12px', color: '#7D756D' }}>
          Menampilkan {filteredFleets.length} unit
        </span>
      </div>

      {/* Fleet Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredFleets.map(unit => {
          const isHealthy = unit.battery > 50;
          const statusColors: Record<string, { bg: string; text: string; label: string }> = {
            active: { bg: '#ECFDF5', text: '#059669', label: 'Sedang Melayani' },
            idle: { bg: '#FEF3C7', text: '#D97706', label: 'Standby / Siap Order' },
            offline: { bg: '#F3F4F6', text: '#6B7280', label: 'Offline' },
            maintenance: { bg: '#FEF2F2', text: '#DC2626', label: 'Perawatan Bengkel' }
          };
          const curStatus = statusColors[unit.status] || statusColors.idle;

          return (
            <div
              key={unit.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '22px',
                border: '1px solid #EFECE6',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: '#FBF8F1',
                        border: '1px solid #E8DCC4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#B38F2A'
                      }}
                    >
                      <Bike size={22} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
                        {unit.code}
                      </h3>
                      <div style={{ fontSize: '11px', color: '#B38F2A', fontWeight: 700 }}>
                        Pangkalan: {unit.assignedOutlet}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      background: curStatus.bg,
                      color: curStatus.text,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 800
                    }}
                  >
                    {curStatus.label}
                  </span>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#57524C' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>StreetBarista:</span>
                    <strong>{unit.baristaName} ({unit.baristaTitle})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Rating Pelanggan:</span>
                    <strong style={{ color: '#B38F2A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={13} fill="#D4AF37" color="#D4AF37" /> {unit.rating} ({unit.totalOrders} order)
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Lokasi Stand:</span>
                    <strong>{unit.locationName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Sisa Cup Bawaan:</span>
                    <strong style={{ color: '#1C1917' }}>{unit.cupsRemaining} Cup</strong>
                  </div>

                  {/* Battery Bar */}
                  <div style={{ marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: isHealthy ? '#059669' : '#DC2626' }}>
                        <BatteryCharging size={14} /> Baterai Lithium Motor
                      </span>
                      <strong>{unit.battery}%</strong>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#F2EDE4', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${unit.battery}%`,
                          height: '100%',
                          background: unit.battery > 50 ? '#10B981' : unit.battery > 20 ? '#F59E0B' : '#EF4444',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Switcher & Edit */}
              <div
                style={{
                  borderTop: '1px solid #F5F3EE',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => handleToggleStatus(unit.id, 'idle')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #EFECE6',
                      background: unit.status === 'idle' ? '#1C1917' : '#FFFFFF',
                      color: unit.status === 'idle' ? '#D4AF37' : '#7D756D',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Standby
                  </button>
                  <button
                    onClick={() => handleToggleStatus(unit.id, 'active')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #EFECE6',
                      background: unit.status === 'active' ? '#1C1917' : '#FFFFFF',
                      color: unit.status === 'active' ? '#D4AF37' : '#7D756D',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Keliling
                  </button>
                  <button
                    onClick={() => handleToggleStatus(unit.id, 'maintenance')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #EFECE6',
                      background: unit.status === 'maintenance' ? '#1C1917' : '#FFFFFF',
                      color: unit.status === 'maintenance' ? '#D4AF37' : '#7D756D',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Service
                  </button>
                </div>

                <button
                  onClick={() => handleOpenEdit(unit)}
                  style={{
                    background: '#FBF8F1',
                    border: '1px solid #E8DCC4',
                    color: '#B38F2A',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Edit Data
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '520px',
              padding: '26px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1C1917' }}>
                {editingFleet ? 'Edit Data Armada Gerobak' : 'Tambah Unit Gerobak Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7D756D" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Kode Unit Gerobak
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code || ''}
                    placeholder="STREETBAR-EV-05"
                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Pangkalan Hub
                  </label>
                  <select
                    value={formData.assignedOutlet}
                    onChange={e => setFormData({ ...formData, assignedOutlet: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  >
                    <option value="Hub Sudirman">Hub Sudirman</option>
                    <option value="Commissary Kemang">Commissary Kemang</option>
                    <option value="Gudang Cikarang">Gudang Cikarang</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Nama Barista Bertugas
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.baristaName || ''}
                    placeholder="Nama Barista"
                    onChange={e => setFormData({ ...formData, baristaName: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Nomor WhatsApp Barista
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone || ''}
                    placeholder="0812-..."
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Lokasi Operasi / Area Stand
                </label>
                <input
                  type="text"
                  required
                  value={formData.locationName || ''}
                  placeholder="Trotoar SCBD / Menara Astra"
                  onChange={e => setFormData({ ...formData, locationName: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Level Baterai (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.battery ?? 100}
                    onChange={e => setFormData({ ...formData, battery: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Kapasitas Cup Bawaan
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.cupsRemaining ?? 50}
                    onChange={e => setFormData({ ...formData, cupsRemaining: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #EFECE6', background: '#FFFFFF', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #E6C665, #D4AF37)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Save size={16} /> Simpan Data Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  User,
  Clock,
  Compass,
  CheckCircle2,
  Edit,
  Trash2,
  X,
  Save
} from 'lucide-react';
import { outlets, Outlet } from '../data/adminData';

export const OutletView: React.FC = () => {
  const [outletList, setOutletList] = useState<Outlet[]>(outlets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOutlet, setEditingOutlet] = useState<Outlet | null>(null);
  const [formData, setFormData] = useState<Partial<Outlet>>({
    name: '',
    address: '',
    phone: '',
    manager: '',
    type: 'hub',
    openHour: '06:00',
    closeHour: '22:00',
    isActive: true,
    lat: -6.2088,
    lng: 106.8227
  });

  const handleToggleActive = (id: string) => {
    setOutletList(prev => prev.map(o => o.id === id ? { ...o, isActive: !o.isActive } : o));
  };

  const handleOpenAdd = () => {
    setEditingOutlet(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      manager: '',
      type: 'hub',
      openHour: '06:00',
      closeHour: '22:00',
      isActive: true,
      lat: -6.2088,
      lng: 106.8227
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (outlet: Outlet) => {
    setEditingOutlet(outlet);
    setFormData({ ...outlet });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingOutlet) {
      setOutletList(prev => prev.map(o => o.id === editingOutlet.id ? { ...o, ...formData } as Outlet : o));
    } else {
      const newOutlet: Outlet = {
        id: `outlet-${Date.now()}`,
        name: formData.name || 'Outlet Baru',
        address: formData.address || '',
        phone: formData.phone || '',
        manager: formData.manager || '',
        type: formData.type || 'hub',
        openHour: formData.openHour || '06:00',
        closeHour: formData.closeHour || '22:00',
        isActive: formData.isActive ?? true,
        lat: Number(formData.lat) || -6.2088,
        lng: Number(formData.lng) || 106.8227
      };
      setOutletList(prev => [...prev, newOutlet]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus titik outlet/hub ini?')) {
      setOutletList(prev => prev.filter(o => o.id !== id));
    }
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Pengaturan Titik Outlet & Hub Logistik
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Pangkalan armada gerobak baterai listrik, dapur sentral commissary, dan gudang distribusi bahan baku.
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
          <Plus size={16} /> Tambah Hub / Outlet
        </button>
      </div>

      {/* Grid of Outlets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {outletList.map(outlet => {
          const typeBadgeColor =
            outlet.type === 'hub' ? '#B38F2A' : outlet.type === 'commissary' ? '#0284C7' : '#4B5563';
          const typeBadgeBg =
            outlet.type === 'hub' ? '#FBF8F1' : outlet.type === 'commissary' ? '#F0F9FF' : '#F3F4F6';

          return (
            <div
              key={outlet.id}
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
                        background: typeBadgeBg,
                        border: `1px solid ${typeBadgeColor}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: typeBadgeColor
                      }}
                    >
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
                        {outlet.name}
                      </h3>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: typeBadgeBg,
                          color: typeBadgeColor,
                          display: 'inline-block',
                          marginTop: '4px'
                        }}
                      >
                        {outlet.type === 'hub' ? '⚡ PANGKALAN ARMADA CART' : outlet.type === 'commissary' ? '☕ DAPUR SENTRAL ROASTERY' : '📦 GUDANG BAHAN BAKU'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleActive(outlet.id)}
                    style={{
                      background: outlet.isActive ? '#ECFDF5' : '#FEF2F2',
                      color: outlet.isActive ? '#059669' : '#DC2626',
                      border: `1px solid ${outlet.isActive ? '#A7F3D0' : '#FECACA'}`,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {outlet.isActive ? 'Operasional' : 'Non-Aktif'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#57524C' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <MapPin size={15} color="#B38F2A" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{outlet.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={15} color="#B38F2A" />
                    <span>Jam Operasi: <strong>{outlet.openHour} - {outlet.closeHour} WIB</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={15} color="#B38F2A" />
                    <span>Manager: <strong>{outlet.manager}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={15} color="#B38F2A" />
                    <span>Kontak: <strong>{outlet.phone}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Compass size={15} color="#B38F2A" />
                    <span>Koordinat GPS: {outlet.lat}, {outlet.lng}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div
                style={{
                  borderTop: '1px solid #F5F3EE',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: '11px', color: '#8C847A' }}>
                  ID: {outlet.id}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleOpenEdit(outlet)}
                    style={{
                      background: '#FBF8F1',
                      border: '1px solid #E8DCC4',
                      color: '#B38F2A',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Edit size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(outlet.id)}
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Trash2 size={13} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Outlet Modal */}
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
                {editingOutlet ? 'Edit Informasi Outlet' : 'Tambah Outlet / Hub Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7D756D" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Nama Outlet / Hub
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  placeholder="Contoh: Hub Sudirman Tower"
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Tipe Fasilitas
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                >
                  <option value="hub">⚡ Pangkalan Hub Armada Cart</option>
                  <option value="commissary">☕ Dapur Sentral Commissary Roastery</option>
                  <option value="warehouse">📦 Gudang Bahan Baku Logistik</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Alamat Lengkap
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address || ''}
                  placeholder="Jl. Jendral Sudirman Kav. 5..."
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Manager Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.manager || ''}
                    placeholder="Nama Manager"
                    onChange={e => setFormData({ ...formData, manager: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Nomor Telepon / Hotline
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Jam Buka (WIB)
                  </label>
                  <input
                    type="text"
                    value={formData.openHour || '06:00'}
                    onChange={e => setFormData({ ...formData, openHour: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Jam Tutup (WIB)
                  </label>
                  <input
                    type="text"
                    value={formData.closeHour || '22:00'}
                    onChange={e => setFormData({ ...formData, closeHour: e.target.value })}
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
                  <Save size={16} /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


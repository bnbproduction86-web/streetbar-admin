import React, { useState } from 'react';
import {
  Ticket,
  Plus,
  Search,
  Calendar,
  Percent,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  X,
  Save,
  Tag
} from 'lucide-react';
import { promoVouchers, PromoVoucher } from '../data/adminData';

export const PromoView: React.FC = () => {
  const [promos, setPromos] = useState<PromoVoucher[]>(promoVouchers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoVoucher | null>(null);
  const [formData, setFormData] = useState<Partial<PromoVoucher>>({
    code: '',
    title: '',
    description: '',
    discountType: 'percent',
    discountValue: 20,
    maxDiscount: 20000,
    minOrder: 30000,
    validFrom: '2026-10-01',
    validTo: '2026-11-30',
    usageLimit: 500,
    usedCount: 0,
    isActive: true
  });

  const filteredPromos = promos.filter(p =>
    p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleActive = (id: string) => {
    setPromos(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const handleOpenAdd = () => {
    setEditingPromo(null);
    setFormData({
      code: 'GOLDNEW',
      title: 'Diskon Spesial Gold Club',
      description: 'Potongan harga khusus untuk pemesanan melalui aplikasi StreetBar',
      discountType: 'percent',
      discountValue: 20,
      maxDiscount: 15000,
      minOrder: 25000,
      validFrom: '2026-10-28',
      validTo: '2026-11-30',
      usageLimit: 250,
      usedCount: 0,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: PromoVoucher) => {
    setEditingPromo(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.title) return;

    if (editingPromo) {
      setPromos(prev => prev.map(p => p.id === editingPromo.id ? { ...p, ...formData } as PromoVoucher : p));
    } else {
      const newV: PromoVoucher = {
        id: `promo-${Date.now()}`,
        code: formData.code?.toUpperCase() || 'PROMO',
        title: formData.title || 'Voucher Promo',
        description: formData.description || '',
        discountType: formData.discountType || 'percent',
        discountValue: Number(formData.discountValue) || 10,
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
        minOrder: Number(formData.minOrder) || 0,
        validFrom: formData.validFrom || '2026-10-28',
        validTo: formData.validTo || '2026-11-30',
        usageLimit: Number(formData.usageLimit) || 100,
        usedCount: 0,
        isActive: formData.isActive ?? true
      };
      setPromos(prev => [newV, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus voucher promo ini?')) {
      setPromos(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Manajemen Promo, Diskon & Kode Voucher
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Buat kupon potongan belanja, diskon persen, kuota klaim, dan tanggal masa aktif kampanye.
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
          <Plus size={16} /> Buat Voucher Promo Baru
        </button>
      </div>

      {/* Search */}
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
            placeholder="Cari kode promo atau judul..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', fontSize: '12px', width: '100%' }}
          />
        </div>

        <span style={{ fontSize: '12px', color: '#7D756D' }}>
          Menampilkan {filteredPromos.length} voucher aktif & terjadwal
        </span>
      </div>

      {/* Voucher Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredPromos.map(promo => {
          const quotaUsedPct = ((promo.usedCount / promo.usageLimit) * 100).toFixed(0);

          return (
            <div
              key={promo.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #EFECE6',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Top Banner Gold */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1C1917 0%, #2D2622 100%)',
                  padding: '18px 20px',
                  color: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ticket size={20} color="#D4AF37" />
                  <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '1px', color: '#FAF7F0' }}>
                    {promo.code}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleActive(promo.id)}
                  style={{
                    background: promo.isActive ? '#ECFDF5' : '#FEF2F2',
                    color: promo.isActive ? '#059669' : '#DC2626',
                    border: 'none',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {promo.isActive ? 'Aktif' : 'Non-Aktif'}
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#1C1917' }}>
                    {promo.title}
                  </h4>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#7D756D' }}>
                    {promo.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#FBF8F1', border: '1px solid #E8DCC4', color: '#B38F2A', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                    {promo.discountType === 'percent' ? `Diskon ${promo.discountValue}% (Maks. Rp ${promo.maxDiscount?.toLocaleString('id-ID')})` : `Potongan Rp ${promo.discountValue.toLocaleString('id-ID')}`}
                  </span>
                  <span style={{ background: '#F5F3EE', color: '#57524C', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                    Min. Order: Rp {promo.minOrder.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Quota Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7D756D', marginBottom: '4px' }}>
                    <span>Pemakaian Kuota Voucher:</span>
                    <strong>{promo.usedCount} / {promo.usageLimit} ({quotaUsedPct}%)</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#F2EDE4', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${quotaUsedPct}%`, height: '100%', background: 'linear-gradient(90deg, #E6C665, #D4AF37)', borderRadius: '3px' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#8C847A' }}>
                  <Calendar size={13} color="#B38F2A" />
                  <span>Periode: <strong>{promo.validFrom} s/d {promo.validTo}</strong></span>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: '1px solid #F5F3EE',
                  padding: '12px 20px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  background: '#FAF9F6'
                }}
              >
                <button
                  onClick={() => handleOpenEdit(promo)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E8DCC4',
                    color: '#B38F2A',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Edit Voucher
                </button>
                <button
                  onClick={() => handleDelete(promo.id)}
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    color: '#DC2626',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
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
                {editingPromo ? 'Edit Voucher Promo' : 'Buat Voucher Promo Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7D756D" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Kode Voucher (Kupon)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code || ''}
                    placeholder="Contoh: STREETBAR50"
                    onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontWeight: 800 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Tipe Diskon
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={e => setFormData({ ...formData, discountType: e.target.value as any })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  >
                    <option value="percent">Persentase (%)</option>
                    <option value="fixed">Nominal Tetap (Rp)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Judul Promo
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  placeholder="Diskon 50% Pengguna Baru"
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Besar Diskon ({formData.discountType === 'percent' ? '%' : 'Rp'})
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue || 0}
                    onChange={e => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Maks. Diskon (Rp)
                  </label>
                  <input
                    type="number"
                    value={formData.maxDiscount || ''}
                    placeholder="Kosongkan jika unlimited"
                    onChange={e => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Min. Belanja (Rp)
                  </label>
                  <input
                    type="number"
                    value={formData.minOrder || 0}
                    onChange={e => setFormData({ ...formData, minOrder: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Batas Kuota Pemakaian
                  </label>
                  <input
                    type="number"
                    value={formData.usageLimit || 100}
                    onChange={e => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Berlaku Mulai
                  </label>
                  <input
                    type="date"
                    value={formData.validFrom || ''}
                    onChange={e => setFormData({ ...formData, validFrom: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Berlaku Hingga
                  </label>
                  <input
                    type="date"
                    value={formData.validTo || ''}
                    onChange={e => setFormData({ ...formData, validTo: e.target.value })}
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
                  <Save size={16} /> Simpan Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import {
  Image,
  Plus,
  Eye,
  MousePointer,
  Calendar,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  Save,
  Radio,
  Send,
  Sparkles
} from 'lucide-react';
import { mediaPromos, MediaPromo } from '../data/adminData';

export const MediaPromoView: React.FC = () => {
  const [medias, setMedias] = useState<MediaPromo[]>(mediaPromos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaPromo | null>(null);
  const [formData, setFormData] = useState<Partial<MediaPromo>>({
    title: '',
    type: 'banner',
    placement: 'home_banner',
    imageUrl: '/images/cart.jpg',
    targetUrl: '/menu/gold-latte',
    startDate: '2026-10-28',
    endDate: '2026-11-30',
    isActive: true,
    impressions: 0,
    clicks: 0
  });

  const handleToggleActive = (id: string) => {
    setMedias(prev => prev.map(m => m.id === id ? { ...m, isActive: !m.isActive } : m));
  };

  const handleOpenAdd = () => {
    setEditingMedia(null);
    setFormData({
      title: 'Promo Spesial Musim Hujan',
      type: 'banner',
      placement: 'home_banner',
      imageUrl: '/images/cart.jpg',
      targetUrl: '/menu/streetbar-gold-latte',
      startDate: '2026-10-28',
      endDate: '2026-11-30',
      isActive: true,
      impressions: 0,
      clicks: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: MediaPromo) => {
    setEditingMedia(m);
    setFormData({ ...m });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingMedia) {
      setMedias(prev => prev.map(m => m.id === editingMedia.id ? { ...m, ...formData } as MediaPromo : m));
    } else {
      const newMedia: MediaPromo = {
        id: `media-${Date.now()}`,
        title: formData.title || 'Banner Baru',
        type: formData.type || 'banner',
        placement: formData.placement || 'home_banner',
        imageUrl: formData.imageUrl || '/images/cart.jpg',
        targetUrl: formData.targetUrl || '/menu',
        startDate: formData.startDate || '2026-10-28',
        endDate: formData.endDate || '2026-11-30',
        isActive: formData.isActive ?? true,
        impressions: 0,
        clicks: 0
      };
      setMedias(prev => [newMedia, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus media promosi ini?')) {
      setMedias(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Media Promosi & Banner Marketing
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Atur visual hero banner beranda aplikasi StreetBar, modal popup pengumuman, dan analitik interaksi CTR.
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
          <Plus size={16} /> Pasang Media Promosi Baru
        </button>
      </div>

      {/* Media Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {medias.map(item => {
          const ctr = item.impressions > 0 ? ((item.clicks / item.impressions) * 100).toFixed(1) : '0.0';

          return (
            <div
              key={item.id}
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
              {/* Media Preview Image */}
              <div style={{ position: 'relative', height: '150px', background: '#1C1917' }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: item.isActive ? 1 : 0.6 }}
                  onError={(e: any) => { e.target.src = '/images/cart.jpg'; }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(28, 25, 23, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#D4AF37',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(212, 175, 55, 0.4)'
                  }}
                >
                  {item.placement === 'home_banner' ? 'HERO BANNER BERANDA' : item.placement === 'splash' ? 'SPLASH POPUP' : 'IN-APP CARD'}
                </div>

                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <button
                    onClick={() => handleToggleActive(item.id)}
                    style={{
                      background: item.isActive ? '#059669' : '#DC2626',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {item.isActive ? 'Tayang' : 'Nonaktif'}
                  </button>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#1C1917' }}>
                    {item.title}
                  </h4>
                  <div style={{ fontSize: '11px', color: '#B38F2A', fontWeight: 700, marginTop: '2px' }}>
                    Target Klik: {item.targetUrl}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: '#FAF9F6', padding: '10px', borderRadius: '12px', border: '1px solid #EFECE6', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#7D756D' }}>Dilihat</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#1C1917' }}>
                      {item.impressions.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#7D756D' }}>Diklik</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#1C1917' }}>
                      {item.clicks.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#7D756D' }}>Rasio CTR</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#B38F2A' }}>
                      {ctr}%
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#8C847A' }}>
                  <Calendar size={13} color="#B38F2A" />
                  <span>Jadwal Tayang: {item.startDate} s/d {item.endDate}</span>
                </div>
              </div>

              {/* Action Footer */}
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
                  onClick={() => handleOpenEdit(item)}
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
                  Edit Media
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
                {editingMedia ? 'Edit Media Promosi' : 'Pasang Banner Promosi Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7D756D" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Judul Kampanye Promo
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  placeholder="StreetBar Modern Mobile Cart"
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Posisi Penempatan
                  </label>
                  <select
                    value={formData.placement}
                    onChange={e => setFormData({ ...formData, placement: e.target.value as any })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  >
                    <option value="home_banner">Hero Banner Beranda</option>
                    <option value="splash">Splash Screen / Popup</option>
                    <option value="in_app">Kartu Notifikasi In-App</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Tautan Aksi (Target Click)
                  </label>
                  <input
                    type="text"
                    value={formData.targetUrl || ''}
                    placeholder="/menu atau https://..."
                    onChange={e => setFormData({ ...formData, targetUrl: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  URL Gambar Banner
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl || ''}
                  placeholder="/images/cart.jpg atau URL Web"
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Tanggal Mulai Tayang
                  </label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Tanggal Berakhir
                  </label>
                  <input
                    type="date"
                    value={formData.endDate || ''}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
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
                  <Save size={16} /> Simpan Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


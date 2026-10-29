import React, { useState } from 'react';
import {
  Tags,
  Plus,
  Coffee,
  Sparkles,
  ShoppingBag,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  Save
} from 'lucide-react';
import { menuItems } from '../data/adminData';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  isActive: boolean;
}

export const CategoryView: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: 'cat-1',
      name: 'Kopi Signature Flores',
      slug: 'coffee',
      icon: '☕',
      description: 'Olahan kopi arabika single origin Bajawa Flores diseduh barista gerobak listrik',
      isActive: true
    },
    {
      id: 'cat-2',
      name: 'Non-Kopi & Teh Artisan',
      slug: 'non-coffee',
      icon: '🍫',
      description: 'Matcha Uji Kyoto, Belgian dark chocolate, dan royal milk tea',
      isActive: true
    },
    {
      id: 'cat-3',
      name: 'Pastry & Fresh Bakery',
      slug: 'pastry',
      icon: '🥐',
      description: 'Croissant butter Prancis hangat dipanggang langsung di oven elektrik cart',
      isActive: true
    },
    {
      id: 'cat-4',
      name: 'Paket Promo & Bundle',
      slug: 'promo',
      icon: '🎉',
      description: 'Paket ngopi kantor dan bundle hemat mingguan',
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const [formData, setFormData] = useState<Partial<CategoryItem>>({
    name: '',
    slug: '',
    icon: '☕',
    description: '',
    isActive: true
  });

  const handleToggle = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormData({ name: '', slug: '', icon: '☕', description: '', isActive: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: CategoryItem) => {
    setEditingCat(c);
    setFormData({ ...c });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingCat) {
      setCategories(prev => prev.map(c => c.id === editingCat.id ? { ...c, ...formData } as CategoryItem : c));
    } else {
      const newC: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: formData.name || 'Kategori Baru',
        slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || 'kategori',
        icon: formData.icon || '☕',
        description: formData.description || '',
        isActive: formData.isActive ?? true
      };
      setCategories(prev => [...prev, newC]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus kategori ini?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Manajemen Kategori Produk
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Klasifikasi menu, icon visual, dan urutan tab kategori di aplikasi pelanggan StreetBar.
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
          <Plus size={16} /> Tambah Kategori Baru
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {categories.map(cat => {
          const itemCount = menuItems.filter(m => m.category === cat.slug).length;

          return (
            <div
              key={cat.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '22px',
                border: '1px solid #EFECE6',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: '#FBF8F1',
                      border: '1px solid #E8DCC4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}
                  >
                    {cat.icon}
                  </div>

                  <button
                    onClick={() => handleToggle(cat.id)}
                    style={{
                      background: cat.isActive ? '#ECFDF5' : '#FEF2F2',
                      color: cat.isActive ? '#059669' : '#DC2626',
                      border: `1px solid ${cat.isActive ? '#A7F3D0' : '#FECACA'}`,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {cat.isActive ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
                  {cat.name}
                </h3>
                <div style={{ fontSize: '11px', color: '#B38F2A', fontWeight: 700, margin: '2px 0 6px' }}>
                  Slug: #{cat.slug}
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: '#7D756D', lineHeight: 1.5 }}>
                  {cat.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid #F5F3EE',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1C1917' }}>
                  {itemCount} Menu Terdaftar
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    style={{
                      background: '#FBF8F1',
                      border: '1px solid #E8DCC4',
                      color: '#B38F2A',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
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
          <div style={{ background: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '440px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                {editingCat ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7D756D" />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Nama Kategori
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Icon Emoji
                  </label>
                  <input
                    type="text"
                    value={formData.icon || '☕'}
                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', textAlign: 'center', fontSize: '18px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Slug URL
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Deskripsi Kategori
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #EFECE6', background: '#FFFFFF', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #E6C665, #D4AF37)', color: '#FFFFFF', fontWeight: 800, cursor: 'pointer' }}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


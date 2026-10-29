import React, { useState } from 'react';
import {
  Coffee,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Package,
  Layers,
  ArrowUpDown,
  X,
  Save
} from 'lucide-react';
import { menuItems, stockItems, AdminMenuItem, StockItem } from '../data/adminData';

export const MenuStockView: React.FC = () => {
  const [items, setItems] = useState<AdminMenuItem[]>(menuItems);
  const [stocks, setStocks] = useState<StockItem[]>(stockItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'menu' | 'inventory'>('menu');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<AdminMenuItem>>({
    name: '',
    category: 'coffee',
    description: '',
    price: 15000,
    costPrice: 5000,
    stockQuantity: 100,
    isAvailable: true,
    supplier: 'PT StreetBar Roastery',
    badge: 'New'
  });

  // Filtered menu
  const filteredItems = items.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleToggleStatus = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item));
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'coffee',
      description: '',
      price: 15000,
      costPrice: 5000,
      stockQuantity: 100,
      isAvailable: true,
      supplier: 'PT StreetBar Roastery',
      badge: '👑 Signature'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: AdminMenuItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingItem) {
      setItems(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...formData } as AdminMenuItem : item));
    } else {
      const newItem: AdminMenuItem = {
        id: `menu-${Date.now()}`,
        name: formData.name || 'Menu Baru',
        category: (formData.category as any) || 'coffee',
        description: formData.description || '',
        price: Number(formData.price) || 0,
        costPrice: Number(formData.costPrice) || 0,
        stockQuantity: Number(formData.stockQuantity) || 0,
        isAvailable: formData.isAvailable ?? true,
        image: '/images/gold_latte.jpg',
        badge: formData.badge,
        supplier: formData.supplier || 'StreetBar Central Hub'
      };
      setItems(prev => [newItem, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus menu ini dari katalog?')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleRestock = (menuItemId: string, outletId: string, addQty: number) => {
    setStocks(prev => prev.map(st => {
      if (st.menuItemId === menuItemId && st.outletId === outletId) {
        const newQty = st.currentStock + addQty;
        return {
          ...st,
          currentStock: newQty,
          status: newQty > st.minStock ? 'ok' : 'low',
          lastRestocked: new Date().toISOString().split('T')[0]
        };
      }
      return st;
    }));
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Manajemen Menu & Stok Bahan
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Atur harga jual, kalkulasi margin laba HPP, persediaan porsi per-outlet dan ketersediaan menu.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', border: '1px solid #EFECE6', borderRadius: '12px', padding: '4px' }}>
            <button
              onClick={() => setActiveTab('menu')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'menu' ? '#1C1917' : 'none',
                color: activeTab === 'menu' ? '#D4AF37' : '#7D756D',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Katalog Menu ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'inventory' ? '#1C1917' : 'none',
                color: activeTab === 'inventory' ? '#D4AF37' : '#7D756D',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Gudang & Hub Stok ({stocks.length})
            </button>
          </div>

          <button
            onClick={handleOpenAddModal}
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
            <Plus size={16} /> Tambah Menu Baru
          </button>
        </div>
      </div>

      {activeTab === 'menu' ? (
        <>
          {/* Filter Bar */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid #EFECE6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'all', label: 'Semua Kategori' },
                { id: 'coffee', label: '☕ Kopi' },
                { id: 'non-coffee', label: '🍫 Non-Kopi' },
                { id: 'pastry', label: '🥐 Pastry' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: selectedCategory === cat.id ? '2px solid #D4AF37' : '1px solid #EFECE6',
                    background: selectedCategory === cat.id ? '#FBF8F1' : '#FFFFFF',
                    color: selectedCategory === cat.id ? '#B38F2A' : '#57524C',
                    fontWeight: selectedCategory === cat.id ? 800 : 600,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FAF9F6',
                border: '1px solid #E8DCC4',
                borderRadius: '10px',
                padding: '8px 12px',
                width: '300px'
              }}
            >
              <Search size={15} color="#B38F2A" />
              <input
                type="text"
                placeholder="Cari menu, rasa, atau bahan..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'none',
                  outline: 'none',
                  fontSize: '12px',
                  width: '100%',
                  color: '#1C1917'
                }}
              />
            </div>
          </div>

          {/* Menu Table */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EFECE6',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#FAF9F6', borderBottom: '1px solid #EFECE6', textAlign: 'left', color: '#7D756D' }}>
                  <th style={{ padding: '14px 18px', fontWeight: 700 }}>Menu & Deskripsi</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Kategori</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Harga Jual</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>HPP Modal</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Laba Kotor (Margin)</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Stok Porsi</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => {
                  const profit = item.price - item.costPrice;
                  const marginPct = ((profit / item.price) * 100).toFixed(0);

                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F5F3EE' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
                            onError={(e: any) => { e.target.src = '/images/gold_latte.jpg'; }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, color: '#1C1917', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {item.name}
                              {item.badge && (
                                <span style={{ fontSize: '9px', fontWeight: 800, background: '#FBF8F1', color: '#B38F2A', border: '1px solid #E8DCC4', padding: '1px 6px', borderRadius: '4px' }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '11px', color: '#8C847A', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '4px 8px',
                            borderRadius: '6px',
                            background: item.category === 'coffee' ? '#FBF8F1' : item.category === 'non-coffee' ? '#F0F9FF' : '#FEF3C7',
                            color: item.category === 'coffee' ? '#B38F2A' : item.category === 'non-coffee' ? '#0284C7' : '#D97706'
                          }}
                        >
                          {item.category.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#1C1917' }}>
                        Rp {item.price.toLocaleString('id-ID')}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#7D756D' }}>
                        Rp {item.costPrice.toLocaleString('id-ID')}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 800, color: '#10B981', fontSize: '13px' }}>
                            {marginPct}%
                          </span>
                          <span style={{ fontSize: '11px', color: '#8C847A' }}>
                            (Rp {profit.toLocaleString('id-ID')})
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: item.stockQuantity > 50 ? '#10B981' : item.stockQuantity > 10 ? '#F59E0B' : '#EF4444'
                            }}
                          />
                          <span style={{ fontWeight: 700, color: '#1C1917' }}>
                            {item.stockQuantity} Porsi
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          style={{
                            background: item.isAvailable ? '#ECFDF5' : '#FEF2F2',
                            color: item.isAvailable ? '#059669' : '#DC2626',
                            border: `1px solid ${item.isAvailable ? '#A7F3D0' : '#FECACA'}`,
                            padding: '4px 10px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          {item.isAvailable ? 'Aktif (Tersedia)' : 'Non-Aktif (Habis)'}
                        </button>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            title="Edit Menu"
                            style={{
                              background: '#FBF8F1',
                              border: '1px solid #E8DCC4',
                              borderRadius: '8px',
                              padding: '6px',
                              cursor: 'pointer',
                              color: '#B38F2A'
                            }}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            title="Hapus Menu"
                            style={{
                              background: '#FEF2F2',
                              border: '1px solid #FECACA',
                              borderRadius: '8px',
                              padding: '6px',
                              cursor: 'pointer',
                              color: '#DC2626'
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Inventory / Warehouse View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {['Hub Sudirman', 'Commissary Kemang', 'Gudang Cikarang'].map(outletName => {
              const outletStocks = stocks.filter(s => s.outletName === outletName);
              const lowCount = outletStocks.filter(s => s.status === 'low' || s.status === 'out').length;

              return (
                <div
                  key={outletName}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    border: '1px solid #EFECE6',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1C1917', marginBottom: '6px' }}>
                    🏢 {outletName}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#7D756D' }}>
                    <span>Total Stok Bahan:</span>
                    <strong style={{ color: '#1C1917' }}>{outletStocks.reduce((a, b) => a + b.currentStock, 0)} Porsi</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#7D756D', marginTop: '4px' }}>
                    <span>Peringatan Stok Rendah:</span>
                    <strong style={{ color: lowCount > 0 ? '#EF4444' : '#10B981' }}>{lowCount} Menu</strong>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EFECE6',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#FAF9F6', borderBottom: '1px solid #EFECE6', textAlign: 'left', color: '#7D756D' }}>
                  <th style={{ padding: '14px 18px', fontWeight: 700 }}>Menu Item</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Lokasi / Outlet</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Stok Saat Ini</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Batas Minimum</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Terakhir Restock</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>Status Stok</th>
                  <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Aksi Tambah Stok</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((st, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F5F3EE' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 700, color: '#1C1917' }}>
                      {st.menuItemName}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#57524C' }}>
                      {st.outletName}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#1C1917' }}>
                      {st.currentStock} {st.unit}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#7D756D' }}>
                      {st.minStock} {st.unit}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#7D756D' }}>
                      {st.lastRestocked}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: st.status === 'ok' ? '#ECFDF5' : st.status === 'low' ? '#FEF3C7' : '#FEF2F2',
                          color: st.status === 'ok' ? '#059669' : st.status === 'low' ? '#D97706' : '#DC2626'
                        }}
                      >
                        {st.status === 'ok' ? 'Aman' : st.status === 'low' ? 'Menipis' : 'Habis!'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          onClick={() => handleRestock(st.menuItemId, st.outletId, 25)}
                          style={{
                            background: '#FBF8F1',
                            border: '1px solid #E8DCC4',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#B38F2A',
                            cursor: 'pointer'
                          }}
                        >
                          +25 Porsi
                        </button>
                        <button
                          onClick={() => handleRestock(st.menuItemId, st.outletId, 50)}
                          style={{
                            background: '#1C1917',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#D4AF37',
                            cursor: 'pointer'
                          }}
                        >
                          +50 Porsi
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
              maxWidth: '560px',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1C1917' }}>
                {editingItem ? 'Edit Informasi Menu' : 'Tambah Menu Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7D756D' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                  Nama Menu
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
                  >
                    <option value="coffee">☕ Kopi Signature</option>
                    <option value="non-coffee">🍫 Non-Kopi & Teh</option>
                    <option value="pastry">🥐 Pastry & Bakery</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    placeholder="Contoh: 👑 Signature"
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                    Harga Jual (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price || 0}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                    HPP Modal (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.costPrice || 0}
                    onChange={e => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                  Deskripsi Menu
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '10px',
                    border: '1px solid #EFECE6',
                    background: '#FFFFFF',
                    color: '#57524C',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
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
                  <Save size={16} /> Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


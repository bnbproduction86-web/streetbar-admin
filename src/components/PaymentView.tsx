import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Smartphone,
  Wallet,
  Building,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Key,
  Save,
  RefreshCw,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  X
} from 'lucide-react';
import { paymentMethods, PaymentMethod } from '../data/adminData';

export const PaymentView: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethods);
  const [environment, setEnvironment] = useState<'production' | 'sandbox'>('production');
  const [merchantId, setMerchantId] = useState('STREETBAR-MIDTRANS-99410');
  const [serverKey, setServerKey] = useState('Mid-server-StreetBarLive-9xK2094182901');
  const [clientKey, setClientKey] = useState('Mid-client-StreetBarPublic-298319028');
  const [webhookUrl, setWebhookUrl] = useState('https://api.streetbar.id/v1/payment/webhook');
  const [isSaved, setIsSaved] = useState(false);

  // Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [methodFormData, setMethodFormData] = useState<Partial<PaymentMethod>>({
    name: '',
    provider: '',
    fee: 0.7,
    isActive: true,
    type: 'qris'
  });

  const handleToggleActive = (id: string) => {
    setMethods(prev => prev.map(m => m.id === id ? { ...m, isActive: !m.isActive } : m));
  };

  const handleOpenEdit = (m: PaymentMethod) => {
    setEditingMethod(m);
    setMethodFormData({ ...m });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMethod) {
      setMethods(prev => prev.map(m => m.id === editingMethod.id ? { ...m, ...methodFormData } as PaymentMethod : m));
    } else {
      const newM: PaymentMethod = {
        id: `pay-${Date.now()}`,
        name: methodFormData.name || 'Metode Pembayaran',
        provider: methodFormData.provider || 'Gateway',
        fee: Number(methodFormData.fee) || 0,
        isActive: methodFormData.isActive ?? true,
        type: methodFormData.type || 'ewallet',
        apiKey: 'sk-live-streetbar-99',
        icon: 'wallet'
      };
      setMethods(prev => [...prev, newM]);
    }
    setIsModalOpen(false);
  };

  const handleSaveGateway = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Pengaturan API & Sistem Pembayaran
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Integrasi Payment Gateway, QRIS Dinamis Bank Indonesia, e-Wallet, Virtual Account dan Tunai.
          </p>
        </div>

        {/* Environment Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFFFFF', padding: '4px 6px', borderRadius: '12px', border: '1px solid #EFECE6' }}>
          <button
            onClick={() => setEnvironment('production')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: environment === 'production' ? 'linear-gradient(135deg, #E6C665, #D4AF37)' : 'none',
              color: environment === 'production' ? '#FFFFFF' : '#7D756D',
              fontWeight: 800,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🟢 Production (Live)
          </button>
          <button
            onClick={() => setEnvironment('sandbox')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: environment === 'sandbox' ? '#1C1917' : 'none',
              color: environment === 'sandbox' ? '#D4AF37' : '#7D756D',
              fontWeight: 800,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🟡 Sandbox (Testing)
          </button>
        </div>
      </div>

      {/* Gateway API Credentials Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '26px',
          border: '1px solid #EFECE6',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#FBF8F1',
                border: '1px solid #E8DCC4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B38F2A'
              }}
            >
              <Key size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
                Kredensial Gateway Utama (Midtrans / Xendit API)
              </h3>
              <span style={{ fontSize: '11px', color: '#7D756D' }}>
                Digunakan untuk generate QRIS instan otomatis dan notifikasi webhook pembayaran lunas.
              </span>
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
            Webhook Status: Connected ⚡
          </span>
        </div>

        <form onSubmit={handleSaveGateway} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                Merchant ID (NMID)
              </label>
              <input
                type="text"
                value={merchantId}
                onChange={e => setMerchantId(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px', background: '#FAF9F6' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                Webhook Callback URL
              </label>
              <input
                type="text"
                value={webhookUrl}
                onChange={e => setWebhookUrl(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px', background: '#FAF9F6' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                Server Key (Secret Key)
              </label>
              <input
                type="password"
                value={serverKey}
                onChange={e => setServerKey(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px', fontFamily: 'monospace', background: '#FAF9F6' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C1917', marginBottom: '4px' }}>
                Client Key (Public Key)
              </label>
              <input
                type="text"
                value={clientKey}
                onChange={e => setClientKey(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '13px', fontFamily: 'monospace', background: '#FAF9F6' }}
              />
            </div>
          </div>

          {isSaved && (
            <div style={{ padding: '10px', borderRadius: '8px', background: '#ECFDF5', color: '#059669', fontSize: '12px', fontWeight: 700, textAlign: 'center' }}>
              ✅ Kredensial Payment Gateway berhasil diperbarui!
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #E6C665, #D4AF37)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Save size={15} /> Simpan Kredensial API
            </button>
          </div>
        </form>
      </div>

      {/* Payment Channels Table */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #EFECE6',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #EFECE6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
              Metode Pembayaran yang Aktif di Aplikasi ({methods.filter(m => m.isActive).length}/{methods.length})
            </h3>
            <span style={{ fontSize: '11px', color: '#7D756D' }}>
              Kendalikan metode apa saja yang dapat dipilih oleh customer saat checkout di StreetBar.
            </span>
          </div>

          <button
            onClick={() => {
              setEditingMethod(null);
              setMethodFormData({ name: '', provider: 'Midtrans', fee: 0.7, isActive: true, type: 'ewallet' });
              setIsModalOpen(true);
            }}
            style={{
              background: '#FBF8F1',
              border: '1px solid #E8DCC4',
              borderRadius: '10px',
              padding: '8px 14px',
              color: '#B38F2A',
              fontWeight: 800,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus size={15} /> Tambah Channel Bayar
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#FAF9F6', borderBottom: '1px solid #EFECE6', textAlign: 'left', color: '#7D756D' }}>
              <th style={{ padding: '14px 20px', fontWeight: 700 }}>Metode & Provider</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Tipe Transaksi</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>MDR Fee Transaksi</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Beban Biaya</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Status Layanan</th>
              <th style={{ padding: '14px 20px', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {methods.map(method => (
              <tr key={method.id} style={{ borderBottom: '1px solid #F5F3EE' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: '#FBF8F1',
                        border: '1px solid #E8DCC4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#B38F2A'
                      }}
                    >
                      {method.type === 'qris' ? <QrCode size={18} /> : method.type === 'ewallet' ? <Smartphone size={18} /> : method.type === 'bank_transfer' ? <Building size={18} /> : <DollarSign size={18} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#1C1917' }}>{method.name}</div>
                      <div style={{ fontSize: '11px', color: '#7D756D' }}>Powered by: {method.provider}</div>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: '#F5F3EE',
                      color: '#57524C'
                    }}
                  >
                    {method.type.toUpperCase()}
                  </span>
                </td>

                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1C1917' }}>
                  {method.fee === 0 ? 'Gratis (0%)' : `${method.fee}% per transaksi`}
                </td>

                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#57524C' }}>
                  Ditanggung Merchant (StreetBar)
                </td>

                <td style={{ padding: '14px 16px' }}>
                  <button
                    onClick={() => handleToggleActive(method.id)}
                    style={{
                      background: method.isActive ? '#ECFDF5' : '#FEF2F2',
                      color: method.isActive ? '#059669' : '#DC2626',
                      border: `1px solid ${method.isActive ? '#A7F3D0' : '#FECACA'}`,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {method.isActive ? 'Aktif di App' : 'Dinonaktifkan'}
                  </button>
                </td>

                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleOpenEdit(method)}
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
                    Atur Fee & Kunci
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              maxWidth: '480px',
              padding: '26px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1C1917' }}>
                {editingMethod ? `Atur ${editingMethod.name}` : 'Tambah Metode Pembayaran'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7D756D" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Nama Tampilan di Aplikasi
                </label>
                <input
                  type="text"
                  required
                  value={methodFormData.name || ''}
                  onChange={e => setMethodFormData({ ...methodFormData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Provider / Gateway
                  </label>
                  <input
                    type="text"
                    required
                    value={methodFormData.provider || ''}
                    onChange={e => setMethodFormData({ ...methodFormData, provider: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    Fee MDR (%)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={methodFormData.fee ?? 0}
                    onChange={e => setMethodFormData({ ...methodFormData, fee: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #E8DCC4' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={methodFormData.isActive}
                    onChange={e => setMethodFormData({ ...methodFormData, isActive: e.target.checked })}
                  />
                  <span>Aktifkan metode ini agar muncul di pilihan checkout pelanggan</span>
                </label>
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
                    cursor: 'pointer'
                  }}
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


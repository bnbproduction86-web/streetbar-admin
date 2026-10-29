import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Filter,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { transactions, Transaction } from '../data/adminData';

export const TransactionView: React.FC = () => {
  const [data, setData] = useState<Transaction[]>(transactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filteredData = data.filter(tx => {
    const matchesSearch = tx.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || tx.paymentMethod.toLowerCase() === paymentFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalOmset = filteredData.reduce((a, b) => a + b.total, 0);

  const handleExportCSV = () => {
    const headers = ['No Order', 'Tanggal', 'Pelanggan', 'Metode Bayar', 'Status', 'Total (IDR)'];
    const rows = filteredData.map(tx => [
      tx.orderNumber,
      tx.date,
      `"${tx.customerName}"`,
      tx.paymentMethod,
      tx.status,
      tx.total
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `streetbar-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
            Riwayat Pesanan & Transaksi Penjualan
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7D756D' }}>
            Pantau arus kas transaksi dari customer app, armada gerobak listrik, dan dapur sentral.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
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
          <Download size={16} /> Export ke CSV / Excel
        </button>
      </div>

      {/* Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #EFECE6' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7D756D' }}>TRANSAKSI TERFILTER</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#1C1917', marginTop: '4px' }}>
            {filteredData.length} Pesanan
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #EFECE6' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7D756D' }}>TOTAL NILAI OMSET</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#B38F2A', marginTop: '4px' }}>
            Rp {totalOmset.toLocaleString('id-ID')}
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #EFECE6' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7D756D' }}>RATA-RATA BASKET ORDER</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#1C1917', marginTop: '4px' }}>
            Rp {filteredData.length ? (totalOmset / filteredData.length).toLocaleString('id-ID', { maximumFractionDigits: 0 }) : 0}
          </div>
        </div>
      </div>

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
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '12px', fontWeight: 700, color: '#1C1917' }}
          >
            <option value="all">Semua Status</option>
            <option value="completed">Selesai (Completed)</option>
            <option value="pending">Sedang Diracik / Jalan</option>
            <option value="cancelled">Dibatalkan</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={e => setPaymentFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #E8DCC4', fontSize: '12px', fontWeight: 700, color: '#1C1917' }}
          >
            <option value="all">Semua Metode Bayar</option>
            <option value="QRIS">QRIS Dinamis</option>
            <option value="GoPay">GoPay</option>
            <option value="OVO">OVO</option>
            <option value="DANA">DANA</option>
            <option value="Bank Transfer">BCA Virtual Account</option>
          </select>
        </div>

        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FAF9F6',
            border: '1px solid #E8DCC4',
            borderRadius: '10px',
            padding: '8px 12px',
            width: '280px'
          }}
        >
          <Search size={15} color="#B38F2A" />
          <input
            type="text"
            placeholder="Cari No Order / Pelanggan..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', fontSize: '12px', width: '100%' }}
          />
        </div>
      </div>

      {/* Table */}
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
              <th style={{ padding: '14px 20px', fontWeight: 700 }}>No. Pesanan</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Waktu Masuk</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Pelanggan</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Daftar Item Menu</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Metode Bayar</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Total (Rp)</th>
              <th style={{ padding: '14px 16px', fontWeight: 700 }}>Status</th>
              <th style={{ padding: '14px 20px', fontWeight: 700, textAlign: 'right' }}>Rincian</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(tx => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #F5F3EE' }}>
                <td style={{ padding: '14px 20px', fontWeight: 800, color: '#1C1917' }}>
                  {tx.orderNumber}
                </td>
                <td style={{ padding: '14px 16px', color: '#7D756D' }}>
                  {tx.date}
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1C1917' }}>
                  {tx.customerName}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '12px', color: '#57524C' }}>
                    {tx.items.map(it => `${it.qty}x ${it.name}`).join(', ')}
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      background: '#FBF8F1',
                      color: '#B38F2A',
                      border: '1px solid #E8DCC4',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {tx.paymentMethod}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 800, color: '#1C1917' }}>
                  Rp {tx.total.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: tx.status === 'completed' ? '#ECFDF5' : tx.status === 'pending' ? '#FEF3C7' : '#FEF2F2',
                      color: tx.status === 'completed' ? '#059669' : tx.status === 'pending' ? '#D97706' : '#DC2626'
                    }}
                  >
                    {tx.status === 'completed' ? 'Lunas / Selesai' : tx.status === 'pending' ? 'Diproses' : 'Batal'}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedTx(tx)}
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
                      gap: '4px',
                      marginLeft: 'auto'
                    }}
                  >
                    <Eye size={13} /> Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
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
              maxWidth: '460px',
              padding: '26px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#B38F2A', fontWeight: 800 }}>STRUK DIGITAL STREETBAR</span>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1C1917' }}>
                  Pesanan #{selectedTx.orderNumber}
                </h3>
              </div>
              <button onClick={() => setSelectedTx(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#7D756D" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F5F3EE', paddingBottom: '8px' }}>
                <span style={{ color: '#7D756D' }}>Waktu Pemesanan:</span>
                <strong>{selectedTx.date}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F5F3EE', paddingBottom: '8px' }}>
                <span style={{ color: '#7D756D' }}>Pelanggan:</span>
                <strong>{selectedTx.customerName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F5F3EE', paddingBottom: '8px' }}>
                <span style={{ color: '#7D756D' }}>Metode Pembayaran:</span>
                <strong style={{ color: '#B38F2A' }}>{selectedTx.paymentMethod}</strong>
              </div>

              {/* Items */}
              <div style={{ background: '#FAF9F6', padding: '12px', borderRadius: '12px', border: '1px solid #EFECE6' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#7D756D', marginBottom: '8px' }}>
                  RINCIAN CUP & ITEM:
                </div>
                {selectedTx.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>{it.qty}x {it.name}</span>
                    <strong>Rp {(it.price * it.qty).toLocaleString('id-ID')}</strong>
                  </div>
                ))}
              </div>

              {/* Total Summary */}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7D756D' }}>
                <span>Subtotal:</span>
                <span>Rp {selectedTx.subtotal.toLocaleString('id-ID')}</span>
              </div>
              {selectedTx.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                  <span>Diskon Promo / Poin Gold:</span>
                  <span>- Rp {selectedTx.discount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7D756D' }}>
                <span>Ongkir Gerobak Listrik:</span>
                <span style={{ color: '#059669', fontWeight: 800 }}>GRATIS (Rp 0)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #1C1917', paddingTop: '10px', fontSize: '16px', fontWeight: 900 }}>
                <span>TOTAL AKHIR:</span>
                <span style={{ color: '#B38F2A' }}>Rp {selectedTx.total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '11px',
                borderRadius: '12px',
                border: 'none',
                background: '#1C1917',
                color: '#FFFFFF',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


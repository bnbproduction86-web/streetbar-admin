import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Wallet,
  Bike,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  BatteryCharging,
  Clock,
  Sparkles,
  Package
} from 'lucide-react';
import {
  dashboardStats,
  transactions,
  stockItems,
  cartUnits,
  Transaction,
  StockItem
} from '../data/adminData';

export const DashboardView: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  // Low stock items
  const lowStock = stockItems.filter(item => item.status === 'low' || item.status === 'out');
  const recentOrders = transactions.slice(0, 5);

  const weeklyData = [
    { day: 'Sen', rev: 2850000 },
    { day: 'Sel', rev: 3200000 },
    { day: 'Rab', rev: 3650000 },
    { day: 'Kam', rev: 4100000 },
    { day: 'Jum', rev: 4950000 },
    { day: 'Sab', rev: 5200000 },
    { day: 'Min', rev: 4400000 },
  ];
  const maxRev = Math.max(...weeklyData.map(d => d.rev));

  return (
    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner / Welcome */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1C1917 0%, #2A2421 100%)',
          borderRadius: '20px',
          padding: '24px 28px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          border: '1px solid #3E3835'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #E6C665, #D4AF37)',
                color: '#1C1917',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px'
              }}
            >
              STREETBAR EXECUTIVE
            </span>
            <span style={{ fontSize: '12px', color: '#B38F2A', fontWeight: 600 }}>
              Live System Status: Normal ⚡
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#FAF9F6' }}>
            Ringkasan Operasional StreetBar
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#A8A29E' }}>
            Pusat kendali armada gerobak baterai listrik, persediaan outlet & transaksi real-time.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 700 }}>TANGGAL SISTEM</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {/* Total Omset */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '20px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#7D756D' }}>TOTAL PENDAPATAN</span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#FBF8F1',
                border: '1px solid #E8DCC4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Wallet size={18} color="#B38F2A" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
              Rp {dashboardStats.totalRevenue.toLocaleString('id-ID')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <span style={{ color: '#10B981', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                <TrendingUp size={13} /> +18.4%
              </span>
              <span style={{ fontSize: '11px', color: '#8C847A' }}>vs bulan lalu</span>
            </div>
          </div>
        </div>

        {/* Total Pesanan */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '20px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#7D756D' }}>TOTAL PESANAN</span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#FBF8F1',
                border: '1px solid #E8DCC4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShoppingBag size={18} color="#B38F2A" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
              {dashboardStats.totalOrders.toLocaleString('id-ID')} Cup
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <span style={{ color: '#10B981', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                <ArrowUpRight size={13} /> +12.1%
              </span>
              <span style={{ fontSize: '11px', color: '#8C847A' }}>rata-rata Rp {dashboardStats.avgOrderValue.toLocaleString('id-ID')}/pesanan</span>
            </div>
          </div>
        </div>

        {/* Armada Siap */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '20px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#7D756D' }}>ARMADA GEROBAK LISTRIK</span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#FBF8F1',
                border: '1px solid #E8DCC4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bike size={18} color="#B38F2A" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
              {cartUnits.length} Unit Aktif
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '11px', color: '#57524C', fontWeight: 600 }}>Semua unit beroperasi 100% Nol Emisi</span>
            </div>
          </div>
        </div>

        {/* Pelanggan */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '20px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#7D756D' }}>PELANGGAN GOLD CLUB</span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#FBF8F1',
                border: '1px solid #E8DCC4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Users size={18} color="#B38F2A" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1C1917' }}>
              {(dashboardStats.newCustomers + dashboardStats.returningCustomers).toLocaleString('id-ID')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', color: '#B38F2A', fontWeight: 700 }}>
                {dashboardStats.newCustomers} Pelanggan Baru
              </span>
              <span style={{ fontSize: '11px', color: '#8C847A' }}>bulan ini</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Revenue Chart & Fleet Status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        {/* Weekly Revenue Bar Chart (Native SVG) */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
                Trend Pendapatan Mingguan
              </h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#7D756D' }}>
                Data performa penjualan 7 hari terakhir
              </p>
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#B38F2A',
                background: '#FBF8F1',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid #E8DCC4'
              }}
            >
              Rata-rata: Rp {(weeklyData.reduce((a, b) => a + b.rev, 0) / 7).toLocaleString('id-ID', { maximumFractionDigits: 0 })}/hari
            </span>
          </div>

          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '10px 0' }}>
            {weeklyData.map((d, i) => {
              const heightPct = (d.rev / maxRev) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#7D756D' }}>
                    {(d.rev / 1000000).toFixed(1)}jt
                  </div>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '44px',
                      height: `${heightPct}%`,
                      background: i === 5 ? 'linear-gradient(180deg, #E6C665 0%, #D4AF37 100%)' : '#F2EDE4',
                      borderRadius: '8px 8px 4px 4px',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: i === 5 ? '#B38F2A' : '#57524C' }}>
                    {d.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Fleet Snapshot */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
                Armada Siap Jalan (Live)
              </h3>
              <button
                onClick={() => onNavigate && onNavigate('fleet')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B38F2A',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                Lihat Semua <ChevronRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cartUnits.slice(0, 3).map(cart => (
                <div
                  key={cart.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#FAF9F6',
                    border: '1px solid #EFECE6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: '#FFFFFF',
                        border: '1px solid #E8DCC4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#B38F2A'
                      }}
                    >
                      <Bike size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#1C1917' }}>
                        {cart.code} • {cart.baristaName}
                      </div>
                      <div style={{ fontSize: '10px', color: '#7D756D' }}>
                        {cart.locationName}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', fontSize: '11px', fontWeight: 800, color: '#10B981' }}>
                      <BatteryCharging size={13} /> {cart.battery}%
                    </div>
                    <div style={{ fontSize: '10px', color: '#B38F2A', fontWeight: 700 }}>
                      {cart.cupsRemaining} Cup
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: '14px',
              padding: '10px',
              borderRadius: '10px',
              background: '#FBF8F1',
              border: '1px dashed #E8DCC4',
              textAlign: 'center',
              fontSize: '11px',
              color: '#8C847A'
            }}
          >
            ⚡ Semua armada menggunakan baterai lithium ramah lingkungan
          </div>
        </div>
      </div>

      {/* Row 3: Recent Orders Table & Low Stock Alert */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        {/* Recent Orders */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
              Pesanan Terakhir Masuk
            </h3>
            <button
              onClick={() => onNavigate && onNavigate('transactions')}
              style={{
                background: 'none',
                border: 'none',
                color: '#B38F2A',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              Lihat Detail <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #EFECE6', color: '#7D756D', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px', fontWeight: 700 }}>No. Order</th>
                  <th style={{ padding: '8px 10px', fontWeight: 700 }}>Pelanggan</th>
                  <th style={{ padding: '8px 10px', fontWeight: 700 }}>Metode</th>
                  <th style={{ padding: '8px 10px', fontWeight: 700 }}>Total</th>
                  <th style={{ padding: '8px 10px', fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((ord: Transaction) => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid #F5F3EE' }}>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#1C1917' }}>
                      {ord.orderNumber}
                    </td>
                    <td style={{ padding: '10px', color: '#57524C' }}>
                      {ord.customerName}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span
                        style={{
                          background: '#FBF8F1',
                          color: '#B38F2A',
                          border: '1px solid #E8DCC4',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: 700
                        }}
                      >
                        {ord.paymentMethod}
                      </span>
                    </td>
                    <td style={{ padding: '10px', fontWeight: 800, color: '#1C1917' }}>
                      Rp {ord.total.toLocaleString('id-ID')}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span
                        style={{
                          background: ord.status === 'completed' ? '#ECFDF5' : '#FEF3C7',
                          color: ord.status === 'completed' ? '#059669' : '#D97706',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: 700
                        }}
                      >
                        {ord.status === 'completed' ? 'Selesai' : 'Diproses'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Warning */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #EFECE6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="#EF4444" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1C1917' }}>
                Peringatan Stok Menipis
              </h3>
            </div>
            <span
              style={{
                background: '#FEF2F2',
                color: '#EF4444',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '6px'
              }}
            >
              {lowStock.length} Item
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {lowStock.map((st: StockItem, idx: number) => (
              <div
                key={idx}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FEE2E2',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>
                    {st.menuItemName}
                  </div>
                  <div style={{ fontSize: '10px', color: '#B91C1C' }}>
                    Lokasi: {st.outletName}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#DC2626' }}>
                    {st.currentStock} {st.unit}
                  </div>
                  <div style={{ fontSize: '9px', color: '#991B1B' }}>
                    Min: {st.minStock} {st.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate && onNavigate('menu-stock')}
            style={{
              marginTop: '16px',
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #E6C665 0%, #D4AF37 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Package size={15} /> Buka Manajemen Inventaris Stok
          </button>
        </div>
      </div>
    </div>
  );
};


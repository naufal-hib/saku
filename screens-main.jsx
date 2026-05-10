// Saku — main screens: Dashboard, Transaksi, Add modal, Budget

const { useState: uS1, useEffect: uE1, useRef: uR1, useMemo: uM1 } = React;

// ─── DASHBOARD ───────────────────────────────────────────────
function ScreenDashboard({ goto, openAdd, hideBalance, setHideBalance }) {
  const upcomingDebt = DEBTS.filter(d => d.kind === 'piutang').sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
  const recentTx = TX.slice(0, 4);
  const budgetPct = (monthBudgetSpent / monthBudgetLimit) * 100;
  const topCats = CAT_SHARE.slice(0, 3);
  const totalCat = topCats.reduce((s, c) => s + c.amount, 0);

  return (
    <div style={{ paddingBottom: 110 }}>
      {/* Header */}
      <div style={{ padding: '54px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: C.inkSoft, fontWeight: 600 }}>Selamat pagi 👋</div>
          <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>Halo, Adit</div>
        </div>
        <button onClick={() => goto('notif')} style={{
          position: 'relative', width: 42, height: 42, borderRadius: 14, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 0 rgba(26,22,37,0.04), 0 4px 10px rgba(26,22,37,0.04)',
        }}>
          <Icon name="bell" size={20} sw={1.9}/>
          <span style={{
            position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 999,
            background: C.coral, border: '2px solid #fff',
          }}/>
        </button>
      </div>

      {/* Hero balance card */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, #2D1A8C 0%, ${C.primaryDeep} 50%, ${C.primary} 100%)`,
          borderRadius: 28, padding: 22,
          color: '#fff', position: 'relative', overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(124,92,252,0.32)',
        }}>
          {/* abstract orbs */}
          <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(197,247,79,0.18)', filter: 'blur(20px)' }}/>
          <div style={{ position: 'absolute', bottom: -50, left: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,107,107,0.20)', filter: 'blur(20px)' }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.75, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Total Saldo</div>
              <button onClick={() => setHideBalance(!hideBalance)} style={{ width: 30, height: 30, borderRadius: 999, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={hideBalance ? 'eye-off' : 'eye'} size={15} stroke="#fff" sw={2}/>
              </button>
            </div>
            <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 36, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {fmtIDR(totalBalance, { hide: hideBalance })}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.7, marginTop: 4 }}>{ACCOUNTS.length} akun · per 10 Mei 2026</div>

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '10px 12px', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, opacity: 0.85, marginBottom: 4 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 999, background: C.lime, color: C.limeInk, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="arrow-down" size={10} sw={3}/>
                  </span>
                  Masuk
                </div>
                <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 16 }}>{fmtIDR(monthIncome, { compact: true, hide: hideBalance })}</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '10px 12px', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, opacity: 0.85, marginBottom: 4 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 999, background: C.coral, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="arrow-up" size={10} sw={3}/>
                  </span>
                  Keluar
                </div>
                <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 16 }}>{fmtIDR(monthExpense, { compact: true, hide: hideBalance })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '18px 16px 4px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { label: 'Tambah', icon: 'plus', color: C.primary, soft: C.primarySoft, onClick: openAdd },
          { label: 'Akun', icon: 'wallet', color: C.sky, soft: C.skySoft, onClick: () => goto('accounts') },
          { label: 'Utang', icon: 'shield', color: C.amber, soft: C.amberSoft, onClick: () => goto('debt') },
          { label: 'WhatsApp', icon: 'wa', color: '#25D366', soft: '#DCF7E5', onClick: () => goto('wa') },
        ].map(a => (
          <button key={a.label} onClick={a.onClick} style={{
            background: '#fff', borderRadius: 18, padding: '12px 6px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            boxShadow: '0 1px 0 rgba(26,22,37,0.04), 0 4px 10px rgba(26,22,37,0.03)',
          }}>
            <span style={{ width: 36, height: 36, borderRadius: 12, background: a.soft, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={a.icon} size={19} sw={2}/>
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: C.ink }}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Budget progress */}
      <div style={{ padding: '16px 16px 0' }}>
        <Card padding={18}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.inkSoft, marginBottom: 2 }}>Budget Mei 2026</div>
              <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>
                {fmtIDR(monthBudgetSpent, { compact: true })} <span style={{ color: C.inkFaint, fontWeight: 600 }}>/ {fmtIDR(monthBudgetLimit, { compact: true })}</span>
              </div>
            </div>
            <button onClick={() => goto('budget')} style={{
              padding: '6px 12px', borderRadius: 999, background: C.primarySoft,
              color: C.primaryInk, fontWeight: 700, fontSize: 12,
            }}>Atur</button>
          </div>
          <ProgressBar value={monthBudgetSpent} max={monthBudgetLimit} color={C.primary} soft={C.primarySoft} height={10}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11.5 }}>
            <span style={{ color: C.inkSoft, fontWeight: 600 }}>{Math.round(budgetPct)}% terpakai</span>
            <span style={{ color: C.primaryInk, fontWeight: 700 }}>Sisa {fmtIDR(monthBudgetLimit - monthBudgetSpent, { compact: true })} · 21 hari lagi</span>
          </div>
        </Card>
      </div>

      {/* Top kategori */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title="Top kategori bulan ini" action={() => goto('insights')} actionLabel="Insights"/>
        <Card padding={16}>
          {topCats.map((cs, i) => {
            const cat = catById(cs.cat);
            const pct = (cs.amount / totalCat) * 100;
            return (
              <div key={cs.cat} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}` }}>
                <CatAvatar cat={cs.cat} size={38}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{cat.name}</span>
                    <span style={{ fontWeight: 700, fontSize: 14, fontFamily: 'Bricolage Grotesque' }}>{fmtIDR(cs.amount, { compact: true })}</span>
                  </div>
                  <ProgressBar value={cs.amount} max={topCats[0].amount} color={cat.color} soft={cat.soft} height={5}/>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Piutang yang perlu ditagih */}
      {upcomingDebt && (
        <div style={{ padding: '20px 16px 0' }}>
          <SectionHeading title="Perlu ditagih" action={() => goto('debt')} actionLabel="Semua"/>
          <Card padding={0} style={{ background: `linear-gradient(135deg, ${C.amberSoft}, #FFF5E0)`, overflow: 'hidden' }}>
            <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 14, background: upcomingDebt.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 17, fontFamily: 'Bricolage Grotesque',
              }}>{upcomingDebt.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.amberInk, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Piutang · {dayDiff(upcomingDebt.dueDate)} hari lagi</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginTop: 1 }}>{upcomingDebt.who}</div>
                <div style={{ fontSize: 12, color: C.inkSoft }}>{upcomingDebt.note}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 16, color: C.amberInk }}>{fmtIDR(upcomingDebt.amount, { compact: true })}</div>
                <button style={{ marginTop: 4, padding: '4px 10px', borderRadius: 999, background: C.ink, color: '#fff', fontSize: 11, fontWeight: 700 }}>Tagih</button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Recent transactions */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title="Transaksi terbaru" action={() => goto('tx')} actionLabel="Semua"/>
        <Card padding={6}>
          {recentTx.map((t, i) => {
            const cat = catById(t.cat);
            const acc = ACCOUNTS.find(a => a.id === t.account);
            return (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}` }}>
                <CatAvatar cat={t.cat} size={40}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.note}</div>
                  <div style={{ fontSize: 11.5, color: C.inkSoft, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {acc.name} · {t.time}
                    {t.via === 'wa' && (
                      <span style={{ background: '#DCF7E5', color: '#1A7A3D', padding: '1px 6px', borderRadius: 999, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.04em' }}>WA</span>
                    )}
                  </div>
                </div>
                <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 14.5, color: t.amount > 0 ? C.limeDeep : C.ink }}>
                  {fmtIDR(t.amount, { sign: true, compact: Math.abs(t.amount) >= 1000000 })}
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

// ─── TRANSAKSI LIST ──────────────────────────────────────────
function ScreenTransaksi({ openAdd }) {
  const [filter, setFilter] = uS1('semua');
  const [q, setQ] = uS1('');
  const filtered = TX.filter(t => {
    if (filter === 'masuk' && t.amount < 0) return false;
    if (filter === 'keluar' && t.amount > 0) return false;
    if (q && !t.note.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  const groups = groupTx(filtered);

  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '54px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em' }}>Transaksi</h1>
        <button onClick={openAdd} style={{
          padding: '8px 14px 8px 12px', borderRadius: 999, background: C.ink, color: '#fff',
          fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="plus" size={15} stroke="#fff" sw={2.4}/>
          Tambah
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 0 rgba(26,22,37,0.04)' }}>
          <Icon name="search" size={18} stroke={C.inkSoft} sw={2}/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari catatan, kategori…" style={{
            border: 'none', background: 'transparent', outline: 'none', flex: 1,
            fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: C.ink,
          }}/>
          <button style={{ width: 26, height: 26, borderRadius: 8, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="filter" size={14} sw={2}/>
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="saku-scroll" style={{ display: 'flex', gap: 8, padding: '14px 16px 0', overflowX: 'auto' }}>
        {[
          { id: 'semua', label: 'Semua', count: TX.length },
          { id: 'keluar', label: 'Pengeluaran', count: TX.filter(t=>t.amount<0).length },
          { id: 'masuk', label: 'Pemasukan', count: TX.filter(t=>t.amount>0).length },
        ].map(f => (
          <Pill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}
            color={C.ink} soft="#F2EDE2">
            {f.label} <span style={{ opacity: 0.5, marginLeft: 4 }}>{f.count}</span>
          </Pill>
        ))}
      </div>

      {/* Tx list */}
      <div style={{ padding: '8px 16px 0' }}>
        {groups.map(([label, items]) => {
          const dayTotal = items.reduce((s, t) => s + t.amount, 0);
          return (
            <div key={label} style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px 8px', fontSize: 12, fontWeight: 700, color: C.inkSoft, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span>{label}</span>
                <span style={{ fontFamily: 'Bricolage Grotesque', color: dayTotal > 0 ? C.limeDeep : C.ink }}>
                  {fmtIDR(dayTotal, { sign: true, compact: Math.abs(dayTotal) >= 1000000 })}
                </span>
              </div>
              <Card padding={6}>
                {items.map((t, i) => {
                  const acc = ACCOUNTS.find(a => a.id === t.account);
                  return (
                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 10px', borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}` }}>
                      <CatAvatar cat={t.cat} size={38}/>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.note}</div>
                        <div style={{ fontSize: 11.5, color: C.inkSoft, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {catById(t.cat).name} · {acc.name} · {t.time}
                          {t.via === 'wa' && <span style={{ background: '#DCF7E5', color: '#1A7A3D', padding: '1px 5px', borderRadius: 999, fontSize: 9, fontWeight: 800 }}>WA</span>}
                          {t.via === 'auto' && <span style={{ background: C.primarySoft, color: C.primaryInk, padding: '1px 5px', borderRadius: 999, fontSize: 9, fontWeight: 800 }}>AUTO</span>}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 14, color: t.amount > 0 ? C.limeDeep : C.ink }}>
                        {fmtIDR(t.amount, { sign: true, compact: Math.abs(t.amount) >= 1000000 })}
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>
          );
        })}
        {groups.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: C.inkSoft }}>Tidak ada transaksi cocok.</div>
        )}
      </div>
    </div>
  );
}

// ─── ADD TRANSACTION MODAL ───────────────────────────────────
function ModalAdd({ open, onClose, onSave }) {
  const [type, setType] = uS1('keluar'); // keluar | masuk | transfer
  const [amount, setAmount] = uS1(0);
  const [cat, setCat] = uS1('makan');
  const [account, setAccount] = uS1('gopay');
  const [note, setNote] = uS1('');

  uE1(() => {
    if (open) { setAmount(0); setNote(''); setCat(type === 'masuk' ? 'gaji' : 'makan'); }
  }, [open, type]);

  if (!open) return null;

  const press = (k) => {
    if (k === 'back') setAmount(Math.floor(amount / 10));
    else if (k === '000') setAmount(amount * 1000);
    else setAmount(amount * 10 + parseInt(k, 10));
  };

  const filteredCats = type === 'masuk'
    ? CATEGORIES.filter(c => ['gaji', 'freelance', 'invest', 'lainnya'].includes(c.id))
    : CATEGORIES.filter(c => !['gaji', 'freelance'].includes(c.id));

  const accentColor = type === 'masuk' ? C.limeDeep : type === 'transfer' ? C.sky : C.coral;

  const save = () => {
    if (!amount) return;
    onSave({
      amount: type === 'masuk' ? amount : -amount,
      cat, account, note: note || catById(cat).name,
    });
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(26,22,37,0.45)',
      zIndex: 90, display: 'flex', alignItems: 'flex-end',
      animation: 'saku-fade-in 0.2s ease',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: C.bg, borderRadius: '28px 28px 0 0',
        padding: '14px 0 24px',
        animation: 'saku-slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        maxHeight: '92%', overflow: 'auto',
      }}>
        {/* drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <div style={{ width: 38, height: 4, borderRadius: 999, background: '#D8D2C5' }}/>
        </div>

        {/* type tabs */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: '#EDE7DA', borderRadius: 16, padding: 4, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {[
              { id: 'keluar', label: 'Pengeluaran', color: C.coral },
              { id: 'masuk', label: 'Pemasukan', color: C.limeDeep },
              { id: 'transfer', label: 'Transfer', color: C.sky },
            ].map(t => (
              <button key={t.id} onClick={() => setType(t.id)} style={{
                padding: '10px 8px', borderRadius: 12,
                background: type === t.id ? '#fff' : 'transparent',
                color: type === t.id ? C.ink : C.inkSoft,
                fontWeight: 700, fontSize: 13,
                boxShadow: type === t.id ? '0 1px 3px rgba(26,22,37,0.08)' : 'none',
                transition: 'all 0.15s',
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* amount */}
        <div style={{ padding: '24px 20px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.inkSoft, marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Jumlah</div>
          <div style={{
            fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 44,
            letterSpacing: '-0.03em', color: amount > 0 ? accentColor : C.inkFaint,
          }}>
            {amount > 0 ? fmtIDR(type === 'masuk' ? amount : -amount, { sign: true }) : 'Rp 0'}
          </div>
        </div>

        {/* category chips */}
        {type !== 'transfer' && (
          <div style={{ padding: '14px 16px 0' }}>
            <div className="saku-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {filteredCats.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 6px', borderRadius: 999,
                  background: cat === c.id ? c.color : '#fff',
                  color: cat === c.id ? '#fff' : C.ink,
                  fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0,
                  boxShadow: cat === c.id ? `0 4px 12px ${c.color}55` : '0 1px 0 rgba(26,22,37,0.04)',
                  transition: 'all 0.15s',
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 8, background: cat === c.id ? 'rgba(255,255,255,0.2)' : c.soft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  }}>{c.icon}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* account picker */}
        <div style={{ padding: '14px 16px 0' }}>
          <div className="saku-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {ACCOUNTS.map(a => (
              <AccountChip key={a.id} acc={a} selected={account === a.id} onClick={() => setAccount(a.id)}/>
            ))}
          </div>
        </div>

        {/* note */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="edit" size={17} stroke={C.inkSoft} sw={2}/>
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="Catatan (opsional)" style={{
              border: 'none', background: 'transparent', outline: 'none', flex: 1,
              fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: C.ink,
            }}/>
          </div>
        </div>

        {/* numpad */}
        <div style={{ padding: '14px 12px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {['1','2','3','4','5','6','7','8','9','000','0','back'].map(k => (
            <button key={k} onClick={() => press(k)} style={{
              padding: '14px 0', borderRadius: 14, background: '#fff',
              fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 22, color: C.ink,
              boxShadow: '0 1px 0 rgba(26,22,37,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {k === 'back' ? <Icon name="arrow-left" size={20} sw={2.2}/> : k}
            </button>
          ))}
        </div>

        {/* save */}
        <div style={{ padding: '14px 16px 0' }}>
          <button onClick={save} disabled={!amount} style={{
            width: '100%', padding: '16px', borderRadius: 18,
            background: amount ? C.ink : '#D8D2C5', color: '#fff',
            fontWeight: 700, fontSize: 15, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: amount ? '0 8px 18px rgba(26,22,37,0.20)' : 'none',
            transition: 'all 0.15s',
          }}>
            <Icon name="check" size={18} stroke="#fff" sw={2.6}/>
            Simpan transaksi
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BUDGET ──────────────────────────────────────────────────
function ScreenBudget({ goto }) {
  const [period, setPeriod] = uS1('Bulanan');
  const [editing, setEditing] = uS1(null);
  const [budgets, setBudgets] = uS1(BUDGETS);
  const filtered = budgets.filter(b => b.period === period);
  const totalLimit = filtered.reduce((s, b) => s + b.limit, 0);
  const totalSpent = filtered.reduce((s, b) => s + b.spent, 0);
  const totalPct = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  const updateLimit = (id, newLimit) => {
    setBudgets(budgets.map(b => b.id === id ? { ...b, limit: newLimit } : b));
  };

  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '54px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em' }}>Budget</h1>
        <button style={{
          padding: '8px 14px 8px 12px', borderRadius: 999, background: C.ink, color: '#fff',
          fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="plus" size={15} stroke="#fff" sw={2.4}/>
          Kategori
        </button>
      </div>

      {/* Period switcher */}
      <div className="saku-scroll" style={{ display: 'flex', gap: 8, padding: '12px 16px 0', overflowX: 'auto' }}>
        {['Harian', 'Mingguan', 'Bulanan', 'Custom'].map(p => (
          <Pill key={p} active={period === p} onClick={() => setPeriod(p)} color={C.ink} soft="#F2EDE2">{p}</Pill>
        ))}
      </div>

      {/* Donut overview */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${C.ink} 0%, #2A2438 100%)`,
          borderRadius: 28, padding: 22, color: '#fff',
          display: 'flex', alignItems: 'center', gap: 18,
          boxShadow: '0 12px 28px rgba(26,22,37,0.22)',
        }}>
          <Donut size={130} stroke={14} value={totalSpent} max={totalLimit || 1}
            color={totalSpent > totalLimit ? C.coral : C.lime} trackColor="rgba(255,255,255,0.10)">
            <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-0.02em' }}>
              {Math.round(totalPct)}%
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 700, opacity: 0.6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>terpakai</div>
          </Donut>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Sisa {period.toLowerCase()}</div>
            <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', marginTop: 2 }}>
              {fmtIDR(Math.max(0, totalLimit - totalSpent), { compact: true })}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12, fontSize: 11.5 }}>
              <div>
                <div style={{ opacity: 0.6, fontWeight: 600 }}>Budget</div>
                <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 14 }}>{fmtIDR(totalLimit, { compact: true })}</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, fontWeight: 600 }}>Terpakai</div>
                <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 14 }}>{fmtIDR(totalSpent, { compact: true })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budgets list */}
      <div style={{ padding: '16px 16px 0' }}>
        <SectionHeading title={`Jatah ${period}`}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.length === 0 && <Card><div style={{ textAlign: 'center', color: C.inkSoft, padding: '20px 0' }}>Belum ada budget {period.toLowerCase()}.</div></Card>}
          {filtered.map(b => {
            const cat = catById(b.cat);
            const pct = (b.spent / b.limit) * 100;
            const over = b.spent > b.limit;
            const isEdit = editing === b.id;
            return (
              <Card key={b.id} padding={16} onClick={() => !isEdit && setEditing(b.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <CatAvatar cat={b.cat} size={42}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{cat.name}</div>
                    <div style={{ fontSize: 11.5, color: C.inkSoft, fontWeight: 600 }}>
                      {b.period} · reset {fmtDate(b.resetAt)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 14, color: over ? C.coralDeep : C.ink }}>
                      {fmtIDR(b.spent, { compact: true })}
                    </div>
                    <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 600 }}>dari {fmtIDR(b.limit, { compact: true })}</div>
                  </div>
                </div>
                <ProgressBar value={b.spent} max={b.limit} color={over ? C.coral : cat.color} soft={cat.soft} height={8}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11.5, fontWeight: 700 }}>
                  <span style={{ color: over ? C.coralDeep : C.inkSoft }}>
                    {over ? `Lewat ${fmtIDR(b.spent - b.limit, { compact: true })}` : `${Math.round(pct)}% terpakai`}
                  </span>
                  <span style={{ color: C.inkSoft }}>Sisa {fmtIDR(Math.max(0, b.limit - b.spent), { compact: true })}</span>
                </div>

                {isEdit && (
                  <div style={{ marginTop: 14, padding: 12, background: C.bg, borderRadius: 14, animation: 'saku-fade-in 0.2s' }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: C.inkSoft, marginBottom: 6 }}>Atur batas</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[500000, 1000000, 1500000, 2000000, 3000000].map(v => (
                        <button key={v} onClick={(e) => { e.stopPropagation(); updateLimit(b.id, v); }}
                          style={{
                            flex: 1, padding: '10px 4px', borderRadius: 10,
                            background: b.limit === v ? C.ink : '#fff',
                            color: b.limit === v ? '#fff' : C.ink,
                            fontWeight: 700, fontSize: 11.5, fontFamily: 'Bricolage Grotesque',
                          }}>
                          {fmtIDR(v, { compact: true })}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button onClick={(e) => { e.stopPropagation(); setEditing(null); }}
                        style={{ flex: 1, padding: '10px', borderRadius: 12, background: '#fff', fontWeight: 700, fontSize: 13 }}>
                        Selesai
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenDashboard, ScreenTransaksi, ModalAdd, ScreenBudget });

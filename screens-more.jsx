// Saku — secondary screens: Akun, Kategori, Utang/Piutang, Notifikasi, WhatsApp, Insights, More menu

const { useState: uS2, useEffect: uE2, useRef: uR2 } = React;

// ─── MORE MENU ───────────────────────────────────────────────
function ScreenMore({ goto }) {
  const { accounts, debts, notifs, totalBalance, userName, updateUserName } = React.useContext(DataCtx);
  const [showEditName, setShowEditName] = uS2(false);
  const [nameInput, setNameInput] = uS2('');

  const items = [
    { id: 'accounts', label: 'Akun Keuangan',     sub: `${accounts.length} akun · ${fmtIDR(totalBalance, { compact: true })}`, icon: 'wallet', color: C.sky,   soft: C.skySoft },
    { id: 'cats',     label: 'Kategori',           sub: `${CATEGORIES.length} kategori`,                                         icon: 'tag',    color: C.pink,  soft: C.pinkSoft },
    { id: 'debt',     label: 'Utang & Piutang',    sub: `${debts.filter(d=>d.kind==='piutang').length} piutang · ${debts.filter(d=>d.kind==='utang').length} utang`, icon: 'shield', color: C.amber, soft: C.amberSoft },
    { id: 'notif',    label: 'Notifikasi',         sub: `${notifs.filter(n=>!n.read).length} belum dibaca`,                      icon: 'bell',   color: C.coral, soft: C.coralSoft },
    { id: 'wa',       label: 'WhatsApp Bot',       sub: 'Fitur backend · belum aktif',                                           icon: 'wa',     color: '#1A7A3D', soft: '#DCF7E5' },
    { id: 'insights', label: 'Laporan & Insights', sub: 'Analisis bulan ini',                                                    icon: 'pie',    color: C.primary, soft: C.primarySoft },
  ];

  return (
    <div style={{ paddingBottom: 110, position: 'relative' }}>
      <div style={{ padding: '54px 20px 20px' }}>
        <h1 style={{ margin: 0, fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em' }}>Menu</h1>
        <div style={{ fontSize: 13, color: C.inkSoft, fontWeight: 600, marginTop: 2 }}>Semua pengaturan dan fitur lainnya</div>
      </div>

      {/* Profile card */}
      <div style={{ padding: '0 16px' }}>
        <Card padding={18} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: `linear-gradient(135deg, ${C.primary}, ${C.coral})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 22,
          }}>{userName[0].toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{userName}</div>
            <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 600 }}>Akun pribadi</div>
          </div>
          <button onClick={() => { setNameInput(userName); setShowEditName(true); }} style={{ width: 36, height: 36, borderRadius: 12, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="settings" size={18} sw={2}/>
          </button>
        </Card>
      </div>

      {/* Menu list */}
      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(it => (
          <button key={it.id} onClick={() => goto(it.id)} style={{
            background: '#fff', borderRadius: 18, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
            boxShadow: '0 1px 0 rgba(26,22,37,0.04), 0 4px 10px rgba(26,22,37,0.03)',
          }}>
            <span style={{ width: 44, height: 44, borderRadius: 14, background: it.soft, color: it.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={it.icon} size={22} sw={2}/>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{it.label}</div>
              <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 600, marginTop: 1 }}>{it.sub}</div>
            </div>
            <Icon name="chevron-r" size={18} stroke={C.inkFaint} sw={2.2}/>
          </button>
        ))}
      </div>

      <div style={{ padding: '20px 16px 0', textAlign: 'center', fontSize: 11.5, color: C.inkFaint, fontWeight: 600 }}>
        Saku v1.0 · Dibuat untuk pribadi 💜
      </div>

      {/* Edit name modal */}
      {showEditName && (
        <div onClick={() => setShowEditName(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(26,22,37,0.45)', zIndex: 90, display: 'flex', alignItems: 'flex-end', animation: 'saku-fade-in 0.2s' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: C.bg, borderRadius: '28px 28px 0 0', padding: '20px 16px 32px', animation: 'saku-slide-up 0.3s cubic-bezier(0.2,0.8,0.2,1)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}><div style={{ width: 38, height: 4, borderRadius: 999, background: '#D8D2C5' }}/></div>
            <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Edit Nama</div>
            <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="Nama kamu" autoFocus style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: 'none', background: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}/>
            <button onClick={async () => { if (nameInput.trim()) { await updateUserName(nameInput.trim()); setShowEditName(false); } }} style={{ width: '100%', padding: 14, borderRadius: 14, background: C.ink, color: '#fff', fontWeight: 700, fontSize: 15 }}>Simpan</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AKUN ────────────────────────────────────────────────────
function ScreenAccounts({ back }) {
  const { accounts, totalBalance, addAccount } = React.useContext(DataCtx);
  const [showAddAcc, setShowAddAcc] = uS2(false);
  const [newAccName, setNewAccName] = uS2('');
  const [newAccType, setNewAccType] = uS2('Bank');
  const [newAccEmoji, setNewAccEmoji] = uS2('🏦');
  const [newAccBalance, setNewAccBalance] = uS2('');

  return (
    <div style={{ paddingBottom: 110, position: 'relative' }}>
      <PageHeader title="Akun Keuangan" onBack={back}
        right={<button onClick={() => setShowAddAcc(true)} style={{ padding: '8px 14px 8px 12px', borderRadius: 999, background: C.ink, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="plus" size={15} stroke="#fff" sw={2.4}/> Akun
        </button>}/>

      {/* total */}
      <div style={{ padding: '4px 16px 0' }}>
        <Card padding={20} style={{ background: `linear-gradient(135deg, ${C.skySoft}, #EAF7FF)` }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: C.skyInk, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Total kekayaan bersih</div>
          <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 32, letterSpacing: '-0.03em', color: C.ink, marginTop: 2 }}>
            {fmtIDR(totalBalance)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: C.skyInk, fontWeight: 700, marginTop: 4 }}>
            <Icon name="trend-up" size={14} stroke={C.skyInk} sw={2.4}/>
            +Rp 1,2jt vs bulan lalu
          </div>
        </Card>
      </div>

      {/* accounts grouped */}
      {[
        { type: 'Bank',      items: accounts.filter(a => a.type === 'Bank') },
        { type: 'E-wallet',  items: accounts.filter(a => a.type === 'E-wallet') },
        { type: 'Tunai',     items: accounts.filter(a => a.type === 'Tunai') },
        { type: 'Investasi', items: accounts.filter(a => a.type === 'Investasi') },
      ].filter(g => g.items.length > 0).map(group => (
        <div key={group.type} style={{ padding: '20px 16px 0' }}>
          <SectionHeading title={group.type}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {group.items.map(a => (
              <Card key={a.id} padding={0} style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: 14, gap: 14 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 16, background: a.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    boxShadow: `0 4px 12px ${a.color}40`, flexShrink: 0,
                  }}>{a.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{a.name} {a.last4 && <span style={{ color: C.inkFaint, fontWeight: 600, fontSize: 12 }}>•••• {a.last4}</span>}</div>
                    <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 18, marginTop: 2, letterSpacing: '-0.02em' }}>{fmtIDR(a.balance)}</div>
                  </div>
                  <button style={{ width: 32, height: 32, borderRadius: 10, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="more" size={18} sw={2}/>
                  </button>
                </div>
                <div style={{ display: 'flex', borderTop: `1px solid ${C.lineSoft}`, fontSize: 12, fontWeight: 700 }}>
                  <button style={{ flex: 1, padding: '10px 0', color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Icon name="transfer" size={14} sw={2.2}/> Transfer
                  </button>
                  <div style={{ width: 1, background: C.lineSoft }}/>
                  <button style={{ flex: 1, padding: '10px 0', color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Icon name="list" size={14} sw={2}/> Mutasi
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Add Account Modal */}
      {showAddAcc && (
        <div onClick={() => setShowAddAcc(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(26,22,37,0.45)', zIndex: 90, display: 'flex', alignItems: 'flex-end', animation: 'saku-fade-in 0.2s' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: C.bg, borderRadius: '28px 28px 0 0', padding: '20px 16px 32px', animation: 'saku-slide-up 0.3s cubic-bezier(0.2,0.8,0.2,1)', maxHeight: '85%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}><div style={{ width: 38, height: 4, borderRadius: 999, background: '#D8D2C5' }}/></div>
            <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Tambah Akun</div>

            {/* Type */}
            <div style={{ fontSize: 12, fontWeight: 700, color: C.inkSoft, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Jenis</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {ACCOUNT_TYPES.map(t => (
                <button key={t} onClick={() => setNewAccType(t)} style={{ padding: '8px 16px', borderRadius: 999, background: newAccType === t ? C.ink : '#fff', color: newAccType === t ? '#fff' : C.ink, fontWeight: 700, fontSize: 13 }}>{t}</button>
              ))}
            </div>

            {/* Emoji */}
            <div style={{ fontSize: 12, fontWeight: 700, color: C.inkSoft, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Ikon</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {ACCOUNT_EMOJIS.map(em => (
                <button key={em} onClick={() => setNewAccEmoji(em)} style={{ width: 42, height: 42, borderRadius: 12, background: newAccEmoji === em ? C.ink : '#fff', fontSize: 20, border: newAccEmoji === em ? `2px solid ${C.ink}` : '2px solid transparent' }}>{em}</button>
              ))}
            </div>

            {/* Name */}
            <input value={newAccName} onChange={e => setNewAccName(e.target.value)} placeholder="Nama akun (contoh: BCA, Dana)" style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: 'none', background: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', marginBottom: 10, outline: 'none', boxSizing: 'border-box' }}/>

            {/* Balance */}
            <input type="number" value={newAccBalance} onChange={e => setNewAccBalance(e.target.value)} placeholder="Saldo awal (Rp)" style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: 'none', background: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', marginBottom: 16, outline: 'none', boxSizing: 'border-box' }}/>

            <button onClick={async () => {
              if (!newAccName.trim()) return;
              const bal = parseInt(newAccBalance, 10) || 0;
              await addAccount({ id: 'acc_' + Date.now(), name: newAccName.trim(), type: newAccType, emoji: newAccEmoji, balance: bal, color: '#6B6478' });
              setNewAccName(''); setNewAccBalance(''); setShowAddAcc(false);
            }} disabled={!newAccName.trim()} style={{ width: '100%', padding: 14, borderRadius: 14, background: newAccName.trim() ? C.ink : '#D8D2C5', color: '#fff', fontWeight: 700, fontSize: 15 }}>Simpan Akun</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── KATEGORI (drag-drop) ────────────────────────────────────
function ScreenCategories({ back }) {
  const { tx } = React.useContext(DataCtx);
  const [cats, setCats] = uS2(CATEGORIES);
  const [draggingId, setDraggingId] = uS2(null);
  const [overId, setOverId] = uS2(null);
  const curMonth = new Date().toISOString().slice(0, 7);

  const onDragStart = (id, e) => { setDraggingId(id); e.dataTransfer.effectAllowed = 'move'; };
  const onDragOver = (id, e) => { e.preventDefault(); setOverId(id); };
  const onDrop = (targetId, e) => {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) { setDraggingId(null); setOverId(null); return; }
    const from = cats.findIndex(c => c.id === draggingId);
    const to = cats.findIndex(c => c.id === targetId);
    const next = [...cats];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setCats(next);
    setDraggingId(null); setOverId(null);
  };

  return (
    <div style={{ paddingBottom: 110 }}>
      <PageHeader title="Kategori" onBack={back}
        right={<button style={{ padding: '8px 14px 8px 12px', borderRadius: 999, background: C.ink, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="plus" size={15} stroke="#fff" sw={2.4}/> Baru
        </button>}/>

      <div style={{ padding: '0 16px' }}>
        <Card padding={14} style={{ background: C.primarySoft, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: C.primaryInk }}>
            <Icon name="drag" size={18} stroke={C.primaryInk} sw={2.2}/>
            <div style={{ fontSize: 12.5, fontWeight: 700 }}>Drag untuk urutkan ulang. Tekan & tahan untuk edit.</div>
          </div>
        </Card>
      </div>

      <div style={{ padding: '0 16px' }}>
        <Card padding={6}>
          {cats.map((c, i) => (
            <div key={c.id}
              draggable
              onDragStart={(e) => onDragStart(c.id, e)}
              onDragOver={(e) => onDragOver(c.id, e)}
              onDrop={(e) => onDrop(c.id, e)}
              onDragEnd={() => { setDraggingId(null); setOverId(null); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px',
                borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}`,
                background: draggingId === c.id ? C.bg : (overId === c.id ? C.primarySoft : 'transparent'),
                opacity: draggingId === c.id ? 0.4 : 1,
                borderRadius: 14, cursor: 'grab', userSelect: 'none',
                transition: 'background 0.15s',
              }}>
              <Icon name="drag" size={18} stroke={C.inkFaint} sw={2}/>
              <CatAvatar cat={c.id} size={36}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 600 }}>
                  {tx.filter(t => t.cat === c.id && t.date && t.date.startsWith(curMonth)).length} transaksi bulan ini
                </div>
              </div>
              <button style={{ width: 30, height: 30, borderRadius: 10, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="edit" size={15} sw={2}/>
              </button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── UTANG / PIUTANG ─────────────────────────────────────────
function ScreenDebt({ back }) {
  const { debts, addDebt, markDebtDone } = React.useContext(DataCtx);
  const [tab, setTab] = uS2('piutang');
  const [showAdd, setShowAdd] = uS2(false);
  const [formName, setFormName] = uS2('');
  const [formAmount, setFormAmount] = uS2('');
  const [formNote, setFormNote] = uS2('');
  const [formDue, setFormDue] = uS2('');

  const items = debts.filter(d => d.kind === tab);
  const totalP = debts.filter(d => d.kind === 'piutang').reduce((s,d)=>s+d.amount,0);
  const totalU = debts.filter(d => d.kind === 'utang').reduce((s,d)=>s+d.amount,0);

  return (
    <div style={{ paddingBottom: 110 }}>
      <PageHeader title="Utang & Piutang" onBack={back}
        right={<button onClick={() => setShowAdd(true)} style={{ padding: '8px 14px 8px 12px', borderRadius: 999, background: C.ink, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="plus" size={15} stroke="#fff" sw={2.4}/> Catat
        </button>}/>

      {/* summary cards */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button onClick={() => setTab('piutang')} style={{
          background: tab === 'piutang' ? `linear-gradient(135deg, ${C.lime}, ${C.limeDeep})` : C.limeSoft,
          borderRadius: 22, padding: 16, textAlign: 'left',
          color: C.limeInk,
          boxShadow: tab === 'piutang' ? '0 12px 24px rgba(155,203,41,0.35)' : 'none',
          transition: 'all 0.2s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.85 }}>
            <Icon name="arrow-down" size={12} stroke={C.limeInk} sw={3}/> Piutang
          </div>
          <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', marginTop: 4 }}>
            {fmtIDR(totalP, { compact: true })}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, marginTop: 1 }}>
            {debts.filter(d => d.kind === 'piutang').length} orang berhutang
          </div>
        </button>
        <button onClick={() => setTab('utang')} style={{
          background: tab === 'utang' ? `linear-gradient(135deg, ${C.coral}, ${C.coralDeep})` : C.coralSoft,
          borderRadius: 22, padding: 16, textAlign: 'left',
          color: tab === 'utang' ? '#fff' : C.coralInk,
          boxShadow: tab === 'utang' ? '0 12px 24px rgba(231,69,69,0.32)' : 'none',
          transition: 'all 0.2s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: tab === 'utang' ? 0.9 : 0.85 }}>
            <Icon name="arrow-up" size={12} stroke={tab === 'utang' ? '#fff' : C.coralInk} sw={3}/> Utang
          </div>
          <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', marginTop: 4 }}>
            {fmtIDR(totalU, { compact: true })}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.75, marginTop: 1 }}>
            {debts.filter(d => d.kind === 'utang').length} pinjaman aktif
          </div>
        </button>
      </div>

      {/* List */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title={tab === 'piutang' ? 'Yang berhutang ke saya' : 'Yang saya pinjam'}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.length === 0 && (
            <Card><div style={{ textAlign: 'center', color: C.inkSoft, padding: '20px 0', fontSize: 13 }}>Belum ada {tab} aktif.</div></Card>
          )}
          {items.map(d => {
            const dd = dayDiff(d.dueDate);
            const overdue = dd < 0;
            const soon = dd >= 0 && dd <= 3;
            return (
              <Card key={d.id} padding={0} style={{ overflow: 'hidden' }}>
                <div style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 16, background: d.color,
                    color: '#fff', fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 17,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 4px 12px ${d.color}50`,
                  }}>{d.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{d.who}</div>
                    <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.note}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 16 }}>{fmtIDR(d.amount, { compact: true })}</div>
                    <div style={{
                      fontSize: 10.5, fontWeight: 800, marginTop: 2,
                      color: overdue ? C.coralDeep : (soon ? C.amberInk : C.inkSoft),
                    }}>
                      {overdue ? `Telat ${Math.abs(dd)}h` : (dd === 0 ? 'Hari ini' : `${dd}h lagi`)}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', borderTop: `1px solid ${C.lineSoft}`, fontSize: 12, fontWeight: 700 }}>
                  <button onClick={() => {
                    window.open(`https://wa.me/?text=${encodeURIComponent(`Hei ${d.who}, mengingatkan ${tab === 'piutang' ? 'piutang' : 'utang'} sebesar ${fmtIDR(d.amount)} (${d.note}). Terima kasih 🙏`)}`);
                  }} style={{ flex: 1, padding: '10px 0', color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Icon name="wa" size={14} stroke="#1A7A3D"/> <span style={{ color: '#1A7A3D' }}>Ingatkan</span>
                  </button>
                  <div style={{ width: 1, background: C.lineSoft }}/>
                  <button onClick={async () => { await markDebtDone(d.id); }} style={{ flex: 1, padding: '10px 0', color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Icon name="check" size={14} sw={2.4}/> Lunas
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {showAdd && (
        <div onClick={() => setShowAdd(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(26,22,37,0.45)', zIndex: 90, display: 'flex', alignItems: 'flex-end', animation: 'saku-fade-in 0.2s' }}>
          <div onClick={e=>e.stopPropagation()} style={{ width: '100%', background: C.bg, borderRadius: '28px 28px 0 0', padding: '20px 16px 26px', animation: 'saku-slide-up 0.3s cubic-bezier(0.2,0.8,0.2,1)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}><div style={{ width: 38, height: 4, borderRadius: 999, background: '#D8D2C5' }}/></div>
            <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', marginBottom: 14 }}>Catat {tab}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="Nama orang" style={{ padding: '14px 16px', borderRadius: 14, border: 'none', background: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', outline: 'none' }}/>
              <input type="number" value={formAmount} onChange={e => setFormAmount(e.target.value)} placeholder="Jumlah (Rp)" style={{ padding: '14px 16px', borderRadius: 14, border: 'none', background: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', outline: 'none' }}/>
              <input value={formNote} onChange={e => setFormNote(e.target.value)} placeholder="Keterangan" style={{ padding: '14px 16px', borderRadius: 14, border: 'none', background: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', outline: 'none' }}/>
              <input type="date" value={formDue} onChange={e => setFormDue(e.target.value)} style={{ padding: '14px 16px', borderRadius: 14, border: 'none', background: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', outline: 'none' }}/>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 14, background: '#fff' }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={14} stroke="#fff" sw={3}/>
                </span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Aktifkan reminder via WhatsApp</span>
              </label>
              <button onClick={async () => {
                if (!formName.trim() || !formAmount) return;
                const avatarStr = formName.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
                await addDebt({
                  id: 'd' + Date.now(),
                  kind: tab,
                  who: formName.trim(),
                  amount: parseInt(formAmount, 10),
                  note: formNote,
                  dueDate: formDue || new Date(Date.now() + 7*24*60*60*1000).toISOString().slice(0,10),
                  createdAt: new Date().toISOString().slice(0,10),
                  avatar: avatarStr,
                  color: C.primary,
                });
                setFormName(''); setFormAmount(''); setFormNote(''); setFormDue('');
                setShowAdd(false);
              }} style={{ marginTop: 6, padding: 16, borderRadius: 16, background: C.ink, color: '#fff', fontWeight: 700, fontSize: 15 }}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NOTIFIKASI ──────────────────────────────────────────────
function ScreenNotif({ back }) {
  const { notifs, markAllNotifsRead } = React.useContext(DataCtx);
  const [filter, setFilter] = uS2('semua');
  const filtered = notifs.filter(n => filter === 'semua' || (filter === 'unread' && !n.read));

  const typeMeta = {
    budget:      { icon: 'pie',     color: C.primary, soft: C.primarySoft },
    debt:        { icon: 'shield',  color: C.amber,   soft: C.amberSoft },
    wa:          { icon: 'wa',      color: '#1A7A3D', soft: '#DCF7E5' },
    bill:        { icon: 'calendar',color: C.sky,     soft: C.skySoft },
    achievement: { icon: 'flame',   color: C.coralDeep, soft: C.coralSoft },
  };

  return (
    <div style={{ paddingBottom: 110 }}>
      <PageHeader title="Notifikasi" onBack={back}
        right={<button onClick={markAllNotifsRead} style={{ padding: '8px 12px', borderRadius: 999, background: '#fff', color: C.ink, fontSize: 12, fontWeight: 700, boxShadow: '0 1px 0 rgba(26,22,37,0.04)' }}>
          Tandai dibaca
        </button>}/>

      <div className="saku-scroll" style={{ display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto' }}>
        {[
          { id: 'semua', label: 'Semua' },
          { id: 'unread', label: 'Belum dibaca' },
        ].map(f => <Pill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)} color={C.ink} soft="#F2EDE2">{f.label}</Pill>)}
      </div>

      <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(n => {
          const m = typeMeta[n.type] || typeMeta.bill;
          return (
            <Card key={n.id} padding={14} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              borderLeft: n.read ? '3px solid transparent' : `3px solid ${n.level === 'over' || n.level === 'alert' ? C.coral : (n.level === 'good' ? C.limeDeep : C.primary)}`,
              paddingLeft: 12,
            }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: m.soft, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={m.icon} size={19} sw={2}/>
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{n.title}</div>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: 999, background: C.coral, flexShrink: 0, marginLeft: 6, animation: 'saku-pulse-dot 1.6s infinite' }}/>}
                </div>
                <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 500, lineHeight: 1.4 }}>{n.body}</div>
                <div style={{ fontSize: 11, color: C.inkFaint, fontWeight: 700, marginTop: 6 }}>{n.time}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── WHATSAPP BOT ────────────────────────────────────────────
function ScreenWA({ back }) {
  const { waLog, accounts } = React.useContext(DataCtx);
  const [autoCategorize, setAutoCategorize] = uS2(true);
  const [confirmFirst, setConfirmFirst] = uS2(false);
  const [dailyDigest, setDailyDigest] = uS2(true);

  return (
    <div style={{ paddingBottom: 110 }}>
      <PageHeader title="WhatsApp Bot" onBack={back}/>

      {/* Status hero — informational, not connected */}
      <div style={{ padding: '0 16px' }}>
        <Card padding={0} style={{
          background: `linear-gradient(135deg, ${C.amber} 0%, ${C.amberInk} 100%)`,
          color: '#fff', overflow: 'hidden', position: 'relative',
          boxShadow: '0 12px 28px rgba(255,179,71,0.35)',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }}/>
          <div style={{ position: 'relative', padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="wa" size={24} stroke="#fff"/>
              </div>
              <div>
                <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 18 }}>WhatsApp Bot</div>
                <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>Fitur ini memerlukan backend terpisah</div>
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.95, lineHeight: 1.5, marginBottom: 14 }}>
              Hubungkan dengan backend server untuk mencatat transaksi langsung dari chat WhatsApp.
            </div>
            <button onClick={() => window.open('https://github.com/whatsapp-web/baileys', '_blank')} style={{
              padding: '10px 16px', borderRadius: 999,
              background: '#fff', color: C.amberInk,
              fontSize: 13, fontWeight: 700,
            }}>Pelajari caranya</button>
          </div>
        </Card>
      </div>

      {/* Example chat */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title="Contoh penggunaan"/>
        <Card padding={14} style={{ background: '#E5DDD5' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <div style={{ background: '#DCF8C6', padding: '8px 12px', borderRadius: '14px 14px 4px 14px', maxWidth: '78%', fontSize: 13.5, fontWeight: 500, color: C.ink }}>
              kopi tuku 28rb pake gopay
              <div style={{ fontSize: 9.5, color: '#666', marginTop: 2, textAlign: 'right' }}>08:42 ✓✓</div>
            </div>
          </div>
          <div style={{ display: 'flex', marginBottom: 8 }}>
            <div style={{ background: '#fff', padding: '10px 12px', borderRadius: '14px 14px 14px 4px', maxWidth: '82%', fontSize: 13, color: C.ink, boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>✅ Tercatat</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3px 10px', fontSize: 12.5 }}>
                <span style={{ color: C.inkSoft, fontWeight: 600 }}>Jumlah</span><span style={{ fontWeight: 700 }}>−Rp 28.000</span>
                <span style={{ color: C.inkSoft, fontWeight: 600 }}>Kategori</span><span style={{ fontWeight: 700 }}>🍜 Makan & Minum</span>
                <span style={{ color: C.inkSoft, fontWeight: 600 }}>Akun</span><span style={{ fontWeight: 700 }}>🟢 GoPay</span>
              </div>
              <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 6 }}>Sisa budget Makan: Rp 680rb · 21h lagi</div>
              <div style={{ fontSize: 9.5, color: '#666', marginTop: 4, textAlign: 'right' }}>08:42</div>
            </div>
          </div>
        </Card>
        <div style={{ padding: '10px 4px 0', fontSize: 11.5, color: C.inkSoft, fontWeight: 600, lineHeight: 1.5 }}>
          Format bebas — coba <span style={{ background: '#fff', padding: '2px 6px', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>"gojek 22rb"</span>,&nbsp;
          <span style={{ background: '#fff', padding: '2px 6px', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>"bayar listrik 480rb dari BCA"</span>, atau&nbsp;
          <span style={{ background: '#fff', padding: '2px 6px', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>"masuk gaji 15.5jt"</span>.
        </div>
      </div>

      {/* Toggles */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title="Pengaturan bot"/>
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', background: C.amberSoft, borderBottom: `1px solid ${C.line}` }}>
            <div style={{ fontSize: 11.5, color: C.amberInk, fontWeight: 700 }}>Tersedia saat backend aktif</div>
          </div>
          <div style={{ padding: '0 6px' }}>
            {[
              { key: 'auto',    state: autoCategorize, set: setAutoCategorize, label: 'Auto-kategori AI', sub: 'Tebak kategori dari teks' },
              { key: 'confirm', state: confirmFirst,   set: setConfirmFirst,   label: 'Konfirmasi dulu',  sub: 'Tunggu balasan "ya" sebelum simpan' },
              { key: 'digest',  state: dailyDigest,    set: setDailyDigest,    label: 'Ringkasan harian', sub: 'Kirim laporan jam 21:00 tiap hari' },
            ].map((t, i) => (
              <div key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 500 }}>{t.sub}</div>
                </div>
                <button onClick={() => t.set(!t.state)} style={{
                  width: 48, height: 28, borderRadius: 999, padding: 3,
                  background: t.state ? C.primary : '#D8D2C5',
                  display: 'flex', alignItems: 'center', justifyContent: t.state ? 'flex-end' : 'flex-start',
                  transition: 'background 0.2s',
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}/>
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity log */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title="Contoh log"/>
        <Card padding={6}>
          {waLog.map((w, i) => (
            <div key={w.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 12px', borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}` }}>
              <span style={{
                width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                background: w.ok ? '#DCF7E5' : C.coralSoft,
                color: w.ok ? '#1A7A3D' : C.coralDeep,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={w.ok ? 'check' : 'close'} size={16} sw={2.6}/>
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: C.ink, fontWeight: 500 }}>"{w.input}"</div>
                <div style={{ fontSize: 11.5, color: w.ok ? C.inkSoft : C.coralDeep, fontWeight: 600, marginTop: 2 }}>
                  {w.ok && w.parsed
                    ? `→ ${catById(w.parsed.cat).name} · ${(accounts.find(a=>a.id===w.parsed.account)||{name:w.parsed.account}).name} · ${fmtIDR(w.parsed.amount, { compact: true })}`
                    : `⚠ ${w.error}`}
                </div>
                <div style={{ fontSize: 10.5, color: C.inkFaint, fontWeight: 700, marginTop: 2 }}>{w.time}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── INSIGHTS ────────────────────────────────────────────────
function ScreenInsights({ back }) {
  const { catShare, monthIncome, monthExpense, tx } = React.useContext(DataCtx);
  const curMonth = new Date().toISOString().slice(0, 7);
  const total = catShare.reduce((s,c)=>s+c.amount,0);
  const cats5 = catShare.slice(0, 5);

  let acc = 0;
  const segments = cats5.map(c => {
    const start = acc / (total || 1);
    acc += c.amount;
    const end = acc / (total || 1);
    return { ...c, start, end };
  });

  const monthBars = [
    { m: 'Des', income: 12000000, expense: 6800000 },
    { m: 'Jan', income: 14500000, expense: 8200000 },
    { m: 'Feb', income: 14500000, expense: 7400000 },
    { m: 'Mar', income: 14500000, expense: 7900000 },
    { m: 'Apr', income: 14500000, expense: 6500000 },
    { m: 'Mei', income: monthIncome, expense: monthExpense },
  ];
  const maxBar = Math.max(...monthBars.map(b => Math.max(b.income, b.expense)), 1);

  const arc = (start, end, r = 60, cx = 80, cy = 80) => {
    const a1 = start * Math.PI * 2 - Math.PI / 2;
    const a2 = end * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = end - start > 0.5 ? 1 : 0;
    return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
  };

  return (
    <div style={{ paddingBottom: 110 }}>
      <PageHeader title="Insights" onBack={back}
        right={<button style={{ padding: '8px 12px', borderRadius: 999, background: '#fff', color: C.ink, fontSize: 12, fontWeight: 700, boxShadow: '0 1px 0 rgba(26,22,37,0.04)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })} <Icon name="chevron-d" size={13} sw={2.2}/>
        </button>}/>

      {/* Summary */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card padding={14} style={{ background: C.limeSoft }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.limeInk, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Pemasukan</div>
          <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 20, color: C.limeInk, letterSpacing: '-0.02em', marginTop: 2 }}>
            {fmtIDR(monthIncome, { compact: true })}
          </div>
          <div style={{ fontSize: 11, color: C.limeInk, fontWeight: 700, opacity: 0.7 }}>
            {tx.filter(t=>t.amount>0&&t.date&&t.date.startsWith(curMonth)).length} sumber
          </div>
        </Card>
        <Card padding={14} style={{ background: C.coralSoft }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.coralInk, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Pengeluaran</div>
          <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 20, color: C.coralInk, letterSpacing: '-0.02em', marginTop: 2 }}>
            {fmtIDR(monthExpense, { compact: true })}
          </div>
          <div style={{ fontSize: 11, color: C.coralInk, fontWeight: 700, opacity: 0.7 }}>
            {tx.filter(t=>t.amount<0&&t.date&&t.date.startsWith(curMonth)).length} transaksi
          </div>
        </Card>
      </div>

      {/* Pie + breakdown */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title="Distribusi pengeluaran"/>
        <Card padding={18}>
          {total > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ position: 'relative', width: 160, height: 160, flexShrink: 0 }}>
                <svg width="160" height="160" viewBox="0 0 160 160">
                  {segments.map((s) => (
                    <path key={s.cat} d={arc(s.start, s.end)} fill={catById(s.cat).color} stroke="#fff" strokeWidth="3"/>
                  ))}
                  <circle cx="80" cy="80" r="36" fill="#fff"/>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 10, color: C.inkSoft, fontWeight: 700, letterSpacing: '0.04em' }}>TOTAL</div>
                  <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 14, color: C.ink, letterSpacing: '-0.02em' }}>{fmtIDR(total, { compact: true })}</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {cats5.map(c => {
                  const cat = catById(c.cat);
                  const pct = (c.amount / total) * 100;
                  return (
                    <div key={c.cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 4, background: cat.color, flexShrink: 0 }}/>
                      <div style={{ flex: 1, fontSize: 11.5, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</div>
                      <div style={{ fontSize: 11, fontWeight: 800, fontFamily: 'Bricolage Grotesque', color: C.ink }}>{Math.round(pct)}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: C.inkSoft, padding: '20px 0' }}>Belum ada data pengeluaran bulan ini.</div>
          )}
        </Card>
      </div>

      {/* Monthly comparison */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title="Tren 6 bulan"/>
        <Card padding={18}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 140, padding: '0 4px' }}>
            {monthBars.map((b, i) => {
              const isCur = i === monthBars.length - 1;
              return (
                <div key={b.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 110, width: '100%', justifyContent: 'center' }}>
                    <div style={{
                      width: '40%', minWidth: 8,
                      height: `${(b.income / maxBar) * 100}%`,
                      background: isCur ? C.lime : C.limeSoft,
                      borderRadius: '6px 6px 0 0',
                    }}/>
                    <div style={{
                      width: '40%', minWidth: 8,
                      height: `${(b.expense / maxBar) * 100}%`,
                      background: isCur ? C.coral : C.coralSoft,
                      borderRadius: '6px 6px 0 0',
                    }}/>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isCur ? C.ink : C.inkSoft }}>{b.m}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12, fontSize: 11, fontWeight: 700, color: C.inkSoft }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: C.lime }}/> Masuk</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: C.coral }}/> Keluar</span>
          </div>
        </Card>
      </div>

      {/* Smart cards */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHeading title="Insight pintar"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: 'flame', color: C.coralDeep, soft: C.coralSoft, title: 'Belanja naik 23% vs April', body: 'Kebanyakan dari Uniqlo & Indomaret. Pertimbangkan set budget mingguan.' },
            { icon: 'sparkle', color: C.primary, soft: C.primarySoft, title: 'Auto-debit Spotify, Netflix, IndiHome', body: 'Total subs bulanan: Rp 573rb. Cek apa masih dipakai.' },
            { icon: 'piggy', color: C.limeDeep, soft: C.limeSoft, title: 'Saving rate kamu 36%', body: 'Lebih tinggi dari rata-rata. Pertahankan! 🎉' },
          ].map((s, i) => (
            <Card key={i} padding={14} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 36, height: 36, borderRadius: 12, background: s.soft, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={s.icon} size={19} sw={2}/>
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 500, lineHeight: 1.45, marginTop: 2 }}>{s.body}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenMore, ScreenAccounts, ScreenCategories, ScreenDebt, ScreenNotif, ScreenWA, ScreenInsights });

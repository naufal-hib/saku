// Saku — main app shell

const { useState: uSA, useEffect: uEA } = React;

function App() {
  const [loading, setLoading] = uSA(true);
  const [dbError, setDbError] = uSA(false);

  // ─── Data state (semua dari Firebase) ──────────────────────
  const [tx, setTx] = uSA([]);
  const [accounts, setAccounts] = uSA([]);
  const [budgets, setBudgets] = uSA([]);
  const [debts, setDebts] = uSA([]);
  const [notifs, setNotifs] = uSA([]);
  const [waLog, setWaLog] = uSA([]);
  const [userName, setUserName] = uSA('Pengguna');

  // ─── UI state ───────────────────────────────────────────────
  const [route, setRoute] = uSA('home');
  const [showAdd, setShowAdd] = uSA(false);
  const [hideBalance, setHideBalance] = uSA(false);
  const [toast, setToast] = uSA(null);

  // ─── Load data dari Firebase saat pertama buka ──────────────
  uEA(() => {
    if (!FIREBASE_CONFIGURED) { setLoading(false); setDbError(true); return; }
    DB.load().then(data => {
      if (data) {
        setTx(data.tx || []);
        setAccounts(data.accounts || []);
        setBudgets(data.budgets || []);
        setDebts(data.debts || []);
        setNotifs(data.notifs || []);
        setWaLog(data.waLog || []);
        setUserName(data.userName || 'Pengguna');
      } else {
        // Pertama kali pakai — isi dengan seed data
        const seed = {
          tx: SEED_TX, accounts: SEED_ACCOUNTS, budgets: SEED_BUDGETS,
          debts: SEED_DEBTS, notifs: SEED_NOTIFS, waLog: SEED_WA_LOG,
          userName: 'Pengguna',
        };
        DB.save(seed);
        setTx(SEED_TX); setAccounts(SEED_ACCOUNTS); setBudgets(SEED_BUDGETS);
        setDebts(SEED_DEBTS); setNotifs(SEED_NOTIFS); setWaLog(SEED_WA_LOG);
        setUserName('Pengguna');
      }
      setLoading(false);
    }).catch(() => { setLoading(false); setDbError(true); });
  }, []);

  // ─── Derived values (dihitung dari state) ──────────────────
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const curMonth = new Date().toISOString().slice(0, 7);
  const monthTx = tx.filter(t => t.date && t.date.startsWith(curMonth));
  const monthIncome = monthTx.filter(t => t.amount > 0 && t.via !== 'transfer').reduce((s, t) => s + t.amount, 0);
  const monthExpense = monthTx.filter(t => t.amount < 0 && t.via !== 'transfer').reduce((s, t) => s + Math.abs(t.amount), 0);
  const monthBudgetLimit = budgets.filter(b => b.period === 'Bulanan').reduce((s, b) => s + b.limit, 0);
  const monthBudgetSpent = budgets.filter(b => b.period === 'Bulanan').reduce((s, b) => s + b.spent, 0);
  const catShare = (() => {
    const map = {};
    monthTx.filter(t => t.amount < 0 && t.via !== 'transfer').forEach(t => {
      map[t.cat] = (map[t.cat] || 0) + Math.abs(t.amount);
    });
    return Object.entries(map).map(([cat, amount]) => ({ cat, amount })).sort((a, b) => b.amount - a.amount);
  })();

  // ─── Mutations (update state + simpan ke Firebase) ─────────
  const addTx = async (newTx) => {
    const nextTx = [newTx, ...tx];
    const nextAccounts = accounts.map(a =>
      a.id === newTx.account ? { ...a, balance: a.balance + newTx.amount } : a
    );
    setTx(nextTx);
    setAccounts(nextAccounts);
    const patch = { tx: nextTx, accounts: nextAccounts };
    if (newTx.amount < 0 && newTx.via !== 'transfer') {
      const nextBudgets = budgets.map(b =>
        b.cat === newTx.cat ? { ...b, spent: b.spent + Math.abs(newTx.amount) } : b
      );
      setBudgets(nextBudgets);
      patch.budgets = nextBudgets;
    }
    await DB.patch(patch);
  };

  const addTransfer = async (fromId, toId, amount, note) => {
    if (!amount || fromId === toId) return;
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 5);
    const base = Date.now();
    const txOut = { id: 't' + base,     date, time, amount: -amount, cat: 'transfer', account: fromId, note: note || 'Transfer', via: 'transfer' };
    const txIn  = { id: 't' + (base+1), date, time, amount:  amount, cat: 'transfer', account: toId,   note: note || 'Transfer', via: 'transfer' };
    const nextTx = [txOut, txIn, ...tx];
    const nextAccounts = accounts.map(a => {
      if (a.id === fromId) return { ...a, balance: a.balance - amount };
      if (a.id === toId)   return { ...a, balance: a.balance + amount };
      return a;
    });
    setTx(nextTx); setAccounts(nextAccounts);
    await DB.patch({ tx: nextTx, accounts: nextAccounts });
  };

  const deleteTx = async (id) => {
    const removed = tx.find(t => t.id === id);
    if (!removed) return;
    const nextTx = tx.filter(t => t.id !== id);
    const nextAccounts = accounts.map(a =>
      a.id === removed.account ? { ...a, balance: a.balance - removed.amount } : a
    );
    let patch = { tx: nextTx, accounts: nextAccounts };
    if (removed.amount < 0 && removed.via !== 'transfer') {
      const nextBudgets = budgets.map(b =>
        b.cat === removed.cat ? { ...b, spent: Math.max(0, b.spent - Math.abs(removed.amount)) } : b
      );
      setBudgets(nextBudgets);
      patch.budgets = nextBudgets;
    }
    setTx(nextTx); setAccounts(nextAccounts);
    await DB.patch(patch);
  };

  const addBudget = async (budget) => {
    const next = [...budgets, budget];
    setBudgets(next);
    await DB.patch({ budgets: next });
  };

  const addDebt = async (debt) => {
    const next = [debt, ...debts];
    setDebts(next);
    await DB.patch({ debts: next });
  };

  const markDebtDone = async (id) => {
    const next = debts.filter(d => d.id !== id);
    setDebts(next);
    await DB.patch({ debts: next });
  };

  const addAccount = async (acc) => {
    const next = [...accounts, acc];
    setAccounts(next);
    await DB.patch({ accounts: next });
  };

  const updateUserName = async (name) => {
    setUserName(name);
    await DB.patch({ userName: name });
  };

  const updateBudgetLimit = async (id, newLimit) => {
    const updated = budgets.map(b => b.id === id ? { ...b, limit: newLimit } : b);
    setBudgets(updated);
    await DB.patch({ budgets: updated });
  };

  const markAllNotifsRead = async () => {
    const updated = notifs.map(n => ({ ...n, read: true }));
    setNotifs(updated);
    await DB.patch({ notifs: updated });
  };

  // ─── Context value ──────────────────────────────────────────
  const ctxValue = {
    tx, accounts, budgets, debts, notifs, waLog,
    totalBalance, monthIncome, monthExpense,
    monthBudgetLimit, monthBudgetSpent, catShare,
    addTx, updateBudgetLimit, markAllNotifsRead,
    addTransfer, deleteTx, addBudget, addDebt, markDebtDone, addAccount,
    updateUserName, userName,
  };

  // ─── Routing ────────────────────────────────────────────────
  const tabRoutes = ['home', 'tx', 'budget', 'more'];
  const activeTab = tabRoutes.includes(route) ? route : 'more';
  const back = () => setRoute('more');
  const goto = (r) => setRoute(r);

  const onSaveTx = (t) => {
    setShowAdd(false);
    if (t.via === 'transfer') {
      setToast('Transfer berhasil dicatat');
    } else {
      const cat = catById(t.cat);
      setToast(`Tercatat: ${cat.icon} ${cat.name} ${fmtIDR(t.amount, { sign: true, compact: true })}`);
    }
  };

  // ─── Loading screen ─────────────────────────────────────────
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', flexDirection:'column', gap:14 }}>
      <div style={{ width:56, height:56, borderRadius:18, background:`linear-gradient(135deg,${C.lime},${C.primary})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 28px rgba(124,92,252,0.45)' }}>
        <span style={{ fontFamily:'Bricolage Grotesque', fontWeight:800, fontSize:28, color:'#fff' }}>S</span>
      </div>
      <div style={{ fontSize:14, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>Memuat data...</div>
    </div>
  );

  // ─── Firebase belum dikonfigurasi ───────────────────────────
  if (dbError) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'24px 20px' }}>
      <div style={{ maxWidth:400, background:'rgba(255,255,255,0.08)', borderRadius:24, padding:28, color:'#fff', backdropFilter:'blur(12px)' }}>
        <div style={{ fontFamily:'Bricolage Grotesque', fontWeight:700, fontSize:22, marginBottom:8 }}>Setup Firebase dulu</div>
        <div style={{ fontSize:13, lineHeight:1.7, color:'rgba(255,255,255,0.8)', marginBottom:16 }}>
          Buka file <code style={{background:'rgba(255,255,255,0.15)',padding:'2px 6px',borderRadius:6}}>firebase.jsx</code> dan isi <code style={{background:'rgba(255,255,255,0.15)',padding:'2px 6px',borderRadius:6}}>FIREBASE_CONFIG</code> dengan konfigurasi dari Firebase Console.
        </div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)', fontWeight:600 }}>
          Panduan lengkap ada di PANDUAN-DEPLOY.md
        </div>
      </div>
    </div>
  );

  // ─── Screen router ──────────────────────────────────────────
  let screen;
  if (route === 'home')          screen = <ScreenDashboard goto={goto} openAdd={() => setShowAdd(true)} hideBalance={hideBalance} setHideBalance={setHideBalance}/>;
  else if (route === 'tx')       screen = <ScreenTransaksi openAdd={() => setShowAdd(true)}/>;
  else if (route === 'budget')   screen = <ScreenBudget goto={goto}/>;
  else if (route === 'more')     screen = <ScreenMore goto={goto}/>;
  else if (route === 'accounts') screen = <ScreenAccounts back={back}/>;
  else if (route === 'cats')     screen = <ScreenCategories back={back}/>;
  else if (route === 'debt')     screen = <ScreenDebt back={back}/>;
  else if (route === 'notif')    screen = <ScreenNotif back={() => setRoute('home')}/>;
  else if (route === 'wa')       screen = <ScreenWA back={back}/>;
  else if (route === 'insights') screen = <ScreenInsights back={back}/>;

  return (
    <DataCtx.Provider value={ctxValue}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 4 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12,
            background: `linear-gradient(135deg, ${C.lime}, ${C.primary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(124,92,252,0.4)',
          }}>
            <span style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 800, fontSize: 18, color: '#fff' }}>S</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>Saku</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Personal budget tracker</div>
          </div>
        </div>

        <IOSDevice width={393} height={830}>
          <div style={{
            position: 'relative', height: '100%', overflow: 'hidden',
            background: C.bg, fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            color: C.ink,
          }}>
            <div className="saku-scroll" style={{
              height: '100%', overflowY: 'auto', overflowX: 'hidden',
              position: 'relative',
            }}>
              {screen}
            </div>
            <BottomNav active={activeTab} onChange={(id) => setRoute(id)} onAdd={() => setShowAdd(true)}/>
            <ModalAdd open={showAdd} onClose={() => setShowAdd(false)} onSave={onSaveTx}/>
            <Toast msg={toast} onClose={() => setToast(null)}/>
          </div>
        </IOSDevice>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 16px', borderRadius: 999,
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
          color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: C.lime, animation: 'saku-pulse-dot 1.6s infinite' }}/>
          Saku · Budget Tracker Pribadi
        </div>
      </div>
    </DataCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

// Saku — main app shell

const { useState: uSA, useEffect: uEA } = React;

function App() {
  const [route, setRoute] = uSA('home'); // home, tx, budget, more, accounts, cats, debt, notif, wa, insights
  const [showAdd, setShowAdd] = uSA(false);
  const [hideBalance, setHideBalance] = uSA(false);
  const [toast, setToast] = uSA(null);

  // primary tabs (visible in bottom nav)
  const tabRoutes = ['home', 'tx', 'budget', 'more'];
  const activeTab = tabRoutes.includes(route) ? route : 'more';

  const onTabChange = (id) => setRoute(id);
  const back = () => setRoute('more');

  const goto = (r) => {
    if (r === 'tx') setRoute('tx');
    else setRoute(r);
  };

  const onSaveTx = (tx) => {
    setShowAdd(false);
    const cat = catById(tx.cat);
    setToast(`Tercatat: ${cat.icon} ${cat.name} ${fmtIDR(tx.amount, { sign: true, compact: true })}`);
  };

  let screen;
  if (route === 'home')        screen = <ScreenDashboard goto={goto} openAdd={() => setShowAdd(true)} hideBalance={hideBalance} setHideBalance={setHideBalance}/>;
  else if (route === 'tx')     screen = <ScreenTransaksi openAdd={() => setShowAdd(true)}/>;
  else if (route === 'budget') screen = <ScreenBudget goto={goto}/>;
  else if (route === 'more')   screen = <ScreenMore goto={goto}/>;
  else if (route === 'accounts') screen = <ScreenAccounts back={back}/>;
  else if (route === 'cats')   screen = <ScreenCategories back={back}/>;
  else if (route === 'debt')   screen = <ScreenDebt back={back}/>;
  else if (route === 'notif')  screen = <ScreenNotif back={() => setRoute('home')}/>;
  else if (route === 'wa')     screen = <ScreenWA back={back}/>;
  else if (route === 'insights') screen = <ScreenInsights back={back}/>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Brand mark above frame */}
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
          {/* Scrollable content */}
          <div className="saku-scroll" style={{
            height: '100%', overflowY: 'auto', overflowX: 'hidden',
            position: 'relative',
          }}>
            {screen}
          </div>

          {/* Bottom nav (fixed) */}
          <BottomNav active={activeTab} onChange={onTabChange} onAdd={() => setShowAdd(true)}/>

          {/* Add modal */}
          <ModalAdd open={showAdd} onClose={() => setShowAdd(false)} onSave={onSaveTx}/>

          {/* Toast */}
          <Toast msg={toast} onClose={() => setToast(null)}/>
        </div>
      </IOSDevice>

      {/* Hint */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 16px', borderRadius: 999,
        background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
        color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: C.lime, animation: 'saku-pulse-dot 1.6s infinite' }}/>
        Prototype interaktif — tap & jelajahi
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

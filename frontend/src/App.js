import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import FounderSidebar from './scenes/global/FounderSidebar';
import InvestorDashboard from './scenes/investordashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import InvestorMatches from './scenes/investormatches';
import FounderMatches from './scenes/foundermatches';
import Matchmaking from './scenes/matchmaking';
import InvestorPreferences from './scenes/investorpreferences';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation(); // Get the current location

  // Determine which sidebar to render
  const renderSidebar = () => {
    if (location.pathname.startsWith('/founder')) {
      return <FounderSidebar />;
    } else {
      return <Sidebar isSidebar={isSidebar} />;
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {renderSidebar()} {/* Call the function to render the correct sidebar */}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<InvestorDashboard />} />
              <Route path="/investor" element={<InvestorDashboard />} />
              <Route path="/investor/matches" element={<InvestorMatches />} />
              <Route path="/investor/preferences" element={<InvestorPreferences />} />
              <Route path="/founder" element={<Matchmaking />} />
              <Route path="/founder/matches" element={<FounderMatches />} />
              <Route path="/founder/matchmaking" element={<Matchmaking />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

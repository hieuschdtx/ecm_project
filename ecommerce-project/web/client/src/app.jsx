import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import 'react-toastify/dist/ReactToastify.css';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import ToastMessage from './components/toast';

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
      <ToastMessage />
    </ThemeProvider>
  );
}

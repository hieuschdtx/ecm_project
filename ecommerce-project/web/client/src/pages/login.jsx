import { Helmet } from 'react-helmet-async';
import { LoginView } from 'src/sections';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Đăng nhập </title>
      </Helmet>

      <LoginView />
    </>
  );
}

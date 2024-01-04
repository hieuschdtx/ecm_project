import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import { RegisterView } from 'src/sections';

export default function RegisterPage() {
  const { user } = useSelector((x) => x.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> Đăng ký tài khoản </title>
      </Helmet>
      <RegisterView />
    </>
  );
}

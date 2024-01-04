import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import { ProfileView } from 'src/sections';

export default function ProfilePage() {
  const { user } = useSelector((x) => x.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router, user]);
  return (
    <>
      <Helmet>
        <title> Thông tin khách hàng </title>
      </Helmet>
      <ProfileView />
    </>
  );
}

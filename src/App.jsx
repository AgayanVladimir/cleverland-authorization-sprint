import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { OrangeBackground } from './components/layouts/backgrounds/orange-background';
import { MainLayout } from './components/layouts/main/main';
import { NavigationLayout } from './components/layouts/navigation';
import { LayoutTerms } from './components/layouts/terms/terms';
import { Auth } from './components/pages/authorization/auth';
import { Register } from './components/pages/authorization/register';
import { Books } from './components/pages/books';
import { ForgotPass } from './components/pages/forgot-pass/forgot-pass';
import { RecoveryRequest } from './components/pages/forgot-pass/recovery-request';
import { setUserIsAuthorized } from './redux/actions/actions';
import { COOKIES_KEY, extractCookieValue } from './utils/cookies';
import { CLIENT_URL_PATHNAMES } from './utils/url-pathnames';

export const App = () => {
  const { userIsAuthorized } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userIsAuthorizedCookie = extractCookieValue(COOKIES_KEY.USER_IS_AUTHORIZED);

  useEffect(() => {
    if (userIsAuthorizedCookie) {
      dispatch(setUserIsAuthorized(true));
    }
  }, [userIsAuthorized]); // eslint-disable-line

  return (
    <Routes>
      {userIsAuthorized ? (
        <Route path='/' element={<MainLayout />}>
          <Route element={<NavigationLayout />}>
            <Route path='/' element={<Navigate to='books/all' />} />
            <Route path='books/:category' element={<Books />} />
            <Route path={CLIENT_URL_PATHNAMES.TERMS} element={<LayoutTerms contentView='terms' />} />
            <Route path={CLIENT_URL_PATHNAMES.CONTRACT} element={<LayoutTerms contentView='contract' />} />
            <Route path={CLIENT_URL_PATHNAMES.AUTH} element={<Navigate to='/books/all' />} />
            <Route path={CLIENT_URL_PATHNAMES.REGISTRATION} element={<Navigate to='/books/all' />} />
            <Route path={CLIENT_URL_PATHNAMES.FORGOT_PASS} element={<Navigate to='/books/all' />} />
          </Route>
        </Route>
      ) : (
        <Route path='/' element={<OrangeBackground />}>
          <Route path='' element={<Navigate to={CLIENT_URL_PATHNAMES.AUTH} />} />
          <Route path={CLIENT_URL_PATHNAMES.AUTH} element={<Auth />} />
          <Route path={CLIENT_URL_PATHNAMES.REGISTRATION} element={<Register />} />
          <Route path={CLIENT_URL_PATHNAMES.FORGOT_PASS} element={<ForgotPass />} />
          <Route path='/books/:category' element={<Navigate to={`/${CLIENT_URL_PATHNAMES.AUTH}`} />} />
          <Route path='/books/:category/:id' element={<Navigate to={`/${CLIENT_URL_PATHNAMES.AUTH}`} />} />
          <Route path={CLIENT_URL_PATHNAMES.TERMS} element={<Navigate to={`/${CLIENT_URL_PATHNAMES.AUTH}`} />} />
          <Route path={CLIENT_URL_PATHNAMES.CONTRACT} element={<Navigate to={`/${CLIENT_URL_PATHNAMES.AUTH}`} />} />
        </Route>
      )}

      <Route path='*' element={<h2> Страница не найдена </h2>} />
    </Routes>
  );
};

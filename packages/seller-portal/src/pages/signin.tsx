import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  color,
  fontSize,
  fontWeight,
  mode,
  size,
  space,
  shadow,
  radius,
} from '@rmp-demo-store/ui/theme-utils';
import Stack from '@rmp-demo-store/ui/stack';
import Select from '@rmp-demo-store/ui/select';

import nextI18NextConfig from '../../next-i18next.config';
import { getFirebaseAuth } from '../common/firebase';
import SignInForm, { FormData } from '../components/forms/signin';
import { persistLanguageSetting } from '../common/utils/i18n';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'signIn'],
        nextI18NextConfig
      )),
    },
  };
};

const SignIn: NextPage = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation('signIn');

  const handleSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      // ref: https://firebase.google.com/docs/auth/admin/manage-cookies#create_session_cookie
      const user = await signInWithEmailAndPassword(
        getFirebaseAuth(),
        email,
        password
      );
      const idToken = await user.user.getIdToken();

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      router.replace('/');
    } catch (error) {
      throw error;
    }
  };

  const handleLanguageSelectChange: React.ChangeEventHandler<HTMLSelectElement> =
    (event) => {
      const { value } = event.target;
      persistLanguageSetting(value);
      router.replace(router.asPath, undefined, { locale: value });
    };

  return (
    <div
      css={`
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${mode(color('gray.50'), color('gray.800'))};
      `}
    >
      <div
        css={`
          width: ${size('md')};
        `}
      >
        <h1
          css={`
            font-size: ${fontSize('2xl')};
            font-weight: ${fontWeight('bold')};
            text-align: center;
            margin-bottom: ${space(16)};
            letter-spacing: -0.3px;
          `}
        >
          <FontAwesomeIcon
            icon={faStore}
            fixedWidth
            css={`
              color: ${color('blue.600')};
              margin-right: ${space(2)};
            `}
          />
          Demo Seller Portal
        </h1>
        <h2
          css={`
            font-size: ${fontSize('4xl')};
            font-weight: ${fontWeight('extraBold')};
            text-align: center;
            margin-bottom: ${space(8)};
          `}
        >
          {t('header')}
        </h2>
        <Stack direction="column" spacing={6}>
          <div
            css={`
              padding: ${space(8)} ${space(10)};
              background-color: ${mode(color('white'), color('gray.700'))};
              box-shadow: ${shadow('base')};
              border-radius: ${radius('lg')};
            `}
          >
            <SignInForm onSubmit={handleSubmit} />
          </div>
          <div>
            <div
              css={`
                width: fit-content;
              `}
            >
              <Select size="sm" onChange={handleLanguageSelectChange}>
                <option value="en" selected={i18n.language.startsWith('en')}>
                  English
                </option>
                <option value="ko" selected={i18n.language.startsWith('ko')}>
                  한국어
                </option>
              </Select>
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default SignIn;

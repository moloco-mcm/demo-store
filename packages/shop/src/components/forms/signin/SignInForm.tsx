import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@rmp-demo-store/ui/button';
import FormControl, {
  FormErrorMessage,
  FormLabel,
} from '@rmp-demo-store/ui/form-control';
import Input, { InputAdornment, InputGroup } from '@rmp-demo-store/ui/input';
import Stack from '@rmp-demo-store/ui/stack';
import { color, fontSize } from '@rmp-demo-store/ui/theme-utils/get';

import yup from '../../../common/utils/yup';

export type FormData = {
  email: string;
  password: string;
};

type Props = {
  onSubmit?: (data: FormData) => Promise<unknown> | unknown;
};

export const SignInForm: React.FC<Props> = (props) => {
  const { onSubmit } = props;

  const { t } = useTranslation('signIn');
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState<
    string | undefined
  >();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('email.errors.email'))
      .required(t('email.errors.required')),
    password: yup.string().required(t('password.errors.required')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    if (!onSubmit) return;
    try {
      setSubmitErrorMessage(undefined);
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitErrorMessage(String(error));
    }
  });

  const handleShowPasswordButtonClick = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={6} direction="column">
        <FormControl
          id="email"
          isInvalid={!!errors.email}
          isReadOnly={isSubmitting}
        >
          <FormLabel>{t('email.label')}</FormLabel>
          <Input
            type="text"
            autoComplete="username"
            autoFocus
            inputMode="email"
            data-testid="email"
            {...register('email')}
          />
          <FormErrorMessage data-testid="email-field-error">
            {errors.email?.message && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="current-password"
          isInvalid={!!errors.password}
          isReadOnly={isSubmitting}
        >
          <FormLabel>{t('password.label')}</FormLabel>
          <InputGroup>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              data-testid="password"
              css={`
                padding-right: 3.2rem;
              `}
              {...register('password')}
            />
            <InputAdornment
              placement="right"
              css={`
                width: 3.2rem;
              `}
            >
              <Button
                type="button"
                size="sm"
                variant="ghost"
                colorScheme="gray"
                tabIndex={-1}
                onClick={handleShowPasswordButtonClick}
                css={`
                  height: 1.75rem;
                `}
              >
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                />
              </Button>
            </InputAdornment>
          </InputGroup>
          <FormErrorMessage data-testid="password-field-error">
            {errors.password?.message && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        {/* TODO: replace with Alert component */}
        {submitErrorMessage && (
          <p
            data-testid="submit-error"
            css={`
              color: ${color('red.500')};
              font-size: ${fontSize('sm')};
            `}
          >
            {submitErrorMessage}
          </p>
        )}
        <Button
          type="submit"
          isLoading={isSubmitting}
          colorScheme="purple"
          data-testid="submit"
        >
          {t('submitButton.label')}
        </Button>
      </Stack>
    </form>
  );
};

export default SignInForm;

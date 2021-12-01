// TODO: setup test (@sjhan-moloco)
export {};

// import {
//   render,
//   fireEvent,
//   waitFor,
//   screen,
//   RenderResult,
// } from '../../../common/utils/test';

// import SignInForm from '../index';

// jest.mock('react-i18next', () => ({
//   useTranslation: () => ({ t: (key: string) => key }),
// }));

// describe('SignInForm', () => {
//   let renderResult: RenderResult;

//   beforeEach(() => {
//     renderResult = render(<SignInForm />);
//   });

//   test('should show error for invalid email format', async () => {
//     fireEvent.input(screen.getByTestId('email'), {
//       target: {
//         value: 'test@',
//       },
//     });
//     fireEvent.submit(screen.getByTestId('submit'));

//     await waitFor(() => {
//       expect(screen.getByTestId('email-field-error')).toBeVisible();
//     });
//   });

//   test('should show error for empty email/password field', async () => {
//     fireEvent.input(screen.getByTestId('email'), {
//       target: {
//         value: '',
//       },
//     });

//     fireEvent.input(screen.getByTestId('password'), {
//       target: {
//         value: '',
//       },
//     });
//     fireEvent.submit(screen.getByTestId('submit'));

//     await waitFor(() => {
//       expect(screen.getByTestId('email-field-error')).toBeVisible();
//       expect(screen.getByTestId('password-field-error')).toBeVisible();
//     });
//   });

//   test('should show error message for submit failure', async () => {
//     renderResult.rerender(
//       <SignInForm
//         onSubmit={() =>
//           new Promise((resolve, reject) =>
//             setTimeout(() => {
//               reject(new Error('Simulated server error'));
//             }, 10)
//           )
//         }
//       />
//     );

//     fireEvent.input(screen.getByTestId('email'), {
//       target: {
//         value: 'test@example.com',
//       },
//     });

//     fireEvent.input(screen.getByTestId('password'), {
//       target: {
//         value: 'not-so-secret-password',
//       },
//     });
//     fireEvent.submit(screen.getByTestId('submit'));

//     await waitFor(() => {
//       expect(screen.getByTestId('submit-error')).toBeVisible();
//     });
//   });
// });

// describe('SignInForm with enableWorkplaceIdField true', () => {
//   beforeEach(() => {
//     render(<SignInForm enableWorkplaceIdField />);
//   });

//   test('should show error for empty workplaceId field', async () => {
//     fireEvent.input(screen.getByTestId('workplaceId'), {
//       target: {
//         value: '',
//       },
//     });

//     fireEvent.input(screen.getByTestId('email'), {
//       target: {
//         value: 'demo@moloco.com',
//       },
//     });

//     fireEvent.input(screen.getByTestId('password'), {
//       target: {
//         value: '123abc!',
//       },
//     });

//     fireEvent.submit(screen.getByTestId('submit'));

//     await waitFor(() => {
//       expect(screen.getByTestId('workplace-id-field-error')).toBeVisible();
//     });
//   });
// });

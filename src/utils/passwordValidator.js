export function passwordValidator(password) {
  if (!password) return 'Password không được để trống!';
  if (password.length < 6) return 'Password phải có ít nhất 6 ký tự.';
  return '';
}

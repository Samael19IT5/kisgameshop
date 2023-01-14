export function phoneValidator(phone) {
  const re = /\d{10}/;
  if (!phone) return 'Liên hệ không được để trống!';
  if (!re.test(phone)) return 'Liên hệ không hợp lệ.';
  return '';
}

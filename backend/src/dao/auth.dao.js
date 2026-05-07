const supabase = require('../config/supabase');

async function timTheoTenDangNhap(username) {
  const { data, error } = await supabase
    .from('tai_khoan')
    .select(`
      madangnhap,
      matkhau,
      manv,
      nhan_vien (
        hoten,
        loainv,
        email
      )
    `)
    .eq('madangnhap', username)
    .single();

  if (error) {
    console.error('Error finding user by username:', error);
    return null;
  }
  return data;
}

async function docTheoMa(maDangNhap) {
  const { data, error } = await supabase
    .from('tai_khoan')
    .select(`
      madangnhap,
      manv,
      nhan_vien (
        hoten,
        loainv,
        email
      )
    `)
    .eq('madangnhap', maDangNhap)
    .single();

  if (error) {
    console.error('Error finding user by id:', error);
    return null;
  }
  return data;
}

module.exports = { timTheoTenDangNhap, docTheoMa };

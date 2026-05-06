const supabase = require('../config/supabase');

async function docTheoHD(maHD) {
  const { data, error } = await supabase
    .from('bien_ban_ban_giao')
    .select(`
      *,
      chi_tiet_ban_giao (
        *,
        tai_san_trang_thiet_bi (*)
      )
    `)
    .eq('mahd', maHD)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

module.exports = { docTheoHD };

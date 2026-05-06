const supabase = require('../config/supabase');

async function docTheoHD(maHD) {
  const { data, error } = await supabase
    .from('bao_cao_tinh_trang_phong')
    .select('*')
    .eq('mahd', maHD)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

module.exports = { docTheoHD };

const supabase = require('../config/supabase');

async function layTheoMaCN(maCN) {
  const { data, error } = await supabase
    .from('chi_nhanh_dich_vu')
    .select(`
      dich_vu (
        madv,
        tendv,
        gia
      )
    `)
    .eq('macn', maCN);

  if (error) throw error;
  return data.map(item => item.dich_vu);
}

module.exports = {
  layTheoMaCN
};

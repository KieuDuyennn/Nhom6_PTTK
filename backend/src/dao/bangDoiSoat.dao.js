const supabase = require('../config/supabase');

async function docTheoMaHD(maHD) {
  const { data, error } = await supabase
    .from('bang_doi_soat')
    .select(`
      *,
      khoan_khau_tru (*)
    `)
    .eq('mahd', maHD)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows found"
  return data;
}

module.exports = { docTheoMaHD };

const supabase = require('../config/supabase');

async function them(bb) {
  const { data, error } = await supabase
    .from('bien_ban_tra_phong')
    .insert([bb])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function sinhMaBienBanTraPhong() {
  const { data, error } = await supabase
    .from('bien_ban_tra_phong')
    .select('mabienbantp')
    .order('mabienbantp', { ascending: false })
    .limit(1);

  if (error) throw error;

  if (data.length === 0) return 'BBTP001';

  const lastMa = data[0].mabienbantp;
  const lastNumber = parseInt(lastMa.replace('BBTP', ''));
  const nextNumber = lastNumber + 1;
  return `BBTP${nextNumber.toString().padStart(3, '0')}`;
}

async function docTheoMa(maBB) {
  const { data, error } = await supabase
    .from('bien_ban_tra_phong')
    .select(`
      *,
      hop_dong (
        *,
        khach_hang (*),
        hop_dong_giuong (
          magiuong,
          giuong (
            maphong,
            phong (*)
          )
        )
      )
    `)
    .eq('mabienbantp', maBB)
    .single();

  if (error) throw error;
  return data;
}

async function capNhatTrangThai(maBBTP, tt) {
  const { data, error } = await supabase
    .from('bien_ban_tra_phong')
    .update({ trangthai: tt })
    .eq('mabienbantp', maBBTP)
    .select()
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  them,
  sinhMaBienBanTraPhong,
  docTheoMa,
  capNhatTrangThai
};

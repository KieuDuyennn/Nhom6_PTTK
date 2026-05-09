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


async function docTheoMa(maBB) {
  const { data, error } = await supabase
    .from('bien_ban_tra_phong')
    .select(`
      *,
      nhan_vien (*), 
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
  docTheoMa,
  capNhatTrangThai
};

-- ========================================================
-- DỌN DẸP DỮ LIỆU TEST CŨ (Nếu có chạy trước đó)
-- Giúp script chạy lại nhiều lần không bao giờ bị lỗi trùng lặp
-- ========================================================
DELETE FROM THANH_TOAN WHERE MaHD LIKE 'HDT%';
DELETE FROM HOP_DONG_GIUONG WHERE MaHD LIKE 'HDT%';
DELETE FROM HOP_DONG WHERE MaHD LIKE 'HDT%';
DELETE FROM KHACH_HANG WHERE MaKH LIKE 'KHTEST%';

-- ========================================================
-- THÊM DỮ LIỆU TEST MỚI
-- ========================================================
INSERT INTO KHACH_HANG (MaKH, HoTen, GioiTinh, Email, NgaySinh, SDT, SoCCCD, HinhMatTruoc, HinhMatSau, NoiCapCCCD, NgayCapCCCD, NgayHetHanCCCD, QuocTich, DiaChiCuTru, LoaiKhachHang, TrangThai, MaNhom) VALUES
('KHTEST01', 'Test Khách 1', 'Nam', 'test1@abc.com', '2000-01-01', '0990000001', '079999000001', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST02', 'Test Khách 2', 'Nữ', 'test2@abc.com', '2000-02-02', '0990000002', '079999000002', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST03', 'Test Khách 3', 'Nam', 'test3@abc.com', '2000-03-03', '0990000003', '079999000003', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST04', 'Test Khách 4', 'Nữ', 'test4@abc.com', '2000-04-04', '0990000004', '079999000004', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST05', 'Test Khách 5', 'Nam', 'test5@abc.com', '2000-05-05', '0990000005', '079999000005', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST06', 'Test Khách 6', 'Nữ', 'test6@abc.com', '2000-06-06', '0990000006', '079999000006', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST07', 'Test Khách 7', 'Nam', 'test7@abc.com', '2000-07-07', '0990000007', '079999000007', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST08', 'Test Khách 8', 'Nữ', 'test8@abc.com', '2000-08-08', '0990000008', '079999000008', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST09', 'Test Khách 9', 'Nam', 'test9@abc.com', '2000-09-09', '0990000009', '079999000009', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST10', 'Test Khách 10', 'Nữ', 'test10@abc.com', '2000-10-10', '0990000010', '079999000010', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST11', 'Test Khách 11', 'Nam', 'test11@abc.com', '2000-11-11', '0990000011', '079999000011', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST12', 'Test Khách 12', 'Nữ', 'test12@abc.com', '2000-12-12', '0990000012', '079999000012', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST13', 'Test Khách 13', 'Nam', 'test13@abc.com', '2001-01-01', '0990000013', '079999000013', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST14', 'Test Khách 14', 'Nữ', 'test14@abc.com', '2001-02-02', '0990000014', '079999000014', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST15', 'Test Khách 15', 'Nam', 'test15@abc.com', '2001-03-03', '0990000015', '079999000015', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST16', 'Test Khách 16', 'Nữ', 'test16@abc.com', '2001-04-04', '0990000016', '079999000016', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST17', 'Test Khách 17', 'Nam', 'test17@abc.com', '2001-05-05', '0990000017', '079999000017', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST18', 'Test Khách 18', 'Nữ', 'test18@abc.com', '2001-06-06', '0990000018', '079999000018', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST19', 'Test Khách 19', 'Nam', 'test19@abc.com', '2001-07-07', '0990000019', '079999000019', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL),
('KHTEST20', 'Test Khách 20', 'Nữ', 'test20@abc.com', '2001-08-08', '0990000020', '079999000020', NULL, NULL, 'Cục CSQLHC', '2020-01-01', '2030-01-01', 'Việt Nam', 'HCM', 'Cá nhân', 'Hợp lệ', NULL)
ON CONFLICT DO NOTHING;

INSERT INTO HOP_DONG (MaHD, SoLuongGiuong, KyThanhToan, NgayBatDau, ThoiHanThue, GiaThue, NgayKetThuc, TrangThai, MaKH) VALUES
('HDT01', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST01'),
('HDT02', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST02'),
('HDT03', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST03'),
('HDT04', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST04'),
('HDT05', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST05'),
('HDT06', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST06'),
('HDT07', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST07'),
('HDT08', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST08'),
('HDT09', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST09'),
('HDT10', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST10'),
('HDT11', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST11'),
('HDT12', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST12'),
('HDT13', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST13'),
('HDT14', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST14'),
('HDT15', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST15'),
('HDT16', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST16'),
('HDT17', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST17'),
('HDT18', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST18'),
('HDT19', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST19'),
('HDT20', 1, 1, CURRENT_DATE, 6, 1500000, CURRENT_DATE + INTERVAL '6 months', 'Đã ký xác nhận', 'KHTEST20')
ON CONFLICT DO NOTHING;

INSERT INTO HOP_DONG_GIUONG (MaHD, MaGiuong, MaPhong) VALUES
('HDT01', 'G01', 'P101'), ('HDT02', 'G02', 'P101'), ('HDT03', 'G03', 'P101'), ('HDT04', 'G04', 'P101'),
('HDT05', 'G01', 'P102'), ('HDT06', 'G02', 'P102'), ('HDT07', 'G03', 'P102'), ('HDT08', 'G04', 'P102'),
('HDT09', 'G01', 'P103'), ('HDT10', 'G02', 'P103'), ('HDT11', 'G03', 'P103'), ('HDT12', 'G04', 'P103'),
('HDT13', 'G01', 'P104'), ('HDT14', 'G02', 'P104'), ('HDT15', 'G03', 'P104'), ('HDT16', 'G04', 'P104'),
('HDT17', 'G01', 'P105'), ('HDT18', 'G02', 'P105'), ('HDT19', 'G03', 'P105'), ('HDT20', 'G04', 'P105')
ON CONFLICT DO NOTHING;

-- Insert tiền cọc cho 20 hợp đồng (Loại TT: Tiền cọc)
INSERT INTO THANH_TOAN (MaTT, LoaiTT, SoTien, ThoiDiemYeuCau, TrangThai, MaKH, MaHD) VALUES
('TTC_TEST01','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST01','HDT01'),
('TTC_TEST02','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST02','HDT02'),
('TTC_TEST03','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST03','HDT03'),
('TTC_TEST04','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST04','HDT04'),
('TTC_TEST05','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST05','HDT05'),
('TTC_TEST06','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST06','HDT06'),
('TTC_TEST07','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST07','HDT07'),
('TTC_TEST08','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST08','HDT08'),
('TTC_TEST09','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST09','HDT09'),
('TTC_TEST10','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST10','HDT10'),
('TTC_TEST11','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST11','HDT11'),
('TTC_TEST12','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST12','HDT12'),
('TTC_TEST13','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST13','HDT13'),
('TTC_TEST14','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST14','HDT14'),
('TTC_TEST15','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST15','HDT15'),
('TTC_TEST16','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST16','HDT16'),
('TTC_TEST17','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST17','HDT17'),
('TTC_TEST18','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST18','HDT18'),
('TTC_TEST19','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST19','HDT19'),
('TTC_TEST20','Tiền cọc',1500000, CURRENT_TIMESTAMP, 'Đối soát thành công','KHTEST20','HDT20')
ON CONFLICT DO NOTHING;

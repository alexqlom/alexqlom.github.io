#!/usr/bin/env python3
"""Alinea a 4 bytes los archivos sin comprimir de un APK (lo mismo que hace zipalign -p 4).
Uso: zipalign.py entrada.apk salida.apk"""
import struct
import sys
import zipfile


def align(src, dst, n=4):
    zin = zipfile.ZipFile(src)
    raw = open(src, 'rb').read()
    out = bytearray()
    central = []
    for info in zin.infolist():
        o = info.header_offset
        sig, ver, flag, method, mtime, mdate, crc, csize, usize, nlen, elen = struct.unpack('<IHHHHHIIIHH', raw[o:o + 30])
        name = raw[o + 30:o + 30 + nlen]
        extra = raw[o + 30 + nlen:o + 30 + nlen + elen]
        data = raw[o + 30 + nlen + elen:o + 30 + nlen + elen + csize]
        if method == 0:
            # Relleno en el campo extra para que los datos queden en un múltiplo de n.
            extra = b''
            pad = (n - (len(out) + 30 + nlen) % n) % n
            extra = b'\0' * pad
        local_off = len(out)
        out += struct.pack('<IHHHHHIIIHH', sig, ver, flag & ~0x08, method, mtime, mdate, crc, csize, usize, nlen, len(extra))
        out += name + extra + data
        central.append((info, local_off))
    cd_start = len(out)
    for info, off in central:
        name = info.filename.encode('utf-8') if not (info.flag_bits & 0x800) else info.filename.encode('utf-8')
        out += struct.pack('<IHHHHHHIIIHHHHHII', 0x02014b50, info.create_version | (info.create_system << 8), info.extract_version,
                           info.flag_bits & ~0x08, info.compress_type, *dos(info.date_time), info.CRC, info.compress_size,
                           info.file_size, len(name), 0, 0, 0, 0, info.external_attr, off)
        out += name
    cd_size = len(out) - cd_start
    out += struct.pack('<IHHHHIIH', 0x06054b50, 0, 0, len(central), len(central), cd_size, cd_start, 0)
    open(dst, 'wb').write(out)


def dos(dt):
    y, mo, d, h, mi, s = dt
    return ((h << 11) | (mi << 5) | (s // 2)), (((y - 1980) << 9) | (mo << 5) | d)


if __name__ == '__main__':
    align(sys.argv[1], sys.argv[2])

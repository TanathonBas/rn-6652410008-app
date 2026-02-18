/**
 * คำนวณค่าแท็กซี่ ตามโจทย์:
 * - ค่าโดยสารเริ่มต้น 35 บาท (กม. แรก)
 * - กม. 2-10: 6.50 บาท/กม.
 * - กม. 10-20: 7.00 บาท/กม.
 * - กม. 20-40: 8.00 บาท/กม.
 * - กม. 40-60: 8.50 บาท/กม.
 * - กม. 60-80: 9.00 บาท/กม.
 * - เกิน 80 กม.: 10.50 บาท/กม.
 * - ค่ารถติด: 3.00 บาท/นาที
 */
function getDistanceCharge(km) {
  if (km <= 1) return 0;
  let total = 0;
  const d = km - 1; // ระยะที่เกิน 1 กม. แรก
  const tier2_10 = Math.min(9, d);
  total += tier2_10 * 6.5;
  if (d <= 9) return total;
  const tier10_20 = Math.min(10, d - 9);
  total += tier10_20 * 7.0;
  if (d <= 19) return total;
  const tier20_40 = Math.min(20, d - 19);
  total += tier20_40 * 8.0;
  if (d <= 39) return total;
  const tier40_60 = Math.min(20, d - 39);
  total += tier40_60 * 8.5;
  if (d <= 59) return total;
  const tier60_80 = Math.min(20, d - 59);
  total += tier60_80 * 9.0;
  if (d <= 79) return total;
  total += (d - 79) * 10.5;
  return total;
}

export function calculateFare(distanceKm, waitingMinutes) {
  const km = Math.max(0, Number(distanceKm) || 0);
  const minutes = Math.max(0, Number(waitingMinutes) || 0);
  const baseFare = km >= 0.001 ? 35 : 0;
  const distanceCharge = getDistanceCharge(km);
  const timeCharge = minutes * 3.0;
  const total = baseFare + distanceCharge + timeCharge;
  
  return {
    total: Math.round(total * 100) / 100,
    distanceCharge: Math.round((baseFare + distanceCharge) * 100) / 100,
    timeCharge: Math.round(timeCharge * 100) / 100,
  };
}

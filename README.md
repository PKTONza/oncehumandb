# Once Human Build Sharing Platform

เว็บแอปพลิเคชันสำหรับแชร์และจัดการ builds ในเกม Once Human แบบ Static Site ที่สามารถ deploy บน GitHub Pages ได้

## 🎯 ฟีเจอร์หลัก

### 📋 Build Management
- **สร้าง Build ใหม่**: ระบบ Build Editor ที่ครบครัน
- **แก้ไข Build**: แก้ไข builds ที่มีอยู่ได้
- **Export/Import**: แชร์ builds ผ่าน encoded string
- **LocalStorage**: เก็บข้อมูลในเครื่องผู้ใช้

### 🛡️ Equipment System (ตรงตามเกม Once Human)
- **6 Armor Slots**: Helmet, Mask, Top, Bottom, Gloves, Shoes
- **3 Weapon Slots**: Primary, Secondary, Tertiary
- **Mod System**: แต่ละ item สามารถใส่ mod ได้ 1 ตัว

### 📊 Database Browser
- **Weapons**: ดูข้อมูลอาวุธทั้งหมด
- **Mods**: ดู mods สำหรับ weapons และ armor
- **Armor**: ดูเกราะและอุปกรณ์ทั้งหมด
- **Animals**: ข้อมูลสัตว์ในเกม
- **Food**: ข้อมูลอาหารและเครื่องดื่ม
- **Seasonal Challenge**: ระบบเควสและภารกิจตามฤดูกาล

### 🎯 Seasonal Challenge System
- **Card & Table View**: สลับมุมมองระหว่างการ์ดและตาราง
- **Dual Language**: แสดงภารกิจทั้งภาษาไทยและอังกฤษ
- **Category Filter**: กรองตามประเภทภารกิจ (Combat, Collection, Exploration, etc.)
- **Real-time Search**: ค้นหาเควสแบบ real-time
- **Sortable Table**: จัดเรียงข้อมูลในตาราง
- **Color-coded Categories**: แต่ละหมวดหมู่มีสีเฉพาะ

## 🏗️ โครงสร้างโปรเจค

```
once-human-builds/
├── index.html          # หน้าหลัก
├── css/
│   └── style.css      # Styling ทั้งหมด
├── js/
│   └── app.js         # Logic หลัก
├── data/                      # ข้อมูลเกม (JSON files)
│   ├── weapons.json           # ข้อมูลอาวุธ
│   ├── armor.json             # ข้อมูลเกราะ
│   ├── mods.json              # ข้อมูล mods
│   ├── animals.json           # ข้อมูลสัตว์
│   ├── food.json              # ข้อมูลอาหาร
│   └── seasonal_challenges.json # ข้อมูลเควสตามฤดูกาล
└── README.md          # เอกสารนี้
```

## 🚀 การติดตั้งและใช้งาน

### วิธีที่ 1: ใช้งานในเครื่อง
1. Download หรือ clone โปรเจค
2. เปิดไฟล์ `index.html` ในเบราว์เซอร์
3. เริ่มใช้งานได้เลย!

### วิธีที่ 2: Deploy บน GitHub Pages
1. Upload โปรเจคขึ้น GitHub repository
2. ไปที่ Settings > Pages
3. เลือก Source เป็น "Deploy from a branch"
4. เลือก branch "main" และ folder "/ (root)"
5. เว็บจะ deploy อัตโนมัติ

## 📝 การใช้งาน

### สร้าง Build ใหม่
1. คลิก "Set Build" ในเมนูซ้าย
2. กดปุ่ม "Create New Build"
3. ระบบจะเปิด Build Editor
4. เลือก items และ mods ในแต่ละ slot
5. ตั้งชื่อ build แล้วกด "Save"

### แชร์ Build
1. ที่ build card กดปุ่ม "Export" 
2. String ยาวๆ จะถูก copy อัตโนมัติ
3. ส่ง string ให้เพื่อนผ่าน Discord, Line หรือช่องทางอื่น
4. เพื่อนนำ string มาวางในหน้า "Import Build"

### ใช้งาน Seasonal Challenge
1. คลิก "Seasonal Challenge" ในเมนูซ้าย
2. สลับระหว่าง Card View และ Table View ได้ตามต้องการ
3. ใช้ช่องค้นหาเพื่อหาเควสที่ต้องการ
4. กรอง challenges ตาม category ใน Table View
5. เปลี่ยนภาษาแสดงผล (ไทย/อังกฤษ) ใน Table View

### อัพเดทข้อมูลเกม
เมื่อเกมมี update ใหม่:
1. แก้ไขไฟล์ JSON ใน folder `data/`
2. เพิ่ม/ลบ/แก้ไข items หรือ mods ตามต้องการ
3. เว็บจะโหลดข้อมูลใหม่อัตโนมัติ

## 📁 โครงสร้างข้อมูล JSON

### weapons.json
```json
{
  "weapons": [
    {
      "id": "ar15",
      "name": "AR-15",
      "type": "Assault Rifle",
      "rarity": "Common",
      "damage": 25,
      "range": "Medium",
      "compatible_mods": ["red_dot_sight", "extended_magazine"]
    }
  ]
}
```

### armor.json
```json
{
  "helmets": [
    {
      "id": "combat_helmet",
      "name": "Combat Helmet",
      "type": "helmet",
      "rarity": "Common",
      "defense": 15,
      "compatible_mods": ["durability_boost", "night_vision"]
    }
  ]
}
```

### mods.json
```json
{
  "weapon_mods": [
    {
      "id": "red_dot_sight",
      "name": "Red Dot Sight",
      "type": "optic",
      "effect": "+10% Accuracy",
      "compatible_weapons": ["ar15", "ak47"]
    }
  ],
  "armor_mods": [
    {
      "id": "durability_boost",
      "name": "Durability Boost",
      "type": "enhancement",
      "effect": "+25% Item Durability",
      "compatible_armor": ["helmet", "top"]
    }
  ]
}
```

### seasonal_challenges.json
```json
{
  "seasonal_challenges": [
    {
      "id": "challenge_001",
      "mission_en": "Defeat 10 mutant wolves in the forest biome.",
      "mission_th": "กำจัดหมาป่ากลายพันธุ์ 10 ตัวในพื้นที่ป่า",
      "category": "Combat"
    },
    {
      "id": "challenge_002",
      "mission_en": "Collect 5 rare mushrooms from the swamp.",
      "mission_th": "เก็บเห็ดหายาก 5 ดอกจากบึง",
      "category": "Collection"
    }
  ]
}
```

#### หมวดหมู่ของ Seasonal Challenges:
- **Combat** 🔴: ภารกิจต่อสู้
- **Collection** 🟢: ภารกิจเก็บของ
- **Exploration** 🟡: ภารกิจสำรวจ
- **Crafting** 🟣: ภารกิจสร้างของ
- **Survival** ⚫: ภารกิจเอาตัวรอด
- **Building** 🔵: ภารกิจก่อสร้าง
- **Taming** 🟠: ภารกิจเลี้ยงสัตว์
- **Quest** 🔵: ภารกิจเสื่อมหา
- **Mining** ⚪: ภารกิจขุดเหมือง
- **PvP** 🔴: ภารกิจ Player vs Player

## 🔧 เทคโนโลยีที่ใช้

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON files + LocalStorage
- **Hosting**: GitHub Pages (Static Site)
- **Icons**: Unicode Emojis
- **Responsive**: CSS Grid & Flexbox

## 🎨 ฟีเจอร์เพิ่มเติม

- **Responsive Design**: ใช้งานได้ทุกอุปกรณ์
- **Dark/Light Theme**: ธีมมืด/สว่าง สลับได้ตามต้องการ
- **Advanced Search System**: ค้นหา items และ challenges แบบ real-time
- **Table & Card Views**: สลับมุมมองได้ในทุกส่วน
- **Category Filtering**: กรองข้อมูลตามหมวดหมู่
- **Language Support**: รองรับภาษาไทยและอังกฤษ
- **Sortable Tables**: จัดเรียงข้อมูลในตารางได้
- **Enhanced Dropdowns**: ระบบ dropdown ที่สวยงามและใช้งานง่าย
- **Color-coded Categories**: ระบบสีแยกประเภทต่างๆ
- **Offline Support**: ทำงานแบบ offline ได้
- **No Database Required**: ไม่ต้องใช้ server หรือ database

## 🔄 การอัพเดทข้อมูล

เมื่อเกม Once Human มี update:
1. แก้ไขไฟล์ JSON ใน folder `data/`
2. Commit และ push ขึ้น GitHub
3. GitHub Pages จะ deploy อัตโนมัติ
4. ผู้ใช้จะได้ข้อมูลใหม่ทันที

## 📱 การใช้งานบนมือถือ

- **เว็บรองรับการใช้งานบนมือถือ**: Responsive design ที่ปรับตามขนาดหน้าจอ
- **Adaptive Navigation**: Sidebar ปรับเป็น icon-only บนหน้าจอเล็ก
- **Touch-friendly Interface**: ปุ่มและ dropdown ออกแบบสำหรับการใช้งานด้วยนิ้ว
- **Mobile-optimized Tables**: ตารางปรับขนาดและการจัดวางสำหรับมือถือ
- **Responsive Dropdowns**: ระบบ dropdown ที่เหมาะสมกับหน้าจอสัมผัส
- **Optimized Search**: ช่องค้นหาที่ใช้งานง่ายบนมือถือ
- **Copy/Paste Support**: รองรับการ copy/paste builds
- **iOS/Android Compatible**: ทำงานได้ดีทั้ง iOS และ Android

## 🤝 การมีส่วนร่วม

หากต้องการเพิ่มข้อมูลหรือปรับปรุง:
1. Fork repository
2. แก้ไขไฟล์ JSON หรือ code
3. สร้าง Pull Request
4. อธิบายการเปลี่ยนแปลงที่ทำ

## 📄 License

MIT License - ใช้งานและแก้ไขได้อย่างอิสระ

## 🆕 อัปเดตล่าสุด

### Version 2.0 - Seasonal Challenge Update
- ✅ **เพิ่มระบบ Seasonal Challenge**: เควสและภารกิจตามฤดูกาล
- ✅ **Table & Card Views**: สลับมุมมองได้ทุกส่วน
- ✅ **Enhanced Search**: ค้นหาแบบ real-time รองรับภาษาไทยและอังกฤษ
- ✅ **Category Filtering**: กรองข้อมูลตามหมวดหมู่พร้อมระบบสี
- ✅ **Improved Dropdowns**: ระบบ dropdown ใหม่ที่สวยงามและ responsive
- ✅ **Better Mobile Support**: ปรับปรุงการใช้งานบนมือถือให้ดีขึ้น
- ✅ **Language Toggle**: เปลี่ยนภาษาแสดงผลได้ในตาราง
- ✅ **Sortable Tables**: คลิกหัวตารางเพื่อจัดเรียงข้อมูล

---

**สร้างด้วย ❤️ สำหรับชุมชน Once Human**
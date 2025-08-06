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

## 🏗️ โครงสร้างโปรเจค

```
once-human-builds/
├── index.html          # หน้าหลัก
├── css/
│   └── style.css      # Styling ทั้งหมด
├── js/
│   └── app.js         # Logic หลัก
├── data/              # ข้อมูลเกม (JSON files)
│   ├── weapons.json   # ข้อมูลอาวุธ
│   ├── armor.json     # ข้อมูลเกราะ
│   ├── mods.json      # ข้อมูล mods
│   ├── animals.json   # ข้อมูลสัตว์
│   └── food.json      # ข้อมูลอาหาร
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

## 🔧 เทคโนโลยีที่ใช้

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON files + LocalStorage
- **Hosting**: GitHub Pages (Static Site)
- **Icons**: Unicode Emojis
- **Responsive**: CSS Grid & Flexbox

## 🎨 ฟีเจอร์เพิ่มเติม

- **Responsive Design**: ใช้งานได้ทุกอุปกรณ์
- **Dark Theme**: ธีมมืดสำหรับเล่นเกมตอนกลางคืน
- **Search System**: ค้นหา items ได้ (พร้อมพัฒนา)
- **Offline Support**: ทำงานแบบ offline ได้
- **No Database Required**: ไม่ต้องใช้ server หรือ database

## 🔄 การอัพเดทข้อมูล

เมื่อเกม Once Human มี update:
1. แก้ไขไฟล์ JSON ใน folder `data/`
2. Commit และ push ขึ้น GitHub
3. GitHub Pages จะ deploy อัตโนมัติ
4. ผู้ใช้จะได้ข้อมูลใหม่ทันที

## 📱 การใช้งานบนมือถือ

- เว็บรองรับการใช้งานบนมือถือ
- Sidebar จะปรับเป็นแบบ icon-only บนหน้าจอเล็ก
- Touch-friendly interface
- รองรับการ copy/paste builds

## 🤝 การมีส่วนร่วม

หากต้องการเพิ่มข้อมูลหรือปรับปรุง:
1. Fork repository
2. แก้ไขไฟล์ JSON หรือ code
3. สร้าง Pull Request
4. อธิบายการเปลี่ยนแปลงที่ทำ

## 📄 License

MIT License - ใช้งานและแก้ไขได้อย่างอิสระ

---

**สร้างด้วย ❤️ สำหรับชุมชน Once Human**
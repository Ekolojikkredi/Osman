// Genel değişkenler
let currentPage = "";
let toplamAtik = 0;  // Toplam atık kilogramı
let toplamKredi = 0; // Toplam kredi puanı

// Atık türlerinin puanları
const atikPuanlari = {
    plastik: 10,
    metal: 20,
    kagit: 5,
    cam: 15,
    yag: 25,
    tekstil: 30,
    pil: 50,
    elektronik: 100
};

// Sayfa gösterim fonksiyonu
function showPage(page) {
    const contentDiv = document.getElementById("page-content");
    switch (page) {
        case "ekolojik-kredi":
            contentDiv.innerHTML = `
                <h2>Ekolojik Kredi Nedir?</h2>
                <p>Ekolojik kredi sistemi, bireylerin ve kurumların çevresel duyarlılıklarını teşvik etmek amacıyla geliştirilmiş bir puanlama sistemidir. Bu sistem, bireylerin ve kurumların doğaya olan katkılarını ölçmek ve ödüllendirmek üzerine kuruludur.</p>
                <ul>
                    <li>Plastik şişelerin geri dönüşüm kutularına atılması.</li>
                    <li>Kağıt, metal ve organik atıkların doğru bir şekilde ayrıştırılması.</li>
                </ul>
            `;
            break;
        case "geri-donusum":
            contentDiv.innerHTML = `
                <h2>Geri Dönüşüm Nedir?</h2>
                <p>Geri dönüşüm, atıkların yeniden işlenerek hammadde olarak kullanılmasını sağlayan bir süreçtir.</p>
            `;
            break;
        case "kayit":
            contentDiv.innerHTML = `
                <h2>Kayıt Ol</h2>
                <button onclick="showPage('ogrenci-kayit')">Öğrenci Kaydı</button>
                <button onclick="showPage('okul-kayit')">Okul Kaydı</button>
            `;
            break;
        case "veri-giris":
            contentDiv.innerHTML = `
                <h2>Veri Giriş</h2>
                <form onsubmit="veriGir(event)">
                    <label>Okul Adı:</label><input type="text" id="giris-okul-adi" required><br>
                    <label>Okul Şifresi:</label><input type="password" id="giris-okul-sifre" required><br>
                    <button type="submit">Giriş Yap</button>
                </form>
            `;
            break;
        case "veri-giris-sayfasi":
            contentDiv.innerHTML = `
                <h2>Öğrenci Verisi Girişi</h2>
                <form onsubmit="kaydetVeri(event)">
                    <label>Öğrenci Adı:</label><input type="text" id="veri-ogrenci-adi" required><br>
                    <label>Öğrenci Soyadı:</label><input type="text" id="veri-ogrenci-soyadi" required><br>
                    <label>Atık Türü:</label>
                    <select id="veri-atik-turu" required>
                        <option value="plastik">Plastik</option>
                        <option value="metal">Metal</option>
                        <option value="kagit">Kağıt</option>
                        <option value="cam">Cam</option>
                        <option value="yag">Yağ</option>
                        <option value="tekstil">Tekstil</option>
                        <option value="pil">Pil</option>
                        <option value="elektronik">Elektronik</option>
                    </select><br>
                    <label>Atık Kilogramı:</label><input type="number" id="veri-atik-kilo" required><br>
                    <button type="submit">Veri Kaydet</button>
                </form>
            `;
            break;
        default:
            contentDiv.innerHTML = `<p>Geçersiz bir sayfa seçimi yapıldı.</p>`;
    }
}

// Veri kaydetme fonksiyonu
function kaydetVeri(event) {
    event.preventDefault();

    const atikTuru = document.getElementById("veri-atik-turu").value;
    const atikKilo = parseFloat(document.getElementById("veri-atik-kilo").value);

    if (atikTuru && atikKilo && !isNaN(atikKilo)) {
        // Atık puan hesaplama
        const atikPuan = atikPuanlari[atikTuru];
        const kredi = atikPuan * atikKilo;

        // Toplam atık ve kredi güncelleme
        toplamAtik += atikKilo;
        toplamKredi += kredi;

        // Sayacı güncelleme
        document.getElementById("total-atik").innerText = toplamAtik.toFixed(2);
        document.getElementById("total-kredi").innerText = toplamKredi.toFixed(2);

        alert(`Veri başarıyla kaydedildi:\nAtık Türü: ${atikTuru}\nAtık Kilogramı: ${atikKilo} kg\nPuan: ${kredi}`);

        // Formu sıfırlama
        document.getElementById("veri-atik-turu").value = "";
        document.getElementById("veri-atik-kilo").value = "";
    } else {
        alert("Lütfen tüm alanları doğru bir şekilde doldurun.");
    }
}

// Okul ve öğrenci giriş kontrol fonksiyonu (gerekli düzenlemeler yapılacak)
function veriGir(event) {
    event.preventDefault();
    alert("Okul bilgileri doğrulandı. Veri giriş sayfasına yönlendiriliyorsunuz.");
    showPage("veri-giris-sayfasi");
}

// Constructors Oluşturmak
function Gorev(adi, oncelik) {
    this.adi = adi;
    this.oncelik = oncelik;
    this.tarih = new Date().toLocaleString();

    this.bilgi = function () {
        return `${this.adi} - ${this.oncelik} - ${this.tarih}`;
    };
}

// Bilgileri ul içindeki li'lerden çekerek LocalStorage'e kaydetmek
function gorevleriKaydet() {
    let gorevListesi = document.getElementById("gorev_listesi").children;
    let gorevler = [];

    for (let li of gorevListesi) {
        let adi = li.querySelector("span").textContent;
        let oncelik = li.getAttribute("data-oncelik");
        let tarih = li.getAttribute("data-tarih");

        gorevler.push(new Gorev(adi, oncelik, tarih));
    }

    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

// Kaydettiğimiz görevleri site yüklendiğinde, sayfa içinde görebilmek
function gorevleriYukle() {
    let kayitliGorevler = localStorage.getItem("gorevler");
    if (kayitliGorevler) {
        let gorevler = JSON.parse(kayitliGorevler);
        gorevler.forEach(gorev => gorevEkle(new Gorev(gorev.adi, gorev.oncelik, gorev.tarih)));
    }
}

function gorevEkle(gorev) {
    let gorevListesi = document.getElementById("gorev_listesi");

    let li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.setAttribute("data-oncelik", gorev.oncelik);
    li.setAttribute("data-tarih", gorev.tarih);

    let span = document.createElement("span");
    span.innerHTML = gorev.adi;

    let div = document.createElement("div");
    let bilgiBtn = document.createElement("button");
    bilgiBtn.classList.add("btn", "btn-primary", "btn-sm", "me-2");
    bilgiBtn.textContent = "Bilgi Al";

    bilgiBtn.addEventListener("click", () => {
        document.getElementById("gorev_bilgi_icerik").innerHTML = `${gorev.adi} - ${gorev.oncelik} - ${gorev.tarih}`;

        let offcanvasDiv = document.getElementById("gorevBilgiCanvas");
        let offcanvas = new bootstrap.Offcanvas(offcanvasDiv);
        offcanvas.show();
    });



    // innerHTML-textContent-innerText
    let silBtn = document.createElement("button");
    silBtn.classList.add("btn", "btn-danger", "btn-sm");
    silBtn.textContent = "Sil"
    silBtn.addEventListener("click", () => {
        li.remove();
        gorevleriKaydet();
    });

    div.appendChild(bilgiBtn);
    div.appendChild(silBtn);
    li.appendChild(span);
    li.appendChild(div);
    gorevListesi.appendChild(li);

    gorevleriKaydet();
}

document.getElementById("gorev_ekle").addEventListener("click", () => {
    let gorevAdi = document.getElementById("gorev_adi").value.trim();
    let oncelik = document.getElementById("oncelik").value;

    if(!gorevAdi) {
        alert("Lütfen bir göre adı giriniz!");
        return; //geri kalan işlemler yapılmaz - fonk. geri döner
    }

    let yeniGorev = new Gorev(gorevAdi,oncelik);
    gorevEkle(yeniGorev);
    document.getElementById("gorev_adi").value = "";
});

// Sayfa ilk yüklendiğinde, localStorage'de kayıtlı gorevleri getir
document.addEventListener("DOMContentLoaded",gorevleriYukle)


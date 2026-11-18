module.exports = {
  title: `Kapalı Otoparkta Kalan Araç Nasıl Çıkarılır`,
  metaTitle: `Kapalı Otoparkta Kalan Araç Nasıl Çıkarılır? Rehber`,
  metaDescription: `AVM veya rezidans otoparkında akü bitti, vites kilitlendi, rampada kaldı: aracı sıfır hasarla çıkarmanın yolları ve çekici seçimi bu rehberde.`,
  excerpt: `Düşük tavanlı, dar rampalı kapalı otoparkta arızalanan aracı çıkarmak sıradan çekiciyle olmaz. Gerekli ekipmanı, ön hazırlığı ve doğru yöntemi anlattık.`,
  date: '2026-10-22',
  readMinutes: 7,
  cover: 'oto-kurtarma.webp',
  intro: [
    `Kapalı otoparkta arıza, açık yoldakinden farklı bir sorundur. Tavan alçaktır, rampalar dardır, kolonlar manevra alanını daraltır ve yakınlarda başka araçlar dizilidir. Aracı yerinden oynatmak için normal bir çekici ne içeri girebilir ne de dönebilir.`,
    `Bağcılar, Güneşli ve Yenibosna çevresindeki AVM, iş merkezi ve konut sitelerinin otoparklarında bu durumla sık karşılaşıyoruz. Aşağıda, neden böyle olduğunu ve aracı hasarsız çıkarmak için hangi yöntemlerin kullanıldığını sahadan anlatıyoruz.`
  ],
  sections: [
    {
      id: 'neden-zor',
      h2: `Kapalı otoparkta çekici neden zorlanır`,
      paragraphs: [
        `Standart kayar kasalı bir çekici kamyonet ya da kamyon şasisi üzerine kuruludur ve platform kalkık olmasa bile tavan yüksekliği çoğu bodrum otoparkın giriş sınırını aşar. Giriş kapısında yazan yükseklik uyarı levhası yalnızca düz giriş içindir; asıl sorun rampa inişlerindeki tavan kırılmalarında, köşe dönüşlerinde ve kat geçişlerindeki alçak kirişlerde karşınıza çıkar.`,
        `İkinci büyük engel dönüş yarıçapı ve kolon yerleşimidir. Uzun şasili bir çekici ya da kurtarıcı, keskin virajlı rampada kolonlara ve park halindeki komşu araçlara temas etmeden dönemez. Üçüncüsü zemin kaplamasıdır: cilalı epoksi veya su birikmiş beton zeminde lastik tutunması düşer ve çekim sırasında kontrollü yönlendirme daha da önemli hale gelir.`
      ],
      callout: {
        type: 'info',
        title: 'Giriş yüksekliğini sorun',
        text: `Çağrı sırasında otoparkın giriş yüksekliğini ve arızalı aracın bulunduğu kat bilgisini söyleyin. Doğru ekipman ona göre seçilir.`
      }
    },
    {
      id: 'ekipman',
      h2: `Kullanılan ekipmanlar`,
      paragraphs: [
        `Alçak tavan için ahtapot çekici ve küçük gövdeli kurtarma araçları kullanılır. Ahtapot askı, aracın bir aksını lastik yataklarından kavrayıp yerden kaldırarak dar rampalarda ve kolon aralarında yönlendirmeye imkan verir. Dört tekerleği birden bloke olmuş araçlarda ise her tekerin altına döner tekerlek kaydırıcı (dolly) yerleştirilerek araç yatay eksende kaydırılır ve ana çıkışa veya rampa dibine taşınır.`,
        `Tekerlek altına konulan döner kaydırıcılar, vitesi kilitlenmiş veya el freni çözülmeyen aracı yan yöne itmek için kullanılır. Ayrıca taşınabilir vinç, bağlama kayışı ve koruyucu bumper kılıfı ile aracı kolonlardan uzak tutarız. Ayrıntılı bilgi için <a href="/hizmetler/kapali-otopark-cekici.html">kapalı otopark çekici</a> ve <a href="/hizmetler/ahtapot-cekici.html">ahtapot çekici</a> sayfalarına bakabilirsiniz.`
      ],
      table: {
        headers: ['Durum', 'Yöntem', 'Kullanılan ekipman'],
        rows: [
          ['Akü bitti', 'Yerinde takviye ile çalıştırıp sürerek çıkış', '12V/24V akım korumalı booster'],
          ['Vites kilitli, tekerlek dönmüyor', 'Döner kaydırıcı ile yatay taşıma', 'Tekerlek kaydırıcı, kayış'],
          ['Alçak tavan, dar rampa', 'Ahtapot askı ile yönlendirme', 'Ahtapot çekici'],
          ['Rampada kalan araç', 'Halatla kontrollü çekme', 'Vinç halatı, kayış']
        ]
      }
    },
    {
      id: 'aku-bitmesi',
      h2: `En sık neden: akü bitmesi`,
      paragraphs: [
        `Kapalı otoparkta araçların büyük kısmı, akü boşalması yüzünden kalır. Hafta sonu AVM'ye bırakılan, uzun süre çalıştırılmayan ya da farları açık unutulmuş araçlar böyle sorunlarla karşılaşır. Soğuk havalarda akünün kapasitesi düştüğü için sorun daha da artar.`,
        `Bu durumda araç çalışırsa, çıkarmak için çekiciye hiç gerek kalmaz. Yerinde <a href="/hizmetler/aku-takviye.html">akü takviye</a> yapılır, araç çalıştırılır ve sürücü yavaşça çıkışa gider. Takviye için uygun kutup bağlantısı yapılır ve akım korumalı cihaz elektronik aksama zarar vermez. Alternatörün de şarj etmediği şüphesi varsa, kısa sürüş sonrası akünün test edilmesini öneririz.`
      ]
    },
    {
      id: 'vites-ve-fren',
      h2: `Vites ve el freni kilitliyse`,
      paragraphs: [
        `Otomatik vitesli bir araçta akü tamamen boşaldığında vites seçici P konumundan çıkmaz çünkü mekanik kolu tutan selenoid kilit elektriksiz kalır. Birçok modelde vites çerçevesinin yanında veya bardaklık altındaki küçük kapağın içinde acil serbest bırakma pimi yer alır; aracın el kitabında bu noktanın yeri şekille tarif edilir. Doğru noktadan kilit açılmadan vites kolunu zorlamak plastik tırnakların kırılmasına yol açar.`,
        `Elektronik park freni de akü voltajı düştüğünde balataları sıkmış halde kalabilir. Bu durumda aracı başka bir araçla itmeye veya tekerlekleri kilitli şekilde çekmeye çalışmayın; sürüklenen lastikler epoksi zemini yakar, fren kaliperi ve aktarma organları zorlanır. Ekip her tekerleğin altına döner kaydırıcı yerleştirerek ya da tek aksı ahtapot askıyla kaldırarak aracı kilitli haliyle bile hiç sürtünme yaratmadan çıkarır.`
      ],
      list: [
        `Vites P konumundan çıkmıyorsa acil serbest bırakma mekanizmasına bakın`,
        `Elektrikli el freni çözülmüyorsa aracı itmeyin`,
        `Kilitli tekerleği yerde sürüklemeyin`,
        `Elektrikli aracı kaydırıcı olmadan çekmeyin`
      ]
    },
    {
      id: 'rampa',
      h2: `Rampada kalmak: yokuş yukarı ve aşağı`,
      paragraphs: [
        `Rampada kalan araç iki risk taşır: geri kayma ve arkadan gelen araca çarpma. İlk iş flaşörü yakmak, el frenini çekmek ve mümkünse tekerlekleri kaldırım tarafına çevirmektir. Arkada araç varsa dikkatli ve yavaş uyarı yapın.`,
        `Yokuştaki arızalı aracı halatla çekmek için, çekicinin vinç halatı aracın şasi bağlama noktasına bağlanır. Halatın boyuna gerilmesi ve yan çekme olmaması gerekir. Böylece araç kontrollü şekilde rampadan indirilir ya da çıkarılır.`
      ],
      callout: {
        type: 'warn',
        title: 'Kendi başınıza halatla çekmeyin',
        text: `Bağlama noktası bilinmeden halat bağlamak tamponu koparabilir ve halat kopma anında ciddi yaralanmaya yol açabilir. Çekici ekibini bekleyin.`
      }
    },
    {
      id: 'kat-rampa-ve-elektrikli',
      h2: `Bodrum kat rampaları, tavan engelleri ve elektrikli araçlar`,
      paragraphs: [
        `Özellikle ikinci ve üçüncü bodrum katlarda tavan yüksekliği yalnızca beton kirişlerle sınırlı değildir; havalandırma kanalları, yangın sprinkler boruları, acil yönlendirme tabelaları ve drenaj boruları geçiş payını beklenmedik biçimde düşürür. Virajlı rampalarda tepe ve dip kırılma açıları hesaba katılmazsa uzun dingil mesafeli SUV ve alçak ön tamponlu otomobillerin alt koruma sacı zemine sürtebilir. Bu yüzden <a href="/bolgeler/gunesli-oto-cekici.html">Güneşli oto çekici</a> çevresindeki rezidans ve plaza otoparklarında önce rampa genişliği ile kolon dönüş mesafesi ölçülür, ardından alçak profilli ekipman indirilir.`,
        `Otoparkta şarjı biten veya 12V yardımcı aküsü çöken elektrikli ve hibrit araçlarda ise kapı kolları, vites seçici ve elektronik park freni tamamen kilitlenebilir. Araç duvar tipi şarj ünitesine (wallbox) bağlı kaldıysa fiş kilidi bagaj içindeki veya şarj soketi yanındaki acil serbest bırakma mandalından çözülür. Ardından yardımcı akü akım korumalı cihazla uyandırılır ya da dört tekerlek dolly üzerine alınarak dışarıda bekleyen kayar kasaya aktarılır.`
      ]
    },
    {
      id: 'hazirlik',
      h2: `Çekici gelmeden önce neler hazırlanır`,
      paragraphs: [
        `Otopark yönetimine haber verin, çünkü çekicinin girişte kolay geçmesi, bariyerin açılması, kat kapısının açık tutulması ve gerekirse geçiş yönündeki araçların geçici olarak uyarılması gerekebilir. Ruhsat ve anahtarı yanınızda tutun. Aracın katını, kolon numarasını ve park yerinin duvar dibi mi yoksa orta koridor mu olduğunu telefonda net söyleyin.`,
        `Biz çağrıyı aldığımızda, otopark yüksekliğini sorar ve ekipmanı ona göre göndeririz. <a href="/bolgeler/yenibosna-oto-cekici.html">Yenibosna oto çekici</a> ve çevre bölgelerde kapalı otopark çağrısı için ortalama varış 10–15 dakikadır; konumunuza göre net fiyat telefonda söylenir. Doğrudan bilgi vermek için 0545 256 55 20 numarasını arayabilirsiniz.`
      ]
    },
    {
      id: 'sifir-hasar',
      h2: `Sıfır hasar için dikkat edilen noktalar`,
      paragraphs: [
        `Otoparkta çekim işleminde tampon, jant ve alt koruma plastikleri en çok zarar gören bölgelerdir. Bu yüzden jantlara kılıf takılır, tampon altı için koruyucu takoz kullanılır ve araç yerden fazla kaldırılmaz. Epoksi veya ıslak beton zeminde tekerlek kaymasını önlemek için rampa başlarında takoz destekleri yerleştirilir ve taşıma boyunca kayış gerginliği düzenli kontrol edilir.`,
        `İşlem başlamadan önce aracın mevcut çizik ve ezikleri sizinle birlikte kontrol edilip fotoğraflanır. Araç dışarıdaki kayar kasaya alındığı andan teslim noktasına kadar %100 taşıma kaskosu kapsamındadır ve işlem sonunda fatura düzenlenir. Ödemeyi mobil POS, nakit veya havale ile yapabilirsiniz.`
      ]
    }
  ],
  faqs: [
    {
      q: `Kapalı otoparktan çekici ile çıkarma için otopark yetkilisinin izni gerekir mi?`,
      a: `Genellikle evet. Bariyer, kat kapıları ve yönlendirme için görevlinin bilgilendirilmesi gerekir. Siteler ve AVM'lerde yönetime haber verirseniz çekicinin girişi hızlanır. Aracın sahibi olarak ruhsatınızı ve kimliğinizi hazır bulundurun, işlemi sizin onayınızla yürütürüz.`
    },
    {
      q: `Alçak tavanlı otoparka normal kayar kasa girer mi?`,
      a: `Çoğu zaman girmez. Bu durumda ahtapot çekici veya küçük gövdeli çekici ve döner kaydırıcılarla aracı önce giriş rampasına, açık alana taşırız. Oradan kayar kasaya alınır. Çağrıda otoparkın yükseklik levhasını söylemeniz doğru ekibi göndermemizi sağlar.`
    },
    {
      q: `Aküsü biten aracı yerinde çalıştırabilir misiniz?`,
      a: `Evet, kapalı otoparkta bulunan araçlarda önce yerinde akü takviye denenir. 12V ve 24V akım korumalı booster elektronik aksama zarar vermez. Araç çalışırsa sürücü çıkışa kendisi gider. Çalışmazsa aracı kaydırıcı veya platformla çıkarırız.`
    },
    {
      q: `Rampada kilitli kalan aracı kaç kişi çıkarır?`,
      a: `İşin güvenliği için genelde iki kişilik ekip çalışır; biri aracı yönlendirir, diğeri halat ve kayışı kontrol eder. Rampa eğimine ve aracın ağırlığına göre ekipman seçilir. Kendi başınıza itmeniz veya halat takmanız hem yaralanma hem hasar riski taşır.`
    },
    {
      q: `Otoparkta aracıma çekici zarar verirse ne olur?`,
      a: `Taşıma sırasında oluşabilecek hasar %100 taşıma kaskomuz kapsamındadır. İşlemden önce aracın mevcut durumunu birlikte kontrol ederiz. Kayar kasa ve koruyucu aparatlarla çalıştığımız için sıfır hasar hedeflenir, ayrıca işlem sonunda fatura düzenlenir.`
    }
  ],
  relatedServices: ['kapali-otopark-cekici', 'ahtapot-cekici', 'aku-takviye'],
  relatedRegions: ['yenibosna', 'gunesli', 'bagcilar', 'bahcelievler']
};

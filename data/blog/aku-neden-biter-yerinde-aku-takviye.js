module.exports = {
  title: `Akü Neden Biter? Yerinde Akü Takviye Nasıl Yapılır?`,
  metaTitle: `Akü Neden Biter? Yerinde Akü Takviye ve Bakım Rehberi`,
  metaDescription: `Akü neden biter, hangi belirtiler uyarı verir ve yerinde akü takviye nasıl yapılır? Güvenli takviye adımları ve yapılmaması gerekenler bu yazıda.`,
  excerpt: `Aracın marşa basmaması çoğu zaman akü kaynaklıdır. Aküyü bitiren nedenleri, uyarı belirtilerini ve yerinde takviyenin doğru adımlarını sahadan örneklerle anlatıyoruz.`,
  date: '2026-10-21',
  readMinutes: 6,
  cover: 'aku-takviye.webp',
  intro: [
    `Sabah işe gitmek için anahtarı çevirirsiniz ve ortalıkta yalnızca tık tık sesi duyulur. Ya da bir alışveriş merkezinin otoparkında, akşam kapıyı kapatıp döndüğünüzde araç hiç tepki vermez. Çoğu zaman suçlu aküdür ve çoğu zaman aracı yüklemeye gerek kalmadan çözülür.`,
    `Bu yazıda akünün hangi nedenlerle bittiğini, bitmeden önce verdiği işaretleri ve yerinde takviyenin nasıl yapıldığını anlatıyoruz. Ayrıca kendi başınıza takviye yaparken yapılan tehlikeli hataları da ele alıyoruz.`
  ],
  sections: [
    {
      id: 'aku-nasil-calisir',
      h2: `Akü aslında ne yapar?`,
      paragraphs: [
        `Akü, aracın motorunu ilk harekete geçirmek için gereken yüksek akımı veren depodur. Motor çalıştıktan sonra enerji ihtiyacını alternatör karşılar ve aküyü şarj eder. Yani akü çalışma sırasında değil, çalıştırma anında en çok zorlanır.`,
        `Bu yüzden akü zayıfladığında araç genellikle sürüş sırasında değil, marş anında sorun çıkarır. Kısa mesafe yaparken alternatörün aküyü yeterince doldurmaması, zamanla bu zayıflığı artırır.`
      ]
    },
    {
      id: 'aku-neden-biter',
      h2: `Akünün bitmesinin başlıca nedenleri`,
      paragraphs: [
        `Akü bitmesi tek bir nedene bağlı değildir. Çoğu zaman birkaç etken birikir ve bir sabah aniden ortaya çıkar. Aşağıdaki liste, sahada en sık karşılaştığımız sebepleri özetler.`
      ],
      list: [
        `Işıkların, iç lambanın ya da müzik sisteminin açık unutulması`,
        `Çok kısa ve sık yapılan yolculuklar; alternatör aküyü doldurmaya fırsat bulamaz`,
        `Akünün ömrünü tamamlaması; yıllar içinde kapasite düşer`,
        `Soğuk hava; akü içindeki kimyasal tepkime yavaşlar ve verilen akım düşer`,
        `Gevşek ya da oksitlenmiş kutup başları`,
        `Araç uzun süre kullanılmadan park edilmesi`,
        `Alternatörün ya da şarj sisteminin arızalı olması`
      ],
      callout: {
        type: 'info',
        title: 'Soğukta akü neden daha çok zorlanır?',
        text: `Düşük sıcaklıkta akünün verebileceği akım azalırken motor yağı koyulaşır ve motorun dönmesi güçleşir. Sonuç olarak, yaz boyunca sorun çıkarmayan zayıf bir akü ilk soğuk sabahta yarı yolda bırakabilir.`
      }
    },
    {
      id: 'belirtiler',
      h2: `Akü bitmeden önce verdiği işaretler`,
      paragraphs: [
        `Akü çoğu zaman haber vererek bitirir. Marşın her sabah biraz daha ağır dönmesi, farların rölantide sönükleşmesi ve gösterge panelinde akü ikazının yanıp sönmesi başlıca işaretlerdir. Bu belirtileri gördüğünüzde akü testi yaptırmak, yolda kalmanızı önleyebilir.`,
        `Elektrikli kapı kilidinin yavaşlaması, cam düğmelerinin geç tepki vermesi ve radyo ayarlarının sıfırlanması da zayıf aküye işaret eder. Bunlardan biri tekrar ediyorsa bir sonraki marş sorunu yakındır.`
      ],
      table: {
        headers: ['Belirti', 'Muhtemel anlamı'],
        rows: [
          ['Marş yavaş dönüyor', 'Akü kapasitesi düşmüş ya da soğuk etkisi var'],
          ['Sadece tık sesi geliyor', 'Akü motoru döndürmeye yetecek akımı veremiyor'],
          ['Farlar sönük yanıyor', 'Akü ya da alternatör zayıf'],
          ['Gösterge paneli titriyor', 'Voltaj düşük, kutup başlarında sorun olabilir'],
          ['Hiç tepki yok', 'Akü tamamen boşalmış ya da bağlantı kopuk']
        ]
      }
    },
    {
      id: 'yerinde-takviye',
      h2: `Yerinde akü takviye nasıl yapılır?`,
      paragraphs: [
        `Yerinde takviye, aracı hiç yerinden oynatmadan boşalmış aküye dışarıdan enerji vererek motoru çalıştırma işlemidir. Biz bu işlemi 12V ve 24V sistemlere uygun, akım korumalı booster ile yaparız. Akım korumalı cihaz, ters bağlantı ya da kısa devre durumunda araç elektroniğini korur.`,
        `Önce aracın kontağı kapatılır, tüketiciler kapatılır ve kutup başları kontrol edilir. Sonra pozitif kelepçe pozitif kutba, negatif kelepçe ise genellikle motor bloğundaki boyasız bir toprak noktasına bağlanır. Booster devreye alınır ve motor çalıştırılır. Motor çalıştıktan sonra kelepçeler ters sırayla sökülür.`
      ],
      callout: {
        type: 'warn',
        title: 'Kutup başlarını ters bağlamayın',
        text: `Pozitif ve negatif kelepçeleri ters bağlamak ECU, sigorta kutusu ve diğer elektronik parçalarda ciddi hasar yapabilir. Modern araçlarda bu hata maliyetlidir; emin değilseniz kendiniz denemeyin.`
      }
    },
    {
      id: 'kendi-basina-takviye',
      h2: `Kendi başınıza takviye yapmanın riskleri`,
      paragraphs: [
        `Yan araçtan kablo ile takviye klasik bir yöntemdir ama modern araçlarda risklidir. Start-stop sistemli, hibrit ya da elektrikli araçlarda akü yönetimi karmaşıktır; yanlış bağlantı sigorta yanmasına ve sistemde hata kodlarına yol açabilir. Akü gaz çıkarmış ya da şişmişse takviye denemek patlama riski doğurabilir.`,
        `Elektrikli araçlardaki 12V yardımcı akü ana çekiş akünüzden ayrıdır ve ona takviye yapmak özel bilgi ister. Bu araçlarda sorun çıkarsa tahminle denemek yerine uzman yardımı almak daha güvenlidir.`
      ]
    },
    {
      id: 'takviye-sonrasi',
      h2: `Takviyeden sonra ne yapmalısınız?`,
      paragraphs: [
        `Motor çalıştıktan sonra aracı hemen durdurmayın. Alternatörün aküyü doldurması için en az yirmi otuz dakikalık bir sürüş yapın, mümkünse kesintisiz bir yolda gidin. Kısa mesafeli ve durdur kalk bir yolculuk şarj için yeterli olmaz ve aracı ertesi sabah yine marşsız bırakabilir.`,
        `Akünün yaşı dört beş yılı geçmişse ya da takviye birkaç gün içinde tekrar gerekiyorsa, aküyü yenilemek en sağlıklı çözümdür. Bu durumda alternatör şarj voltajının da ölçülmesi gerekir; çünkü yeni akü de bozuk bir alternatörle kısa sürede biter.`
      ],
      list: [
        `Takviyeden sonra motoru hemen kapatmayın`,
        `Yirmi otuz dakikalık kesintisiz sürüş yapın`,
        `Akü yaşını ve kutup başlarını kontrol ettirin`,
        `Takviye tekrarlanıyorsa alternatör şarjını ölçtürün`
      ]
    },
    {
      id: 'takviye-mi-cekici-mi',
      h2: `Ne zaman takviye yeter, ne zaman çekici gerekir?`,
      paragraphs: [
        `Akü boşalmış ama araçta başka bir arıza yoksa takviye çoğu zaman yeterlidir. Akünün kendisi hasarlıysa, kutup başları erimişse ya da araç takviyeyle de çalışmıyorsa sorun başka bir yerdedir; bu durumda çekici ve servise taşıma devreye girer.`,
        `Bağcılar çevresinde sabah işe gidiş saatlerinde ya da sanayi sitelerinde beklenen en sık çağrılardan biri bu türden. Bölgede hizmet verdiğimiz için <a href="/hizmetler/aku-takviye.html">akü takviye</a> sayfamızda süreci ve cihazları ayrıca anlattık; ihtiyaç duyarsanız <a href="/bolgeler/bagcilar-oto-cekici.html">Bağcılar oto çekici</a> sayfamızdan da bize ulaşabilirsiniz. Takviye yetmezse aynı ekip aracı <a href="/hizmetler/oto-cekici.html">oto çekici</a> hizmetiyle servise taşır.`
      ],
      callout: {
        type: 'tip',
        title: 'Akü ömrünü uzatmanın basit yolu',
        text: `Haftada en az bir kez yirmi dakikadan uzun bir yolculuk yapın, kutup başlarını temiz tutun ve aracı uzun süre bırakacaksanız aküyü şarj cihazına bağlayın.`
      }
    },
    {
      id: 'aku-turleri',
      h2: `Akü türleri ve takviyede dikkat edilmesi gerekenler`,
      paragraphs: [
        `Her akü aynı değildir. Klasik kurşun asitli akülerin yanında, start-stop sistemli araçlarda kullanılan EFB ve AGM tipi aküler de vardır. Bu aküler daha sık şarj ve deşarja dayanacak şekilde üretilir ama aşırı boşaldıklarında onlar da ömürlerinin önemli kısmını kaybeder.`,
        `Dizel araçlarda marş akımı daha yüksek olduğu için akü zayıflığı daha erken hissedilir. Ticari araçlarda ve kamyonlarda 24V sistem kullanılır; bu araçlara 12V cihazla takviye yapılmaz. Biz 12V ve 24V sistemlere uygun, akım korumalı cihazlarla çalıştığımız için bu ayrım sahada sorun yaratmaz. Aracınızın sistemini telefonda söylemeniz yeterlidir.`
      ],
      list: [
        `Benzinli binek araçlarda genellikle 12V sistem vardır`,
        `Ağır ticari araçlarda 24V sistem görülebilir`,
        `Start-stop sistemli araçlarda EFB ya da AGM akü bulunabilir`,
        `Takviyede sistemin voltajına uygun cihaz kullanılmalıdır`
      ]
    },
    {
      id: 'kis-oncesi-bakim',
      h2: `Soğuk gelmeden akü bakımı: sahadan ipuçları`,
      paragraphs: [
        `Bağcılar'da ilk soğuk sabahlarda akü çağrıları belirgin biçimde artar. Çünkü yaz boyunca fark edilmeyen zayıflık soğukta ortaya çıkar. Kasım ayında araca binmeden önce marşın tepkisine dikkat etmek ve gerekirse aküyü ölçtürmek, yolda kalmayı büyük oranda önler.`,
        `Kutup başlarındaki beyaz ya da yeşilimsi tortu temas direncini artırır ve şarjı engeller; bunu temizlemek basit bir bakımdır. Aracı uzun süre kullanmayacaksanız aküyü sökmek ya da şarj cihazına bağlamak da akünün derin boşalmasını önler. Bu iki alışkanlık, çoğu akü çağrısını baştan engeller; yine de <a href="/bolgeler/ikitelli-oto-cekici.html">İkitelli oto çekici</a> ve Bağcılar çevresinde yolda kalırsanız 0545 256 55 20 hattından ekibimize ulaşabilirsiniz.`
      ]
    }
  ],
  faqs: [
    {
      q: `Akü takviyesi aracıma zarar verir mi?`,
      a: `Doğru ekipmanla yapılırsa zarar vermez. Akım korumalı booster, ters bağlantı ve kısa devreye karşı koruma sağlar. Sorun, genellikle kablo ile yapılan denemelerde ve kelepçelerin yanlış bağlandığı durumlarda çıkar.`
    },
    {
      q: `Takviyeden sonra araç yine çalışmazsa ne yapmalıyım?`,
      a: `Takviye sonrası araç hâlâ çalışmıyorsa sorun akü dışında olabilir; marş motoru, yakıt sistemi ya da bağlantılar kontrol edilmelidir. Bu durumda aracı servise çekici ile taşımak en doğru çözümdür.`
    },
    {
      q: `Elektrikli ve hibrit araçlara akü takviyesi yapılır mı?`,
      a: `Bu araçlardaki 12V yardımcı akü takviye ile çalıştırılabilir ama bağlantı noktası ve prosedür modele göre değişir. Bu yüzden aracın markasını ve modelini telefonda söylemeniz önemlidir.`
    },
    {
      q: `Akü ne zaman değiştirilmelidir?`,
      a: `Akü genellikle dört beş yıl civarı ömür verir; kullanım ve iklime göre değişir. Marş yavaşlıyor, takviye sık gerekiyor ya da kutup başları aşınmışsa yaşına bakmadan değiştirmeyi düşünün.`
    },
    {
      q: `Gece ya da hafta sonu yerinde takviye alabilir miyim?`,
      a: `Evet, hizmetimiz 7/24 devam eder. Ortalama varış süremiz 10–15 dakikadır. Konumunuzu paylaşırsanız ekip aracı bulunduğu yerde çalıştırır; aracın yerinden oynatılmasına gerek kalmaz.`
    }
  ],
  relatedServices: ['aku-takviye', 'oto-cekici', 'lastik-yol-yardim'],
  relatedRegions: ['bagcilar', 'gunesli', 'yenibosna', 'merter']
};

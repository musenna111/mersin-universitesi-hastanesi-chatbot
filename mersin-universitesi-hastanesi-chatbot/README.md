Mersin Üniversitesi Hastanesi Chatbotu
Proje Tanımı

Bu proje, Mersin Üniversitesi Hastanesi için geliştirilmiş, kullanıcıların sağlık problemleri ve hastane hizmetlerine yönelik şikayetlerine göre doğru birim veya polikliniğe yönlendirilmesini sağlayan web tabanlı bir chatbot uygulamasıdır.

Chatbot; kullanıcıdan alınan kısa metin girdilerini analiz ederek uygun polikliniği veya ilgili hastane birimini önerir. Uygun birim tespit edilemediği durumlarda kullanıcıyı MHRS veya 182 üzerinden randevu almaya yönlendirir.

Analiz Modeli (Gereksinimler)
Fonksiyonel Gereksinimler

Kullanıcı metin tabanlı şikayet veya sağlık problemi girişi yapabilmelidir.

Sistem, girilen metni analiz ederek:

Sağlık problemleri için uygun polikliniği,

Hizmet ve personel şikayetleri için ilgili hastane birimini belirlemelidir.

Poliklinik tespit edilemezse kullanıcı MHRS / 182 sistemine yönlendirilmelidir.

Sistem kullanıcıya anlaşılır ve yönlendirici geri bildirim vermelidir.

Fonksiyonel Olmayan Gereksinimler

Kullanıcı dostu ve sade arayüz

Hızlı yanıt süresi

Web tarayıcılarıyla uyumluluk

Sunucu veya veritabanı gerektirmeyen yapı

Tasarım Modeli

Proje, istemci taraflı (client-side) bir mimari ile geliştirilmiştir.

Mimari Yapı

HTML: Arayüz yapısı

CSS: Görsel tasarım ve düzen

JavaScript (Vanilla JS):

Chatbot mantığı

Metin analizi

Anahtar kelime eşleştirme

Sistem tamamen tarayıcı üzerinde çalışmaktadır.

Uygulama Detayları
Çalışma Mantığı

Kullanıcı şikayetini veya sağlık problemini yazar.

Girilen metin normalize edilir (küçük harf, Türkçe karakter dönüşümü).

Anahtar kelimeler üzerinden analiz yapılır.

Analiz sonucuna göre:

Uygun poliklinik önerilir (KBB, Dahiliye, Nöroloji vb.)

veya ilgili hastane birimi bilgisi sunulur.

Eşleşme bulunamazsa kullanıcı MHRS / 182 sistemine yönlendirilir.

Ele Alınan Şikayet Türleri

Sağlık problemleri (baş ağrısı, karın ağrısı, kulak ağrısı vb.)

Temizlik ve hijyen şikayetleri

Personel davranışına yönelik geri bildirimler

Randevu ve sistem sorunları

Use Case (Kullanım Senaryoları)
Use Case 1: Sağlık Problemi Bildirimi

Aktör: Hasta

Kullanıcı “kulak ağrım var” şeklinde giriş yapar.

Sistem uygun poliklinik olarak KBB önerir.

Gerekli durumlarda MHRS / 182 bilgisi sunulur.

Use Case 2: Poliklinik Tespit Edilememesi

Aktör: Hasta

Kullanıcı belirsiz bir şikayet girer.

Sistem uygun polikliniği tespit edemez.

Kullanıcı MHRS / 182 sistemine yönlendirilir.

Use Case 3: Hizmet veya Personel Şikayeti

Aktör: Hasta / Hasta Yakını

Kullanıcı “hemşire çok ilgisizdi” yazar.

Sistem Hasta Hakları Birimi hakkında bilgilendirme yapar.


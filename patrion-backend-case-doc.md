# Patrion Backend Case - Dokümantasyon

Bu doküman, Patrion İleri Teknoloji Sistemleri A.Ş. için geliştirilen Backend Case çalışmasının mimarisini, API endpointlerini ve deployment talimatlarını içermektedir.

## 🔧 Proje Kurulumu

### Gereksinimler
* Node.js >= 20.11
* npm >= 10
* Git

### Kurulum Adımları

```bash
# 1. Repo'yu klonlayın
git clone https://github.com/cemalsezer/patrion-case.git
cd patrion-case

# 2. Bağımlılıkları yükleyin
npm install

# 3. Ortam değişkenlerini ayarlayın
cp .env.example .env
# .env dosyasında JWT_SECRET ve JWT_EXPIRES alanlarını doldurun

# 4. Uygulamayı başlatın
npm run start:dev
```

## 🔬 Kullanılan Teknolojiler
* **NestJS**: Node.js için progressif backend framework
* **TypeORM + SQLite**: Veri tabanı işlemleri
* **Passport + JWT**: Kimlik doğrulama
* **MQTT**: Gerçek zamanlı mesajlaşma
* **Swagger**: API dokümantasyonu

## 📂 Mimarî Yapı

```
src/
├── auth/               # Kimlik doğrulama işlemleri
├── users/              # Kullanıcı CRUD
├── mqtt/               # MQTT client
├── user-log/           # Kullanıcı log servisi
├── common/             # Guard, decorator vs.
├── main.ts             # Uygulama girişi
```

## 🔎 API Endpointleri

### Auth

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/auth/register` | Kullanıcı oluşturur |
| POST | `/auth/login` | Token döner |

### Users

| Method | Endpoint | Açıklama | Auth | Rol Gerekliliği |
|--------|----------|----------|------|----------------|
| GET | `/users` | Tüm kullanıcıları listeler | JWT | SystemAdmin |
| GET | `/users/me` | Aktif kullanıcı bilgisi | JWT | User |
| PATCH | `/users/me/password` | Aktif kullanıcı şifre değiştir | JWT | User |
| GET | `/users/:id` | ID'ye göre kullanıcı getirir | JWT | SystemAdmin |
| PATCH | `/users/:id` | ID'ye göre kullanıcı günceller | JWT | SystemAdmin |
| DELETE | `/users/:id` | ID'ye göre kullanıcı siler | JWT | SystemAdmin |

## 📊 MQTT Servisi
* `mqtt://test.mosquitto.org` adresine bağlanılır.
* `sensor/data` kanalına subscribe olunur.
* Gelen mesajlar loglanır.
* Yayın için `mqtt-pub.js` script'i kullanılabilir.

## 📅 Kullanıcı Log Sistemi
* Kullanıcılar endpointleri her kullandığında `user_log` tablosuna kayıt atılır.
* `UserLogService` bu işi yapar.

## 📄 Deployment Notları
* Öncelikle `.env` dosyası çevreye uygun düzenlenmelidir.
* SQLite dosyası server'a kopyalanmalıdır veya PostgreSQL'e geçiş planlanabilir.
* `npm run build` ve `npm run start:prod` ile yayına alınabilir.

## ✅ Yapılan Teslimatlar
* 

## 🌐 Swagger UI

```
http://localhost:3000/api
```

Herhangi bir sorunla karşılaşırsanız, lütfen iletişime geçin.

Teşekkürler!
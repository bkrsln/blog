# Cloudflare Pages GitHub Import Rehberi

## 🚀 GitHub Import ile Cloudflare Pages Deployment

### 1. Cloudflare Dashboard'a Giriş
1. [Cloudflare Dashboard](https://dash.cloudflare.com/)'a giriş yapın
2. Sol menüden **Pages** sekmesine tıklayın
3. **Create a project** butonuna tıklayın

### 2. GitHub Repository Bağlantısı
1. **Connect to Git** seçeneğini seçin
2. **GitHub** provider'ını seçin
3. GitHub hesabınıza giriş yapın ve Cloudflare'e yetki verin
4. Repository listesinden `blog` projenizi seçin

### 3. Build Ayarları
Cloudflare Pages otomatik olarak Next.js projesi tespit edecek, ancak şu ayarları kontrol edin:

```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: / (boş bırakın)
```

### 4. Environment Variables (Gerekirse)
Eğer projenizde environment variables varsa (örn. Notion API key):

1. **Environment variables** bölümünde **Add variable** tıklayın
2. Gerekli değişkenleri ekleyin:
   - `NOTION_PAGE_ID`
   - `NOTION_ACCESS_TOKEN`
   - vs.

### 5. Deploy
1. **Save and Deploy** butonuna tıklayın
2. İlk deployment otomatik olarak başlayacak
3. Build loglarını takip edebilirsiniz

### 6. Otomatik Deployment
Artık GitHub'a her push yaptığınızda:
- Cloudflare Pages otomatik olarak yeni build başlatacak
- Production branch (main) değişiklikleri direkt yayınlanacak
- Diğer branch'ler preview URL'leri alacak

## 🔧 Özel Domain Ayarları (İsteğe Bağlı)

1. Pages dashboard'da projenizi seçin
2. **Custom domains** sekmesine gidin
3. **Set up a custom domain** tıklayın
4. Domain'inizi ekleyin ve DNS ayarlarını yapın

## 📊 Monitoring ve Analytics

Cloudflare Pages otomatik olarak sağlar:
- Build history ve logs
- Deployment status
- Performance metrics
- Real User Monitoring (RUM)

## 🚨 Sorun Giderme

### Build Hatası Alıyorsanız:
1. Local'de `pnpm build` çalışıyor mu test edin
2. Node.js version uyumluluğunu kontrol edin
3. Environment variables'ları kontrol edin

### Domain Sorunları:
1. DNS propagation için 24 saat bekleyin
2. SSL sertifikası otomatik olarak sağlanır
3. HTTPS redirect otomatik aktiftir

## 🎯 Avantajlar

### Cloudflare Pages vs Vercel:
- **Ücretsiz tier daha geniş**: Unlimited requests
- **Global CDN**: 200+ lokasyon
- **DDoS koruması**: Otomatik
- **Analytics**: Detaylı ve ücretsiz
- **Edge functions**: Serverless functions
- **Unlimited collaborators**: Ücretsiz planda

### Performance:
- Static asset caching
- Image optimization (pro plan)
- Bandwidth limit yok
- 99.99% uptime SLA

## 📝 Deployment Sonrası Kontrol Listesi

- [ ] Site açılıyor mu?
- [ ] Notion içeriği yükleniyor mu?
- [ ] RSS feed çalışıyor mu?
- [ ] Sitemap.xml erişilebilir mi?
- [ ] Font dosyaları yükleniyor mu?
- [ ] Mobile responsive görünüm doğru mu?

## 🔄 Gelecek Güncellemeler

Git workflow'u:
1. Local'de değişiklik yapın
2. GitHub'a push edin
3. Cloudflare Pages otomatik deploy edecek
4. Build tamamlandığında site güncellenecek

**Not**: Build süresi genellikle 1-3 dakika arasındadır.
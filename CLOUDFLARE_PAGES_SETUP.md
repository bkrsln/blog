# Cloudflare Pages Build Settings

Bu proje Cloudflare Pages için optimize edilmiştir. Worker'ı silip yeni Pages projesi oluştururken aşağıdaki ayarları kullan:

## 1. Cloudflare Pages Proje Oluşturma

1. Cloudflare Dashboard → Pages → Create project
2. Connect to Git → GitHub → Select repository: `bkrsln/blog`
3. Set up builds and deployments:

### Build Settings (Dashboard'da):

**Build command:**
```
pnpm install --frozen-lockfile && pnpm run pages:build
```

**Build output directory:**
```
out
```

**Root directory (project root path):**
```
/
```

**Production branch:**
```
main
```

## 2. Environment Variables

Settings → Environment variables → Add following:

### Required:
- `NOTION_PAGE_ID` = `your-notion-database-uuid`
  
### Optional:
- `NOTION_ACCESS_TOKEN` = `secret_token` (sadece private database için)

### Debugging (geçici):
- `SKIP_NOTION` = `1` (ilk deploy'da Notion olmadan test için)

## 3. İlk Deploy Test Sırası

1. **SKIP_NOTION ile test:**
   - Environment variables'a `SKIP_NOTION=1` ekle
   - Save & Deploy
   - `https://<project>.pages.dev/health` kontrol et
   - "SKIP_NOTION: ON" görmelisin

2. **Notion ile tam test:**
   - `SKIP_NOTION` değişkenini sil
   - `NOTION_PAGE_ID` doğru UUID'yi ekle
   - Redeploy
   - Ana sayfada post listesi görmelisin

## 4. Custom Domain Bağlama

1. Pages project → Settings → Custom domains
2. Add custom domain
3. DNS'te CNAME: `your-domain.com` → `<project>.pages.dev`
4. SSL/TLS otomatik aktif olur

## 5. Build Detayları

- **Package manager:** pnpm (otomatik detect)
- **Node version:** Latest LTS (Cloudflare default)
- **Build timeout:** 20 dakika (yeterli)
- **Output:** Static files (`out/` klasörü)

### Script açıklaması:
- `pnpm run pages:build` = `pnpm build && next export && pnpm postbuild`
- `postbuild` = sitemap üretimi
- Final output: `out/` klasöründe static HTML + assets

## 6. Troubleshooting

### Build fails:
- NOTION_PAGE_ID formatı kontrol et (UUID olmalı)
- Build logs'da error mesajı incele
- SKIP_NOTION=1 ile bypass et

### Domain issues:
- CNAME doğru `<project>.pages.dev` hedefliyor mu?
- Eski Worker route/domain kaldırıldı mı?
- /health sayfası doğru içerik gösteriyor mu?

### Performance:
- Images unoptimized (static export için şart)
- Trailing slash true (SEO için)
- Automatic sitemap generation

## 7. Deployment Workflow

```bash
# Local development
pnpm dev

# Test production build locally
pnpm run pages:build
pnpm serve out  # veya başka static server

# Deploy (otomatik Git push ile)
git add .
git commit -m "update"
git push origin main
```

Deploy durumu: Cloudflare Dashboard → Pages → project → deployments

## 8. Key Differences from Vercel

- Output directory: `out` (Vercel'de `.next` idi)
- Static export zorunlu (ISR yok)
- Environment variables Pages settings'den
- Custom headers `next.config.js`'de tanımlı
- Sitemap postbuild ile üretiliyor

---

Bu ayarlarla Pages projesi %100 çalışacak. Sorun olursa `/health` endpoint'ini kontrol et.
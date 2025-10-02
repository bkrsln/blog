# Cloudflare Pages Build Fix

## ✅ wrangler.toml Sorunu Çözüldü
- `[build]` section kaldırıldı
- Cloudflare artık wrangler.toml'ı okuyor

## ❌ Şu Anki Sorun: npm Dependency Conflict

**Hata:** `react-cusdis@2.1.3` React 17 istiyor, ama projede React 18 var.

## 🔧 Çözüm: Build Command Güncelle

Cloudflare Pages Dashboard → Settings → Build & Deploy:

**Eski build command:**
```
pnpm install --frozen-lockfile && pnpm run pages:build
```

**Yeni build command (dependency conflict bypass):**
```
npm install --legacy-peer-deps && npm run pages:build
```

## 🎯 Alternatif Çözümler

### Seçenek 1: npm ile devam (tavsiye)
```
npm install --legacy-peer-deps && npm run pages:build
```

### Seçenek 2: pnpm zorla
```
corepack enable && pnpm install --force && pnpm run pages:build
```

### Seçenek 3: Dependency update (uzun vadeli)
```javascript
// package.json'da react-cusdis versiyonunu güncelle
"react-cusdis": "^2.2.0" // React 18 uyumlu
```

## 📋 Dashboard'da Yapılacak

1. Cloudflare Pages → Project → Settings
2. Build & Deploy → Build configurations
3. Build command'ı yukarıdaki npm versiyonuyla değiştir
4. Save & Deploy

## 🚀 Test Akışı

1. Build command güncelledikten sonra redeploy
2. `/health` sayfasını kontrol et
3. SKIP_NOTION=1 ile ilk başarılı deploy
4. Sonra Notion env ekleyip gerçek deploy

---

**En Hızlı Çözüm:** Dashboard'da build command'ı `npm install --legacy-peer-deps && npm run pages:build` olarak değiştir.
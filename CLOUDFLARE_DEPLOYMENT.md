# Cloudflare Pages Deployment

Bu proje Cloudflare Pages ile deploy edilecek şekilde yapılandırılmıştır.

## Gereksinimler

- Node.js 18+ 
- pnpm (önerilen paket yöneticisi)
- Cloudflare hesabı

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
pnpm install
```

2. Wrangler CLI'yi global olarak yükleyin (isteğe bağlı):
```bash
npm install -g wrangler
```

## Local Development

```bash
# Development server'ı başlatın
pnpm dev

# Production build oluşturun
pnpm build

# Cloudflare Pages development server'ı ile test edin
pnpm pages:dev
```

## Deployment

### Manuel Deployment

1. Projeyi build edin:
```bash
pnpm build
```

2. Cloudflare Pages'e deploy edin:
```bash
pnpm pages:deploy
```

### Otomatik Deployment (Git Integration)

1. Cloudflare Dashboard'da Pages sekmesine gidin
2. "Create a project" butonuna tıklayın
3. GitHub/GitLab repository'nizi bağlayın
4. Build ayarlarını yapın:
   - **Build command**: `pnpm build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (varsayılan)

### Environment Variables

Gerekli environment variable'ları Cloudflare Pages dashboard'undan ekleyin:

- `NOTION_PAGE_ID`: Notion sayfa ID'si
- `NOTION_ACCESS_TOKEN`: Notion API token'ı
- Diğer gerekli config değerleri...

## Önemli Notlar

- Bu proje Next.js static export kullanır (`output: 'export'`)
- Görüntüler optimize edilmemiş olarak serve edilir (`images: { unoptimized: true }`)
- Font dosyaları için cache header'ları otomatik olarak ayarlanır
- `wrangler.toml` dosyası Cloudflare Pages konfigürasyonunu içerir

## Sorun Giderme

### Build Hatası
- Node.js version'ının 18+ olduğundan emin olun
- `pnpm install --frozen-lockfile` ile bağımlılıkları temizleyin ve yeniden yükleyin

### Environment Variables
- Cloudflare Pages dashboard'da tüm gerekli environment variable'ların ayarlandığından emin olun
- Production ve Preview environment'ları için ayrı ayrı ayarlayın

### Deployment İzinleri
- Wrangler CLI'nin Cloudflare hesabınıza erişim izni olduğundan emin olun:
```bash
wrangler login
```

## Faydalı Komutlar

```bash
# Wrangler ile login olun
wrangler login

# Pages projelerini listeleyin
wrangler pages project list

# Deployment geçmişini görün
wrangler pages deployment list

# Local preview server başlatın
wrangler pages dev out --local

# Custom domain bağlayın
wrangler pages domain add <project-name> <domain>
```

## Performans Optimizasyonları

Cloudflare Pages otomatik olarak şunları sağlar:
- Global CDN
- Otomatik SSL
- Gzip/Brotli sıkıştırma
- HTTP/3 desteği
- Edge-side includes (ESI)

## Monitoring

Cloudflare Analytics dashboard'unu kullanarak:
- Sayfa görüntüleme istatistikleri
- Performance metrikleri
- Error tracking
- Traffic patterns

Daha fazla bilgi için [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
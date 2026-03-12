# Jornadas de Cirugia

## Desarrollo local

```bash
npm install
npm run dev
```

Vite queda disponible en `http://localhost:5173`.

## Preview publico con Cloudflare Tunnel

Para exponer este frontend con un hostname publico propio, configurá Cloudflare Tunnel para que enrute ese dominio a `http://localhost:5173`.

### 1. Agregá el hostname al archivo `~/.cloudflared/config.yml`

Agregá una regla como esta antes del fallback `http_status:404`:

```yml
ingress:
  - hostname: preview.example.com
    service: http://localhost:5173
  - service: http_status:404
```

Si tu archivo ya tiene otras reglas `hostname`, simplemente insertá la nueva entrada antes del fallback final.

### 2. Registrá el DNS si todavía no existe

```bash
cloudflared tunnel route dns <tunnel-name> <preview-hostname>
```

### 3. Levantá Vite con la configuración para túnel

```bash
VITE_PUBLIC_HOST=<preview-hostname> npm run dev:tunnel
```

Ese comando hace dos cosas:

- permite explícitamente el host que pongas en `VITE_PUBLIC_HOST`
- fuerza HMR a usar `wss` por el puerto `443`, que es lo esperado detrás de Cloudflare

### 4. Corré el túnel

```bash
cloudflared tunnel run <tunnel-name>
```

## Validación rápida

Si querés validar la configuración antes de abrirla al navegador:

```bash
cloudflared tunnel ingress validate
```

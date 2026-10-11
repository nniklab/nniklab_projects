"""Genera los gráficos de marca nniklab para el video (SVG + PNG 1920x1080).

Uso: python3 generar-graficos.py <carpeta-de-salida>
Requiere: playwright (Chromium) y las fuentes Space Grotesk, Inter y JetBrains Mono instaladas.
"""
import math, sys, pathlib

OUT = pathlib.Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)

LIMA, LIMA_OSC, GRAFITO, ACERO, HUESO = "#C6F432", "#5E7A0E", "#111418", "#6B7280", "#F4F4F2"
SUP, LINEA, GTEXTO = "#1A1D22", "#2E333B", "#9CA3AF"
W, H = 1920, 1080

STYLE = f"""<style>
.t{{font-family:'Space Grotesk',Arial,Helvetica,sans-serif}}
.i{{font-family:'Inter',Arial,Helvetica,sans-serif}}
.m{{font-family:'JetBrains Mono',Consolas,'Courier New',monospace}}
.ico{{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}}
</style>"""

def base(content, extra_defs=""):
    dots = (f'<pattern id="dots" width="48" height="48" patternUnits="userSpaceOnUse">'
            f'<circle cx="24" cy="24" r="1.6" fill="{LINEA}"/></pattern>')
    vign = ('<radialGradient id="vig" cx="50%" cy="50%" r="70%">'
            f'<stop offset="55%" stop-color="{GRAFITO}" stop-opacity="0"/>'
            f'<stop offset="100%" stop-color="{GRAFITO}" stop-opacity="0.9"/></radialGradient>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
            f'{STYLE}<defs>{dots}{vign}{extra_defs}</defs>'
            f'<rect width="{W}" height="{H}" fill="{GRAFITO}"/>'
            f'<rect width="{W}" height="{H}" fill="url(#dots)"/>'
            f'<rect width="{W}" height="{H}" fill="url(#vig)"/>{content}</svg>')

def card(x, y, w, h, fill=SUP, stroke=LINEA, rx=16, sw=1.5):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def text(x, y, s, cls, size, fill, weight=400, anchor="start", extra=""):
    return (f'<text x="{x}" y="{y}" class="{cls}" font-size="{size}" font-weight="{weight}" '
            f'fill="{fill}" text-anchor="{anchor}" {extra}>{s}</text>')

ICONS = {  # trazos en una cuadrícula de 24 unidades
    "user": '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    "grid": '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    "mail": '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 7l10 7 10-7"/>',
    "table": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    "bag": '<path d="M6 7h12l1 14H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    "receipt": '<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    "bolt": '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    "check": '<path d="M4 12l5 5L20 6"/>',
    "spark": '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
    "box": '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    "bell": '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>',
}

def icon(name, x, y, size, color):
    s = size / 24
    return f'<g transform="translate({x},{y}) scale({s})" class="ico" stroke="{color}" stroke-width="{2/s*1.4:.2f}">{ICONS[name]}</g>'

def icon_tile(name, x, y, size=56, hot=False):
    bg = card(x, y, size, size, fill=GRAFITO, stroke=LIMA if hot else LINEA, rx=12)
    pad = size * 0.25
    return bg + icon(name, x + pad, y + pad, size - 2 * pad, LIMA)

# ---------------------------------------------------------------- 1. Datos
def dashboard():
    c = []
    X, Y, CW, CH = 240, 140, 1440, 800
    c.append(card(X, Y, CW, CH, rx=20))
    c.append(text(X + 48, Y + 46, "PANEL · VENTAS", "m", 15, GTEXTO, extra='letter-spacing="1"'))
    c.append(f'<circle cx="{X+CW-262}" cy="{Y+41}" r="6" fill="{LIMA}"/>')
    c.append(text(X + CW - 248, Y + 46, "actualizado hace 2 min", "m", 15, GTEXTO))
    c.append(f'<line x1="{X}" y1="{Y+72}" x2="{X+CW}" y2="{Y+72}" stroke="{LINEA}" stroke-width="1.5"/>')

    kpis = [("INGRESOS DEL MES", "$48 250", "▲ 18 %"),
            ("PEDIDOS PROCESADOS", "1 240", "▲ 9 %"),
            ("HORAS AHORRADAS", "32 h", "▲ 6 h")]
    tw, ty, th = 432, Y + 104, 150
    for k, (lab, val, d) in enumerate(kpis):
        tx = X + 48 + k * (tw + 24)
        c.append(card(tx, ty, tw, th, fill=GRAFITO, rx=12))
        c.append(text(tx + 28, ty + 44, lab, "m", 14, GTEXTO, extra='letter-spacing="1"'))
        c.append(text(tx + 28, ty + 116, val, "t", 56, HUESO, 700, extra='letter-spacing="-1.5"'))
        c.append(f'<rect x="{tx+tw-136}" y="{ty+86}" width="108" height="36" rx="18" fill="{LIMA}" fill-opacity="0.14"/>')
        c.append(text(tx + tw - 82, ty + 110, d, "m", 16, LIMA, 500, "middle"))

    # gráfico de línea
    gx, gy, gw, gh = X + 48, ty + th + 24, 880, CH - (ty + th + 24 - Y) - 48
    c.append(card(gx, gy, gw, gh, fill=GRAFITO, rx=12))
    c.append(text(gx + 28, gy + 46, "Ingresos · últimos 12 meses", "i", 21, HUESO, 500))
    px0, px1, py0, py1 = gx + 40, gx + gw - 60, gy + 96, gy + gh - 64
    for g in range(4):
        yy = py0 + g * (py1 - py0) / 3
        c.append(f'<line x1="{px0}" y1="{yy:.1f}" x2="{px1}" y2="{yy:.1f}" stroke="{LINEA}" stroke-width="1"/>')
    data = [21, 24, 23, 27, 26, 30, 29, 34, 33, 38, 42, 48.25]
    lo, hi = 15, 52
    pts = [(px0 + i * (px1 - px0) / 11, py1 - (v - lo) / (hi - lo) * (py1 - py0)) for i, v in enumerate(data)]
    line = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    area = f"{pts[0][0]:.1f},{py1} " + line + f" {pts[-1][0]:.1f},{py1}"
    c.append(f'<polygon points="{area}" fill="url(#area)"/>')
    c.append(f'<polyline points="{line}" fill="none" stroke="{LIMA}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>')
    for i, m in enumerate("EFMAMJJASOND"):
        c.append(text(pts[i][0], py1 + 36, m, "m", 14, ACERO, anchor="middle"))
    lx, ly = pts[-1]
    c.append(f'<circle cx="{lx:.1f}" cy="{ly:.1f}" r="16" fill="{LIMA}" fill-opacity="0.18"/>')
    c.append(f'<circle cx="{lx:.1f}" cy="{ly:.1f}" r="8" fill="{LIMA}"/>')
    c.append(card(lx - 196, ly - 22, 160, 46, fill=SUP, stroke=LINEA, rx=10))
    c.append(text(lx - 116, ly + 8, "$48 250", "m", 18, HUESO, 500, "middle"))

    # barras por canal
    bx, bw = gx + gw + 24, CW - 96 - gw - 24
    c.append(card(bx, gy, bw, gh, fill=GRAFITO, rx=12))
    c.append(text(bx + 28, gy + 46, "Ventas por canal", "i", 21, HUESO, 500))
    canales = [("Tienda online", 42), ("Redes sociales", 27), ("Local físico", 19), ("Mayoristas", 12)]
    for k, (n, p) in enumerate(canales):
        yy = gy + 112 + k * 92
        c.append(text(bx + 28, yy, n, "i", 18, HUESO))
        c.append(text(bx + bw - 28, yy, f"{p} %", "m", 17, GTEXTO, anchor="end"))
        full = bw - 56
        c.append(f'<rect x="{bx+28}" y="{yy+16}" width="{full}" height="14" rx="7" fill="{LINEA}"/>')
        c.append(f'<rect x="{bx+28}" y="{yy+16}" width="{full*p/42:.1f}" height="14" rx="7" fill="{LIMA if k==0 else ACERO}"/>')
    defs = (f'<linearGradient id="area" x1="0" y1="0" x2="0" y2="1">'
            f'<stop offset="0" stop-color="{LIMA}" stop-opacity="0.28"/>'
            f'<stop offset="1" stop-color="{LIMA}" stop-opacity="0"/></linearGradient>')
    return base("".join(c), defs)

# ---------------------------------------------------------------- 2. IA
def ia_documentos():
    c = []
    dx, dy, dw, dh = 280, 170, 520, 740
    # sombra y documento
    c.append(f'<rect x="{dx+14}" y="{dy+18}" width="{dw}" height="{dh}" rx="12" fill="#000" fill-opacity="0.35"/>')
    c.append(card(dx, dy, dw, dh, fill=HUESO, stroke="none", rx=12))
    c.append(text(dx + 52, dy + 88, "FACTURA", "t", 38, GRAFITO, 700, extra='letter-spacing="-0.5"'))
    c.append(text(dx + 52, dy + 122, "N.º 001-002-000458", "m", 15, ACERO))
    gris = "#D6D8DC"
    def barra(x, y, w, col=gris, h=12):
        return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{col}"/>'
    # bloque proveedor (resaltado)
    c.append(barra(dx + 52, dy + 170, 220, "#9DA3AD"))
    c.append(barra(dx + 52, dy + 196, 200))
    c.append(barra(dx + 52, dy + 222, 200))
    c.append(barra(dx + dw - 192, dy + 170, 140, "#9DA3AD"))
    c.append(barra(dx + dw - 162, dy + 196, 110))
    # tabla
    ty = dy + 290
    c.append(f'<line x1="{dx+52}" y1="{ty}" x2="{dx+dw-52}" y2="{ty}" stroke="{gris}" stroke-width="2"/>')
    for r in range(6):
        yy = ty + 30 + r * 44
        c.append(barra(dx + 52, yy, [220, 180, 250, 160, 210, 190][r]))
        c.append(barra(dx + dw - 152, yy, 100))
    tot = ty + 330
    c.append(f'<line x1="{dx+52}" y1="{tot}" x2="{dx+dw-52}" y2="{tot}" stroke="{gris}" stroke-width="2"/>')
    c.append(text(dx + 52, tot + 52, "TOTAL", "m", 18, GRAFITO, 500))
    c.append(text(dx + dw - 52, tot + 52, "$1 284,60", "t", 30, GRAFITO, 700, "end"))
    # recuadros de extracción
    for (x, y, w, h) in [(dx + 38, dy + 154, 250, 94), (dx + dw - 206, dy + 154, 168, 68), (dx + 38, tot + 16, dw - 76, 56)]:
        c.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{LIMA}" fill-opacity="0.12" stroke="{LIMA_OSC}" stroke-width="2.5"/>')
    # barrido de escaneo
    sy = dy + 470
    c.append(f'<rect x="{dx-20}" y="{sy-90}" width="{dw+40}" height="90" fill="url(#scan)"/>')
    c.append(f'<rect x="{dx-20}" y="{sy}" width="{dw+40}" height="5" rx="2.5" fill="{LIMA}"/>')

    # nodo IA
    nx, ny, ns = 900, 470, 140
    c.append(f'<circle cx="{nx+ns/2}" cy="{ny+ns/2}" r="130" fill="url(#glow)"/>')
    c.append(card(nx, ny, ns, ns, fill=SUP, stroke=LIMA, rx=28, sw=2.5))
    c.append(text(nx + ns / 2, ny + 92, "IA", "t", 60, LIMA, 700, "middle", 'letter-spacing="-1"'))
    c.append(text(nx + ns / 2, ny + ns + 44, "LEE · EXTRAE · CLASIFICA", "m", 14, GTEXTO, anchor="middle", extra='letter-spacing="1"'))
    for (x1, x2) in [(dx + dw + 20, nx - 14), (nx + ns + 14, 1124)]:
        c.append(f'<line x1="{x1}" y1="540" x2="{x2}" y2="540" stroke="{LINEA}" stroke-width="2.5" stroke-dasharray="2 10" stroke-linecap="round"/>')
        c.append(f'<circle cx="{(x1+x2)/2}" cy="540" r="6" fill="{LIMA}"/>')

    # tarjeta de datos extraídos
    rx_, ry_, rw, rh = 1140, 210, 520, 660
    c.append(card(rx_, ry_, rw, rh, rx=20))
    c.append(text(rx_ + 40, ry_ + 56, "DATOS EXTRAÍDOS", "m", 15, GTEXTO, extra='letter-spacing="1"'))
    c.append(f'<rect x="{rx_+rw-196}" y="{ry_+30}" width="156" height="38" rx="19" fill="{LIMA}" fill-opacity="0.14"/>')
    c.append(icon("check", rx_ + rw - 180, ry_ + 39, 20, LIMA))
    c.append(text(rx_ + rw - 106, ry_ + 56, "98 %", "m", 16, LIMA, 500, "middle"))
    c.append(f'<line x1="{rx_}" y1="{ry_+92}" x2="{rx_+rw}" y2="{ry_+92}" stroke="{LINEA}" stroke-width="1.5"/>')
    campos = [("PROVEEDOR", "Distribuidora Andina S.A."), ("RUC", "0190123456001"),
              ("FECHA", "08/10/2026"), ("TOTAL", "$1 284,60")]
    for k, (lab, val) in enumerate(campos):
        yy = ry_ + 140 + k * 92
        c.append(text(rx_ + 40, yy, lab, "m", 13, ACERO, extra='letter-spacing="1"'))
        c.append(text(rx_ + 40, yy + 36, val, "i", 26, HUESO, 500))
    yy = ry_ + 140 + 4 * 92
    c.append(text(rx_ + 40, yy, "CATEGORÍA", "m", 13, ACERO, extra='letter-spacing="1"'))
    c.append(f'<rect x="{rx_+40}" y="{yy+12}" width="250" height="40" rx="20" fill="none" stroke="{LIMA}" stroke-width="2"/>')
    c.append(text(rx_ + 165, yy + 39, "Insumos de oficina", "i", 18, LIMA, 500, "middle"))
    c.append(f'<rect x="{rx_+40}" y="{ry_+rh-84}" width="{rw-80}" height="52" rx="12" fill="{LIMA}"/>')
    c.append(text(rx_ + rw / 2, ry_ + rh - 50, "Enviado a contabilidad →", "i", 20, GRAFITO, 600, "middle"))
    defs = (f'<linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">'
            f'<stop offset="0" stop-color="{LIMA}" stop-opacity="0"/>'
            f'<stop offset="1" stop-color="{LIMA}" stop-opacity="0.35"/></linearGradient>'
            f'<radialGradient id="glow"><stop offset="0" stop-color="{LIMA}" stop-opacity="0.22"/>'
            f'<stop offset="1" stop-color="{LIMA}" stop-opacity="0"/></radialGradient>')
    return base("".join(c), defs)

# ---------------------------------------------------------------- 3. Flujo
def flujo():
    c = []
    NW, NH = 300, 156
    nodos = {
        "a": (170, 462, "bolt", "01 · DISPARADOR", "Nuevo pedido", "Tienda online", False),
        "b": (580, 462, "check", "02 · VALIDACIÓN", "Validar datos", "Cliente, stock y pago", False),
        "c": (990, 462, "spark", "03 · IA", "Clasificar pedido", "Prioridad y destino", True),
        "d": (1450, 262, "box", "04 · ACCIÓN", "Actualizar inventario", "Sistema ERP", False),
        "e": (1450, 662, "bell", "05 · ACCIÓN", "Avisar al cliente", "Correo y mensaje", False),
    }
    def conector(p, q, curve=False):
        (x1, y1), (x2, y2) = p, q
        if curve:
            mx = (x1 + x2) / 2
            d = f"M{x1} {y1} C{mx} {y1} {mx} {y2} {x2} {y2}"
            dot = (mx, (y1 + y2) / 2)
        else:
            d = f"M{x1} {y1} L{x2} {y2}"
            dot = ((x1 + x2) / 2, y1)
        s = f'<path d="{d}" fill="none" stroke="{LINEA}" stroke-width="3"/>'
        s += f'<path d="M{x2-12} {y2-8} L{x2} {y2} L{x2-12} {y2+8}" fill="none" stroke="{GTEXTO}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
        s += f'<circle cx="{dot[0]:.1f}" cy="{dot[1]:.1f}" r="11" fill="{LIMA}" fill-opacity="0.2"/><circle cx="{dot[0]:.1f}" cy="{dot[1]:.1f}" r="6" fill="{LIMA}"/>'
        return s
    def mid_r(k): x, y = nodos[k][:2]; return (x + NW, y + NH / 2)
    def mid_l(k): x, y = nodos[k][:2]; return (x - 4, y + NH / 2)
    c.append(conector(mid_r("a"), mid_l("b")))
    c.append(conector(mid_r("b"), mid_l("c")))
    c.append(conector(mid_r("c"), mid_l("d"), True))
    c.append(conector(mid_r("c"), mid_l("e"), True))
    for k, (x, y, ic, paso, tit, sub, hot) in nodos.items():
        if hot:
            c.append(f'<rect x="{x-10}" y="{y-10}" width="{NW+20}" height="{NH+20}" rx="22" fill="{LIMA}" fill-opacity="0.07"/>')
        c.append(card(x, y, NW, NH, stroke=LIMA if hot else LINEA, rx=16, sw=2 if hot else 1.5))
        c.append(icon_tile(ic, x + 24, y + 24, 52, hot))
        c.append(text(x + 92, y + 56, paso, "m", 13, LIMA if hot else GTEXTO, extra='letter-spacing="1"'))
        c.append(text(x + 24, y + 112, tit, "i", 23, HUESO, 600))
        c.append(text(x + 24, y + 140, sub, "i", 17, GTEXTO))
        c.append(f'<circle cx="{x+NW-30}" cy="{y+50}" r="13" fill="{LIMA}" fill-opacity="0.15"/>')
        c.append(icon("check", x + NW - 39, y + 41, 18, LIMA))
    # franja de resultado
    fx, fy, fw, fh = 560, 900, 800, 84
    c.append(card(fx, fy, fw, fh, rx=42))
    c.append(text(fx + 48, fy + 52, "TIEMPO POR PEDIDO", "m", 15, GTEXTO, extra='letter-spacing="1"'))
    c.append(text(fx + 340, fy + 50, "antes", "m", 14, ACERO))
    c.append(text(fx + 400, fy + 54, "15 min", "t", 30, ACERO, 500))
    c.append(text(fx + 536, fy + 53, "→", "i", 30, GTEXTO, 400, "middle"))
    c.append(text(fx + 580, fy + 50, "ahora", "m", 14, LIMA))
    c.append(text(fx + 640, fy + 57, "20 s", "t", 40, LIMA, 700, extra='letter-spacing="-1"'))
    # cabecera
    c.append(text(170, 150, "FLUJO AUTOMÁTICO · PEDIDOS", "m", 16, GTEXTO, extra='letter-spacing="1.5"'))
    c.append(f'<rect x="170" y="172" width="64" height="4" fill="{LIMA}"/>')
    return base("".join(c))

# ---------------------------------------------------------------- 4. Integración
ICONO_NI = ('<rect width="512" height="512" rx="112.6" fill="#111418"/><g transform="translate(123.69,367.10)">'
            '<path d="M22.2208 0.0V-157.45024H61.58336V-136.81664H67.29728Q71.10656 -145.07008 81.58207999999999 -152.52992Q92.0576 -159.98976 113.32608 -159.98976Q131.7376 -159.98976 145.54624 -151.5776Q159.35488 -143.16544 166.97344 -128.40447999999998Q174.592 -113.64352 174.592 -93.96224V0.0H134.59456V-90.78784Q134.59456 -108.56448 125.86496 -117.4528Q117.13536 -126.34112 100.94592 -126.34112Q82.5344 -126.34112 72.37632 -114.11968Q62.21824 -101.89824 62.21824 -79.99488V0.0Z M202.40384 0.0V-157.45024H242.40128V0.0Z" fill="#F4F4F2"/>'
            '<rect x="195.42" y="-222.21" width="53.96" height="53.96" fill="#C6F432"/></g>')

def integracion():
    c = []
    cx, cy = 960, 540
    c.append(f'<circle cx="{cx}" cy="{cy}" r="300" fill="url(#glow)"/>')
    for r in (190, 300):
        c.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{LINEA}" stroke-width="1.5" stroke-dasharray="4 10"/>')
    apps = [(270, "user", "CRM", "Clientes"), (330, "grid", "ERP", "Inventario"),
            (30, "receipt", "Facturación", "Electrónica"), (90, "mail", "Correo", "Notificaciones"),
            (150, "bag", "Tienda online", "Pedidos"), (210, "table", "Hojas de cálculo", "Reportes")]
    NW, NH = 300, 104
    nodos = []
    for ang, ic, nom, sub in apps:
        a = math.radians(ang)
        px, py = cx + 640 * math.cos(a), cy + 350 * math.sin(a)
        nodos.append((px, py, ic, nom, sub))
        # línea centro → nodo, con tramo lima cerca del nodo
        ex, ey = cx + 120 * math.cos(a), cy + 120 * math.sin(a)
        c.append(f'<line x1="{ex:.1f}" y1="{ey:.1f}" x2="{px:.1f}" y2="{py:.1f}" stroke="{LINEA}" stroke-width="2.5"/>')
        t1, t2 = 0.42, 0.58
        c.append(f'<line x1="{ex+(px-ex)*t1:.1f}" y1="{ey+(py-ey)*t1:.1f}" x2="{ex+(px-ex)*t2:.1f}" y2="{ey+(py-ey)*t2:.1f}" stroke="{LIMA}" stroke-width="3.5" stroke-linecap="round"/>')
        c.append(f'<circle cx="{ex+(px-ex)*t2:.1f}" cy="{ey+(py-ey)*t2:.1f}" r="6" fill="{LIMA}"/>')
    for px, py, ic, nom, sub in nodos:
        x, y = px - NW / 2, py - NH / 2
        c.append(card(x, y, NW, NH, rx=16))
        c.append(icon_tile(ic, x + 22, y + 22, 60))
        c.append(text(x + 102, y + 48, nom, "i", 22, HUESO, 600))
        c.append(text(x + 102, y + 76, sub, "i", 16, GTEXTO))
    # ícono "ni" al centro
    s = 220 / 512
    c.append(f'<rect x="{cx-118}" y="{cy-118}" width="236" height="236" rx="56" fill="none" stroke="{LIMA}" stroke-width="2.5"/>')
    c.append(f'<g transform="translate({cx-110},{cy-110}) scale({s})">{ICONO_NI}</g>')
    defs = (f'<radialGradient id="glow"><stop offset="0" stop-color="{LIMA}" stop-opacity="0.16"/>'
            f'<stop offset="1" stop-color="{LIMA}" stop-opacity="0"/></radialGradient>')
    return base("".join(c), defs)

GRAFICOS = {
    "nniklab-grafico-datos-dashboard": dashboard,
    "nniklab-grafico-ia-documentos": ia_documentos,
    "nniklab-grafico-automatizacion-flujo": flujo,
    "nniklab-grafico-integracion-apps": integracion,
}

if __name__ == "__main__":
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": W, "height": H})
        for nombre, fn in GRAFICOS.items():
            svg = fn()
            (OUT / f"{nombre}.svg").write_text(svg, encoding="utf-8")
            pg.set_content(f'<html><body style="margin:0;background:{GRAFITO}">{svg}</body></html>')
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(300)
            pg.screenshot(path=str(OUT / f"{nombre}.png"), clip={"x": 0, "y": 0, "width": W, "height": H})
            print("ok", nombre)
        b.close()

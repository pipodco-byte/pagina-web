from fpdf import FPDF
from datetime import datetime

class PipodOfficialPDF(FPDF):
    def __init__(self, etiqueta_subtitulo="SERVICIO TÉCNICO APPLE"):
        super().__init__()
        self.etiqueta_subtitulo = etiqueta_subtitulo
        # Design Tokens
        self.color_main = (0, 0, 0)           
        self.color_azul_pipod = (58, 80, 107) 
        self.color_med_gray = (100, 100, 100) 
        self.color_light_gray = (230, 230, 230) 
        
    def header(self):
        self.set_fill_color(*self.color_main)
        self.rect(0, 0, 210, 35, 'F')
        self.set_xy(25, 12)
        self.set_font('Helvetica', 'B', 24)
        self.set_text_color(255, 255, 255)
        self.cell(0, 10, 'PIPOD', align='L')
        self.set_font('Courier', 'B', 8)
        self.set_xy(25, 22)
        self.cell(0, 5, self.etiqueta_subtitulo, align='L') 
        self.set_xy(0, 15)
        self.set_font('Helvetica', 'B', 11)
        self.cell(185, 10, 'COTIZACIÓN', align='R')
def footer(self):
        self.set_y(-25)
        # Línea divisoria minimalista
        self.set_draw_color(*self.color_light_gray)
        self.line(25, self.get_y(), 185, self.get_y())
        
        # --- FILA 1: Redes Sociales (Texto Plano Sobrio) ---
        self.set_y(-20)
        self.set_font('Helvetica', 'B', 7)
        self.set_text_color(*self.color_main)
        redes = "INSTAGRAM: @pipod.co   |   TIKTOK: @pipodstore   |   FACEBOOK: pipod.co"
        self.cell(0, 5, redes, align='C', ln=True)

        # --- FILA 2: Contacto y Ubicación ---
        self.set_font('Helvetica', '', 7)
        self.set_text_color(*self.color_med_gray)
        contacto = "CRA. 13A #79-52, CHAPINERO, BOGOTÁ   |   WHATSAPP: +57 312 481 3094   |   WWW.PIPOD.CO"
        self.cell(0, 5, contacto, align='C')

    
def generar_cotizacion_v4(tipo, datos_cliente, items):
    # Usamos tu copy de la web para la descripción
    config = {
        'servicio': {
            'sub': 'SERVICIO TÉCNICO APPLE',
            'manifiesto': 'Más de 15 años comprometidos con el servicio técnico de Apple en Bogotá',
            'tabla': '  DESCRIPCIÓN DEL SERVICIO TÉCNICO',
            'notas': ['Garantía: 90 días en hardware.', 'Diagnóstico: Estándar Apple.', 'Validez: 48 horas.']
        },
        'retoma': {
            'sub': 'PLAN RETOMA PIPOD',
            'manifiesto': 'Expertos en ecosistema Apple. Valoramos tu tecnología para darle una nueva vida con seguridad y transparencia.',
            'tabla': '  VALORACIÓN DE EQUIPOS (RETOMA)',
            'notas': ['Sujeto a peritaje físico.', 'Entrega libre de iCloud.', 'Pago por transferencia.']
        }
    }

    c = config.get(tipo, config['servicio'])
    pdf = PipodOfficialPDF(etiqueta_subtitulo=c['sub'])
    pdf.set_margins(25, 45, 25)
    pdf.add_page()

    # Bloque de Marca (Reutilizando tu copy)
    pdf.set_y(45)
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 8, datos_cliente['nombre'].upper(), ln=1)
    
    pdf.set_font('Helvetica', 'I', 8)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(100, 4, c['manifiesto'])
    
    pdf.set_xy(135, 53)
    pdf.set_font('Courier', '', 8)
    pdf.cell(50, 4, f"FECHA: {datetime.now().strftime('%d/%m/%Y')}", align='R')

    # Tabla Zebra
    pdf.ln(15)
    pdf.set_fill_color(30, 30, 30)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', 'B', 8)
    pdf.cell(100, 10, c['tabla'], fill=True)
    pdf.cell(15, 10, 'CANT.', fill=True, align='C')
    pdf.cell(45, 10, 'TOTAL NETO', fill=True, align='R')
    pdf.ln()

    total = 0
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(45, 45, 45)
    for i, (desc, cant, precio) in enumerate(items):
        bg = (i % 2 == 0)
        pdf.set_fill_color(248, 248, 248) if bg else pdf.set_fill_color(255, 255, 255)
        pdf.cell(100, 10, f"  {desc}", border=0, fill=True)
        pdf.cell(15, 10, str(cant), border=0, fill=True, align='C')
        pdf.set_font('Courier', 'B', 9)
        pdf.cell(45, 10, f"$ {precio:,.0f}  ", border=0, fill=True, align='R')
        pdf.set_font('Helvetica', '', 9)
        pdf.ln()
        total += (precio * cant)

    # Total
    pdf.ln(10)
    pdf.set_x(115)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(*pdf.color_azul_pipod)
    pdf.cell(40, 10, 'TOTAL A PAGAR:', align='L')
    pdf.set_font('Courier', 'B', 13)
    pdf.cell(30, 10, f"$ {total:,.0f}", align='R', ln=1)
    pdf.set_draw_color(*pdf.color_azul_pipod)
    pdf.line(115, pdf.get_y(), 185, pdf.get_y())

    # Notas Finales
    pdf.set_y(230)
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 5, 'NOTAS Y CONDICIONES:', ln=1)
    pdf.set_font('Helvetica', '', 7)
    pdf.set_text_color(100, 100, 100)
    for nota in c['notas']:
        pdf.cell(0, 4, f"• {nota}", ln=1)

    return pdf.output("Cotizacion_Pipod_v4.pdf")
from fpdf import FPDF
from datetime import datetime

class PipodOfficialPDF(FPDF):
    def __init__(self, etiqueta_subtitulo="SERVICIO TÉCNICO"):
        super().__init__()
        self.etiqueta_subtitulo = etiqueta_subtitulo
        # Design Tokens de tu archivo .md
        self.color_main = (0, 0, 0)           
        self.color_azul_pipod = (58, 80, 107) 
        self.color_text = (45, 45, 45)
        self.color_light_gray = (248, 248, 248)
        
    def header(self):
        # Header Negro Superior
        self.set_fill_color(*self.color_main)
        self.rect(0, 0, 210, 35, 'F')
        
        # Logo Texto
        self.set_xy(25, 12)
        self.set_font('Helvetica', 'B', 24)
        self.set_text_color(255, 255, 255)
        self.cell(0, 10, 'PIPOD', align='L')
        
        # Subtítulo Dinámico (Servicio / Retoma / Venta)
        self.set_font('Courier', 'B', 8)
        self.set_xy(25, 22)
        self.cell(0, 5, self.etiqueta_subtitulo.upper(), align='L')

    def footer(self):
        self.set_y(-25)
        self.set_font('Helvetica', 'I', 7)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f'Pipod - Digital Engineering & Apple Solutions - Página {self.page_no()}', align='C')

def generar_cotizacion_v4(cliente, items, tipo_op):
    # 1. Configuración de Contenido por Tipo
    config = {
        'servicio': {
            'sub': 'SERVICIO TÉCNICO APPLE',
            'manifiesto': 'Especialistas en diagnóstico y reparación avanzada.',
            'tabla': 'DETALLE DEL SERVICIO',
            'notas': ['Garantía de 3 meses por reparación.', 'No incluye repuestos no descritos.']
        },
        'retoma': {
            'sub': 'VALORACIÓN DE RETOMA',
            'manifiesto': 'Oferta sujeta a verificación física final en laboratorio.',
            'tabla': 'DETALLE DE VALORACIÓN',
            'notas': ['Válido por 48 horas.', 'Requiere entrega de accesorios originales.']
        },
        'venta': {
            'sub': 'VENTA DE EQUIPOS APPLE',
            'manifiesto': 'Equipos seleccionados con certificación de calidad Pipod.',
            'tabla': 'DETALLE DE PRODUCTOS',
            'notas': ['Garantía de 1 año.', 'Sujeto a disponibilidad de stock.']
        }
    }

    c = config.get(tipo_op.lower(), config['servicio'])
    pdf = PipodOfficialPDF(etiqueta_subtitulo=c['sub'])
    pdf.add_page()
    
    # Función de saneamiento de texto para evitar errores de fpdf
    def s(t): return str(t).encode('latin-1', 'ignore').decode('latin-1')

    # 2. Información del Cliente
    pdf.set_xy(25, 45)
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_text_color(*pdf.color_main)
    pdf.cell(0, 5, f"PARA: {s(cliente)}")
    pdf.ln(6)
    pdf.set_x(25)
    pdf.set_font('Helvetica', '', 8)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 5, f"FECHA DE EMISIÓN: {datetime.now().strftime('%d/%m/%Y')}")
    pdf.ln(10)

    # 3. Manifiesto
    pdf.set_x(25)
    pdf.set_font('Helvetica', 'I', 8)
    pdf.multi_cell(160, 4, s(c['manifiesto']))
    pdf.ln(5)

    # 4. Tabla con Efecto Cebra (Tal cual tu .md)
    pdf.set_x(25)
    pdf.set_fill_color(240, 240, 240)
    pdf.set_font('Helvetica', 'B', 8)
    pdf.cell(100, 10, s(c['tabla']), fill=True)
    pdf.cell(15, 10, 'CANT.', fill=True, align='C')
    pdf.cell(45, 10, 'TOTAL NETO', fill=True, align='R')
    pdf.ln()

    total_acumulado = 0
    pdf.set_font('Helvetica', '', 9)
    for i, (desc, cant, precio) in enumerate(items):
        # Lógica de precio: Si es string ("Consultar"), el total es 0 para ese item
        try:
            val_precio = float(precio)
            txt_precio = f"$ {val_precio:,.0f}"
            total_item = val_precio * cant
            total_acumulado += total_item
        except:
            txt_precio = s(precio)
            total_item = 0

        # Zebra striping
        fill = (i % 2 == 0)
        pdf.set_fill_color(250, 250, 250) if fill else pdf.set_fill_color(255, 255, 255)
        
        pdf.set_x(25)
        pdf.cell(100, 10, f"  {s(desc)}", fill=fill)
        pdf.cell(15, 10, str(cant), fill=fill, align='C')
        pdf.cell(45, 10, txt_precio + "  ", fill=fill, align='R')
        pdf.ln()

    # 5. Resumen de Totales
    pdf.ln(5)
    pdf.set_x(125)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(60, 10, f"TOTAL: $ {total_acumulado:,.0f}", border='T', align='R')

    # 6. Notas al pie
    pdf.ln(15)
    pdf.set_x(25)
    pdf.set_font('Helvetica', 'B', 8)
    pdf.cell(0, 5, "NOTAS Y CONDICIONES:")
    pdf.ln(5)
    pdf.set_font('Helvetica', '', 7)
    for nota in c['notas']:
        pdf.set_x(30)
        pdf.cell(0, 4, f"- {s(nota)}")
        pdf.ln()

    # Guardar archivo
    nombre_archivo = f"Cotizacion_Pipod_{cliente.replace(' ', '_')}.pdf"
    pdf.output(nombre_archivo)
    return nombre_archivo
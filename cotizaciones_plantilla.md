from fpdf import FPDF
from datetime import datetime

class PipodSignaturePDF(FPDF):
    def __init__(self):
        super().__init__(unit='mm', format='A4')
        # Design Tokens - Basados en www.pipod.co
        self.color_black_footer = (31, 31, 31)  # #1F1F1F
        self.color_gray_med = (110, 110, 110)    # #6E6E6E
        self.line_color = (230, 230, 230)        # Gris ultra claro para líneas de pelo

    def header(self):
        # Logo y Marca
        self.set_xy(20, 25)
        self.set_font('Helvetica', 'B', 24)
        self.set_text_color(*self.color_black_footer)
        self.cell(0, 10, 'PIPOD', align='L')
        
        # Subtítulo de ingeniería
        self.set_xy(20, 35)
        self.set_font('Courier', 'B', 8)
        self.set_text_color(*self.color_gray_med)
        self.cell(0, 5, 'APPLE SPECIALIST ARCHITECTURE // BOGOTA DC', align='L')

        # Etiqueta de documento
        self.set_xy(0, 26)
        self.set_font('Helvetica', '', 9)
        self.set_text_color(*self.color_gray_med)
        self.cell(190, 10, 'PRESUPUESTO ESTIMADO', align='R')

    def footer(self):
        # Línea de cierre sutil
        self.set_y(-25)
        self.set_draw_color(*self.line_color)
        self.set_line_width(0.1)
        self.line(20, self.get_y(), 190, self.get_y())
        
        # Información de contacto integrada
        self.set_y(-20)
        self.set_font('Helvetica', '', 7)
        self.set_text_color(*self.color_gray_med)
        footer_text = "Pipod | Cra. 13a #79-52, Chapinero | WhatsApp: +57 312 481 3094 | www.pipod.co"
        self.cell(0, 10, footer_text, align='C')

def generar_cotizacion_pipod(nombre_cliente, items_servicios):
    pdf = PipodSignaturePDF()
    pdf.set_margins(20, 45, 20)
    pdf.add_page()

    # --- Bloque de Información de Cliente ---
    pdf.set_y(60)
    pdf.set_font('Courier', 'B', 8)
    pdf.set_text_color(*pdf.color_gray_med)
    fecha_hoy = datetime.now().strftime('%d.%m.%Y').upper()
    pdf.cell(0, 5, f"REF: #PP-{datetime.now().strftime('%M%S')} / FECHA: {fecha_hoy}", ln=1)
    
    pdf.ln(3)
    pdf.set_font('Helvetica', 'B', 22)
    pdf.set_text_color(*pdf.color_black_footer)
    pdf.cell(0, 15, nombre_cliente, ln=1)
    
    pdf.ln(8)

    # --- Cabecera de Tabla Minimalista ---
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(*pdf.color_gray_med)
    pdf.cell(110, 8, 'ESPECIFICACION TECNICA', border=0)
    pdf.cell(20, 8, 'CANT', border=0, align='C')
    pdf.cell(40, 8, 'VALOR (COP)', border=0, align='R')
    pdf.ln(10)

    # --- Listado de Servicios ---
    total_neto = 0
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(*pdf.color_black_footer)

    for desc, cant, precio in items_servicios:
        # Línea de separación sutil por item
        pdf.set_draw_color(*pdf.line_color)
        pdf.set_line_width(0.1)
        pdf.line(20, pdf.get_y(), 190, pdf.get_y())
        
        pdf.cell(110, 12, desc, border=0)
        pdf.cell(20, 12, str(cant), border=0, align='C')
        pdf.set_font('Courier', '', 10)
        pdf.cell(40, 12, f"${precio:,}", border=0, align='R')
        pdf.set_font('Helvetica', '', 10)
        pdf.ln()
        total_neto += (precio * cant)

    # Línea de cierre de tabla
    pdf.line(20, pdf.get_y(), 190, pdf.get_y())

    # --- Bloque de Totales ---
    pdf.ln(12)
    iva = int(total_neto * 0.19)
    total_final = total_neto + iva

    pdf.set_x(120)
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(*pdf.color_gray_med)
    pdf.cell(35, 6, 'Subtotal')
    pdf.cell(35, 6, f"${total_neto:,}", align='R', ln=1)
    
    pdf.set_x(120)
    pdf.cell(35, 6, 'IVA (19%)')
    pdf.cell(35, 6, f"${iva:,}", align='R', ln=1)
    
    pdf.ln(4)
    pdf.set_x(120)
    pdf.set_font('Helvetica', 'B', 15)
    pdf.set_text_color(*pdf.color_black_footer)
    pdf.cell(35, 10, 'TOTAL')
    pdf.cell(35, 10, f"${total_final:,}", align='R', ln=1)

    # --- Nota de Garantía ---
    pdf.set_y(240)
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(*pdf.color_black_footer)
    pdf.cell(0, 5, "NOTAS DE CALIDAD", ln=1, align='C')
    pdf.ln(1)
    pdf.set_font('Helvetica', '', 7)
    pdf.set_text_color(*pdf.color_gray_med)
    pdf.multi_cell(0, 4, (
        "Componentes de grado original con certificacion de calidad Pipod. "
        "Garantia de 90 dias en hardware. Este presupuesto es una estimacion "
        "valida por 48 horas."
    ), align='C')

    # Guardado final
    nombre_archivo = f"Cotizacion_Pipod_{nombre_cliente.replace(' ', '_')}.pdf"
    path = f"/mnt/data/{nombre_archivo}"
    pdf.output(path)
    return path

# --- BLOQUE DE EJECUCIÓN (Lo que la IA llena según el chat) ---
cliente = "Nombre del Cliente"
servicios = [
    ["Descripcion del Servicio 01", 1, 500000],
    ["Descripcion del Servicio 02", 1, 150000]
]

archivo_final = generar_cotizacion_pipod(cliente, servicios)
print(f"Archivo generado en: {archivo_final}")
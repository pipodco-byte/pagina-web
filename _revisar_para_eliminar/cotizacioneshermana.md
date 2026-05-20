from fpdf import FPDF
import os

class SimocsPulidoA5(FPDF):
    def __init__(self):
        # Formato A5: 148 x 210 mm
        super().__init__(format='A5')
        # Design Tokens
        self.turq = (82, 188, 198)  # Color #52BCC6
        self.dark_gray = (50, 50, 50)
        self.text_gray = (80, 80, 80)
        self.set_margins(12, 15, 12)
        self.set_auto_page_break(auto=True, margin=15)

    def header(self):
        # 1. El encabezado es la imagen logo.png
        # 2. Se borró el texto SIMOCS S.A.S. y "Tu mano aliada"
        if os.path.exists('logo.png'):
            # Posición x=12 (margen izquierdo), y=12, ancho de 35mm (ajustable)
            self.image('logo.png', x=12, y=10, w=35) 
        
        # Línea de diseño minimalista (ajustada para que no choque con el logo)
        self.set_draw_color(*self.turq)
        self.set_line_width(0.8)
        self.line(12, 28, 60, 28)
        self.ln(22) # Espacio para que el contenido empiece después del logo

    def footer(self):
        self.set_y(-18)
        self.set_font('Helvetica', '', 7)
        self.set_text_color(160, 160, 160)
        self.cell(0, 5, 'SIMOCS S.A.S. | Santa Maria, Boyaca | ventas@simocs.sas', align='C', ln=True)
        self.cell(0, 5, f'Pagina {self.page_no()}', align='C')

def s(texto):
    """Función para sanear texto y evitar errores de codificación latin-1"""
    return str(texto).encode('latin-1', 'ignore').decode('latin-1')

def generar_cotizacion():
    pdf = SimocsPulidoA5()
    pdf.add_page()
    
    # --- SECCIÓN I & II: CABECERA DUAL ---
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(82, 188, 198)
    pdf.cell(62, 5, 'DATOS DEL EMISOR', ln=0)
    pdf.cell(62, 5, 'DATOS DEL CLIENTE', ln=1)
    
    pdf.set_font('Helvetica', '', 7.5)
    pdf.set_text_color(60, 60, 60)
    
    datos = [
        ('NIT: 901530981-2', 'UTRAFFIC S.A.S.'),
        ('Santa Maria (Boyaca)', 'Bogota D.C.'),
        ('ventas@simocs.sas', 'Tel: 3105790168')
    ]
    
    for emisor, cliente in datos:
        pdf.cell(62, 4, s(emisor), ln=0)
        pdf.cell(62, 4, s(cliente), ln=1)
    
    pdf.ln(8)

    # --- SECCIÓN III: CONTROL DE COTIZACIÓN ---
    pdf.set_fill_color(82, 188, 198)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(0, 8, s(' RESUMEN DE COTIZACIÓN #22'), fill=True, ln=1)
    
    pdf.set_text_color(60, 60, 60)
    
    controles = [
        ('EMISION:', '19/01/2025', 'VALIDEZ:', '2 DIAS'),
        ('PAGO:', 'A CONVENIR', 'CODIGO:', 'GR-F-01 (V.01)')
    ]
    
    for c1, v1, c2, v2 in controles:
        pdf.set_font('Helvetica', 'B', 7)
        pdf.cell(31, 6, s(c1), border='B')
        pdf.set_font('Helvetica', '', 7)
        pdf.cell(31, 6, s(v1), border='B')
        pdf.set_font('Helvetica', 'B', 7)
        pdf.cell(31, 6, s(c2), border='B')
        pdf.set_font('Helvetica', '', 7)
        pdf.cell(31, 6, s(v2), border='B', ln=1)
    
    pdf.ln(8)

    # --- SECCIÓN IV: DETALLE DE PRODUCTOS ---
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(82, 188, 198)
    pdf.cell(0, 6, 'DETALLE DE LA PROPUESTA', ln=1)
    pdf.ln(2)
    
    # Encabezado de tabla
    pdf.set_fill_color(245, 245, 245)
    pdf.set_text_color(40, 40, 40)
    pdf.set_font('Helvetica', 'B', 8)
    pdf.cell(10, 8, 'Item', fill=True, align='C')
    pdf.cell(75, 8, s(' Descripcion Tecnica'), fill=True)
    pdf.cell(15, 8, 'Cant.', fill=True, align='C')
    pdf.cell(24, 8, 'Total', fill=True, align='R')
    pdf.ln()
    
    # Fila de Producto
    pdf.set_font('Helvetica', '', 8)
    pdf.set_text_color(50, 50, 50)
    pdf.cell(10, 12, '1', border='B', align='C')
    pdf.cell(75, 12, s(' Macbook Pro Chip M4 (16GB RAM / 512GB SSD)'), border='B')
    pdf.cell(15, 12, '2', border='B', align='C')
    pdf.set_font('Helvetica', 'B', 8)
    pdf.cell(24, 12, '$18.088.000 ', border='B', align='R')
    pdf.ln(14)

    # 3. BLOQUE DE TOTAL ALINEADO A LA DERECHA
    # El ancho total de la tabla es 124mm (10+75+15+24). 
    # El cuadro de total mide 39mm (15+24). Para alinearlo a la derecha:
    # Margen izquierdo (12) + Ancho tabla (124) - Ancho cuadro (39) = 97
    pdf.set_x(97)
    pdf.set_fill_color(82, 188, 198)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(15, 8, ' TOTAL', fill=True)
    pdf.cell(24, 8, '$18.088.000 ', fill=True, align='R')
    pdf.ln(12)

    # --- SECCIÓN V: TÉRMINOS Y GARANTÍA ---
    pdf.set_text_color(82, 188, 198)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(0, 6, s('TERMINOS, CONDICIONES Y GARANTIA'), ln=1)
    pdf.set_draw_color(82, 188, 198)
    pdf.line(12, pdf.get_y(), 40, pdf.get_y())
    pdf.ln(3)
    
    pdf.set_text_color(80, 80, 80)
    pdf.set_font('Helvetica', '', 7.5)
    
    # 4. NUEVOS TÉRMINOS Y CONDICIONES
    condiciones = [
        "Los precios ofertados incluyen IVA.",
        "Garantia: 1 ano por defectos de fabrica (directo con la marca).",
        "Stock: Suministros sujetos a disponibilidad inmediata."
    ]
    
    for cond in condiciones:
        pdf.cell(5, 4, '-', ln=0)
        pdf.cell(0, 4, s(cond), ln=1)

    pdf.ln(4)
    
    # Bloque de texto de cierre
    texto_cierre = (
        "Esperamos que los productos ofertados cumplan con sus expectativas. "
        "Si usted presenta alguna duda sobre esta cotización o desea conocer información "
        "adicional sobre los elementos ofertados, agradecemos comunicarse al Celular 312 481 3094. "
        "\n\nEsta cotización no puede ser tomada como Orden de compra. \n"
        "¡Gracias por elegirnos!"
    )
    pdf.multi_cell(0, 4, s(texto_cierre))

    pdf.ln(5)
    # Estructura documental
    pdf.set_font('Helvetica', 'I', 6)
    pdf.set_text_color(160, 160, 160)
    pdf.multi_cell(0, 3, s("Estructura Documental: ID Corporativa > Datos Cliente > Resumen Administrativo > Detalle de Suministros > Clausulas de Garantia."))

    # Guardar archivo
    nombre_archivo = "Cotizacion_SIMOCS_Actualizada.pdf"
    pdf.output(nombre_archivo)
    print(f"Archivo generado: {nombre_archivo}")

if __name__ == "__main__":
    generar_cotizacion()
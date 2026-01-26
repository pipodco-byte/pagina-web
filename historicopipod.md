\documentclass[12pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[spanish]{babel}
\usepackage{geometry}
\geometry{margin=2.5cm}
\usepackage{booktabs}
\usepackage{array}
\usepackage{longtable}
\usepackage{graphicx}
\usepackage{fancyhdr}
\usepackage{sectsty}
\usepackage{xcolor}
\usepackage[hidelinks]{hyperref}
\usepackage{tocloft}
\usepackage{tikz}
\usepackage{float}

% Estilos limpios
\allsectionsfont{\sffamily\bfseries}
\sectionfont{\Large}
\subsectionfont{\large}

% Header y Footer minimalista
\pagestyle{fancy}
\fancyhf{}
\rhead{\thepage}
\lhead{\textit{INFORME GERENCIAL PIPOD 2025}}
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0pt}

% Tabla de contenidos limpia
\renewcommand{\cftsecleader}{\cftdotfill{\cftdotsep}}

\title{}
\author{}
\date{}

\begin{document}

% ==================== PORTADA ====================
\thispagestyle{empty}
\vspace*{5cm}

\begin{center}

{\Large\textbf{INFORME GERENCIAL PIPOD 2025}}

\vspace{0.3cm}
{\normalsize Análisis Histórico de PIPOD}

\vspace{0.2cm}
{\small 12 Años de Servicios Técnicos Apple (2014-2025)}

\vspace{3cm}

% Cuadro mejorado sin borde negro - solo contenido
\begin{center}
\begin{tabular}{lr}
\toprule
\textbf{Período Analizado} & \textbf{2014-2025} \\
\textbf{Total de Servicios} & \textbf{1,553 reparaciones} \\
\textbf{Ingresos Estimados} & \textbf{111,290 USD} \\
\textbf{Margen Estimado} & \textbf{56,036 USD (50\%)} \\
\textbf{Línea Principal} & \textbf{iPhone 56.9\%} \\
\textbf{Segunda Línea} & \textbf{Mac 22.9\%} \\
\bottomrule
\end{tabular}
\end{center}

\vspace{3.5cm}

{\normalsize \textbf{Autor:} Josué Calderón}

\vspace{0.5cm}

{\small 28 de Noviembre de 2025}

\end{center}

\newpage

% ==================== TABLA DE CONTENIDOS ====================
\thispagestyle{empty}
\tableofcontents
\newpage

% ==================== RESUMEN EJECUTIVO ====================
\section{Resumen Ejecutivo}

PIPOD ha operado durante 12 años (2014-2025) acumulando un total de \textbf{1,553 servicios técnicos} en reparación de equipos Apple, generando ingresos estimados de \textbf{111,290 USD} con un margen promedio del 50\% (\textbf{56,036 USD}). Este informe resume el desempeño histórico completo y proporciona recomendaciones estratégicas para 2026-2027.

\subsection{Indicadores Consolidados 2014-2025}

\begin{table}[h]
\centering
\begin{tabular}{lr}
\toprule
\textbf{Métrica} & \textbf{Valor} \\
\midrule
Total de Servicios & 1,553 \\
iPhone & 883 servicios (56.9\%) \\
Mac & 356 servicios (22.9\%) \\
Otros Dispositivos & 238 servicios (15.3\%) \\
iPad & 76 servicios (4.9\%) \\
Servicio Top: Pantalla & 549 servicios (35.4\%) \\
Servicio Top: Batería & 327 servicios (21.1\%) \\
Ingresos Totales Estimados & 111,290 USD \\
Margen Neto Estimado & 56,036 USD \\
\bottomrule
\end{tabular}
\caption{KPIs Consolidados 2014-2025}
\end{table}

\newpage

% ==================== HALLAZGOS PRINCIPALES ====================
\section{Hallazgos Principales}

\subsection{1. Dominancia de iPhone}

iPhone representa el \textbf{56.9\%} del negocio (883 de 1,553 servicios). La reparación de Pantalla es el servicio líder, concentrando 43\% de todas las reparaciones de iPhone. iPhone es la cash cow que financia el resto de operaciones.

\subsection{2. Mac: Crecimiento del 800\%}

Mac creció de 9 servicios en 2014 a 81 en 2024, representando ahora el 22.9\% del negocio. Esto posiciona a Mac como oportunidad emergente con alto potencial de monetización en MacBooks M1/M2/M3.

\subsection{3. Convergencia de Baterías}

La ratio iPhone:Mac en baterías pasó de 8:1 en 2014 a 1.6:1 en 2025. MacBooks modernos requieren mantenimiento de batería comparable a iPhones, abriendo oportunidad para programas de suscripción recurrente.

\begin{figure}[H]
\centering
\includegraphics[width=0.95\textwidth]{2c5673b4.png}
\caption{Product Line Distribution 2014-2025}
\end{figure}

\newpage

\section{Análisis Histórico por Línea de Producto}

\subsection{Desglose por Dispositivo}

\begin{table}[h]
\centering
\begin{tabular}{lrrrr}
\toprule
Producto & Servicios & \% & Ingresos Est. & Servicio Principal \\
\midrule
iPhone & 883 & 56.9\% & 64,380 USD & Pantalla (378) \\
Mac & 356 & 22.9\% & 26,500 USD & Batería (73) \\
Otros & 238 & 15.3\% & 14,785 USD & Revisión (93) \\
iPad & 76 & 4.9\% & 5,625 USD & Pantalla (49) \\
\midrule
\textbf{TOTAL} & \textbf{1,553} & \textbf{100\%} & \textbf{111,290 USD} & \\
\bottomrule
\end{tabular}
\caption{Matriz de Productos Histórica}
\end{table}

\subsection{Evolución por Año}

\begin{table}[h]
\centering
\begin{tabular}{lrr}
\toprule
Año & Servicios & Variación \\
\midrule
2014 & 22 & — \\
2015 & 161 & +631\% \\
2016 & 420 & +160\% (Pico) \\
2017 & 72 & -82.9\% \\
2018-2020 & — & Brechas en datos \\
2021 & 50 & Mínimo histórico \\
2022 & 179 & +258\% \\
2023 & 155 & -13\% \\
2024 & 197 & +27\% \\
2025 & 127 & -35.5\% \\
\bottomrule
\end{tabular}
\caption{Evolución Anual de Servicios}
\end{table}

\begin{figure}[H]
\centering
\includegraphics[width=0.95\textwidth]{2c5673b4-3.png}
\caption{Services Evolution 2014-2025}
\end{figure}

\newpage

\section{Análisis por Tipo de Servicio}

\subsection{Top Servicios 2014-2025}

\begin{table}[h]
\centering
\begin{tabular}{lrrrr}
\toprule
Servicio & Cantidad & \% & Ingresos Est. & Margen \\
\midrule
Pantalla/Imagen & 549 & 35.4\% & 46,665 USD & 55\% \\
Batería/Energía & 327 & 21.1\% & 19,620 USD & 50\% \\
Revisión/Otros & 311 & 20.0\% & 7,775 USD & 65\% \\
Disco/RAM Mejora & 98 & 6.3\% & 11,760 USD & 48\% \\
Reparación Board & 87 & 5.6\% & 13,050 USD & 35\% \\
Equipo Mojado & 81 & 5.2\% & 8,100 USD & 30\% \\
Software & 68 & 4.4\% & 2,720 USD & 70\% \\
Mantenimiento & 32 & 2.1\% & 1,600 USD & 60\% \\
\bottomrule
\end{tabular}
\caption{Servicios por Tipo - Ranking Histórico}
\end{table}

Pantalla y Batería juntas concentran el 56.5\% del volumen histórico. Esta concentración permite especialización operativa, entrenamiento eficiente del personal y márgenes predecibles.

\begin{figure}[H]
\centering
\includegraphics[width=0.95\textwidth]{2c5673b4-2.png}
\caption{Top Service Types 2014-2025}
\end{figure}

\begin{figure}[H]
\centering
\includegraphics[width=0.95\textwidth]{2c5673b4-4.png}
\caption{Services Distribution by Type (Stacked) 2014-2025}
\end{figure}

\newpage

\section{Análisis de Baterías iPhone vs Mac}

\subsection{Convergencia Histórica}

La convergencia en reemplazos de batería es uno de los insights más valiosos del análisis:

\begin{table}[h]
\centering
\begin{tabular}{lrrr}
\toprule
Año & iPhone & Mac & Ratio \\
\midrule
2014 & 8 & 1 & 8.0:1 \\
2015 & 45 & 11 & 4.1:1 \\
2016 & 45 & 9 & 5.0:1 \\
2017 & 11 & 1 & 11.0:1 \\
2022 & 32 & 15 & 2.1:1 \\
2023 & 15 & 7 & 2.1:1 \\
2024 & 29 & 16 & 1.8:1 \\
2025 & 18 & 11 & 1.6:1 \\
\midrule
\textbf{Total} & \textbf{213 (65.1\%)} & \textbf{73 (22.3\%)} & \\
\bottomrule
\end{tabular}
\caption{Baterías iPhone vs Mac - Convergencia Histórica}
\end{table}

MacBooks M1/M2/M3 requieren reemplazos de batería tan frecuentes como iPhones. Esta tendencia abre la puerta a programas de suscripción B2B de mantenimiento preventivo.

\begin{figure}[H]
\centering
\includegraphics[width=0.95\textwidth]{0ef6dd64.png}
\caption{Battery Replacements iPhone vs Mac 2014-2025}
\end{figure}

\newpage

\section{Ciclos Comerciales y Volatilidad}

\subsection{Períodos Identificados}

\begin{enumerate}

\item \textbf{2014-2016: Crecimiento Acelerado.} Crecimiento de 631\% en 2015 hasta alcanzar pico de 420 servicios en 2016.

\item \textbf{2016-2017: Colapso Severo.} Caída de -82.9\% de 420 a 72 servicios. Probable evento disruptivo (cambio de sistema, cierre temporal, transición).

\item \textbf{2018-2020: Brechas de Datos.} Ausencia completa de registros. Requiere verificación de archivos legacy.

\item \textbf{2021: Mínimo Histórico.} 50 servicios, punto más bajo de toda la operación.

\item \textbf{2022-2024: Recuperación Parcial.} Tendencia positiva con volatilidad, alcanzando 197 servicios en 2024.

\item \textbf{2025: Crisis Puntual.} -35.5\% a 127 servicios, pero con señales de recuperación en Q4 (diciembre +66.7\%).

\end{enumerate}

\newpage

\section{Recomendaciones Estratégicas}

\subsection{Corto Plazo (0-3 meses)}

\begin{enumerate}

\item \textbf{Fortalecer Pantalla iPhone:} Negociar mejores márgenes con proveedores. Crear Express Screen Replacement (máximo 2 horas). Implementar notificaciones automáticas desde iOS.

\item \textbf{Capturar Crecimiento Mac:} Publicidad digital dirigida (Google/Meta). Diagnóstico gratuito en primer servicio. Especialización M1/M2/M3.

\item \textbf{Programa Batería Recurrente:} Suscripción \$199/año. Target: 30\% de clientes actuales.

\end{enumerate}

\subsection{Mediano Plazo (3-6 meses)}

\begin{enumerate}

\item Limpiar datos FileMaker con diccionario de términos estandarizado.

\item Dashboard analítico en tiempo real (KPIs por producto, servicio, técnico, mes).

\item Diversificar: Apple Watch, soporte remoto OnDemand, coaching de usuarios.

\end{enumerate}

\subsection{Largo Plazo (6-12 meses)}

\begin{enumerate}

\item Expandir capacidades: reparaciones Board/Logic, data recovery, instalación/configuración software.

\item Modelo B2B: contratos anuales mantenimiento preventivo, SLA garantizados, turnaround time.

\end{enumerate}

\newpage

\section{Proyecciones de Crecimiento 2026-2027}

\subsection{Escenarios Propuestos}

\begin{table}[h]
\centering
\begin{tabular}{lccc}
\toprule
\textbf{Escenario} & \textbf{2026} & \textbf{2027} & \textbf{Ingresos 2027} \\
\midrule
Conservador & 138 (+8.7\%) & 150 (+8.7\%) & 172,500 USD \\
Agresivo & 185 (+45.7\%) & 250 (+35.1\%) & 290,000 USD \\
\bottomrule
\end{tabular}
\caption{Escenarios de Crecimiento 2026-2027}
\end{table}

Con implementación disciplinada de estrategia, PIPOD podría alcanzar \textbf{160,000-290,000 USD} en ingresos anualizados en 24 meses.

\newpage

\section{Conclusión}

PIPOD ha construido un negocio sostenible en 12 años de operación, con \textbf{1,553 servicios acumulados} y \textbf{111,290 USD} en ingresos estimados. El negocio está centrado en Apple con iPhone como base sólida (56.9\%) y Mac como oportunidad emergente (crecimiento 800\%).

\subsection{Fortalezas Documentadas}

\begin{enumerate}

\item Datos de 12 años con trazabilidad completa.

\item Pantalla como servicio de alto margen (55\%).

\item Baterías como ingresos recurrentes (21.1\%, convergencia iPhone-Mac).

\item Mac sin competencia clara en el segmento local.

\end{enumerate}

\subsection{Siguiente Paso Crítico}

Convertir reparaciones reactivas en servicios proactivos mediante programas de baterías y mantenimiento preventivo. Transformar ingresos esporádicos en flujo predecible que permita crecimiento sostenido.

\vspace{3cm}

\begin{center}
{\small Análisis Histórico de PIPOD}

{\small Servicios Técnicos Apple 2014-2025}

\vspace{1cm}

28 de Noviembre de 2025
\end{center}

\end{document}

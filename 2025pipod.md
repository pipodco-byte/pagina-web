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
\usepackage{float}

\allsectionsfont{\sffamily\bfseries}
\sectionfont{\Large}
\subsectionfont{\large}

\pagestyle{fancy}
\fancyhf{}
\rhead{\thepage}
\lhead{INFORME GERENCIAL PIPOD 2025}

\title{INFORME GERENCIAL PIPOD 2025}
\author{Josué Calderón}
\date{2025}

\renewcommand{\cftsecleader}{\cftdotfill{\cftdotsep}}

\begin{document}

\maketitle
\newpage

\thispagestyle{empty}
\tableofcontents
\newpage

\section*{Resumen Ejecutivo}

PIPOD cerró 2025 con 127 servicios frente a 197 en 2024, lo que implica una contracción del 35.5\% y una pérdida absoluta de 70 tickets. Esta caída afecta de forma directa el flujo de caja y la utilización de la capacidad instalada. La reducción golpea especialmente a las dos líneas históricas más importantes: los servicios para iPhone pasan de 89 a 57 casos (-36\%) y los de Mac/Computador de 81 a 47 (-42\%), señal de un problema sistémico más que de un evento aislado.

A pesar de la magnitud de la crisis anual, el análisis intra-año muestra una recuperación clara. El primer trimestre de 2025 opera al 50\% del volumen del mismo periodo de 2024 (25 vs 50 servicios), pero la brecha se reduce trimestre a trimestre hasta situarse en sólo -11.6\% en el cuarto trimestre (38 vs 43). El patrón mensual es consistente: de variaciones cercanas al -53\% en enero y febrero se llega a una proyección de +66.7\% en diciembre, lo que indica que las acciones implementadas a mitad de año comienzan a dar resultados tangibles.

El mix de servicios también se transforma. Batería/Energía se convierte en la categoría número uno con 36 casos (28.3\%), por delante de Pantalla/Imagen con 33 (26.0\%). Ambas juntas concentran el 54.3\% del negocio 2025, consolidando un núcleo basado en hardware crítico y recurrente. Esta configuración es muy atractiva para modelos de suscripción y mantenimiento preventivo, donde las baterías pueden ofrecer ingresos predecibles y pantallas un margen unitario elevado.

Desde el punto de vista estratégico, 2025 debe leerse como un año de crisis que obliga a revisar el posicionamiento, pero también como un punto de inflexión hacia un modelo más sano. La convergencia histórica en el ratio de baterías iPhone:Mac (de 8:1 en 2014 a 1.6:1 en 2025) indica que los portátiles MacBook se han vuelto tan demandantes de servicio como los teléfonos. Esto refuerza la conveniencia de especializarse en Mac contemporáneos (M1/M2/M3) como segunda columna del negocio, en paralelo a iPhone.

Mirando a 2026, los números sugieren que intentar ``volver de golpe'' a los niveles de 2016--2017 sería arriesgado. Tiene más sentido apostar por un escenario de crecimiento moderado: aumentar un 30\% el volumen sobre la base de 2025, apoyándose en tres ejes claros. Primero, recuperar parcialmente la demanda de Mac con campañas específicas. Segundo, acelerar los programas de batería recurrente para iPhone y Mac. Tercero, profesionalizar las categorías genéricas como ``Revisión/Otros'' para capturar ingresos que hoy se diluyen o no se cobran adecuadamente.

En síntesis, el diagnóstico es dual: el negocio está en crisis por volumen, pero su estructura de servicios y el patrón de recuperación en Q4 muestran que hay bases sólidas para un rebote ordenado. Con una inversión enfocada en inventario crítico y marketing digital ---del orden de 9,800 USD--- y una ejecución disciplinada, alcanzar 165 servicios en 2026 (escenario +30\%) es una meta ambiciosa pero razonable, con un payback estimado de alrededor de un mes y medio si se logra el volumen objetivo.

\newpage

\section{Análisis de Datos}

\subsection{Distribución mensual 2025 vs 2024}

La primera mirada cuantitativa es la evolución mensual del volumen de servicios. La tabla siguiente reúne los totales por mes para 2024 y 2025, la diferencia absoluta y la variación porcentual.

\begin{longtable}{lccccr}
\toprule
Mes & Servicios 2024 & Servicios 2025 & Diferencia & Variación \% & Nota \\
\midrule
Enero & 17 & 8 & -9 & -52.9\% & Crítico \\
Febrero & 15 & 7 & -8 & -53.3\% & Crítico \\
Marzo & 18 & 10 & -8 & -44.4\% & Severo \\
Abril & 14 & 8 & -6 & -42.9\% & Severo \\
Mayo & 16 & 11 & -5 & -31.2\% & Moderado \\
Junio & 20 & 12 & -8 & -40.0\% & Moderado \\
Julio & 15 & 10 & -5 & -33.3\% & Moderado \\
Agosto & 17 & 11 & -6 & -35.3\% & Moderado \\
Septiembre & 19 & 12 & -7 & -36.8\% & Moderado \\
Octubre & 16 & 10 & -6 & -37.5\% & Moderado \\
Noviembre & 15 & 8 & -7 & -46.7\% & Severo \\
Diciembre (est.) & 12 & 20 & +8 & +66.7\% & Fuerte \\
\midrule
\textbf{TOTAL} & \textbf{194} & \textbf{127} & \textbf{-67} & \textbf{-34.5\%} & \\
\bottomrule
\caption{Distribución mensual 2025 vs 2024}
\end{longtable}

El comportamiento confirma una primera mitad de año en ``zona roja'', con variaciones superiores al -40\% casi todos los meses, y una segunda mitad menos crítica. Diciembre destaca como un mes de rebote muy fuerte, compatible con una combinación de estacionalidad (fin de año) y acciones comerciales específicas.

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{figura1.png}
\caption{Monthly Services: 2025 vs 2024 Performance.}
\label{fig:monthly}
\end{figure}

\newpage

\subsection{Análisis trimestral}

A nivel de trimestres, el patrón se vuelve más claro: la brecha respecto a 2024 disminuye de forma casi lineal a lo largo del año.

\begin{table}[h]
\centering
\begin{tabular}{lcccc}
\toprule
Trimestre & Servicios 2024 & Servicios 2025 & Diferencia & Variación \% \\
\midrule
Q1 & 50 & 25 & -25 & -50.0\% \\
Q2 & 50 & 31 & -19 & -38.0\% \\
Q3 & 51 & 33 & -18 & -35.3\% \\
Q4 & 43 & 38 & -5 & -11.6\% \\
\bottomrule
\end{tabular}
\caption{Rendimiento trimestral 2024 vs 2025}
\end{table}

Aquí se observa cómo la diferencia pasa de -25 servicios en el primer trimestre a sólo -5 en el cuarto. La lectura es que el ``agujero'' 2025 está muy concentrado en la primera mitad del año; si el negocio hubiera operado todo el año como en Q4, el cierre habría estado cerca de los niveles de 2024.

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{figura4.png}
\caption{Quarterly Performance: 2024 vs 2025.}
\label{fig:quarterly}
\end{figure}

\newpage

\subsection{Distribución por línea de producto}

Aunque no se dispone de un desglose mensual por dispositivo en la tabla anterior, sí se tienen los totales anuales por línea de producto para 2024 y 2025.

\begin{table}[h]
\centering
\begin{tabular}{lcccc}
\toprule
Línea de producto & Servicios 2024 & Servicios 2025 & Diferencia & Variación \% \\
\midrule
iPhone & 89 & 57 & -32 & -36.0\% \\
Mac/Computador & 81 & 47 & -34 & -42.0\% \\
Otros Dispositivos & 26 & 22 & -4 & -15.4\% \\
iPad & 1 & 1 & 0 & 0.0\% \\
\midrule
\textbf{TOTAL} & \textbf{197} & \textbf{127} & \textbf{-70} & \textbf{-35.5\%} \\
\bottomrule
\end{tabular}
\caption{Distribución por línea de producto}
\end{table}

Los números confirman que el grueso de la caída se explica por iPhone y Mac. Otros Dispositivos muestran un ajuste moderado, mientras que iPad es marginal y prácticamente irrelevante para el resultado global.

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{figura2.png}
\caption{Product Line Comparison: 2024 vs 2025.}
\label{fig:product}
\end{figure}

\newpage

\subsection{Distribución por tipo de servicio}

En el total de 2025, los 127 servicios se reparten en ocho grandes categorías.

\begin{table}[h]
\centering
\begin{tabular}{lr@{ }r}
\toprule
Servicio & \multicolumn{2}{c}{\%} \\
\midrule
Batería/Energía & 36 & 28.3\% \\
Pantalla/Imagen & 33 & 26.0\% \\
Revisión/Otros & 19 & 15.0\% \\
Software & 9 & 7.1\% \\
Disco/RAM (Mejora) & 8 & 6.3\% \\
Mantenimiento General & 8 & 6.3\% \\
Reparación Board/No Prende & 8 & 6.3\% \\
Equipo Mojado/Humedad & 6 & 4.7\% \\
\bottomrule
\end{tabular}
\caption{Distribución por tipo de servicio 2025}
\end{table}

La Figura 3 resume de forma visual que más de la mitad del negocio (54.3\%) se concentra en baterías y pantallas. Esta concentración es positiva desde el punto de vista de foco operativo, pero también genera dependencia de dos familias de servicios.

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{figura3.png}
\caption{Service Type Distribution 2025.}
\label{fig:service}
\end{figure}

\newpage

\subsection{Análisis comparado: iPhone vs Mac (baterías)}

Históricamente se han realizado 327 reemplazos de batería entre 2014 y 2025, de los cuales aproximadamente 213 corresponden a iPhone y 73 a Mac.

\begin{table}[h]
\centering
\begin{tabular}{lrrr}
\toprule
Año & Baterías iPhone & Baterías Mac & Ratio iPhone:Mac \\
\midrule
2014 & 8 & 1 & 8.0:1 \\
2015 & 45 & 11 & 4.1:1 \\
2016 & 45 & 9 & 5.0:1 \\
2017 & 11 & 1 & 11.0:1 \\
2021 & 10 & 2 & 5.0:1 \\
2022 & 32 & 15 & 2.1:1 \\
2023 & 15 & 7 & 2.1:1 \\
2024 & 29 & 16 & 1.8:1 \\
2025 & 18 & 11 & 1.6:1 \\
\bottomrule
\end{tabular}
\caption{Evolución baterías iPhone vs Mac}
\end{table}

Esta convergencia implica que, con el tiempo, el potencial de negocio en baterías de Mac se vuelve comparable al de iPhone.

\newpage

\section{Visualización}

En esta sección se reúnen los cinco gráficos clave construidos durante el análisis:

\begin{itemize}
\item \textbf{Figura 1} – Evolución mensual 2024 vs 2025
\item \textbf{Figura 2} – Volumen por línea de producto 
\item \textbf{Figura 3} – Mezcla de tipos de servicio 2025
\item \textbf{Figura 4} – Rendimiento trimestral comparado
\item \textbf{Figura 5} – Escenarios de crecimiento 2026
\end{itemize}

\vspace{1cm}

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{figura5.png}
\caption{2026 Growth Scenarios: Three Strategic Paths.}
\label{fig:scenarios}
\end{figure}

\newpage

\section{Estrategia y Escenarios 2026}

\subsection{Escenarios propuestos}

Con base en la serie histórica y el comportamiento de 2025, se plantean tres posibles trayectorias para 2026:

\begin{table}[h]
\centering
\begin{tabular}{lcr@{ }l@{}l}
\toprule
Escenario & Servicios 2026 & vs 2025 & Mes promedio & Comentario breve \\
\midrule
Conservador (Mantiene 2025) & 127 & +0\% & 10.6 & Asume que 2025 es la nueva normalidad \\
Crecimiento Mac (+30\%) & 165 & +30\% & 13.8 & Escenario recomendado \\
Recuperación 2024 (Full) & 197 & +55\% & 16.4 & Requiere inversión agresiva \\
\bottomrule
\end{tabular}
\caption{Escenarios 2026}
\end{table}

El escenario intermedio ---crecimiento del 30\% hasta 165 servicios--- equilibra ambición y realismo.

\newpage

\subsection{Plan de compras Q1 2026}

Para soportar el escenario de crecimiento moderado se diseñó un plan de inventario específico para el primer trimestre de 2026.

\begin{table}[h]
\centering
\begin{tabular}{llrr}
\toprule
Componente & Cantidad Q1 2026 & Precio Unit. (USD) & Costo Total (USD) \\
\midrule
Baterías iPhone & 5 & 60 & 300 \\
Baterías Mac & 3 & 90 & 270 \\
SSD/Discos & 2 & 150 & 300 \\
Pantallas LCD & 9 & 85 & 765 \\
Herramientas de diagnóstico & 16 & 200 & 3,200 \\
Adhesivos/Refacciones & 31 & 15 & 465 \\
\midrule
\textbf{TOTAL Q1 2026} & & & \textbf{5,300} \\
\bottomrule
\end{tabular}
\caption{Plan de compras Q1 2026}
\end{table}

\newpage

\section{Plan de Acción Operativo}

\subsection{Objetivo general}

Transformar la recuperación puntual observada en Q4 2025 en una tendencia sostenida durante 2026, alcanzando el escenario de 165 servicios anuales (+30\%).

\subsection{Fase 1: Diagnóstico profundo (Diciembre, semanas 1--3)}

\textbf{Semana 1 (5--9 de diciembre):}
\begin{itemize}
\item Reunir al equipo para analizar las causas detrás de la caída del 35.5\%.
\item Entrevistar de 5 a 10 clientes que disminuyeron su frecuencia.
\item Identificar si el factor dominante es precio, visibilidad o competencia.
\end{itemize}

\textbf{Semana 2 (12--16 de diciembre):}
\begin{itemize}
\item Diseñar la campaña ``MacBook Specialist''.
\item Definir la oferta de diagnóstico gratuito para enero y febrero.
\item Preparar calendario de publicaciones en redes sociales.
\end{itemize}

\textbf{Semana 3 (19--23 de diciembre):}
\begin{itemize}
\item Diseñar el programa ``Battery Subscription Plan''.
\item Elaborar textos y materiales visuales.
\item Segmentar la base de datos de clientes.
\end{itemize}

\newpage

\subsection{Fase 2: Ejecución inicial (Enero--Febrero 2026)}

\textbf{Enero 2026:}
\begin{itemize}
\item Lanzar la campaña ``MacBook Specialist'' y el plan de baterías.
\item Ejecutar las compras del plan de inventario Q1.
\item Establecer un tablero de control sencillo.
\end{itemize}

\textbf{Febrero 2026:}
\begin{itemize}
\item Revisar los resultados de enero.
\item Ajustar precios, mensajes o promociones.
\item Evaluar si el pipeline apunta a sostener el volumen.
\end{itemize}

\subsection{Fase 3: Consolidación (Marzo--Diciembre 2026)}
\begin{itemize}
\item Formalizar las categorías de servicio en el sistema.
\item Definir calendario semestral de campañas temáticas.
\item Revisar trimestralmente los KPIs clave.
\end{itemize}

\newpage

\section{Conclusión}

El año 2025 deja dos mensajes claros para PIPOD. El primero es una advertencia: depender de pocas líneas de producto puede llevar a caídas abruptas de volumen. El segundo es que el negocio es capaz de reaccionar; la recuperación en Q4 lo demuestra.

El análisis detallado revela tres palancas principales para 2026: consolidar baterías y pantallas, desarrollar Mac como segunda columna, y transformar servicios genéricos en ofertas cobrables. El escenario de crecimiento del 30\% ofrece un retorno razonable.

Si PIPOD ejecuta con disciplina el plan descrito, en los próximos 12 a 18 meses el negocio estará mejor posicionado que antes de la crisis.

\end{document}

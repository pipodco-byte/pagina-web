\documentclass[12pt,a4paper]{article}

% --- PAQUETES DE IDIOMA Y FUENTES ---
\usepackage[utf8]{inputenc}
\usepackage[spanish, es-tabla]{babel}
\usepackage[T1]{fontenc}
\usepackage{ebgaramond} 

% --- PAQUETES DE DISEÑO Y COLOR ---
\usepackage[dvipsnames, table]{xcolor}
\usepackage{titlesec}
\usepackage{tocloft}
\usepackage[dvipsnames, table]{xcolor}
\usepackage{geometry}
\usepackage{graphicx} % Fundamental para la foto de la carta
\usepackage{booktabs}
\usepackage{enumitem}
\usepackage{mdframed}
\usepackage{hyperref}
\usepackage[most]{tcolorbox} % 'most' carga librerías extra como 'skins'
\usepackage{lettrine}

% --- DICCIONARIO CELESTIAL (SÍMBOLOS) ---
\usepackage{wasysym} 
\usepackage{amssymb}

% --- CONFIGURACIÓN DE PÁGINA ---
\geometry{top=3cm, bottom=3cm, left=2.5cm, right=2.5cm}
\setlength{\parskip}{0.8em}
\setlength{\parindent}{0pt}

% --- PALETA DE COLORES ---
\definecolor{astroblue}{HTML}{1A237E} 
\definecolor{astrogold}{HTML}{996515} 
\definecolor{softbg}{HTML}{FAFAFA}   

% --- COMANDOS PERSONALIZADOS ---
% Definimos la línea dorada que faltaba
\newcommand{\titlerulegold}{\color{astrogold}\rule{\linewidth}{1.5pt}}

% --- HIPERVÍNCULOS (SOLUCIÓN A LOS BORDES ROJOS) ---
\hypersetup{
    colorlinks=true,        % Colorea el texto en vez de usar cajas
    linkcolor=astroblue,    % Color para links internos (índice)
    urlcolor=astrogold,     % Color para URLs externas
    citecolor=astroblue,    % Color para citas
    pdfborder={0 0 0},      % Elimina cualquier borde alrededor de los links
    breaklinks=true
}

% --- PERSONALIZACIÓN DEL ÍNDICE ---
\renewcommand{\contentsname}{Tabla de Contenidos}
\renewcommand{\cfttoctitlefont}{\huge\bfseries\color{astroblue}\centering} % Centrado
\renewcommand{\cftsecfont}{\bfseries\color{astroblue}}
\renewcommand{\cftsecleader}{\color{astrogold}\cftdotfill{\cftdotsep}}
\renewcommand{\cftsecpagefont}{\color{astrogold}\bfseries}

% --- ESTILO DE TÍTULOS ---
\titleformat{\section}{\color{astroblue}\normalfont\huge\bfseries}{\thesection}{1em}{}[{\color{astrogold}\titlerule[1.5pt]}]
\titleformat{\subsection}{\color{astrogold}\normalfont\Large\bfseries}{\thesubsection}{1em}{}

% --- CAJAS ESPECIALES ---
\newtcolorbox{astrobox}[1]{enhanced, breakable, colback=softbg, colframe=astrogold, title=#1, coltitle=white, fonttitle=\bfseries, arc=0mm}
\newtcolorbox{heridasagrada}{enhanced, breakable, colback=softbg, colframe=astrogold, title=La Herida Sagrada, colbacktitle=astrogold, sharp corners, fonttitle=\bfseries}

% --- CONFIGURACIÓN DE LISTAS ---
\setlist[itemize]{label=\color{astrogold}$\star$}

% =========================================
%   INICIO DEL DOCUMENTO
% =========================================
\begin{document}

% --- PORTADA PREMIUM CORREGIDA ---
\begin{titlepage}
    \centering
    \vspace*{0.5cm}
    {\color{astrogold}\Large \textbf{INFORME ASTROLÓGICO INTEGRAL}}\\[0.5cm]
    {\color{astroblue}\Huge \textbf{CAMILA}}\\[0.5cm] % NOMBRE DEL CLIENTE AQUÍ
    \titlerulegold
    \vspace{1cm}
    
    % --- CAJA PARA LA IMAGEN DE LA CARTA ASTRAL ---
    % NOTA: El AI debe reemplazar 'placeholder.png' por el nombre real de la imagen.
    \begin{tcolorbox}[enhanced, colframe=astrogold, boxrule=1.5pt, arc=0mm, colback=white, middle=0pt, boxsep=0pt]
        \centering
        \includegraphics[width=\linewidth, keepaspectratio]
        {camila.jpg} 
        

    \end{tcolorbox}
    
    \vfill
    
    % --- DATOS DE NACIMIENTO (CORREGIDO Y ALINEADO) ---
    {\large \color{astroblue}\textbf{Datos de Nacimiento}}\\[0.5cm]
    {
    \color{astroblue}
    \renewcommand{\arraystretch}{1.4} % Aumenta el espacio entre filas
    \begin{tabular}{r l} % r=alineado derecha (etiquetas), l=alineado izquierda (datos)
        \textbf{Fecha:} & 1 de abril de 2005 \\
        \textbf{Lugar:} & Fusagasugá, Colombia \\
        \textbf{Hora Local:} & 05:10 AM \\
        \textbf{Sistema de Casas:} & Placidus \\
        \textbf{Autor:} & Josué Calderón \\
    \end{tabular}
    }
    \vspace{1.5cm}
    \begin{center}
        {\small\color{gray} Bogotá, Colombia $\cdot$ 2026}
    \end{center}
\end{titlepage}

\newpage
% Ajuste para que el índice no tenga números de página rojos
{
\hypersetup{linkcolor=astroblue}
\tableofcontents
}
\newpage

% --- AQUÍ COMIENZA EL CONTENIDO DEL INFORME (PARTE 0, 1, ETC.) ---
% --- CONTENIDO: PARTE 0 ---
\section{0. El Umbral: La Invitación al Viaje Interior}

\lettrine[lines=3]{\color{astrogold}B}{ienvenida,} Camila, al examen de tu propio misterio. Al abrir este estudio, no estás simplemente leyendo un análisis de posiciones astronómicas, sino asomándote al espejo del \textit{Anima Mundi}, el Alma del Mundo. Como bien comprendió Carl Jung, los planetas no son cuerpos celestes dictando tu suerte de forma mecánica, sino potentes reflejos de los arquetipos que habitan en la profundidad de tu inconsciente. 

Poseer tu carta natal es, en esencia, poseer el plano arquitectónico de tu psique; es la semilla que contiene la promesa del árbol que estás destinada a ser. En este espacio, dejamos atrás la astrología de predicción vana para entrar en la astrología de la \textit{Providentia}: el paso de ser una hoja arrastrada por el viento del destino ciego (Fatum), a ser el navegante consciente de su propia corriente cósmica.

\subsection{I. La Dimensión Primigenia: El Sueño de Dios}

La \textbf{Sagrada Ciencia} nos sitúa ante un conocimiento que precede a la fragmentación del saber moderno. Antes de que el pensamiento positivista intentara reducir la existencia a lo que es medible y observable por los sentidos, existía una comprensión originaria de la unidad. En el instante de la creación, se generó un punto inicial donde macrocosmos y hombre surgieron en un solo acto de simetría.

Por ello, la astrología no estudia cuerpos distantes que ejercen una fuerza ajena sobre nosotros; estudia la órbita de los planetas que habitan en nuestro interior. Lo que observamos en el firmamento es la proyección externa de un movimiento cosmogónico que ocurre en nuestra propia estructura energética.

Bajo esta luz, la carta astral es la partitura del \textbf{Sueño de Dios}. Vivimos inmersos en una narrativa proyectada, un espectro onírico donde los planetas son los encargados de tejer la ilusión que experimentamos a nivel individual y social. Al nacer, en ese preciso segundo de la primera inspiración, tu corriente mental se materializó y coincidió con un posicionamiento específico de los astros. Tu conciencia tomó forma en esa geometría sagrada.

\newpage

\subsection{II. La Alquimia del Espejo: Jung y la Sombra}

\lettrine[lines=3]{\color{astrogold}E}{sta} partitura divina encuentra su traducción humana en la psicología analítica de \textbf{Carl Jung}. Para Jung, la astrología representaba la suma de todo el conocimiento psicológico de la antigüedad, un sistema de proyección donde los hechos del alma se encuentran escritos en las constelaciones. Si las casas de la carta son las doce ventanas a través de las cuales la conciencia se asoma al mundo, lo que vemos a través de ellas es el reflejo de nuestro propio inconsciente.

El concepto fundamental aquí es la \textbf{sombra}. Jung sostenía que mientras no hagamos consciente lo inconsciente, el subconsciente dirigirá nuestra vida y lo llamaremos destino. La carta astral nos muestra dónde se esconden esos fragmentos aislados de nuestra psique que hemos rechazado. Los obstáculos y tensiones que percibimos en el mapa no son impedimentos externos, sino la representación de nuestra propia sombra pidiendo luz.

\begin{heridasagrada}
En términos alquímicos, nos enfrentamos a la \textit{Nigredo}: el encuentro con nuestra propia oscuridad y materia prima. La astrología nos permite objetivar esos nudos energéticos para dejar de ser víctimas de impulsos que no comprendemos y empezar a habitar el sueño de Dios ya no como personajes a la deriva, sino como seres que buscan la reintegración de su propio espejo.
\end{heridasagrada}

\subsection{III. La Resonancia de la Geometría Sagrada}

La Sagrada Ciencia nos enseña que el alma humana no es una entidad aislada, sino un instrumento vibratorio que, al momento de nacer, queda afinado según la frecuencia del cosmos. Las posiciones planetarias representan la \textbf{Música de las Esferas} materializada en una estructura geométrica individual.

\begin{itemize}
    \item Los planetas son las cuerdas de este instrumento interno.
    \item Los aspectos astrológicos son la arquitectura sagrada de tu corriente mental.
    \item La conciencia es el músico que interpreta la partitura.
\end{itemize}

Entender esta geometría nos permite reconocer que nuestras reacciones, talentos y dificultades no son azarosas, sino que responden a la ley de la vibración. Al estudiar tu propia partitura, aprendes a tocar tu instrumento con mayor maestría, transformando las disonancias en acordes complejos.

\newpage

\subsection{IV. El Propósito Alquímico: Deslastre e Integración}

\lettrine[lines=3]{\color{astrogold}E}{l} para qué de poseer este mapa es, en última instancia, pragmático en un sentido sagrado. Las doce casas de la carta son las doce puertas donde la conciencia busca verse reflejada para integrarse. El estudio de la carta funciona como un laboratorio alquímico donde el objetivo es el \textbf{deslastre}: limpiar la psique de los condicionamientos que impiden el flujo de la vida.

Lo que a nivel superficial parece un obstáculo insalvable, bajo la lupa de la Sagrada Ciencia se revela como la fuerza necesaria para el despertar. Usamos la carta para detectar dónde se ha estancado la corriente mental y cómo podemos reenfocarla. Al integrar las partes aisladas y reconocer las sombras que proyectamos en el mundo, nos movemos hacia la libertad consciente.

\begin{astrobox}{Consejo del Maestro}
No busques en estas líneas una predicción del mañana, busca la comprensión del \textbf{ahora}. La carta es un organismo vivo que respira contigo; cada vez que integras un aspecto, el dibujo del cielo cambia en tu interior, aunque las estrellas sigan en el mismo grado.
\end{astrobox}


% --- PARTE 1: LA GEOMETRÍA DEL SER ---
% =========================================================================
% INFORME ASTROLÓGICO INTEGRAL - CAMILA (PARTES 1 A 4)
% =========================================================================

\newpage

% --- PARTE 1: LA GEOMETRÍA DEL SER ---
\section{Parte 1: LA GEOMETRÍA DEL SER}

\lettrine[lines=3]{\color{astrogold}E}{l cielo} detuvo su movimiento para capturar la esencia de tu ser. En el instante de tu primera respiración, el cosmos quedó impreso en tu estructura psíquica. A continuación, se detallan las posiciones técnicas de tu mapa natal:

\vspace{0.8cm}

\begin{center}
{
\rowcolors{2}{white}{softbg}
\renewcommand{\arraystretch}{1.5}
\begin{tabular}{l l l c l}
\toprule
\rowcolor{astroblue} \color{white}\textbf{Planeta / Punto} & \color{white}\textbf{Signo} & \color{white}\textbf{Grado} & \color{white}\textbf{Casa} & \color{white}\textbf{Movimiento} \\
\midrule
$\astrosun$ Sol & Aries $\aries$ & 11°46' & 1 & Directo \\
$\leftmoon$ Luna & Capricornio $\capricornus$ & 3°44' & 10 & Directo \\
$\mercury$ Mercurio & Aries $\aries$ & 6°45' & 1 & Retrógrado \\
$\venus$ Venus & Aries $\aries$ & 12°06' & 1 & Directo \\
$\mars$ Marte & Acuario $\aquarius$ & 8°26' & 11 & Directo \\
$\jupiter$ Júpiter & Libra $\libra$ & 14°15' & 7 & Retrógrado \\
$\saturn$ Saturno & Cáncer $\cancer$ & 20°29' & 4 & Directo \\
$\uranus$ Urano & Piscis $\pisces$ & 8°41' & 12 & Directo \\
$\neptune$ Neptuno & Acuario $\aquarius$ & 16°58' & 11 & Directo \\
$\pluto$ Plutón & Sagitario $\sagittarius$ & 24°30' & 9 & Retrógrado \\
$\ascnode$ Nodo Norte & Aries $\aries$ & 22°48' & 1 & Directo \\
\quironsym \hspace{0.1cm} Quirón & Capricornio $\capricornus$ & 28°22' & 11 & Directo \\
\midrule
\textbf{Ascendente} & Piscis $\pisces$ & 27°44' & 1 & --- \\
\textbf{Mediocielo} & Sagitario $\sagittarius$ & 28°10' & 10 & --- \\
\bottomrule
\end{tabular}
}
\end{center}

\vspace{0.5cm}

\begin{astrobox}{El Mapa de la Conciencia}
Esta geometría no es el destino, sino una herramienta. Quirón nos muestra la herida que se convierte en medicina, el Nodo Norte marca la brújula hacia la cual tu alma ha decidido evolucionar en esta encarnación.
\end{astrobox}

\vfill
\begin{center}
{\small\color{gray} \textit{Nota: Los grados y minutos representan la precisión exacta del tiempo sidéreo al momento del nacimiento.}}
\end{center}

\newpage


% --- PARTE 2 ---
\section{Parte 2: MASA CRÍTICA — EL VÓRTICE EN EL ASCENDENTE}

\subsection{La Explosión del Ser: El Stellium en Aries y la Casa 1}

\lettrine[lines=3]{\color{astrogold}C}{amila}, tu mapa presenta una configuración de alta intensidad alquímica: una \textbf{Masa Crítica} o \textbf{Stellium} en el signo de Aries, concentrada en tu Casa 1. Con el Sol, Mercurio (retrógrado), Venus y el Nodo Norte operando desde este sector, tu existencia no es un susurro, es un grito de identidad. En la alquimia, esto se denomina \textbf{Calcinatio}: el fuego primario que busca purificar la materia a través de la voluntad directa.

Esta concentración energética significa que el gran laboratorio de tu vida es \textbf{tu propia identidad}. No has venido a observar el mundo, sino a colisionar con él para descubrir quién eres. La Casa 1 es el portal del nacimiento, y tener tanta carga allí indica que tu proceso de individuación es urgente y radical. Tu "Firma Astrológica" es predominantemente \textbf{Fuego Cardinal}. Hay una necesidad imperiosa de iniciar, de romper con lo establecido y de afirmar tu "Yo" frente a cualquier estructura. Sin embargo, este fuego arde en la Casa 1 pero bajo un Ascendente en Piscis (el cual analizaremos más adelante), lo que crea una tensión fascinante entre la fuerza arrolladora del guerrero aries y la sensibilidad mística del océano pisciano.

El riesgo de esta masa crítica es la combustión interna. Con Mercurio retrógrado en medio de esta explosión, tu mente procesa la realidad a una velocidad distinta, a menudo volcada hacia adentro, rumiando la propia identidad antes de proyectarla. El Stellium te otorga un magnetismo de líder, pero también una sombra de impaciencia absoluta. Tu camino alquímico requiere que aprendas a dirigir este incendio para que sea luz que guíe y no fuego que arrase con tus vínculos (especialmente con ese Júpiter en Libra en oposición, que te pide considerar al "Otro").

\newpage

% --- PARTE 3 ---
\section{Parte 3: EL TRÍPODE PRIMORDIAL — LA DIALÉCTICA DEL FUEGO, LA ROCA Y EL MAR}

\subsection{I. Sol en Aries (Casa 1): El Rey Guerrero}

\lettrine[lines=3]{\color{astrogold}T}{u Sol}, el centro de tu sistema psíquico, se encuentra en el signo de su exaltación: Aries. Aquí el \textbf{Logos} es pura potencia. Has nacido para ser pionera. En la Casa 1, este Sol busca la auto-manifestación total. No hay filtros; lo que ves es lo que hay. Tu voluntad de ser es tu mayor talento.

\begin{itemize}
    \item \textbf{Luz (Alquimia):} La capacidad de iniciar ciclos donde otros ven finales. Posees una valentía natural para defender tus verdades. Alquímicamente, eres el \textbf{Azufre} que activa cualquier proceso. Tu brillo es auténtico porque nace de la acción honesta.
    \item \textbf{Sombra (Complejo):} El solipsismo. Al estar tan centrada en tu propia radiación, puedes caer en el punto ciego de ignorar las necesidades de quienes te rodean. El "complejo de héroe" puede llevarte al agotamiento por creer que todo depende de tu fuerza bruta.
\end{itemize}

\subsection{II. Luna en Capricornio (Casa 10): La Reina de Hierro}

Aquí encontramos tu gran paradoja. Mientras tu Sol quiere explotar en Aries, tu Luna —tu mundo emocional y refugio— se encuentra en el signo de la estructura y la ambición: Capricornio, y nada menos que en la cúspide del Mediocielo (Casa 10). Tu seguridad emocional no proviene del afecto blando, sino del \textbf{logro, el estatus y la autosuficiencia}.

\begin{itemize}
    \item \textbf{Luz (Alquimia):} Una resiliencia inquebrantable. Tienes la madurez emocional de un "alma vieja". Tu refugio es el trabajo bien hecho y la montaña escalada. Eres capaz de contener tus emociones para alcanzar objetivos de largo alcance, algo que equilibra la impulsividad de tu Sol.
    \item \textbf{Sombra (Complejo):} La frialdad defensiva. Ante el dolor, tu respuesta es endurecerte. Puedes convertirte en tu propia capataz, negándote el derecho a la vulnerabilidad o al descanso. La sombra es el miedo al fracaso público, lo que te hace vivir bajo una presión interna asfixiante.
\end{itemize}

\subsection{III. Ascendente en Piscis: El Velo del Místico}

Este es el "vehículo" de tu alma. Curiosamente, para una mujer con tanto fuego de Aries, te presentas al mundo a través de un lente pisciano. El Ascendente en Piscis es el \textbf{Umbral de la Disolución}. Es una máscara de suavidad, empatía y sensibilidad casi psíquica.

\begin{itemize}
    \item \textbf{Luz (Alquimia):} Te otorga una intuición porosa. Aunque tu Sol quiera atacar, tu Ascendente siente el ambiente y sabe cuándo fluir. Eres el "Guerrero Espiritual" que debe integrar la compasión con la fuerza. La gente te percibe como alguien profundo, magnético y soñador.
    \item \textbf{Sombra (Complejo):} La confusión de límites. Al ser tan sensible al entorno, puedes perderte en las emociones de los demás, retrasando la acción de tu Sol en Aries por una sensación de deriva o sacrificio innecesario.
\end{itemize}

\newpage

% --- PARTE 4 ---
\section{Parte 4: LA TRÍADA FUNCIONAL — PENSAMIENTO, VALOR Y ACCIÓN}

\subsection{I. Mercurio Retrógrado en Aries (Casa 1): La Palabra de Fuego Interno}

\lettrine[lines=3]{\color{astrogold}T}{u proceso} mental no es lineal. Al estar retrógrado, Mercurio te dota de una inteligencia introspectiva y altamente original. No piensas como los demás; cuestionas la premisa misma de la información. En Aries, tu lenguaje es directo, pero al ser retrógrado, puede haber una demora entre lo que sientes y cómo lo expresas, generando frustraciones comunicativas que luego estallan con fuerza.

\subsection{II. Venus en Aries (Casa 1): El Deseo Conquistador}

Amas con la intensidad de un incendio. Para ti, el afecto es una conquista y una afirmación de tu identidad. Buscas relaciones que te desafíen y que te permitan ser tú misma sin restricciones. Estás en conjunción casi exacta con tu Sol (0°20'), lo que significa que tus valores y tu identidad están fundidos: lo que amas es lo que eres.

\subsection{III. Marte en Acuario (Casa 11): El Guerrero Social}

Tu Marte, el regente de tu Sol en Aries, se encuentra en el signo del futuro y la colectividad: Acuario. Esto traslada tu fuerza de acción hacia ideales sociales, grupos y proyectos de vanguardia. No peleas por ego, peleas por causas o por la libertad de ser diferente. Es una energía eléctrica, impredecible y altamente innovadora.



% =========================================================================
% CONTINUACIÓN: PARTES 5, 6 Y 7
% =========================================================================

% --- PARTE 5 ---
\section{Parte 5: Dinámica de Aspectos — La Tensión que Genera Luz}

En el tejido de tu psique, Camila, los planetas no operan de forma aislada; mantienen un diálogo geométrico que define tu destino. Analizaremos las "líneas de fuerza" más potentes de tu mapa.

\subsection{I. El Gran Eje de Identidad vs. Alteridad: Sol/Venus Oposición Júpiter}

Este es el aspecto central de tu vida. Tienes una conjunción casi exacta entre tu \textbf{Sol y Venus en Aries} (0°20'), lo que te otorga un magnetismo y una voluntad de placer inmensos. Sin embargo, esta fuerza se enfrenta en oposición a \textbf{Júpiter en Libra en la Casa 7}. Alquímicamente, esto es una lucha entre el "Yo quiero" (Aries) y el "Nosotros debemos" (Libra). Júpiter expande lo que toca, y en tu casa de las relaciones, proyectas tu necesidad de justicia y expansión en los demás. A menudo sentirás que para brillar tú, debes sacrificar la armonía con el otro, o viceversa. El desafío es entender que el "Otro" (Júpiter en 7) no viene a frenarte, sino a darte la sabiduría del equilibrio que a tu fuego de Aries le falta. Es la integración de la guerrera con la diplomática.

\subsection{II. El Choque entre la Razón y la Emoción: Luna Cuadratura Mercurio}

Tu \textbf{Luna en Capricornio} busca el control y la estructura emocional, pero se encuentra en una cuadratura (aspecto de fricción) con \textbf{Mercurio en Aries}. Esto crea un cortocircuito entre lo que sientes y lo que piensas. Tu mente (Mercurio) es rápida, impulsiva y ariesiana, pero tu seguridad emocional (Luna) es cautelosa y ambiciosa. A menudo, tus palabras pueden ser más agresivas de lo que tu mundo interno desearía, o puedes racionalizar tus sentimientos para no parecer vulnerable. El trabajo aquí es permitir que la estructura de la Luna le dé un cauce constructivo a la velocidad de tu pensamiento.

\subsection{III. El Flujo de la Voluntad Innovadora: Marte Sextil Sol/Venus}

Afortunadamente, tu \textbf{Marte en Acuario} envía un sextil (aspecto de oportunidad) a tu Sol y Venus. Esto suaviza la impulsividad ciega de Aries. Marte en Acuario te da la capacidad de actuar con originalidad y desapego. Cuando te propones algo, no solo usas la fuerza bruta; usas la inteligencia social y la visión de futuro. Este aspecto es el que te permite ser una líder vanguardista, alguien que rompe moldes pero con un propósito colectivo.

\newpage

% --- PARTE 6 ---
\section{Parte 6: Los Ejes del Destino — El Árbol y sus Raíces}

La estructura de tu vida se sostiene sobre dos ejes fundamentales que dividen tu cielo: el horizonte (ASC-DSC) y el meridiano (MC-IC).

\subsection{Eje de la Existencia: Ascendente Piscis - Descendente Virgo}

Naces con el \textbf{Ascendente en Piscis}, lo que imbuye tu personalidad de una cualidad mística, difusa y empática. Eres un canal para fuerzas que van más allá de lo material. Sin embargo, tu \textbf{Descendente en Virgo} te indica que atraes y necesitas compañeros que te traigan a la tierra. El "Otro" en tu vida suele ser alguien analítico, ordenado y práctico. Tu camino de evolución consiste en integrar la sensibilidad infinita de Piscis con la capacidad de discernimiento y servicio de Virgo. No se trata de perderte en el cosmos, sino de traer el cielo a la tierra a través de rutinas sagradas.

\subsection{Eje del Propósito: Mediocielo Sagitario - Bajo Cielo Géminis}

Tu \textbf{Mediocielo en Sagitario} apunta a una carrera o propósito público vinculado con la expansión de la conciencia, los viajes, la filosofía o la enseñanza. Quieres que el mundo te vea como alguien que posee una verdad o una visión amplia. Pero la raíz de esto (el \textbf{Bajo Cielo en Géminis}) está en tu curiosidad insaciable y en tus raíces familiares, donde la comunicación y el aprendizaje fueron la base. Tu éxito público depende de que nunca dejes de ser esa estudiante curiosa que cuestiona todo desde la raíz.

\newpage

% --- PARTE 7 ---
\section{Parte 7: Arquetipos de Pareja — Animus y la Proyección del Deseo}

\lettrine[lines=3]{\color{astrogold}E}{n el laboratorio} de la astrología transpersonal, la pareja no es un evento externo, sino una proyección de nuestra propia estructura psíquica interna. Para ti, Camila, el encuentro con el "Otro" está marcado por una sofisticada dialéctica entre la fuerza y la estructura, entre el fuego del deseo y la necesidad de orden.

\subsection{I. El Animus: El Guerrero del Aire}

Tu \textbf{Marte en Acuario en la Casa 11} describe tu \textbf{Animus} (la imagen masculina interna o la fuerza de acción que proyectas). Buscas y te atraen compañeros que sean, ante todo, rebeldes con causa, intelectuales o visionarios. No te interesa el hombre convencional; buscas al "amigo-amante" que valore la libertad por encima de la posesión. El hombre que resuena con tu energía es aquel que puede sostener una conversación filosófica a las tres de la mañana o que está involucrado en causas que buscan transformar la sociedad. Hay una atracción por lo eléctrico, lo inusual y lo brillante. La sombra de este arquetipo es la frialdad emocional: puedes atraer personas que están tan conectadas con sus ideales que olvidan cómo conectar con el corazón.

\subsection{II. Venus en Aries: La Amante Pionera}

Tu forma de amar (Venus) es activa, no pasiva. En Aries y en la Casa 1, tú eres quien elige, quien conquista. Para ti, el amor es una aventura que debe renovarse constantemente. Tu pareja evolutiva debe ser alguien capaz de soportar tu intensidad sin sentirse eclipsado. Aquí es donde entra tu \textbf{Descendente en Virgo}: aunque te atraiga la chispa de Aries y la genialidad de Acuario, tu alma busca la estabilidad de alguien que pueda poner orden a tu caos creativo. El compañero evolutivo es aquel que te ofrece "tierra" (Virgo) para que tu fuego (Aries) no se extinga por falta de combustible o por exceso de velocidad.

\subsection{III. El Espejo de Júpiter: La Búsqueda de la Justicia}

Con \textbf{Júpiter en Libra en la Casa 7}, tu concepto de pareja está ligado a la expansión y la justicia. El matrimonio o las uniones estables son para ti una vía de crecimiento espiritual. Sin embargo, debido a la oposición con tu Sol, hay una tendencia a proyectar tu propio poder en la pareja. Puedes ver al otro como "el sabio" o "el que tiene la suerte", olvidando que esa abundancia jupiteriana es tuya.

\begin{astrobox}{Luz y Sombra de la Atracción}
La luz de tus relaciones es la capacidad de crear vínculos basados en la libertad intelectual y el crecimiento mutuo. La sombra es la tendencia a la crítica (Virgo en el Descendente) o a la decepción cuando el otro no cumple con el ideal heroico de tu Sol en Aries. Tu compañero ideal es un "Arquitecto de Sueños": alguien con la mente en las estrellas (Acuario/Sagitario) pero con los pies firmemente plantados en la realidad cotidiana (Virgo).
\end{astrobox}


\newpage

% --- PARTE 8 ---
\section{Parte 8: LA HERIDA CENTRAL — SATURNO EN EL ABISMO FAMILIAR}

\begin{heridasagrada}
\lettrine[lines=3]{\color{astrogold}E}{n el laboratorio} de la psique, existe un punto donde la materia se resiste, donde el alma experimenta la contracción y el peso del plomo. Para ti, Camila, este punto está marcado por \textbf{Saturno ($\saturn$) en Cáncer en la Casa 4}. Esta es la "Herida Central", el lugar donde el niño interno aprendió a construir murallas antes que puentes.
\end{heridasagrada}

\subsection{I. El Plomo de las Raíces: Saturno en Cáncer}

Saturno se encuentra en "exilio" en Cáncer. El planeta de la estructura y el límite habita el signo de la nutrición y la vulnerabilidad. Esto crea una contradicción vital: una necesidad de seguridad emocional que se manifiesta como una coraza de hierro. En la Casa 4 —el sector de las raíces, el hogar y el linaje—, Saturno indica que tu base emocional fue, de alguna manera, un terreno de exigencia o de soledad. Puede que hayas sentido que el amor y la pertenencia debían ser "ganados" a través de la responsabilidad, o que tu entorno familiar requería que fueras una adulta antes de tiempo. Esta es la herida de la \textbf{pertenencia condicionada}.

\subsection{II. El Proceso de Transmutación}

La alquimia nos enseña que "en el lugar de tu mayor dolor está tu mayor tesoro". Tu Saturno te ha dotado de una capacidad de autosuficiencia emocional que pocos poseen. Has aprendido a ser tu propia madre y tu propio padre. Sin embargo, la sombra de esta posición es la dificultad para dejar entrar a otros en tu intimidad más profunda. La herida se manifiesta como un miedo atávico al rechazo o a la inestabilidad del hogar. El trabajo consiste en entender que la verdadera seguridad no proviene de las paredes que construyes a tu alrededor (el estatus o el control), sino de la capacidad de habitar tu propia vulnerabilidad sin miedo.

\subsection{III. El Punto de Quiebre Alquímico}

Para transmutar este plomo en oro, debes integrar a \textbf{Plutón en Sagitario (Casa 9)}, que desde un ángulo de tensión te pide que busques una verdad superior que trascienda la historia familiar. El dolor de Saturno en la base de tu carta es el fertilizante para tu crecimiento. Cuando dejas de intentar "arreglar" el pasado y empiezas a usar esa disciplina para construir tu propio concepto de "familia" y "hogar" (uno basado en la libertad y no en el deber), la herida se convierte en el cimiento de una sabiduría inquebrantable. Eres la que rompe el karma del linaje a través de la consciencia.

\newpage

% --- PARTE 9 ---
\section{Parte 9: DHARMA Y TELOS — EL RITO DE PASAJE HACIA EL YO}

\lettrine[lines=3]{\color{astrogold}T}{u propósito} de encarnación se lee en el eje de los Nodos Lunares. Has venido a realizar un viaje heroico desde la complacencia hacia la afirmación.

\begin{itemize}
    \item \textbf{Nodo Sur en Libra (Casa 7): El Pasado de Dependencia.} En otras memorias de tu alma, has sido la diplomática, la que cedía para mantener la paz, la que se definía a través de la mirada del otro. Tienes una facilidad natural (y peligrosa) para perderte en las necesidades de tus socios y parejas.
    \item \textbf{Nodo Norte en Aries (Casa 1): El Dharma del Guerrero.} Tu destino, tu \textit{Telos}, es convertirte en tu propia prioridad. Con el Nodo Norte en Aries junto a tu Sol, tu camino evolutivo es la \textbf{Independencia Radical}. No has venido a ser "la mitad" de nadie, sino una unidad completa. 
\end{itemize}

El rito de pasaje consiste en aprender a decir "No" sin culpa y a iniciar batallas por tus propios sueños, incluso si eso perturba la armonía superficial de tu entorno. Tu Dharma es la valentía de existir.

\newpage

% --- PARTE 10 ---
\section{Parte 10: ALQUIMIA ELEMENTAL — EL PESO DE TU REALIDAD}

\lettrine[lines=3]{\color{astrogold}L}{a distribución} de los cuatro elementos en tu carta no es una estadística, es tu fórmula alquímica. Determina si eres plomo que busca ser oro o fuego que busca ser luz. 

\vspace{0.5cm}

\subsection*{Tabla de Pesos Elementales}
{\small (Calculado por balance de planetas personales, luminarias y ángulos)}

\vspace{0.3cm}
\begin{center}

{
\rowcolors{2}{white}{softbg}
\renewcommand{\arraystretch}{1.5}
\begin{tabular}{l l l l}
\toprule
\rowcolor{astroblue} \color{white}\textbf{Elemento} & \color{white}\textbf{Puntaje} & \color{white}\textbf{Porcentaje} & \color{white}\textbf{Estado Alquímico} \\
\midrule
\textbf{FUEGO} ($\aries$, $\sagittarius$) & 8 pts & 45\% & \textit{Calcinatio} (Dominante) \\
\textbf{TIERRA} ($\capricornus$) & 3 pts & 15\% & \textit{Coagulatio} (Deficiente) \\
\textbf{AIRE} ($\aquarius$, $\libra$) & 5 pts & 25\% & \textit{Sublimatio} (Equilibrado) \\
\textbf{AGUA} ($\pisces$, $\cancer$) & 3 pts & 15\% & \textit{Solutio} (Latente) \\
\bottomrule
\end{tabular}
}
\end{center}

\vspace{0.8cm}

\subsection{Análisis de la Sustancia}

\textbf{I. Predominancia de Fuego (El Volcán de Aries):} Camila, tu realidad está compuesta primordialmente de ``Ignis''. Con el Stellium en Aries y Plutón en Sagitario, tu motor es la \textbf{voluntad pura}. El riesgo es la combustión: puedes consumir tus recursos y tus relaciones por la urgencia de ``ser''. Eres una iniciadora que a veces olvida que para que el fuego perdure, necesita leña (Tierra) y oxígeno (Aire).

\textbf{II. Carencia de Tierra y Agua (El Desafío de la Estabilidad):} Tienes un nivel bajo de Coagulación. La \textbf{Tierra} (sostenimiento) y el \textbf{Agua} (nutrición) son tus puntos de fuga. La Luna en Capricornio intenta compensar esto con una estructura rígida, pero es una ``Tierra seca''. Te cuesta detenerte a procesar el dolor o a construir rutinas que no tengan un fin de conquista.

\begin{astrobox}{Protocolo de Equilibrio}
Tu única ``Válvula de Tierra'' real es tu Luna. Si no descansas o no construyes algo tangible, tu fuego se volverá ansiedad. Necesitas ``tierra física'': caminar descalza, trabajar con materia, o simplemente aprender a esperar que las cosas maduren sin forzarlas.
\end{astrobox}

\newpage

% --- PARTE 11 ---
\section{Parte 11: PROTOCOLO DE ORBES — EL VOLUMEN DE LOS DIOSES}

\lettrine[lines=3]{\color{astrogold}E}{n este laboratorio}, el \textbf{Orbe} es el potenciómetro de la radio. No todos los aspectos suenan igual. Aquí desglosamos la intensidad de tu diálogo interno:

\vspace{0.5cm}

\begin{itemize}[leftmargin=*, labelsep=0.5cm]
    \item \textbf{Sol Conjunción Venus ($\astrosun$ $\text{conj.}$ $\venus$) --- Orbe 0°20': VOLUMEN MÁXIMO.} \\
    Este es el aspecto más potente de tu vida. Es casi una fusión atómica. Tu identidad (Sol) y tu capacidad de atracción (Venus) son una sola cosa. No sabes desear algo que no esté alineado con quién eres. Eres magnética, pero también puedes ser narcisista si no cuidas la sombra. Esta ``música'' suena a todo volumen en cada habitación de tu vida.

    \item \textbf{Mercurio Sextil Marte ($\mercury$ $\text{sext.}$ $\mars$) --- Orbe 1°41': VOLUMEN ALTO.} \\
    Menos de dos grados. Tu mente es un bisturí. La comunicación (Mercurio) y la acción (Marte) fluyen sin obstáculos. Tienes la respuesta rápida, el ingenio afilado y la capacidad de ejecutar tus ideas antes de que otros terminen de pensarlas. Es una ``marcha militar'' rítmica y eficiente.

    \item \textbf{Sol Oposición Júpiter ($\astrosun$ $\text{opos.}$ $\jupiter$) --- Orbe 2°29': VOLUMEN MEDIO-ALTO.} \\
    Una tensión constante entre tu ego (Aries) y tu necesidad de justicia o expansión social (Libra). Sientes que para crecer debes pelear con otros, o que los demás siempre exigen demasiado de tu tiempo. Es un estruendo que te obliga a negociar tu libertad.

    \item \textbf{Luna Cuadratura Mercurio ($\leftmoon$ $\text{cuad.}$ $\mercury$) --- Orbe 3°01': VOLUMEN MEDIO.} \\
    Una distorsión en la señal. Lo que sientes (Luna) y lo que dices (Mercurio) a menudo no están en la misma frecuencia. Puedes sonar fría cuando estás herida, o agresiva cuando en realidad tienes miedo. Es una interferencia que requiere sintonización consciente.
\end{itemize}

\vfill
\begin{center}
{\color{astrogold} \titlerulegold} \\
\textsf{\small SECCIÓN TÉCNICA FINALIZADA · ESTÉTICA PREMUM}
\end{center}

\newpage

% --- PARTE 12 ---
\newpage

% --- PARTE 12 ---
\section{Parte 12: CLIMA EVOLUTIVO 2026 — EL GRAN RETORNO AL ORIGEN}

\lettrine[lines=3]{\color{astrogold}E}{l año 2026} no es un periodo cronológico ordinario; en la Sagrada Ciencia lo llamamos el \textbf{``Año del Gran Ingress''}. Es el momento en que la estructura del mundo ($\saturn$ Saturno) y el sueño colectivo ($\neptune$ Neptuno) colisionan en el Grado 0 de Aries ($\aries$), el punto alfa del zodiaco. Para ti, Camila, que tienes un Stellium en Aries, este clima no es externo: es una reconfiguración total de tu sistema operativo vital.

\subsection{I. El Vórtice Saturno-Neptuno: La Cristalización del Sueño (Grado 0 de $\aries$)}

A inicios de 2026, Saturno y Neptuno se funden en el primer grado de Aries. Este evento ocurre exactamente sobre tu \textbf{Ascendente} en los últimos grados de Piscis ($\pisces$) y entrando a tu Casa 1.

\begin{itemize}
    \item \textbf{La Tensión Alquímica:} Neptuno busca la disolución de los límites, mientras Saturno exige la construcción de estructuras. Al ocurrir sobre tu identidad, vas a experimentar un fenómeno de \textbf{``niebla sólida''}. Sentirás que el ``Yo'' que has construido hasta ahora se desvanece (Neptuno), pero bajo esa niebla, Saturno te está obligando a materializar una vocación mucho más madura.
    \item \textbf{El Impacto en tu Stellium:} Al avanzar por Aries, estos dos gigantes tocarán tu \textbf{Mercurio $\mercury$ (6°)}, tu \textbf{Sol $\astrosun$ (11°)} y tu \textbf{Venus $\venus$ (12°)}. Es una auditoría cósmica. Saturno te preguntará: ``¿Es esta ambición de Aries algo real o solo un impulso?'' y Neptuno añadirá: ``¿Es esta identidad útil para el espíritu o es solo una máscara del ego?''. Es el año para dejar de ``parecer'' líder y empezar a ``ser'' la autoridad de tu propia vida.
\end{itemize}

\subsection{II. Plutón en Acuario: La Transmutación del Poder Social}

Mientras tanto, Plutón ($\pluto$) continúa su marcha por Acuario ($\aquarius$), transitando tu \textbf{Casa 11}. Este tránsito es de una importancia capital porque está activando por conjunción a tu \textbf{Marte natal $\mars$ (8°)} y eventualmente a tu \textbf{Neptuno natal $\neptune$ (16°)}.

\textbf{La Alquimia del Guerrero:} Plutón sobre tu Marte es una inyección de energía volcánica en tu área de grupos, amigos y proyectos colectivos. Tu capacidad de influir en los demás se vuelve absoluta, pero también peligrosa. Si actúas desde el ego guerrero de Aries, Plutón traerá crisis de poder en tus círculos sociales. Si actúas como una ``Antena Galáctica'' (Acuario), Plutón te dará las llaves para liderar movimientos de vanguardia. Es la muerte de la competitividad individual para dar paso al poder regenerativo del grupo.

\subsection{III. Urano en Gemini: La Electrificación del Logos}

En julio de 2026, Urano ($\uranus$) ingresa formalmente en Gemini, activando tu \textbf{Casa 3} (la mente, el entorno cercano y la comunicación).

\textbf{El Despertar Mental:} Urano hará un aspecto de sextil a tu Sol en Aries. Esto es aire para tu fuego. Tu comunicación se volverá eléctrica, disruptiva y veloz. Es el momento de aprender nuevas tecnologías, lenguajes o formas de transmisión que rompan con lo convencional. Las ideas que surjan en 2026 no serán lógicas; serán relámpagos de intuición pura que debes capturar antes de que se disuelvan.

\subsection{IV. El Tránsito de Júpiter: La Expansión del Templo Interno}

Júpiter ($\jupiter$) se moverá por Cáncer ($\cancer$, Casa 4) y luego entrará en Leo ($\leo$, Casa 5).

\begin{itemize}
    \item \textbf{Sanación de Raíces:} Al pasar por Cáncer, Júpiter tocará tu \textbf{Saturno natal $\saturn$ (20°)}. Esto trae una ventana de gracia para sanar esa ``niñez fría'' que mencionaba Pelletier. Es un tiempo para expandir el hogar o encontrar paz en tu historia familiar.
    \item \textbf{El Brillo del Corazón:} Al entrar en Leo, Júpiter hará un trígono de fuego a tu Sol. Después de la poda de Saturno y la disolución de Neptuno, la segunda mitad de 2026 te regala una explosión de creatividad y reconocimiento. Es el ``Oro Alquímico'' que aparece tras el proceso de purificación.
\end{itemize}

\begin{astrobox}{Consigna para 2026}
``No temas a la desorientación de la primera mitad del año. Estás siendo recalibrada para que tu fuego no sea solo calor, sino luz coherente. El caos es el orden que aún no comprendes.''
\end{astrobox}

\vfill
\begin{center}
{\color{astrogold} \titlerulegold} \\
\medskip
\textbf{Josué Calderón, 2026} \\
\textit{Astrólogo de la Sagrada Ciencia}
\end{center}

\end{document}
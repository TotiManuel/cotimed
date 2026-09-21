import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Brain, Check, Clock3, Coins, Flame, HeartPulse,
    RotateCcw, Shield, Sparkles, Trophy, X,
} from "lucide-react";
import { useGame, type ResultadoPartida } from "../../context/GameContext";

type Dificultad = "Fácil" | "Media" | "Difícil";

interface Pregunta {
    id: number;
    pregunta: string;
    opciones: string[];
    correcta: number;
    sistema: string;
    dificultad: Dificultad;
}

/* =========================================================
   PREGUNTAS
========================================================= */

const PREGUNTAS: Pregunta[] = [
    // ESQUELÉTICO
    {
        id: 1, pregunta: "¿Cuáles son las seis funciones principales del sistema esquelético?",
        opciones: [
            "Sostén, protección, movimiento, homeostasis mineral, producción de células sanguíneas y almacenamiento de triglicéridos",
            "Digestión, respiración, circulación, excreción, movimiento y producción hormonal",
            "Protección, digestión, secreción, absorción, termorregulación y movimiento",
            "Sostén, respiración, filtración, producción de hormonas, digestión y excreción"
        ], correcta: 0, sistema: "Esquelético", dificultad: "Media"
    },
    {
        id: 2, pregunta: "¿Qué célula ósea es responsable principalmente de formar tejido óseo nuevo?",
        opciones: ["Osteoclasto", "Osteoblasto", "Osteocito", "Célula osteoprogenitora"],
        correcta: 1, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 3, pregunta: "¿Qué célula ósea participa principalmente en la reabsorción del tejido óseo?",
        opciones: ["Osteoblasto", "Osteocito", "Osteoclasto", "Célula osteoprogenitora"],
        correcta: 2, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 4, pregunta: "¿Cuál es la función principal del osteocito?",
        opciones: ["Formar cartílago", "Mantener el tejido óseo maduro", "Destruir tejido óseo", "Producir células sanguíneas"],
        correcta: 1, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 5, pregunta: "¿Qué estructura recubre externamente la mayor parte de los huesos?",
        opciones: ["Endostio", "Periostio", "Médula ósea", "Cartílago articular"],
        correcta: 1, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 6, pregunta: "¿Qué característica distingue principalmente al hueso compacto?",
        opciones: [
            "Está formado exclusivamente por cartílago",
            "Es tejido óseo denso que forma gran parte de la corteza externa",
            "Solo se encuentra en las epífisis",
            "Está compuesto únicamente por trabéculas"
        ], correcta: 1, sistema: "Esquelético", dificultad: "Media"
    },
    {
        id: 7, pregunta: "¿Qué estructura caracteriza al hueso esponjoso?",
        opciones: ["Osteonas exclusivamente", "Trabéculas", "Cavidades sin médula", "Cartílago hialino"],
        correcta: 1, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 8, pregunta: "¿Qué partes forman principalmente el esqueleto axial?",
        opciones: [
            "Cintura escapular y miembros superiores",
            "Cintura pélvica y miembros inferiores",
            "Cráneo, columna vertebral y caja torácica",
            "Escápula, clavícula, pelvis y fémur"
        ], correcta: 2, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 9, pregunta: "¿Qué estructuras forman principalmente el esqueleto apendicular?",
        opciones: [
            "Cráneo y columna vertebral",
            "Caja torácica y esternón",
            "Cinturas escapular y pélvica y los miembros superiores e inferiores",
            "Cráneo, costillas y vértebras"
        ], correcta: 2, sistema: "Esquelético", dificultad: "Media"
    },
    {
        id: 10, pregunta: "¿Cuántas vértebras cervicales posee normalmente la columna vertebral?",
        opciones: ["5", "7", "12", "14"], correcta: 1, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 11, pregunta: "¿Cuántas vértebras torácicas posee normalmente la columna vertebral?",
        opciones: ["5", "7", "12", "24"], correcta: 2, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 12, pregunta: "¿Cuántas vértebras lumbares posee normalmente la columna vertebral?",
        opciones: ["3", "5", "7", "12"], correcta: 1, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 13, pregunta: "¿Cómo se denomina la primera vértebra cervical?",
        opciones: ["Axis", "Atlas", "Sacra", "Coxígea"], correcta: 1, sistema: "Esquelético", dificultad: "Fácil"
    },
    {
        id: 14, pregunta: "¿Qué característica particular presenta el axis, la segunda vértebra cervical?",
        opciones: [
            "No posee arco vertebral",
            "Presenta el proceso odontoides o dens",
            "Se encuentra fusionada al sacro",
            "Es la vértebra de mayor tamaño"
        ], correcta: 1, sistema: "Esquelético", dificultad: "Media"
    },

    // ARTICULACIONES
    {
        id: 15, pregunta: "¿Cuáles son las tres clasificaciones estructurales principales de las articulaciones?",
        opciones: ["Fibrosas, cartilaginosas y sinoviales", "Simples, dobles y triples", "Axiales, apendiculares y mixtas", "Fijas, semimóviles y musculares"],
        correcta: 0, sistema: "Articulaciones", dificultad: "Fácil"
    },
    {
        id: 16, pregunta: "¿Qué tejido une principalmente a los huesos en una articulación fibrosa?",
        opciones: ["Tejido muscular", "Tejido conectivo fibroso", "Cartílago elástico", "Tejido epitelial"],
        correcta: 1, sistema: "Articulaciones", dificultad: "Fácil"
    },
    {
        id: 17, pregunta: "¿Qué tejido conecta los huesos en las articulaciones cartilaginosas?",
        opciones: ["Cartílago", "Tejido adiposo", "Tejido muscular", "Tejido nervioso"],
        correcta: 0, sistema: "Articulaciones", dificultad: "Fácil"
    },
    {
        id: 18, pregunta: "¿Qué característica distingue estructuralmente a una articulación sinovial?",
        opciones: ["La ausencia total de movimiento", "La presencia de una cavidad articular", "La unión mediante tejido fibroso exclusivamente", "La ausencia de tejido conectivo"],
        correcta: 1, sistema: "Articulaciones", dificultad: "Fácil"
    },
    {
        id: 19, pregunta: "¿Qué grado de movimiento caracteriza a una sinartrosis?",
        opciones: ["Movimiento amplio y libre", "Movimiento limitado", "Prácticamente ningún movimiento o movimiento mínimo", "Movimiento exclusivamente rotatorio"],
        correcta: 2, sistema: "Articulaciones", dificultad: "Fácil"
    },
    {
        id: 20, pregunta: "¿Qué característica principal tiene una anfiartrosis?",
        opciones: ["Permite un movimiento limitado", "No permite ningún movimiento", "Permite movimientos completamente libres", "Solo permite movimientos circulares"],
        correcta: 0, sistema: "Articulaciones", dificultad: "Fácil"
    },
    {
        id: 21, pregunta: "¿Qué caracteriza funcionalmente a una diartrosis?",
        opciones: ["No permite movimiento", "Permite movimientos amplios y libres", "Permite únicamente movimientos mínimos", "Solo permite movimientos involuntarios"],
        correcta: 1, sistema: "Articulaciones", dificultad: "Fácil"
    },

    // MUSCULAR
    {
        id: 22, pregunta: "¿Cuáles son los tres tipos de tejido muscular?",
        opciones: ["Esquelético, cardíaco y liso", "Voluntario, involuntario y mixto", "Fibroso, cartilaginoso y liso", "Esquelético, nervioso y cardíaco"],
        correcta: 0, sistema: "Muscular", dificultad: "Fácil"
    },
    {
        id: 23, pregunta: "¿Cuáles son las cuatro funciones principales del tejido muscular?",
        opciones: [
            "Producir movimientos, estabilizar posiciones, almacenar y movilizar sustancias y generar calor",
            "Producir hormonas, filtrar sangre, digerir alimentos y proteger órganos",
            "Producir células sanguíneas, almacenar calcio, absorber nutrientes y eliminar desechos",
            "Transportar oxígeno, producir anticuerpos, formar huesos y regular la temperatura"
        ], correcta: 0, sistema: "Muscular", dificultad: "Media"
    },
    {
        id: 24, pregunta: "¿Cuáles son las cuatro propiedades fundamentales del tejido muscular?",
        opciones: ["Excitabilidad, contractilidad, extensibilidad y elasticidad", "Absorción, secreción, filtración y excreción", "Excitabilidad, digestión, elasticidad y coagulación", "Contractilidad, osificación, secreción y absorción"],
        correcta: 0, sistema: "Muscular", dificultad: "Media"
    },
    {
        id: 25, pregunta: "¿Qué tipo de control caracteriza principalmente al músculo esquelético?",
        opciones: ["Control hormonal exclusivamente", "Control voluntario mediante el sistema nervioso somático", "Control involuntario mediante el sistema nervioso autónomo", "Control exclusivamente local"],
        correcta: 1, sistema: "Muscular", dificultad: "Media"
    },
    {
        id: 26, pregunta: "¿Qué tipo de fibra muscular esquelética se caracteriza por una contracción lenta y resistencia a la fatiga?",
        opciones: ["Fibra tipo I", "Fibra tipo II exclusivamente rápida", "Fibra cardíaca", "Fibra lisa"],
        correcta: 0, sistema: "Muscular", dificultad: "Fácil"
    },
    {
        id: 27, pregunta: "¿Dónde se encuentra principalmente el tejido muscular cardíaco?",
        opciones: ["En las paredes del intestino", "En el miocardio, la capa muscular de la pared del corazón", "En los tendones", "En la médula ósea"],
        correcta: 1, sistema: "Muscular", dificultad: "Fácil"
    },
    {
        id: 28, pregunta: "¿Dónde podemos encontrar tejido muscular liso?",
        opciones: ["Únicamente en los huesos", "En las paredes de órganos huecos y vasos sanguíneos", "Únicamente en el corazón", "Solo unido a los huesos"],
        correcta: 1, sistema: "Muscular", dificultad: "Fácil"
    },

    // DIGESTIVO
    {
        id: 29, pregunta: "¿Cuál es el principal sitio de digestión y absorción de nutrientes?",
        opciones: ["Estómago", "Intestino grueso", "Intestino delgado", "Esófago"],
        correcta: 2, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 30, pregunta: "¿Cuál de los siguientes pertenece al tracto gastrointestinal?",
        opciones: ["Hígado", "Páncreas", "Esófago", "Vesícula biliar"],
        correcta: 2, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 31, pregunta: "¿Cuál es la función principal del intestino grueso?",
        opciones: ["Producir bilis", "Absorber principalmente agua y electrolitos y formar las heces", "Realizar toda la digestión química", "Producir ácido clorhídrico"],
        correcta: 1, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 32, pregunta: "¿Cuáles son órganos digestivos accesorios?",
        opciones: ["Dientes, lengua, glándulas salivales, hígado, vesícula biliar y páncreas", "Esófago, estómago, duodeno y recto", "Faringe, esófago, yeyuno y colon", "Estómago, intestino delgado y recto"],
        correcta: 0, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 33, pregunta: "¿Qué órgano produce la bilis?",
        opciones: ["Páncreas", "Estómago", "Hígado", "Vesícula biliar"],
        correcta: 2, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 34, pregunta: "¿Cuál es la función principal de la vesícula biliar?",
        opciones: ["Producir ácido clorhídrico", "Almacenar, concentrar y liberar bilis", "Producir enzimas pancreáticas", "Absorber aminoácidos"],
        correcta: 1, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 35, pregunta: "¿Qué proceso corresponde a la entrada de alimentos y líquidos al organismo a través de la boca?",
        opciones: ["Absorción", "Secreción", "Ingestión", "Propulsión"],
        correcta: 2, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 36, pregunta: "¿Qué órgano produce ácido clorhídrico?",
        opciones: ["Hígado", "Estómago", "Páncreas", "Intestino grueso"],
        correcta: 1, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 37, pregunta: "¿Qué movimiento es principalmente responsable de impulsar el contenido a través del tracto gastrointestinal?",
        opciones: ["Segmentación", "Peristalsis", "Masticación", "Deglución voluntaria"],
        correcta: 1, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 38, pregunta: "¿Cuál es la diferencia principal entre digestión mecánica y digestión química?",
        opciones: [
            "La mecánica modifica físicamente los alimentos y la química los descompone mediante enzimas y sustancias digestivas",
            "La mecánica utiliza exclusivamente enzimas y la química utiliza dientes",
            "La mecánica ocurre solo en el estómago y la química solo en el intestino",
            "No existe diferencia entre ambas"
        ], correcta: 0, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 39, pregunta: "¿A dónde pasan inicialmente los monosacáridos y aminoácidos absorbidos en el intestino delgado?",
        opciones: ["A los vasos sanguíneos", "A los vasos linfáticos exclusivamente", "Al estómago", "Al intestino grueso"],
        correcta: 0, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 40, pregunta: "¿Cuál es la capa más interna de la pared del tracto gastrointestinal?",
        opciones: ["Serosa", "Muscular", "Submucosa", "Mucosa"],
        correcta: 3, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 41, pregunta: "¿Cuáles son las tres principales glándulas salivales?",
        opciones: ["Parótida, submandibular y sublingual", "Tiroides, parótida y pancreática", "Submandibular, hepática y sublingual", "Parótida, gástrica y pancreática"],
        correcta: 0, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 42, pregunta: "¿Qué enzima salival comienza la digestión del almidón?",
        opciones: ["Pepsina", "Tripsina", "Amilasa salival", "Lipasa pancreática"],
        correcta: 2, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 43, pregunta: "¿Qué sistema regula principalmente la salivación?",
        opciones: ["Sistema nervioso autónomo", "Sistema nervioso somático exclusivamente", "Sistema endocrino exclusivamente", "Sistema musculoesquelético"],
        correcta: 0, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 44, pregunta: "¿Cuál es la función principal de la deglución?",
        opciones: ["Absorber nutrientes", "Transportar el bolo desde la boca hasta el estómago y proteger la vía aérea", "Producir bilis", "Formar las heces"],
        correcta: 1, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 45, pregunta: "¿Qué estructura regula el paso del contenido del estómago hacia el duodeno?",
        opciones: ["Esfínter esofágico inferior", "Esfínter pilórico", "Válvula ileocecal", "Esfínter anal"],
        correcta: 1, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 46, pregunta: "¿Cuáles son las tres partes del intestino delgado?",
        opciones: ["Ciego, colon y recto", "Duodeno, yeyuno e íleon", "Cardias, cuerpo y píloro", "Colon ascendente, transverso y descendente"],
        correcta: 1, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 47, pregunta: "¿Qué dos secreciones digestivas llegan principalmente al duodeno?",
        opciones: ["Saliva y ácido clorhídrico", "Bilis y jugo pancreático", "Moco y saliva", "Jugo gástrico y bilis exclusivamente"],
        correcta: 1, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 48, pregunta: "¿Qué función caracteriza principalmente al yeyuno?",
        opciones: ["Almacenar las heces", "Realizar una importante absorción de nutrientes", "Producir bilis", "Producir ácido clorhídrico"],
        correcta: 1, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 49, pregunta: "¿Qué vitamina se absorbe de manera importante en el íleon cuando está unida al factor intrínseco?",
        opciones: ["Vitamina C", "Vitamina B12", "Vitamina B1", "Vitamina K exclusivamente"],
        correcta: 1, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 50, pregunta: "¿A dónde pasan inicialmente muchos productos de la digestión de los lípidos?",
        opciones: ["A los vasos linfáticos intestinales", "Directamente al estómago", "Al colon", "A las glándulas salivales"],
        correcta: 0, sistema: "Digestivo", dificultad: "Difícil"
    },
    {
        id: 51, pregunta: "¿Cuáles son las partes principales del colon?",
        opciones: ["Ascendente, transverso, descendente y sigmoide", "Duodeno, yeyuno, íleon y ciego", "Cardias, fundus, cuerpo y píloro", "Cervical, torácico, lumbar y sacro"],
        correcta: 0, sistema: "Digestivo", dificultad: "Media"
    },
    {
        id: 52, pregunta: "¿Qué sustancia absorbe principalmente el intestino grueso?",
        opciones: ["Proteínas", "Agua y electrolitos", "Ácido clorhídrico", "Bilis"],
        correcta: 1, sistema: "Digestivo", dificultad: "Fácil"
    },
    {
        id: 53, pregunta: "¿Cuáles son las tres fases principales de la digestión?",
        opciones: ["Oral, intestinal y anal", "Cefálica, gástrica e intestinal", "Mecánica, química y absortiva", "Bucal, esofágica y rectal"],
        correcta: 1, sistema: "Digestivo", dificultad: "Media"
    },

    // NERVIOSO
    {
        id: 54, pregunta: "¿Cuál es la división principal del sistema nervioso?",
        opciones: ["Sistema nervioso central y sistema nervioso periférico", "Sistema nervioso superior e inferior", "Sistema nervioso voluntario e involuntario", "Sistema nervioso sensitivo y muscular"],
        correcta: 0, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 55, pregunta: "¿Qué estructuras forman principalmente el sistema nervioso central?",
        opciones: ["Nervios y ganglios", "Encéfalo y médula espinal", "Cerebro y nervios craneales", "Músculos y receptores sensoriales"],
        correcta: 1, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 56, pregunta: "¿Qué estructuras forman principalmente el sistema nervioso periférico?",
        opciones: ["Encéfalo y médula espinal", "Nervios y ganglios fuera del sistema nervioso central", "Cerebro y cerebelo", "Meninges y líquido cefalorraquídeo"],
        correcta: 1, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 57, pregunta: "¿Cuál es la unidad funcional básica del sistema nervioso?",
        opciones: ["Osteocito", "Neurona", "Eritrocito", "Fibra muscular"],
        correcta: 1, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 58, pregunta: "¿Cuál es una función principal de las neuronas?",
        opciones: ["Transmitir información mediante señales eléctricas y químicas", "Producir tejido óseo", "Transportar oxígeno", "Secretar bilis"],
        correcta: 0, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 59, pregunta: "¿Cuál es la función general de las células gliales?",
        opciones: ["Dar soporte, protección y mantener el funcionamiento de las neuronas", "Producir movimientos voluntarios", "Formar exclusivamente hueso", "Transportar nutrientes por el intestino"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 60, pregunta: "¿Qué parte de la neurona recibe principalmente señales provenientes de otras células?",
        opciones: ["Axón", "Dendritas", "Vaina de mielina", "Terminal axónica exclusivamente"],
        correcta: 1, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 61, pregunta: "¿Qué estructura conduce el impulso nervioso desde el cuerpo celular hacia otras células?",
        opciones: ["Dendrita", "Axón", "Núcleo", "Soma exclusivamente"],
        correcta: 1, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 62, pregunta: "¿Qué función cumple principalmente la mielina?",
        opciones: ["Disminuir la velocidad de conducción nerviosa", "Aumentar la velocidad de conducción del impulso nervioso", "Producir neurotransmisores digestivos", "Formar líquido cefalorraquídeo"],
        correcta: 1, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 63, pregunta: "¿Qué es una sinapsis?",
        opciones: ["Una unión o comunicación funcional entre neuronas o entre una neurona y otra célula", "Una articulación entre dos huesos", "Una capa de tejido muscular", "Una estructura exclusiva del cerebro"],
        correcta: 0, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 64, pregunta: "¿Qué sustancias participan frecuentemente en la comunicación química entre neuronas?",
        opciones: ["Neurotransmisores", "Electrolitos óseos exclusivamente", "Enzimas digestivas", "Hormonas tiroideas exclusivamente"],
        correcta: 0, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 65, pregunta: "¿Qué estructuras principales forman el encéfalo?",
        opciones: ["Cerebro, cerebelo y tronco encefálico", "Médula espinal, nervios y ganglios", "Cerebro, médula ósea y cerebelo", "Hipófisis, médula espinal y nervios espinales"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 66, pregunta: "¿Cuál es una función importante del cerebro?",
        opciones: ["Integrar información y participar en funciones conscientes, sensoriales, motoras y cognitivas", "Producir células sanguíneas", "Absorber agua", "Producir bilis"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 67, pregunta: "¿Qué función se relaciona principalmente con el cerebelo?",
        opciones: ["Coordinar movimientos, equilibrio y precisión motora", "Producir ácido clorhídrico", "Filtrar la sangre", "Producir células sanguíneas"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 68, pregunta: "¿Qué función general cumple el tronco encefálico?",
        opciones: ["Participa en funciones vitales y sirve como vía de comunicación entre el encéfalo y la médula espinal", "Produce bilis", "Forma exclusivamente la memoria", "Absorbe nutrientes"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 69, pregunta: "¿Qué lóbulo cerebral se relaciona principalmente con la visión?",
        opciones: ["Frontal", "Parietal", "Temporal", "Occipital"],
        correcta: 3, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 70, pregunta: "¿Qué lóbulo cerebral se relaciona principalmente con el procesamiento auditivo?",
        opciones: ["Frontal", "Temporal", "Occipital", "Parietal"],
        correcta: 1, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 71, pregunta: "¿Qué lóbulo cerebral participa especialmente en funciones ejecutivas, planificación y control motor voluntario?",
        opciones: ["Frontal", "Occipital", "Temporal", "Parietal"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 72, pregunta: "¿Qué lóbulo cerebral participa principalmente en el procesamiento de información sensitiva corporal?",
        opciones: ["Occipital", "Temporal", "Parietal", "Frontal"],
        correcta: 2, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 73, pregunta: "¿Cuál es una función principal de la médula espinal?",
        opciones: ["Transmitir información entre el encéfalo y el resto del cuerpo y participar en reflejos", "Producir bilis", "Realizar la digestión química", "Formar exclusivamente hormonas"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 74, pregunta: "¿Qué es un reflejo nervioso?",
        opciones: ["Una respuesta rápida y automática ante un estímulo", "Una respuesta siempre voluntaria y consciente", "Una contracción exclusivamente muscular sin participación nerviosa", "Una respuesta exclusiva del sistema endocrino"],
        correcta: 0, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 75, pregunta: "¿Qué estructura forma parte de un arco reflejo?",
        opciones: ["Receptor sensitivo, neurona aferente, centro integrador, neurona eferente y efector", "Hígado, páncreas, estómago y colon", "Hueso, articulación, tendón y ligamento", "Alvéolo, bronquio, pulmón y diafragma"],
        correcta: 0, sistema: "Nervioso", dificultad: "Difícil"
    },
    {
        id: 76, pregunta: "¿Qué división del sistema nervioso periférico se relaciona principalmente con el control voluntario de los músculos esqueléticos?",
        opciones: ["Sistema nervioso somático", "Sistema nervioso autónomo", "Sistema nervioso entérico exclusivamente", "Sistema endocrino"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 77, pregunta: "¿Qué división del sistema nervioso regula principalmente funciones involuntarias de órganos y tejidos?",
        opciones: ["Sistema nervioso somático", "Sistema nervioso autónomo", "Sistema nervioso central exclusivamente", "Sistema nervioso sensorial exclusivamente"],
        correcta: 1, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 78, pregunta: "¿Cuáles son las dos divisiones principales del sistema nervioso autónomo?",
        opciones: ["Simpático y parasimpático", "Central y periférico", "Sensitivo y motor", "Cerebral y espinal"],
        correcta: 0, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 79, pregunta: "¿Qué división del sistema nervioso autónomo se relaciona generalmente con la respuesta de lucha o huida?",
        opciones: ["Parasimpática", "Simpática", "Somática", "Sensorial"],
        correcta: 1, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 80, pregunta: "¿Qué división del sistema nervioso autónomo se relaciona generalmente con el descanso y la digestión?",
        opciones: ["Simpática", "Parasimpática", "Somática", "Motora voluntaria"],
        correcta: 1, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 81, pregunta: "¿Qué estructuras protegen físicamente al sistema nervioso central?",
        opciones: ["Huesos, meninges y líquido cefalorraquídeo", "Músculos, tendones y ligamentos", "Piel, músculos y cartílago", "Hígado, riñones y pulmones"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 82, pregunta: "¿Qué son las meninges?",
        opciones: ["Capas de tejido que rodean y protegen el encéfalo y la médula espinal", "Nervios que salen del cerebro", "Células encargadas de producir mielina exclusivamente", "Vasos sanguíneos del intestino"],
        correcta: 0, sistema: "Nervioso", dificultad: "Fácil"
    },
    {
        id: 83, pregunta: "¿Qué función cumple principalmente el líquido cefalorraquídeo?",
        opciones: ["Contribuir a la protección, amortiguación y mantenimiento del entorno del sistema nervioso central", "Transportar alimentos al intestino", "Producir impulsos musculares", "Formar tejido óseo"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 84, pregunta: "¿Qué tipo de información lleva una vía sensitiva o aferente?",
        opciones: ["Información desde los receptores hacia el sistema nervioso central", "Órdenes desde el cerebro hacia los músculos exclusivamente", "Información desde el estómago hacia el intestino", "Hormonas desde las glándulas hacia la sangre"],
        correcta: 0, sistema: "Nervioso", dificultad: "Media"
    },
    {
        id: 85, pregunta: "¿Qué tipo de información transporta una vía motora o eferente?",
        opciones: ["Información desde los receptores hacia el encéfalo", "Órdenes desde el sistema nervioso central hacia los efectores", "Información exclusivamente visual hacia el cerebro", "Nutrientes desde el intestino hacia la sangre"],
        correcta: 1, sistema: "Nervioso", dificultad: "Media"
    },
];

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const APUESTAS = [10, 25, 50, 100];
const PREMIO_RECUPERACION = 25;
const TIEMPO_PREGUNTA = 12;

const MULTIPLICADORES: Record<Dificultad, number> = {
    Fácil: 1.5,
    Media: 3,
    Difícil: 6,
};

const mezclar = <T,>(array: T[]): T[] => {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
};

const obtenerPreguntas = (
    sistema: string,
    dificultad: Dificultad
): Pregunta[] => {
    const porSistema = sistema === "Todos"
        ? PREGUNTAS
        : PREGUNTAS.filter(q => q.sistema === sistema);

    const exactas = porSistema.filter(q => q.dificultad === dificultad);

    // Primero intenta respetar sistema + dificultad.
    if (exactas.length >= 8) return mezclar(exactas).slice(0, 8);

    // Si no hay 8, completa con otras dificultades del mismo sistema.
    if (porSistema.length >= 8) return mezclar(porSistema).slice(0, 8);

    // Último recurso: preguntas de la dificultad elegida.
    const porDificultad = PREGUNTAS.filter(q => q.dificultad === dificultad);
    if (porDificultad.length >= 8) return mezclar(porDificultad).slice(0, 8);

    return mezclar(PREGUNTAS).slice(0, 8);
};

/* =========================================================
   COMPONENTE
========================================================= */

const Trivia = () => {
    const navigate = useNavigate();
    const { saldo, spendBalance, recordGame } = useGame();

    const [apuesta, setApuesta] = useState(10);
    const [sistema, setSistema] = useState("Todos");
    const [dificultad, setDificultad] = useState<Dificultad>("Media");

    const [partidaIniciada, setPartidaIniciada] = useState(false);
    const [modoRecuperacion, setModoRecuperacion] = useState(false);
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_PREGUNTA);
    const [racha, setRacha] = useState(0);
    const [mejorRachaPartida, setMejorRachaPartida] = useState(0);
    const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
    const [premioActual, setPremioActual] = useState(0);

    const [respuestaSeleccionada, setRespuestaSeleccionada] =
        useState<number | null>(null);
    const [respuestaCorrecta, setRespuestaCorrecta] =
        useState<boolean | null>(null);
    const [opcionesEliminadas, setOpcionesEliminadas] = useState<number[]>([]);
    const [uso50_50, setUso50_50] = useState(false);

    const [finalizado, setFinalizado] = useState(false);
    const [premioFinal, setPremioFinal] = useState(0);
    const [mensajeFinal, setMensajeFinal] = useState("");
    const [puedeRetirarse, setPuedeRetirarse] = useState(false);

    const timerRef = useRef<number | null>(null);
    const finalizadoRef = useRef(false);

    const sistemas = useMemo(
        () => [
            "Todos",
            ...Array.from(new Set(PREGUNTAS.map(q => q.sistema))),
        ],
        []
    );

    const limpiarTimer = useCallback(() => {
        if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const finalizarPartida = useCallback(
        (
            resultado: ResultadoPartida,
            premio: number,
            mensaje: string
        ) => {
            if (finalizadoRef.current) return;

            finalizadoRef.current = true;
            limpiarTimer();

            const premioSeguro = Math.max(0, Math.floor(premio));

            recordGame({
                juegoId: "trivia",
                juegoNombre: "Trivia - Sistemas del cuerpo humano",
                resultado,
                apuesta: modoRecuperacion ? 0 : apuesta,
                premio: premioSeguro,
            });

            setPremioFinal(premioSeguro);
            setMensajeFinal(mensaje);
            setFinalizado(true);
            setPartidaIniciada(false);
        },
        [apuesta, limpiarTimer, modoRecuperacion, recordGame]
    );

    const iniciarPartida = () => {
        finalizadoRef.current = false;
        limpiarTimer();

        const recuperacion = saldo === 0;

        if (!recuperacion) {
            if (saldo < apuesta) return;

            const pudoPagar = spendBalance(
                apuesta,
                "Entrada Trivia - Sistemas del cuerpo humano"
            );

            if (!pudoPagar) return;
        }

        const nuevas = obtenerPreguntas(sistema, dificultad);

        setModoRecuperacion(recuperacion);
        setPreguntas(nuevas);
        setIndicePregunta(0);
        setTiempoRestante(TIEMPO_PREGUNTA);
        setRacha(0);
        setMejorRachaPartida(0);
        setRespuestasCorrectas(0);
        setPremioActual(recuperacion ? 0 : apuesta);
        setRespuestaSeleccionada(null);
        setRespuestaCorrecta(null);
        setOpcionesEliminadas([]);
        setUso50_50(false);
        setFinalizado(false);
        setPremioFinal(0);
        setMensajeFinal("");
        setPuedeRetirarse(false);
        setPartidaIniciada(true);
    };

    const preguntaActual = preguntas[indicePregunta];
    const puedeJugar = saldo >= apuesta;
    const esRecuperacion = saldo === 0;

    const responder = useCallback(
        (indice: number) => {
            if (
                finalizadoRef.current ||
                !partidaIniciada ||
                respuestaSeleccionada !== null ||
                !preguntaActual
            ) {
                return;
            }

            const esCorrecta = indice === preguntaActual.correcta;

            setRespuestaSeleccionada(indice);
            setRespuestaCorrecta(esCorrecta);
            limpiarTimer();

            if (!esCorrecta) {
                setTimeout(() => {
                    finalizarPartida(
                        "PERDIDA",
                        0,
                        modoRecuperacion
                            ? "Respuesta incorrecta. Terminó la partida de recuperación."
                            : "Respuesta incorrecta. Perdiste la partida."
                    );
                }, 700);

                return;
            }

            const nuevaRacha = racha + 1;
            const nuevasCorrectas = respuestasCorrectas + 1;

            setRacha(nuevaRacha);
            setRespuestasCorrectas(nuevasCorrectas);
            setMejorRachaPartida(prev => Math.max(prev, nuevaRacha));

            // La recompensa se multiplica según la dificultad
            // de cada respuesta correcta.
            const multiplicador = MULTIPLICADORES[preguntaActual.dificultad];

            const recompensaBase = modoRecuperacion
                ? Math.max(
                    PREMIO_RECUPERACION,
                    Math.floor(PREMIO_RECUPERACION * multiplicador)
                )
                : Math.floor(apuesta * multiplicador);

            const nuevaRecompensa = premioActual + recompensaBase;

            setPremioActual(nuevaRecompensa);
            setPuedeRetirarse(true);

            const ultimaPregunta =
                indicePregunta >= preguntas.length - 1;

            if (ultimaPregunta || nuevaRacha >= 8) {
                setTimeout(() => {
                    finalizarPartida(
                        "GANADA",
                        nuevaRecompensa,
                        modoRecuperacion
                            ? `¡Recuperaste y ganaste ${nuevaRecompensa} monedas!`
                            : `¡Partida completada! Ganaste ${nuevaRecompensa} monedas.`
                    );
                }, 700);

                return;
            }

            setTimeout(() => {
                setIndicePregunta(prev => prev + 1);
                setTiempoRestante(TIEMPO_PREGUNTA);
                setRespuestaSeleccionada(null);
                setRespuestaCorrecta(null);
                setOpcionesEliminadas([]);
            }, 700);
        },
        [
            apuesta,
            finalizarPartida,
            indicePregunta,
            limpiarTimer,
            modoRecuperacion,
            premioActual,
            preguntaActual,
            preguntas.length,
            racha,
            respuestasCorrectas,
            respuestaSeleccionada,
            partidaIniciada,
        ]
    );

    const usar50_50 = () => {
        if (
            uso50_50 ||
            !partidaIniciada ||
            respuestaSeleccionada !== null
        ) return;

        const pregunta = preguntas[indicePregunta];
        if (!pregunta) return;

        const incorrectas = pregunta.opciones
            .map((_, i) => i)
            .filter(i => i !== pregunta.correcta);

        setOpcionesEliminadas(mezclar(incorrectas).slice(0, 2));
        setUso50_50(true);
    };

    const retirarse = () => {
        if (
            !puedeRetirarse ||
            finalizado ||
            premioActual <= 0 ||
            respuestaSeleccionada !== null
        ) return;

        finalizarPartida(
            "GANADA",
            premioActual,
            modoRecuperacion
                ? "Te retiraste y aseguraste tu premio de recuperación."
                : "Te retiraste y aseguraste el premio."
        );
    };

    const jugarDeNuevo = () => {
        limpiarTimer();
        finalizadoRef.current = false;

        setFinalizado(false);
        setPartidaIniciada(false);
        setPreguntas([]);
        setIndicePregunta(0);
        setTiempoRestante(TIEMPO_PREGUNTA);
        setRacha(0);
        setMejorRachaPartida(0);
        setRespuestasCorrectas(0);
        setPremioActual(0);
        setRespuestaSeleccionada(null);
        setRespuestaCorrecta(null);
        setOpcionesEliminadas([]);
        setUso50_50(false);
        setPremioFinal(0);
        setMensajeFinal("");
        setPuedeRetirarse(false);
    };

    useEffect(() => () => limpiarTimer(), [limpiarTimer]);

    /* =========================================================
       CONFIGURACIÓN
    ========================================================= */

    if (!partidaIniciada && !finalizado) {
        return (
            <div className="min-h-screen bg-slate-950 px-3 py-3 text-white">
                <div className="mx-auto max-w-3xl">
                    <button
                        onClick={() => navigate("/juegos")}
                        className="mb-2 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                    >
                        <ArrowLeft size={15} /> Volver a la sala
                    </button>

                    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
                        <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 px-4 py-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/15 p-2.5">
                                    <Brain size={27} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-black">Trivia</h1>
                                    <p className="text-xs text-indigo-100">
                                        Sistemas del cuerpo humano
                                    </p>
                                </div>
                            </div>
                        </header>

                        <div className="space-y-3 p-3 md:p-4">
                            {/* SALDO */}
                            <div className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                                esRecuperacion
                                    ? "border-amber-500/40 bg-amber-500/10"
                                    : "border-slate-700 bg-slate-950/70"
                            }`}>
                                <div>
                                    <p className="text-[10px] text-slate-400">SALDO</p>
                                    <p className="text-xl font-black">
                                        {saldo.toLocaleString("es-AR")}
                                        <span className="ml-1 text-[10px] font-normal text-slate-500">
                                            créditos
                                        </span>
                                    </p>
                                </div>

                                {esRecuperacion ? (
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold uppercase text-amber-300">
                                            Recuperación
                                        </p>
                                        <p className="text-[10px] text-amber-100/70">
                                            Entrada gratis
                                        </p>
                                    </div>
                                ) : (
                                    <Coins size={23} className="text-yellow-400" />
                                )}
                            </div>

                            {esRecuperacion && (
                                <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5">
                                    <Shield size={20} className="shrink-0 text-amber-300" />
                                    <p className="text-[11px] leading-4 text-amber-100/80">
                                        Primera respuesta correcta:
                                        <strong className="mx-1 text-amber-300">
                                            +{PREMIO_RECUPERACION} créditos
                                        </strong>
                                    </p>
                                </div>
                            )}

                            {/* APUESTA */}
                            {!esRecuperacion && (
                                <div>
                                    <div className="mb-1.5 flex justify-between">
                                        <span className="text-xs font-bold">Entrada</span>
                                        {!puedeJugar && (
                                            <span className="text-[10px] text-red-400">
                                                Saldo insuficiente
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-4 gap-1.5">
                                        {APUESTAS.map(valor => (
                                            <button
                                                key={valor}
                                                onClick={() => setApuesta(valor)}
                                                className={`rounded-lg border px-2 py-2 text-xs font-bold transition ${
                                                    apuesta === valor
                                                        ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                                                        : "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500"
                                                } ${saldo < valor ? "opacity-40" : ""}`}
                                            >
                                                {valor}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* SISTEMA + DIFICULTAD */}
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold">
                                        Sistema
                                    </label>
                                    <select
                                        value={sistema}
                                        onChange={e => setSistema(e.target.value)}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-2 text-xs text-white outline-none focus:border-indigo-400"
                                    >
                                        {sistemas.map(item => (
                                            <option key={item} value={item}>
                                                {item === "Todos"
                                                    ? "Todos los sistemas"
                                                    : `Sistema ${item}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-bold">
                                        Dificultad
                                    </label>
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {(["Fácil", "Media", "Difícil"] as Dificultad[]).map(item => (
                                            <button
                                                key={item}
                                                onClick={() => setDificultad(item)}
                                                className={`rounded-lg border px-2 py-2 text-xs font-bold ${
                                                    dificultad === item
                                                        ? "border-purple-400 bg-purple-500/20 text-purple-200"
                                                        : "border-slate-700 bg-slate-800/60 text-slate-300"
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* REGLAS */}
                            <div className="grid grid-cols-3 gap-1.5">
                                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2.5">
                                    <Clock3 size={16} className="mb-1 text-cyan-400" />
                                    <p className="text-xs font-bold">12 segundos</p>
                                    <p className="text-[9px] text-slate-500">por pregunta</p>
                                </div>

                                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2.5">
                                    <Flame size={16} className="mb-1 text-orange-400" />
                                    <p className="text-xs font-bold">8 preguntas</p>
                                    <p className="text-[9px] text-slate-500">racha máxima</p>
                                </div>

                                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2.5">
                                    <Shield size={16} className="mb-1 text-emerald-400" />
                                    <p className="text-xs font-bold">50/50</p>
                                    <p className="text-[9px] text-slate-500">una vez</p>
                                </div>
                            </div>

                            <button
                                onClick={iniciarPartida}
                                disabled={!esRecuperacion && !puedeJugar}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-black shadow-lg transition hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Brain size={18} />
                                {esRecuperacion
                                    ? "JUGAR RECUPERACIÓN GRATIS"
                                    : `JUGAR POR ${apuesta} CRÉDITOS`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* =========================================================
       FINAL
    ========================================================= */

    if (finalizado) {
        const gano = premioFinal > 0;

        return (
            <div className="min-h-screen bg-slate-950 px-3 py-3 text-white">
                <div className="mx-auto max-w-xl">
                    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
                        <div className={`p-5 text-center ${
                            gano
                                ? "bg-gradient-to-r from-emerald-700 via-green-700 to-teal-700"
                                : "bg-gradient-to-r from-red-800 via-rose-800 to-slate-800"
                        }`}>
                            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                                {gano ? <Trophy size={30} /> : <X size={30} />}
                            </div>

                            <h1 className="text-xl font-black">
                                {gano ? "¡Ganaste!" : "Partida terminada"}
                            </h1>

                            <p className="mt-1 text-xs text-white/75">
                                {mensajeFinal}
                            </p>
                        </div>

                        <div className="space-y-3 p-3 md:p-4">
                            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center">
                                <p className="text-[10px] text-slate-500">PREMIO</p>
                                <p className="text-3xl font-black text-yellow-400">
                                    +{premioFinal.toLocaleString("es-AR")}
                                </p>
                                <p className="text-[10px] text-slate-500">créditos</p>
                            </div>

                            <div className="grid grid-cols-3 gap-1.5">
                                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2.5 text-center">
                                    <p className="text-lg font-black">{respuestasCorrectas}</p>
                                    <p className="text-[9px] text-slate-500">Correctas</p>
                                </div>

                                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2.5 text-center">
                                    <p className="text-lg font-black">{mejorRachaPartida}</p>
                                    <p className="text-[9px] text-slate-500">Mejor racha</p>
                                </div>

                                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2.5 text-center">
                                    <p className="text-lg font-black">
                                        {modoRecuperacion ? 0 : apuesta}
                                    </p>
                                    <p className="text-[9px] text-slate-500">Entrada</p>
                                </div>
                            </div>

                            {modoRecuperacion && (
                                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-center text-[10px] text-amber-200">
                                    Partida de recuperación gratuita.
                                    {premioFinal > 0 && (
                                        <strong className="ml-1 text-amber-300">
                                            Créditos recuperados.
                                        </strong>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={jugarDeNuevo}
                                    className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2.5 text-xs font-bold hover:bg-indigo-500"
                                >
                                    <RotateCcw size={15} /> Jugar de nuevo
                                </button>

                                <button
                                    onClick={() => navigate("/juegos")}
                                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-bold hover:bg-slate-700"
                                >
                                    <ArrowLeft size={15} /> Sala de juegos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* =========================================================
       PREGUNTA
    ========================================================= */

    if (!preguntaActual) return null;

    const progreso = ((indicePregunta + 1) / preguntas.length) * 100;
    const multiplicadorActual = MULTIPLICADORES[preguntaActual.dificultad];

    return (
        <div className="min-h-screen bg-slate-950 px-3 py-3 text-white">
            <div className="mx-auto max-w-4xl">
                {/* HEADER */}
                <div className="mb-2 flex items-center justify-between gap-2">
                    <button
                        onClick={() => navigate("/juegos")}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                    >
                        <ArrowLeft size={15} /> Salir
                    </button>

                    <div className="flex gap-1.5">
                        <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5">
                            <HeartPulse size={14} className="text-red-400" />
                            <span className="text-[10px]">{preguntaActual.sistema}</span>
                        </div>

                        <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5">
                            <Coins size={14} className="text-yellow-400" />
                            <span className="text-[10px] font-bold">
                                {saldo.toLocaleString("es-AR")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* PROGRESO */}
                <div className="mb-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                        className="h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                        style={{ width: `${progreso}%` }}
                    />
                </div>

                {/* ESTADÍSTICAS */}
                <div className="mb-2 grid grid-cols-4 gap-1.5">
                    <div className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5">
                        <p className="text-[9px] text-slate-500">Pregunta</p>
                        <p className="text-sm font-black">
                            {indicePregunta + 1}/{preguntas.length}
                        </p>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5">
                        <p className="text-[9px] text-slate-500">Racha</p>
                        <p className="flex items-center gap-1 text-sm font-black">
                            <Flame size={13} className="text-orange-400" />
                            {racha}
                        </p>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5">
                        <p className="text-[9px] text-slate-500">Premio</p>
                        <p className="text-sm font-black text-yellow-400">
                            +{premioActual.toLocaleString("es-AR")}
                        </p>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5">
                        <p className="text-[9px] text-slate-500">Tiempo</p>
                        <p className={`flex items-center gap-1 text-sm font-black ${
                            tiempoRestante <= 4
                                ? "text-red-400"
                                : "text-cyan-400"
                        }`}>
                            <Clock3 size={13} />
                            {tiempoRestante}s
                        </p>
                    </div>
                </div>

                {/* PREGUNTA */}
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
                    <div className="border-b border-slate-800 px-3 py-3 md:px-4">
                        <div className="mb-2 flex flex-wrap gap-1">
                            <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold text-indigo-300">
                                {preguntaActual.sistema}
                            </span>

                            <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold text-purple-300">
                                {preguntaActual.dificultad}
                            </span>

                            {modoRecuperacion && (
                                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold text-amber-300">
                                    Recuperación
                                </span>
                            )}
                        </div>

                        <h1 className="text-base font-black leading-snug md:text-lg">
                            {preguntaActual.pregunta}
                        </h1>
                    </div>

                    {/* OPCIONES */}
                    <div className="grid gap-1.5 p-3 md:grid-cols-2">
                        {preguntaActual.opciones.map((opcion, index) => {
                            const eliminada = opcionesEliminadas.includes(index);
                            const seleccionada = respuestaSeleccionada === index;
                            const correcta = preguntaActual.correcta === index;

                            let clase =
                                "border-slate-700 bg-slate-800/60 hover:border-indigo-500 hover:bg-indigo-500/10";

                            if (eliminada)
                                clase = "border-slate-800 bg-slate-950/30 opacity-20";

                            if (seleccionada && respuestaCorrecta)
                                clase = "border-emerald-500 bg-emerald-500/10 text-emerald-200";

                            if (seleccionada && respuestaCorrecta === false)
                                clase = "border-red-500 bg-red-500/10 text-red-200";

                            if (respuestaSeleccionada !== null && correcta)
                                clase = "border-emerald-500 bg-emerald-500/10 text-emerald-200";

                            return (
                                <button
                                    key={index}
                                    disabled={eliminada || respuestaSeleccionada !== null}
                                    onClick={() => responder(index)}
                                    className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs transition md:p-3 ${clase}`}
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-950 text-[11px] font-black text-slate-300">
                                        {String.fromCharCode(65 + index)}
                                    </span>

                                    <span className="flex-1 font-semibold leading-snug">
                                        {opcion}
                                    </span>

                                    {seleccionada && respuestaCorrecta && (
                                        <Check size={17} className="shrink-0 text-emerald-400" />
                                    )}

                                    {seleccionada && respuestaCorrecta === false && (
                                        <X size={17} className="shrink-0 text-red-400" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* CONTROLES */}
                    <div className="flex items-center justify-between gap-2 border-t border-slate-800 px-3 py-2.5">
                        <button
                            onClick={usar50_50}
                            disabled={uso50_50 || respuestaSeleccionada !== null}
                            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] font-bold hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <Shield size={14} />
                            {uso50_50 ? "50/50 usado" : "Usar 50/50"}
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500">
                                Multiplicador ×{multiplicadorActual}
                            </span>

                            {puedeRetirarse && (
                                <button
                                    onClick={retirarse}
                                    disabled={respuestaSeleccionada !== null}
                                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-bold hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Trophy size={14} />
                                    Retirarme
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* PIE */}
                <div className="mt-2 flex items-center justify-center gap-3 text-[9px] text-slate-600">
                    <span className="flex items-center gap-1">
                        <Sparkles size={11} /> Sistemas del cuerpo humano
                    </span>
                    <span>8 preguntas</span>
                    <span>12 segundos</span>
                </div>
            </div>
        </div>
    );
};

export default Trivia;
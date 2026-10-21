/* ==========================================================================
   FEIRA DE INOVAÇÃO TURMA 2A - APLICAÇÃO COMPLETA (SCRIPT.JS)
   ========================================================================== */

// Configuração do Firebase Realtime Database
const firebaseConfig = {
    apiKey: "AIzaSyBDPFhmP973Q_19AbhIClUdKeZKdTKipKY",
    authDomain: "avalia-projetos-2a.firebaseapp.com",
    databaseURL: "https://avalia-projetos-2a-default-rtdb.firebaseio.com",
    projectId: "avalia-projetos-2a",
    storageBucket: "avalia-projetos-2a.firebasestorage.app",
    messagingSenderId: "516604701570",
    appId: "1:516604701570:web:df34ceb5dd9e00a0cfbd9b"
};

// Mapeamento dos 37 Alunos divididos nas Mesas 1 a 7
const INITIAL_STUDENTS = [
    { name: "ALEXANDRE FERREIRA", table: 3 },
    { name: "ARTHUR BARONI", table: 2 },
    { name: "ARTHUR CALIXTO", table: 5 },
    { name: "ARTHUR MARCOS", table: 1 },
    { name: "BIANCA LAYS", table: 3 },
    { name: "CAMILY VALENGA", table: 4 },
    { name: "CAUÃ MASSOQUETO", table: 7 },
    { name: "DANIEL HENRIQUE", table: 4 },
    { name: "DAVI LOPES", table: 5 },
    { name: "ELOÁ LOPES", table: 7 },
    { name: "ENZO WERNEK", table: 6 },
    { name: "FELIPE NOVAK", table: 7 },
    { name: "FELIPE SOARES", table: 4 },
    { name: "GABRIEL MAGALHÃES", table: 1 },
    { name: "GABRIEL WILSEK", table: 4 },
    { name: "GABRIELA FRANCO", table: 6 },
    { name: "GABRIELLE ALENCAR", table: 5 },
    { name: "GUILHERME STADLER", table: 2 },
    { name: "HELOISA ITTNER", table: 7 },
    { name: "ISABELLA VICTÓRIA", table: 6 },
    { name: "ISABELLY PINHEIRO", table: 1 },
    { name: "JOÃO VICTOR", table: 4 },
    { name: "JOÃO VITOR", table: 6 },
    { name: "JOAQUIM SANTOS", table: 1 },
    { name: "LARA PIRES", table: 5 },
    { name: "LEONARDO ANDRADE", table: 3 },
    { name: "LUIZA HELENA", table: 6 },
    { name: "MAÍRA STAVNI", table: 7 },
    { name: "MIGUEL SANTOS", table: 2 },
    { name: "MILENA FEDALTO", table: 3 },
    { name: "MILENA MARIA", table: 4 },
    { name: "NATHALIA LIBERATO", table: 2 },
    { name: "NICOLLY DE SOUZA", table: 5 },
    { name: "PEDRO ALVES", table: 5 },
    { name: "PEDRO MARTINS", table: 7 },
    { name: "PIETRO PIMENTEL", table: 6 },
    { name: "RAYSSA RIBAS", table: 1 },
    { name: "RUANA NICOLE", table: 1 },
    { name: "SILVIO PERUSSOLO", table: 3 },
    { name: "SOPHIA ALVES", table: 2 },
    { name: "TARCÍSIO VICELLI", table: 2 }
];

// BANCO COMPLETO DE QUESTÕES DAS MESAS 1 A 7
const QUIZ_BANK = {
    1: [
        {
            q: "Qual é a principal função do aplicativo NEXO e como ele pode ajudar os estudantes no dia a dia?",
            correct: "O NEXO ajuda os estudantes a organizar tarefas, acompanhar prazos, definir prioridades e planejar melhor o tempo disponível.",
            distractors: [
                "O NEXO é uma plataforma voltada para a venda de materiais escolares entre alunos do mesmo colégio.",
                "O aplicativo funciona como um jogo que recompensa os alunos com notas por horas jogadas.",
                "O NEXO é uma rede social para estudantes compartilharem fotos e vídeos das suas atividades."
            ]
        },
        {
            q: "O que significa o nome NEXORA e qual é a relação dele com a proposta da empresa?",
            correct: "O nome foi inspirado na palavra 'nexo', que significa conexão, representando a ligação entre pessoas, tecnologia e soluções inteligentes.",
            distractors: [
                "Significa 'Nova Era X', representando a transição para o ensino 100% à distância.",
                "É uma junção das palavras 'Nível', 'Excelência' e 'Organização'.",
                "Representa a sigla para 'Núcleo de Exatas e Recursos Acadêmicos'."
            ]
        },
        {
            q: "Qual é a principal diferença entre o NEXO e uma agenda comum?",
            correct: "Além de registrar tarefas, o NEXO propõe sugestões inteligentes de planejamento, organização por prioridades e acompanhamento do progresso.",
            distractors: [
                "O NEXO é impresso em papel reciclado enquanto agendas comuns são digitais.",
                "O NEXO só funciona se o estudante estiver conectado ao Wi-Fi da escola.",
                "O NEXO envia relatórios semanais diretamente para os professores atribuírem faltas."
            ]
        },
        {
            q: "Como o NEXO pode ajudar um estudante que tem muitas atividades escolares e pouco tempo disponível?",
            correct: "Ele ajuda a identificar tarefas mais urgentes, distribuir as atividades conforme o tempo disponível e sugerir pausas para equilibrar estudos e descanso.",
            distractors: [
                "Ele realiza os exercícios de casa automaticamente através de inteligência artificial.",
                "Ele cancela as tarefas que ultrapassarem o tempo limite de 30 minutos.",
                "Ele notifica a coordenação escolar pedindo adiamento de prazos em nome do aluno."
            ]
        },
        {
            q: "Por que a identidade visual da NEXORA utiliza azul-marinho, turquesa e roxo? O que essas cores representam?",
            correct: "O azul-marinho representa confiança e segurança, o turquesa simboliza inovação e equilíbrio, e o roxo representa criatividade e tecnologia.",
            distractors: [
                "As cores foram escolhidas aleatoriamente baseadas nos uniformes escolares.",
                "O azul representa calmaria, o turquesa a preservação ambiental e o roxo o luto pelas notas baixas.",
                "As cores simbolizam os três pilares do ensino técnico tradicional."
            ]
        }
    ],
    2: [
        {
            q: "Como o PreviON consegue identificar possíveis falhas em máquinas industriais?",
            correct: "Utilizando IA para analisar dados e identificar padrões anormais.",
            distractors: [
                "Apenas analisando o tempo de uso da máquina.",
                "Realizando consertos automaticamente sem precisar de humanos.",
                "Substituindo os técnicos de manutenção do chão de fábrica."
            ]
        },
        {
            q: "Qual é a principal diferença entre manutenção preditiva e corretiva?",
            correct: "A preditiva busca antecipar falhas, enquanto a corretiva ocorre após um defeito.",
            distractors: [
                "A preditiva é realizada somente após a quebra total da máquina.",
                "Ambas funcionam exatamente da mesma maneira no dia a dia.",
                "A corretiva utiliza obrigatoriamente inteligência artificial."
            ]
        },
        {
            q: "O que acontece se o PreviON identificar uma falha que não existe?",
            correct: "Ocorre um falso positivo, que deve ser verificado pela equipe técnica.",
            distractors: [
                "A máquina precisa ser substituída imediatamente por uma nova.",
                "O sistema deixa de funcionar permanentemente.",
                "A IA automaticamente corrige o problema mecânico."
            ]
        },
        {
            q: "Como a Atlas Tecnologia poderia comprovar a eficiência do PreviON?",
            correct: "Comparando custos e paradas das máquinas antes e depois da implementação.",
            distractors: [
                "Apenas pela quantidade de usuários cadastrados no sistema.",
                "Pela beleza estética e cores da interface do software.",
                "Apenas pela quantidade total de alertas e e-mails enviados."
            ]
        },
        {
            q: "Qual seria o maior desafio para implementar o PreviON em máquinas industriais antigas?",
            correct: "A obtenção de dados confiáveis e a integração com sensores.",
            distractors: [
                "A escolha das cores dos botões do sistema.",
                "A criação de contas de e-mail para os funcionários.",
                "A definição da logomarca no painel."
            ]
        }
    ],
    3: [
        {
            q: "Qual problema a LeoSolution busca resolver?",
            correct: "A dificuldade de encontrar ajuda para pequenas tarefas do cotidiano, principalmente quando as pessoas não podem pagar por um serviço.",
            distractors: [
                "O alto preço das mensalidades escolares em grandes centros urbanos.",
                "A falta de vagas em estacionamentos de shoppings centers.",
                "A escassez de produtos eletrônicos importados para pequenas empresas."
            ]
        },
        {
            q: "Como funciona a plataforma LeoSolution?",
            correct: "Ela conecta pessoas que precisam de ajuda com pessoas que possuem habilidades para tarefas, utilizando créditos de tempo em vez de dinheiro.",
            distractors: [
                "É um e-commerce onde os usuários leiloam produtos usados em tempo real.",
                "É uma fintech que concede empréstimos bancários com juros baixos.",
                "Funciona como um aplicativo de transporte particular focado em entregas de comida."
            ]
        },
        {
            q: "Qual é o principal diferencial da LeoSolution?",
            correct: "Todas as horas de ajuda têm o mesmo valor em créditos, independentemente da habilidade oferecida.",
            distractors: [
                "Profissionais com diploma universitário ganham dez vezes mais créditos por hora.",
                "Somente pagamentos em cartão de crédito são aceitos na plataforma.",
                "Apenas moradores de condomínios fechados podem se cadastrar."
            ]
        },
        {
            q: "Quem é o público-alvo da LeoSolution?",
            correct: "Moradores do mesmo bairro, estudantes, familiares e pessoas que desejam compartilhar conhecimentos e fortalecer a comunidade.",
            distractors: [
                "Grandes corporações multinacionais interessadas em terceirizar mão de obra.",
                "Turistas estrangeiros em busca de guias profissionais no país.",
                "Apenas estudantes universitários do curso de Engenharia."
            ]
        },
        {
            q: "Como a LeoSolution pode beneficiar a sociedade?",
            correct: "Ela incentiva a colaboração entre as pessoas, facilita a troca de conhecimentos e ajuda a resolver problemas sem pagamentos em dinheiro.",
            distractors: [
                "Ela substitui a necessidade de órgãos públicos de segurança pública.",
                "Ela gera impostos municipais mais elevados para os pequenos comerciantes.",
                "Ela obriga os usuários a realizarem ao menos duas tarefas semanais."
            ]
        }
    ],
    4: [
        {
            q: "O que é o CleberLab?",
            correct: "Um aplicativo desenvolvido para ajudar estudantes a superarem o bloqueio criativo e encontrarem ideias para trabalhos escolares.",
            distractors: [
                "Uma rede social para troca de tarefas escolares entre turmas.",
                "Um site de jogos educacionais voltado para crianças da educação infantil.",
                "Uma plataforma de streaming de videoaulas preparatórias para o ENEM."
            ]
        },
        {
            q: "De onde veio o nome CleberLab?",
            correct: "Da união de um nome amigável e acessível com a palavra 'Lab', transmitindo a ideia de laboratório de inovação e criação.",
            distractors: [
                "Da abreviação dos termos em inglês 'Criatividade e Lembranças'.",
                "Do nome do cientista e físico renomado Cleber Newton somado a laboratório.",
                "É um acrônimo em inglês para 'Creative Learning Board'."
            ]
        },
        {
            q: "Qual é a principal função do app CleberLab?",
            correct: "Guia o aluno passo a passo, transformando o tema do trabalho em opções práticas de projetos.",
            distractors: [
                "Fazer a redação e os trabalhos inteiros automaticamente para o aluno sem ele precisar estudar.",
                "Enviar notificações instantâneas de cobrança de prazos escolares diretamente aos pais.",
                "Corrigir automaticamente erros de digitação e gramática em documentos em PDF."
            ]
        },
        {
            q: "Quais são as ferramentas principais da plataforma?",
            correct: "O Gerador de Insight para entender o tema, a Trilha de Ideias para mostrar caminhos e o Plano de Ação para organizar os passos iniciais.",
            distractors: [
                "Editor de texto completo, planilha financeira automatizada e gerador de gráficos.",
                "Chat de voz em tempo real, fórum aberto de dúvidas e sala de videochamada.",
                "Calculadora científica avançada, dicionário multilíngue e tradutor automático."
            ]
        },
        {
            q: "Como o CleberLab ajuda o estudante no dia a dia?",
            correct: "Economizando tempo e reduzindo a ansiedade de começar um trabalho do zero, dando confiança para o aluno desenvolver suas próprias ideias.",
            distractors: [
                "Realizando as avaliações e provas escolares do bimestre pelo celular.",
                "Substituindo integralmente a necessidade de frequentar as aulas presenciais.",
                "Garantindo notas máximas automáticas em qualquer disciplina."
            ]
        }
    ],
    5: [
        {
            q: "Quais são os componentes da logo da Matrice?",
            correct: "Uma mulher com tons rosas, simbolizando a maternidade e o acolhimento.",
            distractors: [
                "Um escudo azul e dourado simbolizando proteção médica e jurídica.",
                "Um relógio de sol cercado por engrenagens industriais.",
                "Uma árvore verde com frutos coloridos representando a infância."
            ]
        },
        {
            q: "Qual o objetivo do aplicativo Matrice?",
            correct: "Promover o autocuidado para mães.",
            distractors: [
                "Gerenciar a compra e venda de enxovais de bebê usados.",
                "Agendar consultas pediátricas em hospitais particulares.",
                "Fornecer aulas de reforço escolar para crianças do ensino fundamental."
            ]
        },
        {
            q: "O que o nome 'Matrice' significa?",
            correct: "Maternidade, mãe e matriz (origem).",
            distractors: [
                "Matemática, Raciocínio e Ciência.",
                "Matriz Tecnológica de Recuperação Infantil.",
                "Material, Cuidado e Enfermagem."
            ]
        },
        {
            q: "Cite uma função do aplicativo Matrice:",
            correct: "Meditação e momentos de pausa direcionados.",
            distractors: [
                "Cálculo automático do imposto de renda familiar.",
                "Monitoramento GPS da localização do transporte escolar.",
                "Venda de medicamentos sem receita médica."
            ]
        },
        {
            q: "Por que a escolha da cor rosa no projeto Matrice?",
            correct: "Simboliza delicadeza, calma e carinho.",
            distractors: [
                "Foi escolhida por ser a cor padrão de sistemas hospitalares.",
                "Representa a cor símbolo do empreendedorismo tecnológico jovem.",
                "Para diferenciar o aplicativo dos concorrentes masculinos de esportes."
            ]
        }
    ],
    6: [
        {
            q: "O FURAFILA'S aumenta necessariamente a produtividade do estabelecimento?",
            correct: "Não, pois organiza a espera, mas não garante atendimentos mais rápidos.",
            distractors: [
                "Sim, pois automatiza o preparo de pedidos na cozinha ou balcão.",
                "Sim, pois reduz o número de funcionários necessários no atendimento.",
                "Não, porque o aplicativo atrasa propositalmente a fila para vender mais."
            ]
        },
        {
            q: "Qual fator pode comprometer a precisão da previsão de espera no FURAFILA'S?",
            correct: "As variações na duração dos atendimentos individuais.",
            distractors: [
                "O modelo do smartphone utilizado pelos clientes da fila.",
                "A cor da fachada física do estabelecimento parceiro.",
                "A velocidade da internet na cidade onde o estabelecimento está local."
            ]
        },
        {
            q: "Qual medida ajudaria a aumentar a confiabilidade do aplicativo FURAFILA'S?",
            correct: "Atualizar as estimativas continuamente conforme o andamento da fila.",
            distractors: [
                "Cobrar uma taxa fixa dos clientes que desejam furar a fila sem esperar.",
                "Bloquear os comentários e avaliações negativas dos usuários.",
                "Limitar a fila a no máximo cinco pessoas por dia."
            ]
        },
        {
            q: "Se um estabelecimento continuar com filas demoradas após adotar o FURAFILA'S, isso pode indicar que:",
            correct: "A capacidade física ou operacional de atendimento pode ser insuficiente.",
            distractors: [
                "O aplicativo está corrompido e deve ser apagado.",
                "Os clientes não entenderam as instruções da tela.",
                "O estabelecimento precisa mudar de nome no aplicativo."
            ]
        },
        {
            q: "Qual cuidado é essencial para proteger os usuários do FURAFILA'S?",
            correct: "Proteger dados pessoais e restringir acessos não autorizados.",
            distractors: [
                "Exigir foto do documento de identidade para entrar em qualquer fila.",
                "Cobrar mensalidade adiantada para garantir o acesso ao app.",
                "Obrigá-los a compartilhar sua localização com outros clientes."
            ]
        }
    ],
    7: [
        {
            q: "Por que escolhemos o nome .AlumnIA?",
            correct: "O nome vem do latim e faz referência a palavra 'Aluno'.",
            distractors: [
                "É uma sigla em inglês para 'Artificial Learning User Network'.",
                "Foi escolhido em homenagem ao cientista Alan Turing.",
                "É uma combinação das palavras 'Alumni' e 'Inteligência Avançada'."
            ]
        },
        {
            q: "Quais são as cores que se destacam no Site e na Logo? E por que buscamos escolhê-las?",
            correct: "Escolhemos as cores amarelo e roxo, por serem cores chamativas e que chamam atenção dos estudantes.",
            distractors: [
                "Escolhemos azul e verde, por representarem a saúde mental e o meio ambiente.",
                "Usamos preto e branco, para manter um design neutro e minimalista.",
                "Escolhemos vermelho e laranja, por serem as cores padrão de plataformas de jogos."
            ]
        },
        {
            q: "A partir de qual meio que a Inteligência Artificial gera os resumos?",
            correct: "Através de livros didáticos sobre os assuntos que o aluno selecionou, gerando resumos confiáveis e completos.",
            distractors: [
                "Pesquisando aleatoriamente em blogs e fóruns abertos da internet.",
                "Copiando artigos do Wikipedia sem verificação prévia.",
                "Através de arquivos gravados em áudio pelos próprios estudantes."
            ]
        },
        {
            q: "Qual o principal objetivo do .AlumnIA?",
            correct: "Fornecer resumões para alunos que necessitam de reforço em determinadas matérias.",
            distractors: [
                "Realizar provas presenciais e atribuir notas oficiais para as escolas.",
                "Vender apostilas impressas e livros físicos com desconto.",
                "Conectar estudantes para partidas de jogos educativos online."
            ]
        },
        {
            q: "Qual o nome da empresa responsável pela .AlumnIA?",
            correct: "Alumni Instituição de Educação Co.",
            distractors: [
                "Alumnis Foundation",
                "Equipe Sete Ltda.",
                "Alumni S/A."
            ]
        }
    ]
};

// Projetos Iniciais
const DEFAULT_PROJECTS = {
    1: { company: "NEXORA (App NEXO)", pain: "Organização e gestão do tempo de estudantes", solution: "App para organizar tarefas, prazos e prioridades", story: "A jornada do estudante com muitas tarefas e pouco tempo", mockup: "" },
    2: { company: "Atlas Tecnologia (PreviON)", pain: "Paradas não planejadas em máquinas industriais", solution: "Sistema preditivo com IA para antecipar falhas", story: "Evitando prejuízos industriais com inteligência", mockup: "" },
    3: { company: "LeoSolution", pain: "Dificuldade de obter ajuda em pequenas tarefas sem dinheiro", solution: "Plataforma de troca de ajuda por créditos de tempo", story: "Fortalecendo comunidades através do tempo compartilhado", mockup: "" },
    4: { company: "CleberLab", pain: "Bloqueio criativo de alunos ao iniciar trabalhos escolares", solution: "Plataforma com Gerador de Insight e Trilha de Ideias", story: "Ajudando o estudante a sair do zero com confiança", mockup: "" },
    5: { company: "Matrice", pain: "Falta de autocuidado e sobrecarga das mães no cotidiano", solution: "App de autocuidado e momentos de meditação", story: "Acolhimento e carinho para a jornada da maternidade", mockup: "" },
    6: { company: "FURAFILA'S", pain: "Filas demoradas e desorganizadas em estabelecimentos", solution: "Sistema de organização e previsão de filas", story: "Transformando o tempo de espera em transparência", mockup: "" },
    7: { company: ".AlumnIA", pain: "Necessidade de reforço e resumos confiáveis de matérias", solution: "IA que gera resumos a partir de livros didáticos", story: "Resumos precisos e focados para o aprendizado do aluno", mockup: "" }
};

/* ==========================================================================
   INICIALIZAÇÃO DO FIREBASE & ESTADO
   ========================================================================== */

let db = null;
let projectsData = JSON.parse(localStorage.getItem('projectsData_2A')) || DEFAULT_PROJECTS;
let evaluationsData = JSON.parse(localStorage.getItem('evaluationsData_2A')) || [];
let quizAnswersData = JSON.parse(localStorage.getItem('quizAnswersData_2A')) || [];

let currentUser = {
    table: null,
    studentName: null
};

let currentRenderedQuiz = {
    targetTable: null,
    questions: []
};

try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();

        // Sincroniza avaliações
        db.ref("evaluations").on("value", (snapshot) => {
            evaluationsData = [];
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach(key => evaluationsData.push({ ...data[key], _id: key }));
            }
            localStorage.setItem('evaluationsData_2A', JSON.stringify(evaluationsData));
            if (typeof renderAdminReports === 'function') renderAdminReports();
        });

        // Sincroniza respostas dos quizzes
        db.ref("quizAnswers").on("value", (snapshot) => {
            quizAnswersData = [];
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach(key => quizAnswersData.push({ ...data[key], _id: key }));
            }
            localStorage.setItem('quizAnswersData_2A', JSON.stringify(quizAnswersData));
            if (typeof renderAdminReports === 'function') renderAdminReports();
        });

        // Sincroniza projetos das mesas
        db.ref("projects").on("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                projectsData = { ...DEFAULT_PROJECTS, ...data };
                localStorage.setItem('projectsData_2A', JSON.stringify(projectsData));
            }
        });
    }
} catch (e) {
    console.warn("Modo LocalStorage ativo por contingência.", e);
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('table-summary-body')) {
        const dateSpan = document.getElementById('pdf-date');
        if (dateSpan) dateSpan.textContent = new Date().toLocaleDateString('pt-BR');
    }
});

/* ==========================================================================
   FUNÇÃO DE EMBARALHAMENTO (FISHER-YATES SHUFFLE) - ANTI-COLA
   ========================================================================== */

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* ==========================================================================
   LÓGICA DA PÁGINA DO ESTUDANTE (INDEX.HTML)
   ========================================================================== */

function onTableSelect() {
    const tableSelect = document.getElementById('select-my-table');
    const studentSelect = document.getElementById('select-student');
    const welcomeBox = document.getElementById('student-welcome');
    
    const selectedTable = parseInt(tableSelect.value);
    studentSelect.innerHTML = '<option value="">-- Selecione seu nome --</option>';
    
    if (!selectedTable) {
        studentSelect.disabled = true;
        welcomeBox.classList.add('hidden');
        document.getElementById('mode-selector-tabs').classList.add('hidden');
        document.getElementById('step-evaluate').classList.add('disabled-card');
        return;
    }

    const studentsInTable = INITIAL_STUDENTS.filter(s => s.table === selectedTable);
    studentsInTable.sort((a,b) => a.name.localeCompare(b.name));

    studentsInTable.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.name;
        opt.textContent = s.name;
        studentSelect.appendChild(opt);
    });

    studentSelect.disabled = false;
}

function onStudentSelect() {
    const tableSelect = document.getElementById('select-my-table');
    const studentSelect = document.getElementById('select-student');
    const welcomeBox = document.getElementById('student-welcome');
    const welcomeName = document.getElementById('welcome-name');
    const stepEvaluate = document.getElementById('step-evaluate');
    const targetTableSelect = document.getElementById('select-target-table');
    const quizTableSelect = document.getElementById('select-quiz-table');

    currentUser.table = parseInt(tableSelect.value);
    currentUser.studentName = studentSelect.value;

    if (!currentUser.studentName) {
        welcomeBox.classList.add('hidden');
        document.getElementById('mode-selector-tabs').classList.add('hidden');
        stepEvaluate.classList.add('disabled-card');
        return;
    }

    welcomeName.textContent = `${currentUser.studentName} (Sua Mesa: 0${currentUser.table})`;
    welcomeBox.classList.remove('hidden');
    document.getElementById('mode-selector-tabs').classList.remove('hidden');
    stepEvaluate.classList.remove('disabled-card');

    targetTableSelect.innerHTML = '<option value="">-- Selecione a mesa para consultar/avaliar --</option>';
    quizTableSelect.innerHTML = '<option value="">-- Selecione uma mesa para responder o quiz --</option>';

    for (let t = 1; t <= 7; t++) {
        if (t !== currentUser.table) {
            // Status Apresentação
            const evalDone = evaluationsData.find(ev => ev.evaluatorName === currentUser.studentName && ev.targetTable === t);
            const opt1 = document.createElement('option');
            opt1.value = t;
            opt1.textContent = `Mesa 0${t} - ${projectsData[t]?.company || 'Projeto'} ${evalDone ? ' (🔒 Nota Registrada: ' + evalDone.totalScore + ')' : ''}`;
            targetTableSelect.appendChild(opt1);

            // Status Quiz
            const quizDone = quizAnswersData.find(q => q.studentName === currentUser.studentName && q.targetTable === t);
            const opt2 = document.createElement('option');
            opt2.value = t;
            opt2.textContent = `Mesa 0${t} - ${projectsData[t]?.company || 'Projeto'} ${quizDone ? ' (✓ Nota Quiz: ' + quizDone.scorePercent + ')' : ''}`;
            quizTableSelect.appendChild(opt2);
        }
    }

    targetTableSelect.disabled = false;
}

function switchStudentMode(mode) {
    document.getElementById('tab-btn-eval').classList.toggle('active', mode === 'eval');
    document.getElementById('tab-btn-quiz').classList.toggle('active', mode === 'quiz');

    if (mode === 'eval') {
        document.getElementById('step-evaluate').classList.remove('hidden');
        document.getElementById('step-quiz').classList.add('hidden');
    } else {
        document.getElementById('step-evaluate').classList.add('hidden');
        document.getElementById('step-quiz').classList.remove('hidden');
    }
}

function loadTargetTableDetails() {
    const targetTableVal = document.getElementById('select-target-table').value;
    const detailsCard = document.getElementById('project-details-card');
    const evalForm = document.getElementById('evaluation-form');
    const alertBox = document.getElementById('already-eval-alert');
    const btnSubmitEval = document.getElementById('btn-submit-eval');

    if (!targetTableVal) {
        detailsCard.classList.add('hidden');
        evalForm.classList.add('hidden');
        if (alertBox) alertBox.classList.add('hidden');
        return;
    }

    const tId = parseInt(targetTableVal);
    const p = projectsData[tId];

    document.getElementById('disp-table-badge').textContent = `Mesa 0${tId}`;
    document.getElementById('disp-company-name').textContent = p?.company || `Projeto Mesa ${tId}`;
    document.getElementById('disp-pain-text').textContent = p?.pain || 'Não informada';
    document.getElementById('disp-solution-text').textContent = p?.solution || 'Não informada';
    document.getElementById('disp-story-text').textContent = p?.story || 'Não informada';

    const mockupLink = document.getElementById('disp-mockup-link');
    if (p?.mockup && p.mockup.trim() !== "") {
        mockupLink.href = p.mockup;
        document.getElementById('disp-mockup-container').classList.remove('hidden');
    } else {
        document.getElementById('disp-mockup-container').classList.add('hidden');
    }

    detailsCard.classList.remove('hidden');
    evalForm.classList.remove('hidden');

    const existingEval = evaluationsData.find(ev => ev.evaluatorName === currentUser.studentName && ev.targetTable === tId);

    if (existingEval) {
        document.getElementById('c1').value = existingEval.scores.c1;
        document.getElementById('c1-val').textContent = existingEval.scores.c1;
        document.getElementById('c2').value = existingEval.scores.c2;
        document.getElementById('c2-val').textContent = existingEval.scores.c2;
        document.getElementById('c3').value = existingEval.scores.c3;
        document.getElementById('c3-val').textContent = existingEval.scores.c3;
        document.getElementById('c4').value = existingEval.scores.c4;
        document.getElementById('c4-val').textContent = existingEval.scores.c4;
        document.getElementById('c5').value = existingEval.scores.c5;
        document.getElementById('c5-val').textContent = existingEval.scores.c5;
        document.getElementById('live-total-score').textContent = existingEval.totalScore;
        document.getElementById('eval-feedback').value = existingEval.feedback || '';

        for (let i = 1; i <= 5; i++) {
            document.getElementById(`c${i}`).disabled = true;
        }
        document.getElementById('eval-feedback').disabled = true;

        if (alertBox) {
            alertBox.classList.remove('hidden');
            document.getElementById('already-eval-text').textContent = `Você já avaliou esta mesa anteriormente. Nota atribuída: ${existingEval.totalScore}/100. O formulário está bloqueado.`;
        }
        if (btnSubmitEval) {
            btnSubmitEval.disabled = true;
            btnSubmitEval.style.opacity = '0.5';
            btnSubmitEval.innerHTML = '<i class="fa-solid fa-lock"></i> Avaliação Já Realizada';
        }
    } else {
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`c${i}`).disabled = false;
        }
        document.getElementById('eval-feedback').disabled = false;

        if (alertBox) alertBox.classList.add('hidden');
        if (btnSubmitEval) {
            btnSubmitEval.disabled = false;
            btnSubmitEval.style.opacity = '1';
            btnSubmitEval.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Avaliação';
        }
        resetFormScores();
    }
}

function calculateTotalScore() {
    let total = 0;
    for (let i = 1; i <= 5; i++) {
        const val = parseInt(document.getElementById(`c${i}`).value) || 0;
        document.getElementById(`c${i}-val`).textContent = val;
        total += val;
    }
    document.getElementById('live-total-score').textContent = total;
}

function resetFormScores() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`c${i}`).value = 0;
        document.getElementById(`c${i}-val`).textContent = 0;
    }
    document.getElementById('live-total-score').textContent = 0;
    document.getElementById('eval-feedback').value = '';
}

function handleEvaluationSubmit(e) {
    e.preventDefault();

    const targetTable = parseInt(document.getElementById('select-target-table').value);
    const totalScore = parseInt(document.getElementById('live-total-score').textContent);
    const feedback = document.getElementById('eval-feedback').value;

    const newEval = {
        evaluatorName: currentUser.studentName,
        evaluatorTable: currentUser.table,
        targetTable: targetTable,
        scores: {
            c1: parseInt(document.getElementById('c1').value),
            c2: parseInt(document.getElementById('c2').value),
            c3: parseInt(document.getElementById('c3').value),
            c4: parseInt(document.getElementById('c4').value),
            c5: parseInt(document.getElementById('c5').value),
        },
        totalScore: totalScore,
        feedback: feedback,
        timestamp: new Date().toISOString()
    };

    if (db) {
        db.ref("evaluations").push(newEval);
    } else {
        evaluationsData.push(newEval);
        localStorage.setItem('evaluationsData_2A', JSON.stringify(evaluationsData));
    }

    alert(`Avaliação enviada com sucesso para a Mesa 0${targetTable}! Nota Atribuída: ${totalScore}/100.`);
    onStudentSelect();
}

function loadQuizForSelectedTable() {
    const quizTableVal = document.getElementById('select-quiz-table').value;
    const quizContainer = document.getElementById('quiz-container');

    if (!quizTableVal) {
        quizContainer.classList.add('hidden');
        return;
    }

    const tId = parseInt(quizTableVal);
    currentRenderedQuiz.targetTable = tId;

    document.getElementById('quiz-table-title').textContent = `Quiz da Mesa 0${tId} - ${projectsData[tId]?.company || 'Projeto'}`;
    const previewBadge = document.getElementById('quiz-score-preview');

    const existingQuiz = quizAnswersData.find(q => q.studentName === currentUser.studentName && q.targetTable === tId);

    if (existingQuiz) {
        previewBadge.textContent = `Já respondido: Nota ${existingQuiz.scorePercent}/100`;
        previewBadge.className = "status-pill done";
    } else {
        previewBadge.textContent = "Pendente";
        previewBadge.className = "status-pill";
    }

    const rawQuestions = QUIZ_BANK[tId] || [];
    
    const shuffledQuestions = shuffleArray(rawQuestions);

    const questionsListDiv = document.getElementById('quiz-questions-list');
    questionsListDiv.innerHTML = '';
    currentRenderedQuiz.questions = [];

    shuffledQuestions.forEach((qObj, qIdx) => {
        const allOptions = [
            { text: qObj.correct, isCorrect: true },
            ...qObj.distractors.map(d => ({ text: d, isCorrect: false }))
        ];
        const shuffledOptions = shuffleArray(allOptions);

        currentRenderedQuiz.questions.push({
            originalQuestion: qObj.q,
            correctText: qObj.correct,
            options: shuffledOptions
        });

        const qBox = document.createElement('div');
        qBox.className = 'quiz-question-box';

        let optionsHTML = '';
        shuffledOptions.forEach((opt, optIdx) => {
            const radioId = `q_${qIdx}_opt_${optIdx}`;
            optionsHTML += `
                <label class="quiz-option-label" for="${radioId}">
                    <input type="radio" id="${radioId}" name="question_${qIdx}" value="${optIdx}" required ${existingQuiz ? 'disabled' : ''}>
                    <span>${opt.text}</span>
                </label>
            `;
        });

        qBox.innerHTML = `
            <h4>${qIdx + 1}. ${qObj.q}</h4>
            <div class="quiz-options">${optionsHTML}</div>
        `;

        questionsListDiv.appendChild(qBox);
    });

    const submitBtn = document.getElementById('btn-submit-quiz');
    if (existingQuiz) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Quiz Já Respondido';
    } else {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Finalizar e Salvar Respostas';
    }

    quizContainer.classList.remove('hidden');
}

function handleQuizSubmit(e) {
    e.preventDefault();

    const tId = currentRenderedQuiz.targetTable;
    let correctCount = 0;
    const totalQuestions = currentRenderedQuiz.questions.length;

    currentRenderedQuiz.questions.forEach((qData, qIdx) => {
        const selectedRadio = document.querySelector(`input[name="question_${qIdx}"]:checked`);
        if (selectedRadio) {
            const selectedOptIdx = parseInt(selectedRadio.value);
            if (qData.options[selectedOptIdx].isCorrect) {
                correctCount++;
            }
        }
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    const quizResult = {
        studentName: currentUser.studentName,
        studentTable: currentUser.table,
        targetTable: tId,
        correctAnswers: correctCount,
        totalQuestions: totalQuestions,
        scorePercent: scorePercent,
        timestamp: new Date().toISOString()
    };

    if (db) {
        db.ref("quizAnswers").push(quizResult);
    } else {
        quizAnswersData.push(quizResult);
        localStorage.setItem('quizAnswersData_2A', JSON.stringify(quizAnswersData));
    }

    alert(`Quiz da Mesa 0${tId} concluído!\nVocê acertou ${correctCount} de ${totalQuestions} questões.\nNota obtida neste quiz: ${scorePercent}/100.`);

    onStudentSelect();
    loadQuizForSelectedTable();
}

/* ==========================================================================
   LÓGICA DO PAINEL ADMINISTRATIVO (ADMIN.HTML)
   ========================================================================== */

function handleAdminLogin(e) {
    e.preventDefault();
    const pass = document.getElementById('admin-pass').value;
    const errorMsg = document.getElementById('auth-error');

    if (pass === "masaju1820") {
        document.getElementById('auth-modal').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        renderAdminReports();
        renderProjectEditTabs();
    } else {
        errorMsg.classList.remove('hidden');
    }
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

    if (tabName === 'relatorio') {
        document.getElementById('tab-relatorio').classList.remove('hidden');
        event.currentTarget.classList.add('active');
        renderAdminReports();
    } else {
        document.getElementById('tab-projetos').classList.remove('hidden');
        event.currentTarget.classList.add('active');
    }
}

function renderAdminReports() {
    const summaryBody = document.getElementById('table-summary-body');
    const studentBody = document.getElementById('student-summary-body');
    if (!summaryBody || !studentBody) return;

    summaryBody.innerHTML = '';
    studentBody.innerHTML = '';

    for (let t = 1; t <= 7; t++) {
        const evalsForTable = evaluationsData.filter(ev => ev.targetTable === t);
        const count = evalsForTable.length;
        const avgScore = count > 0 
            ? (evalsForTable.reduce((acc, curr) => acc + curr.totalScore, 0) / count).toFixed(1)
            : "Sem notas";

        const members = INITIAL_STUDENTS.filter(s => s.table === t).map(s => s.name).join(", ");

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>Mesa 0${t}</strong></td>
            <td>${projectsData[t]?.company || 'Não informada'}</td>
            <td>${count} avaliações</td>
            <td><span class="total-badge" style="font-size:0.85rem">${avgScore}</span></td>
            <td style="font-size: 0.8rem; color: var(--text-muted);">${members}</td>
        `;
        summaryBody.appendChild(tr);
    }

    INITIAL_STUDENTS.forEach(student => {
        const myTableEvals = evaluationsData.filter(ev => ev.targetTable === student.table);
        const presentationGrade = myTableEvals.length > 0
            ? (myTableEvals.reduce((acc, curr) => acc + curr.totalScore, 0) / myTableEvals.length)
            : null;

        const myQuizAnswers = quizAnswersData.filter(q => q.studentName === student.name);
        const quizGrade = myQuizAnswers.length > 0
            ? (myQuizAnswers.reduce((acc, curr) => acc + curr.scorePercent, 0) / myQuizAnswers.length)
            : null;

        let finalGradeText = "Pendente";
        if (presentationGrade !== null && quizGrade !== null) {
            finalGradeText = ((presentationGrade + quizGrade) / 2).toFixed(1);
        } else if (presentationGrade !== null) {
            finalGradeText = `${presentationGrade.toFixed(1)} (Falta Quiz)`;
        } else if (quizGrade !== null) {
            finalGradeText = `${quizGrade.toFixed(1)} (Falta Apresentação)`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${student.name}</strong></td>
            <td>Mesa 0${student.table}</td>
            <td>${presentationGrade !== null ? presentationGrade.toFixed(1) : 'N/A'}</td>
            <td>${quizGrade !== null ? `${quizGrade.toFixed(1)} (${myQuizAnswers.length}/6 quizzes)` : 'Nenhum quiz'}</td>
            <td><span class="total-badge" style="font-size:0.85rem; background: linear-gradient(135deg, #10b981, #06b6d4);">${finalGradeText}</span></td>
            <td style="text-align: center;">
                <button onclick="resetStudentData('${student.name}')" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;" title="Limpar dados do aluno">
                    <i class="fa-solid fa-rotate-left"></i> Limpar
                </button>
            </td>
        `;
        studentBody.appendChild(tr);
    });

    const statEvals = document.getElementById('stat-total-evals');
    const statQuizzes = document.getElementById('stat-total-quizzes');
    if (statEvals) statEvals.textContent = evaluationsData.length;
    if (statQuizzes) statQuizzes.textContent = quizAnswersData.length;
}

function resetStudentData(studentName) {
    if (!confirm(`Deseja apagar todas as avaliações e quizzes realizados por ${studentName}?`)) return;

    if (db) {
        db.ref("evaluations").once("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach(key => {
                    if (data[key].evaluatorName === studentName) db.ref(`evaluations/${key}`).remove();
                });
            }
        });
        db.ref("quizAnswers").once("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach(key => {
                    if (data[key].studentName === studentName) db.ref(`quizAnswers/${key}`).remove();
                });
            }
        });
    } else {
        evaluationsData = evaluationsData.filter(ev => ev.evaluatorName !== studentName);
        quizAnswersData = quizAnswersData.filter(q => q.studentName !== studentName);
        localStorage.setItem('evaluationsData_2A', JSON.stringify(evaluationsData));
        localStorage.setItem('quizAnswersData_2A', JSON.stringify(quizAnswersData));
        renderAdminReports();
    }
    alert(`Os dados de ${studentName} foram resetados com sucesso.`);
}

function resetAllEvaluations() {
    if (!confirm("ATENÇÃO: Deseja apagar TODAS as avaliações e quizzes de TODOS os estudantes?")) return;

    if (db) {
        db.ref("evaluations").remove();
        db.ref("quizAnswers").remove();
    }
    evaluationsData = [];
    quizAnswersData = [];
    localStorage.removeItem('evaluationsData_2A');
    localStorage.removeItem('quizAnswersData_2A');
    renderAdminReports();
    alert("Todos os dados do evento foram zerados!");
}

function renderProjectEditTabs() {
    const container = document.getElementById('project-edit-tabs');
    if (!container) return;
    container.innerHTML = '';

    for (let t = 1; t <= 7; t++) {
        const btn = document.createElement('button');
        btn.className = `tbl-sel-btn ${t === 1 ? 'active' : ''}`;
        btn.textContent = `Mesa 0${t}`;
        btn.onclick = () => loadProjectFormForTable(t);
        container.appendChild(btn);
    }
    loadProjectFormForTable(1);
}

function loadProjectFormForTable(tableId) {
    document.querySelectorAll('.tbl-sel-btn').forEach((b, idx) => {
        b.classList.toggle('active', (idx + 1) === tableId);
    });

    const p = projectsData[tableId] || {};
    document.getElementById('edit-table-id').value = tableId;
    document.getElementById('edit-company-name').value = p.company || '';
    document.getElementById('edit-pain').value = p.pain || '';
    document.getElementById('edit-solution').value = p.solution || '';
    document.getElementById('edit-story').value = p.story || '';
    document.getElementById('edit-mockup').value = p.mockup || '';
}

function saveProjectData(e) {
    e.preventDefault();
    const tId = parseInt(document.getElementById('edit-table-id').value);

    projectsData[tId] = {
        company: document.getElementById('edit-company-name').value,
        pain: document.getElementById('edit-pain').value,
        solution: document.getElementById('edit-solution').value,
        story: document.getElementById('edit-story').value,
        mockup: document.getElementById('edit-mockup').value
    };

    localStorage.setItem('projectsData_2A', JSON.stringify(projectsData));

    if (db) {
        db.ref(`projects/${tId}`).set(projectsData[tId]);
    }

    alert(`Dados da Mesa 0${tId} atualizados com sucesso!`);
}

function exportReportPDF() {
    const element = document.getElementById('pdf-report-area');
    const opt = {
        margin:       [10, 10, 10, 10],
        filename:     'Relatorio_Desempenho_Turma_2A.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, backgroundColor: '#0d1322' },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
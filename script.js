/* ==========================================================================
   CONFIGURAÇÃO & DADOS INICIAIS - FEIRA DE INOVAÇÃO TURMA 2A
   ========================================================================== */

// Configuração do Firebase com suas chaves reais do aplicativo
const firebaseConfig = {
    apiKey: "AIzaSyBDPFhmP973Q_19AbhIClUdKeZKdTKipKY",
    authDomain: "avalia-projetos-2a.firebaseapp.com",
    databaseURL: "https://avalia-projetos-2a-default-rtdb.firebaseio.com",
    projectId: "avalia-projetos-2a",
    storageBucket: "avalia-projetos-2a.firebasestorage.app",
    messagingSenderId: "516604701570",
    appId: "1:516604701570:web:df34ceb5dd9e00a0cfbd9b"
};

// Mapeamento Oficial dos 37 Estudantes divididos nas Mesas 1 a 7
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

// Projetos Iniciais das Mesas (1 a 7)
const DEFAULT_PROJECTS = {
    1: { company: "Projeto Mesa 1", pain: "Dor não cadastrada ainda", solution: "Solução não cadastrada", story: "Storytelling pendente", mockup: "" },
    2: { company: "Projeto Mesa 2", pain: "Dor não cadastrada ainda", solution: "Solução não cadastrada", story: "Storytelling pendente", mockup: "" },
    3: { company: "Projeto Mesa 3", pain: "Dor não cadastrada ainda", solution: "Solução não cadastrada", story: "Storytelling pendente", mockup: "" },
    4: { company: "Projeto Mesa 4", pain: "Dor não cadastrada ainda", solution: "Solução não cadastrada", story: "Storytelling pendente", mockup: "" },
    5: { company: "Projeto Mesa 5", pain: "Dor não cadastrada ainda", solution: "Solução não cadastrada", story: "Storytelling pendente", mockup: "" },
    6: { company: "Projeto Mesa 6", pain: "Dor não cadastrada ainda", solution: "Solução não cadastrada", story: "Storytelling pendente", mockup: "" },
    7: { company: "Projeto Mesa 7", pain: "Dor não cadastrada ainda", solution: "Solução não cadastrada", story: "Storytelling pendente", mockup: "" }
};

/* ==========================================================================
   INICIALIZAÇÃO DO FIREBASE & SINCRONIZAÇÃO EM TEMPO REAL
   ========================================================================== */

let db = null;
let projectsData = JSON.parse(localStorage.getItem('projectsData_2A')) || DEFAULT_PROJECTS;
let evaluationsData = JSON.parse(localStorage.getItem('evaluationsData_2A')) || [];

let currentUser = {
    table: null,
    studentName: null
};

try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();

        // Sincroniza avaliações em tempo real do Firebase Realtime Database
        db.ref("evaluations").on("value", (snapshot) => {
            evaluationsData = [];
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach(key => {
                    evaluationsData.push({ ...data[key], _id: key });
                });
            }
            localStorage.setItem('evaluationsData_2A', JSON.stringify(evaluationsData));
            if (typeof renderAdminReports === 'function') {
                renderAdminReports();
            }
        });

        // Sincroniza informações atualizadas dos projetos das mesas
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
   LÓGICA DA PÁGINA DO ESTUDANTE (INDEX.HTML)
   ========================================================================== */

function onTableSelect() {
    const tableSelect = document.getElementById('select-my-table');
    const studentSelect = document.getElementById('select-student');
    const welcomeBox = document.getElementById('student-welcome');
    const stepEvaluate = document.getElementById('step-evaluate');
    
    const selectedTable = parseInt(tableSelect.value);
    studentSelect.innerHTML = '<option value="">-- Selecione seu nome --</option>';
    
    if (!selectedTable) {
        studentSelect.disabled = true;
        welcomeBox.classList.add('hidden');
        stepEvaluate.classList.add('disabled-card');
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

    currentUser.table = parseInt(tableSelect.value);
    currentUser.studentName = studentSelect.value;

    if (!currentUser.studentName) {
        welcomeBox.classList.add('hidden');
        stepEvaluate.classList.add('disabled-card');
        return;
    }

    welcomeName.textContent = `${currentUser.studentName} (Mesa ${currentUser.table})`;
    welcomeBox.classList.remove('hidden');
    stepEvaluate.classList.remove('disabled-card');

    targetTableSelect.innerHTML = '<option value="">-- Selecione a mesa para avaliar --</option>';
    for (let t = 1; t <= 7; t++) {
        if (t !== currentUser.table) {
            const opt = document.createElement('option');
            opt.value = t;
            opt.textContent = `Mesa 0${t} - ${projectsData[t]?.company || 'Projeto'}`;
            targetTableSelect.appendChild(opt);
        }
    }
    targetTableSelect.disabled = false;
}

function loadTargetTableDetails() {
    const targetTableVal = document.getElementById('select-target-table').value;
    const detailsCard = document.getElementById('project-details-card');
    const evalForm = document.getElementById('evaluation-form');

    if (!targetTableVal) {
        detailsCard.classList.add('hidden');
        evalForm.classList.add('hidden');
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
    resetFormScores();
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

    // Salva na nuvem no Firebase Realtime Database
    if (db) {
        db.ref("evaluations").push(newEval);
    } else {
        evaluationsData.push(newEval);
        localStorage.setItem('evaluationsData_2A', JSON.stringify(evaluationsData));
    }

    alert(`Avaliação enviada com sucesso para a Mesa ${targetTable}! Nota Atribuída: ${totalScore}/100.`);
    
    document.getElementById('select-target-table').value = "";
    document.getElementById('project-details-card').classList.add('hidden');
    document.getElementById('evaluation-form').classList.add('hidden');
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

    // 1. Resumo por Mesa
    for (let t = 1; t <= 7; t++) {
        const evalsForTable = evaluationsData.filter(ev => ev.targetTable === t);
        const count = evalsForTable.length;
        const avg = count > 0 
            ? (evalsForTable.reduce((acc, curr) => acc + curr.totalScore, 0) / count).toFixed(1)
            : "Sem avaliações";

        const members = INITIAL_STUDENTS.filter(s => s.table === t).map(s => s.name).join(", ");

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>Mesa 0${t}</strong></td>
            <td>${projectsData[t]?.company || 'Não informada'}</td>
            <td>${count} colegas avaliaram</td>
            <td><span class="total-badge" style="font-size:0.85rem">${avg}</span></td>
            <td style="font-size: 0.8rem; color: var(--text-muted);">${members}</td>
        `;
        summaryBody.appendChild(tr);
    }

    // 2. Resumo por Estudante com Botão de Limpeza Individual
    INITIAL_STUDENTS.forEach(student => {
        const myEvalsDone = evaluationsData.filter(ev => ev.evaluatorName === student.name).length;
        const myTableEvals = evaluationsData.filter(ev => ev.targetTable === student.table);
        const myTableAvg = myTableEvals.length > 0
            ? (myTableEvals.reduce((acc, curr) => acc + curr.totalScore, 0) / myTableEvals.length).toFixed(1)
            : "N/A";

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${student.name}</strong></td>
            <td>Mesa 0${student.table}</td>
            <td>${myEvalsDone} mesas avaliadas</td>
            <td>
                ${myEvalsDone > 0 
                    ? '<span style="color:var(--success)"><i class="fa-solid fa-circle-check"></i> Participou</span>' 
                    : '<span style="color:var(--text-muted)"><i class="fa-solid fa-clock"></i> Pendente</span>'}
            </td>
            <td><strong>${myTableAvg}</strong></td>
            <td style="text-align: center;">
                ${myEvalsDone > 0 
                    ? `<button onclick="resetStudentEvaluations('${student.name}')" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;" title="Zerar votos deste aluno">
                        <i class="fa-solid fa-rotate-left"></i> Limpar
                       </button>` 
                    : '<span style="color: var(--text-muted); font-size: 0.75rem;">-</span>'}
            </td>
        `;
        studentBody.appendChild(tr);
    });

    document.getElementById('stat-total-evals').textContent = evaluationsData.length;
}

// Limpa individualmente do Firebase as avaliações feitas por um estudante
function resetStudentEvaluations(studentName) {
    if (!confirm(`Deseja apagar todas as avaliações feitas por ${studentName}?`)) return;

    if (db) {
        db.ref("evaluations").once("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach(key => {
                    if (data[key].evaluatorName === studentName) {
                        db.ref(`evaluations/${key}`).remove();
                    }
                });
            }
        });
    } else {
        evaluationsData = evaluationsData.filter(ev => ev.evaluatorName !== studentName);
        localStorage.setItem('evaluationsData_2A', JSON.stringify(evaluationsData));
        renderAdminReports();
    }
    alert(`As avaliações de ${studentName} foram apagadas.`);
}

// Zera TODAS as avaliações do Realtime Database
function resetAllEvaluations() {
    if (!confirm("ATENÇÃO: Você tem certeza que deseja APAGAR TODAS as avaliações?")) return;

    if (db) {
        db.ref("evaluations").remove();
    }
    evaluationsData = [];
    localStorage.removeItem('evaluationsData_2A');
    renderAdminReports();
    alert("Todas as avaliações foram zeradas com sucesso!");
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
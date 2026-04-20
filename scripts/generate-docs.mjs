import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const docsDir = path.join(root, 'content', 'docs');

const moduleTitles = {
  '01-fundamentos': 'Fundamentos',
  '02-qa-manual': 'QA manual',
  '03-testes-api': 'Testes de API',
  '04-automacao-e2e': 'Automação E2E',
  '05-cicd': 'CI/CD',
  '06-soft-skills': 'Soft skills',
  '07-meus-projetos': 'Meus projetos',
  '08-entrevista': 'Entrevista',
  '09-glossario': 'Glossário',
};

const modules = [];
const glossaryCards = [];
const q = (question, options, correctIndex, explanation) => ({
  question,
  options,
  correctIndex,
  explanation,
});

modules.push(
  {
    folder: '01-fundamentos',
    chapters: [
      {
        slug: 'o-que-e-qa',
        title: 'O que é QA',
        description: 'Conceitos de QA, QC e papel no time ágil.',
        checklistId: '01-fundamentos-o-que-e-qa',
        difficulty: 'iniciante',
        minutes: 18,
        heading: 'Quality Assurance de verdade',
        coreIdea:
          'Quality Assurance é a disciplina que organiza prevenção, detecção e comunicação de risco de qualidade ao longo de todo o ciclo de desenvolvimento. Diferente da visão limitada de “pessoa que testa no final”, QA trabalha para que requisito, processo, evidência e decisão de release conversem entre si.',
        marketImpact:
          'No mercado brasileiro, muitas vagas júnior ainda misturam QA, tester manual e QC no mesmo anúncio. Saber explicar a diferença ajuda você a não entrar em projeto olhando apenas tela e botão, porque a empresa espera alguém que também questione fluxo, critérios de aceite, cobertura e risco.',
        exampleScenario:
          'Imagine um squad de e-commerce preparando a campanha de Dia das Mães. Se o QA atuar só no fim, ele talvez descubra erro de cupom tarde demais. Se atuar como QA de verdade, ele entra antes: revisa regra promocional, pede cenário negativo, valida logging, pensa smoke e ajuda o time a evitar retrabalho.',
        dailySignals:
          'Você percebe a presença de QA quando alguém transforma requisito ambíguo em pergunta testável, quando uma decisão de release é sustentada por evidência e quando o time corrige causa raiz em vez de só apagar incêndio em bug isolado.',
        artifactIntro:
          'Um artefato valioso para este capítulo é uma tabela simples separando QA, QC e execução de teste em responsabilidades práticas. Esse quadro ajuda muito em entrevista, porque evita resposta abstrata e mostra que você entende o papel no contexto do time.',
        artifactWrapup:
          'No portfólio, essa tabela pode virar uma seção de README ou um diagrama curto dentro do handbook, mostrando como você enxerga prevenção, detecção e comunicação em etapas diferentes do ciclo.',
        commonMistake:
          'O erro mais comum é responder “QA é quem testa” e parar por aí. Essa frase não está totalmente errada, mas é curta demais para representar o trabalho real e passa a impressão de que qualidade só entra depois que dev termina.',
        practiceTask:
          'Pegue um requisito simples do seu portfólio e escreva três ações de QA antes do desenvolvimento, três durante a implementação e três depois da entrega. Esse exercício obriga você a sair do modelo “teste no final” e pensar qualidade como sistema.',
        interviewAngle:
          'Uma resposta forte em entrevista costuma começar dizendo que QA não é só execução de teste; é gestão de confiança no produto. Depois, cite como isso aparece em refinamento, cobertura de risco, bug report e recomendação de release.',
        quiz: q(
          'Qual frase descreve melhor o papel de QA em um time ágil?',
          [
            'QA existe apenas para executar testes manuais no fim do sprint',
            'QA ajuda o time a prevenir, detectar e comunicar risco de qualidade ao longo do fluxo',
            'QA substitui o PO na validação de regra de negócio',
            'QA é sinônimo exato de suporte ao cliente',
          ],
          1,
          'A visão mais completa de QA inclui prevenção, detecção e comunicação de risco. Testar é parte do trabalho, mas não resume a disciplina.',
        ),
        takeaways: [
          'QA é disciplina de prevenção, detecção e comunicação de risco, não só execução de testes no final.',
          'No mercado brasileiro, saber diferenciar QA, QC e tester melhora sua leitura de vaga e sua fala em entrevista.',
          'O valor do QA aparece quando requisito, evidência e decisão de release ficam mais claros para o time.',
          'Comece a praticar pensando em ações antes, durante e depois do desenvolvimento.',
        ],
      },
      {
        slug: 'piramide-de-testes',
        title: 'Pirâmide de testes',
        description: 'Cohn, troféu, ampulheta e o que usar no dia a dia.',
        checklistId: '01-fundamentos-piramide-de-testes',
        difficulty: 'iniciante',
        minutes: 20,
        heading: 'Base sólida de automação',
        coreIdea:
          'A pirâmide de testes é um modelo mental para distribuir cobertura entre camadas com custos diferentes. A base tende a ter testes mais rápidos, baratos e numerosos; o topo concentra testes mais lentos, caros e amplos, como E2E.',
        marketImpact:
          'Em times brasileiros com budget apertado, a pirâmide evita o erro clássico de querer provar maturidade só aumentando E2E. Suite desequilibrada custa caro em manutenção, torna pipeline lenta e dá falsa sensação de cobertura porque o topo não substitui contrato, regra e unidade.',
        exampleScenario:
          'Pense em um produto com checkout, autenticação e integração com estoque. Se tudo for validado apenas por fluxo web completo, qualquer mudança de UI pode quebrar vários testes ao mesmo tempo. Ao distribuir cobertura entre API, integração e E2E, o time localiza defeito mais rápido e com menos ruído.',
        dailySignals:
          'Sinais de desequilíbrio aparecem quando a pipeline demora demais, quando um seletor quebrado derruba a confiança do time inteiro ou quando a investigação de falha sempre começa no browser mesmo para problemas claramente de contrato ou regra de negócio.',
        artifactIntro:
          'Um ótimo artefato para este tema é um diagrama simples mostrando a cobertura desejada para um sistema do seu portfólio. Você pode desenhar quantos cenários ficariam em API, quantos em E2E e quais seriam apenas manuais ou exploratórios.',
        artifactWrapup:
          'Esse tipo de mapa comunica estratégia, não só ferramenta. Ele mostra que você pensa em custo de manutenção, velocidade de feedback e risco de negócio ao distribuir os testes.',
        commonMistake:
          'Muita gente aprende a pirâmide como regra rígida e passa a repetir proporções mágicas sem olhar o contexto do produto. O modelo é guia de decisão, não receita fixa para todos os sistemas.',
        practiceTask:
          'Escolha um fluxo do seu portfólio e classifique cada verificação importante por camada: o que cabe em API, o que precisa de UI, o que fica melhor como exploração manual e o que talvez nem valha automatizar agora.',
        interviewAngle:
          'Em entrevista, explique a pirâmide relacionando custo, velocidade e estabilidade. Vale dizer que você não vê E2E como vilão, mas como camada mais cara que deve ser usada para jornadas críticas e não para tudo.',
        quiz: q(
          'Qual problema a pirâmide de testes ajuda a evitar?',
          [
            'Que o time escreva qualquer teste automatizado',
            'Que toda a cobertura fique concentrada em testes caros e lentos no topo',
            'Que QA faça teste manual exploratório',
            'Que API tenha autenticação',
          ],
          1,
          'A pirâmide organiza cobertura para evitar dependência excessiva de testes amplos, lentos e frágeis, como E2E usados de forma indiscriminada.',
        ),
        takeaways: [
          'A pirâmide de testes é um modelo de distribuição de cobertura baseado em custo, velocidade e estabilidade.',
          'Suite madura não é a que tem mais E2E, e sim a que localiza defeito com feedback rápido e manutenção viável.',
          'Sinais de desequilíbrio aparecem em pipeline lenta, investigação demorada e automação frágil.',
          'Use a pirâmide como guia de decisão, não como proporção mágica.',
        ],
      },
      {
        slug: 'tipos-de-teste',
        title: 'Tipos de teste',
        description: 'Smoke, regressão, carga, acessibilidade e mais.',
        checklistId: '01-fundamentos-tipos-de-teste',
        difficulty: 'iniciante',
        minutes: 22,
        heading: 'Mapa dos tipos mais cobrados em entrevista',
        coreIdea:
          'Tipos de teste são recortes de objetivo, não nomes bonitos para parecer técnico. Smoke, regressão, integração, acessibilidade, performance e exploratório existem porque respondem perguntas diferentes sobre o produto e sobre o risco do release.',
        marketImpact:
          'No mercado brasileiro, é muito comum a vaga pedir “conhecimento em vários tipos de teste” sem deixar claro profundidade. Saber diferenciar finalidade, momento de uso e custo de cada tipo impede respostas genéricas e melhora muito sua priorização quando o tempo aperta.',
        exampleScenario:
          'Imagine uma entrega pequena em cadastro de usuário. Smoke responde se o caminho principal continua vivo. Regressão olha se a mudança afetou áreas já estáveis. Acessibilidade verifica se o formulário continua utilizável por tecnologias assistivas. Performance observa se a validação nova piorou resposta. Cada tipo responde uma pergunta distinta.',
        dailySignals:
          'Quando o time chama tudo de regressão ou tudo de smoke, geralmente está faltando clareza de objetivo. Outro sinal é quando ninguém sabe dizer por que um teste existe além de “sempre rodamos isso”.',
        artifactIntro:
          'Você pode transformar este capítulo em uma matriz de decisão simples: coluna com o tipo de teste, pergunta que ele responde, melhor camada para executá-lo e momento mais comum de uso no fluxo do time.',
        artifactWrapup:
          'Essa matriz é extremamente útil para estudo e para trabalho, porque ajuda a evitar sobreposição inútil entre testes e melhora a conversa sobre escopo quando a janela de validação é curta.',
        commonMistake:
          'Erro clássico: usar nome de tipo de teste como sinônimo de qualquer execução. Smoke não é “qualquer teste rápido”; regressão não é “rodar tudo”; exploratório não é “testar sem pensar”.',
        practiceTask:
          'Pegue um bug real ou plausível do seu projeto e escreva qual tipo de teste teria maior chance de encontrá-lo cedo, qual camada faria isso mais barato e que evidência você apresentaria ao time depois.',
        interviewAngle:
          'Quando perguntarem sobre tipos de teste, organize a resposta por objetivo. Dizer “este tipo responde tal pergunta do produto” é muito melhor do que listar siglas sem explicar valor.',
        quiz: q(
          'Qual é a melhor forma de diferenciar tipos de teste na prática?',
          [
            'Pelo nome mais popular em curso online',
            'Pela ferramenta usada para executá-los',
            'Pela pergunta de qualidade e risco que cada tipo responde',
            'Pelo tamanho do backlog da sprint',
          ],
          2,
          'Tipos de teste existem para responder perguntas diferentes sobre o sistema. Ferramenta e velocidade importam, mas a melhor distinção nasce do objetivo.',
        ),
        takeaways: [
          'Tipos de teste são recortes de objetivo e risco, não apenas rótulos.',
          'Diferenciar smoke, regressão, acessibilidade e performance melhora a priorização quando o tempo aperta.',
          'Nome sem pergunta clara gera suite redundante e comunicação ruim.',
          'Explique tipos de teste sempre relacionando objetivo, camada e evidência.',
        ],
      },
      {
        slug: 'severidade-vs-prioridade',
        title: 'Severidade vs prioridade',
        description: 'Matriz real de decisão com exemplos.',
        checklistId: '01-fundamentos-severidade-vs-prioridade',
        difficulty: 'iniciante',
        minutes: 18,
        heading: 'Quando parar o release',
        coreIdea:
          'Severidade mede o impacto técnico ou funcional do defeito sobre o produto e sobre o usuário. Prioridade mede a urgência de tratar aquele problema dentro do contexto do negócio. As duas dimensões conversam, mas não são sinônimos.',
        marketImpact:
          'Em empresas brasileiras, a confusão entre severidade e prioridade ainda aparece bastante, especialmente quando o time está pressionado por release. QA que domina essa diferença ajuda a equipe a discutir bug com menos emoção e mais critério.',
        exampleScenario:
          'Um erro de ortografia no banner principal pode ter baixa severidade técnica, mas prioridade alta se a campanha vai ao ar em poucas horas. Já um defeito escondido atrás de permissão rara pode ter severidade alta e prioridade negociável, dependendo do alcance. Contexto importa tanto quanto impacto.',
        dailySignals:
          'Você percebe maturidade quando o time registra impacto no usuário, alcance, workaround e momento do negócio antes de decidir urgência. Quando a conversa vira apenas “isso me irritou” ou “o cliente reclamou”, falta critério.',
        artifactIntro:
          'Uma boa prática é montar uma matriz simples com exemplos do seu produto, combinando severidade e prioridade em cenários reais. Isso ajuda muito porque a teoria só fixa quando você enxerga trade-off em casos plausíveis.',
        artifactWrapup:
          'No portfólio, essa matriz pode acompanhar um bug report ou uma recomendação de release, mostrando que você não classifica defeito por instinto, e sim por impacto e urgência contextual.',
        commonMistake:
          'O erro mais comum é usar as duas palavras como se fossem a mesma coisa. Outro desvio frequente é achar que QA decide prioridade sozinho, quando na prática a urgência costuma ser negociada com produto e liderança.',
        practiceTask:
          'Separe cinco bugs do seu portfólio, reais ou simulados, e classifique cada um com severidade e prioridade. Depois, escreva uma frase justificando a diferença entre as duas notas.',
        interviewAngle:
          'Se essa pergunta cair em entrevista, responda com definição curta e imediatamente cite um exemplo em que severidade e prioridade ficaram diferentes. Esse contraste mostra entendimento de verdade.',
        quiz: q(
          'Qual afirmação representa corretamente a diferença entre severidade e prioridade?',
          [
            'Severidade e prioridade são nomes diferentes para a mesma classificação',
            'Severidade mede impacto; prioridade mede urgência de tratamento no contexto do negócio',
            'Prioridade é sempre definida só pelo QA',
            'Severidade depende apenas do número de telas afetadas',
          ],
          1,
          'Severidade fala de impacto do defeito. Prioridade fala de urgência, que depende também de contexto de negócio, prazo, campanha e workaround.',
        ),
        takeaways: [
          'Severidade mede impacto; prioridade mede urgência.',
          'As duas dimensões podem divergir no mesmo bug sem contradição.',
          'Classificação madura exige contexto de negócio, alcance e workaround.',
          'Tenha exemplos práticos prontos para explicar essa diferença em entrevista.',
        ],
      },
      {
        slug: 'ciclo-de-vida-bug',
        title: 'Ciclo de vida do bug',
        description: 'Estados, responsáveis e SLAs informais.',
        checklistId: '01-fundamentos-ciclo-de-vida-bug',
        difficulty: 'iniciante',
        minutes: 18,
        heading: 'Do New ao Closed',
        coreIdea:
          'O ciclo de vida do bug organiza o caminho de um defeito desde a descoberta até o fechamento, incluindo triagem, confirmação, correção, reteste e eventual reabertura. Ele existe para criar previsibilidade e rastreabilidade, não para encher ferramenta de status sem sentido.',
        marketImpact:
          'No Brasil, muitos times usam Jira, Azure DevOps ou trackers mais simples com fluxos adaptados. Mesmo quando o nome dos status muda, o racional continua: descobrir, validar, priorizar, corrigir, retestar e fechar com evidência.',
        exampleScenario:
          'Pense em um bug de checkout aberto por QA. Primeiro ele entra como novo. Depois é triado, confirmado pelo dev, entra em andamento, segue para ambiente de teste, é retestado pelo QA e finalmente fechado. Se a correção resolver só parte do problema, o item pode ser reaberto com novo contexto.',
        dailySignals:
          'Sinais de fluxo saudável aparecem quando cada mudança de status tem responsável claro e evidência mínima. Sinais de fluxo ruim aparecem quando ticket anda de coluna sem contexto, morre em espera eterna ou fecha sem reteste registrado.',
        artifactIntro:
          'Vale montar um fluxograma curto com os status usados pelo seu time ou pelo seu portfólio. O foco não é decorar nome exato da coluna, e sim mostrar quem faz o quê em cada etapa e que informação precisa acompanhar a mudança.',
        artifactWrapup:
          'Esse tipo de fluxograma ajuda muito quando você precisa explicar processo para alguém novo no time ou justificar por que um bug não deveria ser fechado ainda.',
        commonMistake:
          'Erro recorrente: tratar mudança de status como burocracia irrelevante. Quando o fluxo é mal cuidado, o time perde rastreabilidade, esquece reteste e deixa defeito crítico parecer resolvido antes da hora.',
        practiceTask:
          'Escolha um bug do seu portfólio e escreva o histórico ideal de status, incluindo o que precisaria estar descrito em cada transição para que qualquer pessoa entendesse o estágio real do problema.',
        interviewAngle:
          'Em entrevista, mostre que você entende o ciclo de vida do bug como fluxo de decisão e evidência. Isso é melhor do que listar status em inglês sem explicar responsabilidade e critério de passagem.',
        quiz: q(
          'Qual é o principal objetivo de um ciclo de vida de bug bem definido?',
          [
            'Criar mais colunas para o board parecer complexo',
            'Garantir rastreabilidade, responsabilidade e reteste antes do fechamento',
            'Permitir que o bug seja fechado pelo primeiro dev disponível',
            'Evitar que QA escreva evidência',
          ],
          1,
          'O ciclo de vida do bug existe para dar visibilidade, responsabilidade e controle ao fluxo de correção, incluindo reteste e possibilidade de reabertura.',
        ),
        takeaways: [
          'O ciclo de vida do bug organiza descoberta, triagem, correção, reteste e fechamento.',
          'Status sem responsabilidade e evidência viram burocracia vazia.',
          'Fechamento saudável depende de reteste e rastreabilidade.',
          'Explique o fluxo pensando em decisão, não só em nomes de colunas.',
        ],
      },
      {
        slug: 'metodologias-ageis',
        title: 'Metodologias ágeis',
        description: 'Scrum, Kanban, DoR e DoD com foco em QA.',
        checklistId: '01-fundamentos-metodologias-ageis',
        difficulty: 'iniciante',
        minutes: 20,
        heading: 'Onde você entra em cada cerimônia',
        coreIdea:
          'Metodologia ágil, para QA, não é sobre decorar cerimônia. É sobre entender em que momento qualidade precisa aparecer para evitar surpresa no fim da sprint. Scrum, Kanban, DoR e DoD são estruturas que ajudam o time a combinar fluxo, expectativa e responsabilidade.',
        marketImpact:
          'No mercado brasileiro, muitas equipes dizem ser ágeis, mas operam com mistura de práticas. Por isso, o QA júnior precisa menos de ortodoxia de framework e mais de clareza sobre onde questionar requisito, negociar escopo, preparar evidência e proteger o release.',
        exampleScenario:
          'Num time Scrum, o QA pode entrar no refinement para transformar critério de aceite em cenário testável, na planning para dimensionar esforço de validação, na daily para sinalizar bloqueio, na review para mostrar evidência e na retro para discutir gargalo de qualidade. Em Kanban, o raciocínio é parecido, só muda a cadência formal.',
        dailySignals:
          'Você percebe maturidade ágil quando DoR impede tarefa mal definida de entrar, quando DoD inclui qualidade real e quando QA participa cedo em vez de receber história pronta no fim. O oposto também é fácil de notar: requisito nebuloso, QA espremido no final e bug usado como substituto de alinhamento.',
        artifactIntro:
          'Um artefato útil aqui é um mapa de participação do QA por cerimônia ou etapa do fluxo. Liste objetivo da reunião, pergunta que o QA deveria levar e saída concreta esperada para qualidade.',
        artifactWrapup:
          'Esse mapa é valioso porque te ajuda a enxergar agilidade como mecanismo de feedback, e não como agenda de reuniões obrigatórias.',
        commonMistake:
          'Muita gente associa agilidade a velocidade cega e conclui que QA atrasa o sprint. Na prática, o atraso mais caro costuma vir justamente quando qualidade entra tarde demais e vira retrabalho.',
        practiceTask:
          'Revise um projeto seu e escreva em que momento cada decisão de qualidade deveria ter acontecido: antes da codificação, durante o desenvolvimento, no PR, na pipeline ou na review.',
        interviewAngle:
          'Quando perguntarem sobre ágil, mostre como QA entra cedo e ajuda o time a reduzir surpresa, não só “participa de daily”. Fale de DoR, DoD, risco e critério testável.',
        quiz: q(
          'Qual é uma boa leitura do papel do QA em métodos ágeis?',
          [
            'QA entra só depois que desenvolvimento termina',
            'QA participa cedo para tornar requisito testável e reduzir surpresa no fim do fluxo',
            'QA substitui todas as cerimônias por execução manual',
            'QA é responsável sozinho por DoD',
          ],
          1,
          'Metodologia ágil bem aplicada puxa qualidade para antes do fim da sprint. O papel do QA é aumentar clareza, previsibilidade e feedback cedo.',
        ),
        takeaways: [
          'Ágil para QA é sobre ponto de entrada de qualidade, não sobre decorar cerimônias.',
          'DoR e DoD são ferramentas poderosas para reduzir surpresa e retrabalho.',
          'QA agrega valor quando participa cedo com pergunta testável e visão de risco.',
          'Explique Scrum e Kanban sempre pelo efeito no fluxo de qualidade.',
        ],
      },
    ],
  },
  {
    folder: '02-qa-manual',
    chapters: [
      {
        slug: 'casos-de-teste',
        title: 'Casos de teste',
        description: 'Anatomia profissional e templates reais.',
        checklistId: '02-qa-manual-casos-de-teste',
        difficulty: 'iniciante',
        minutes: 20,
        heading: 'Como documentar sem enrolação',
        coreIdea:
          'Caso de teste é um artefato que descreve pré-condição, ação, dado e resultado esperado de forma que outra pessoa consiga executar e chegar à mesma leitura do comportamento do sistema. Ele não existe para encher planilha; existe para reduzir ambiguidade.',
        marketImpact:
          'No mercado brasileiro, QA júnior muitas vezes entra em times com documentação desigual. Saber escrever caso de teste enxuto e útil vira vantagem imediata, porque você consegue organizar conhecimento do produto mesmo quando o processo ainda não está maduro.',
        exampleScenario:
          'Imagine um fluxo de login com bloqueio após múltiplas tentativas inválidas. Um caso fraco diria apenas “testar login”. Um caso bom separa pré-condição, dado inválido, número de tentativas, mensagem esperada, impacto no usuário e critério para considerar a proteção funcionando.',
        dailySignals:
          'Você sabe que o caso de teste está bom quando outra pessoa consegue executá-lo sem adivinhar regra de negócio. Se o executor precisa perguntar “mas qual usuário?”, “qual ambiente?” ou “o que exatamente espero ver?”, o artefato ainda está vago.',
        artifactIntro:
          'Aqui vale muito construir um template próprio com campos mínimos: objetivo, pré-condição, passos, dados, esperado e observação de risco. O formato pode ser tabela, issue ou markdown; o mais importante é a clareza operacional.',
        artifactWrapup:
          'Ter um template próprio facilita consistência entre projetos e mostra maturidade de documentação mesmo quando a empresa ainda não te entrega um padrão pronto.',
        commonMistake:
          'Erro clássico: transformar caso de teste em romance gigantesco ou, no extremo oposto, em frase curta demais. Os dois extremos atrapalham. Bom caso de teste é específico o suficiente para orientar, mas enxuto o suficiente para ser lido.',
        practiceTask:
          'Pegue um fluxo do seu portfólio e escreva três casos: caminho feliz, validação de erro e borda de regra. Depois peça para outra pessoa ler e diga onde ela travou. Esse feedback mostra onde a ambiguidade ainda está escondida.',
        interviewAngle:
          'Em entrevista, mostre que você sabe balancear detalhe e manutenção. Diga que nem tudo precisa virar caso formal, mas quando o risco ou a repetibilidade exigem, um bom caso economiza ruído para todo o time.',
        quiz: q(
          'Qual é uma característica central de um bom caso de teste manual?',
          [
            'Ele é o maior texto possível para evitar dúvidas',
            'Ele permite execução consistente com pré-condições, dados e esperado claros',
            'Ele serve apenas para auditoria e não para o time',
            'Ele substitui análise de risco',
          ],
          1,
          'Caso de teste bom reduz ambiguidade e permite execução consistente. Tamanho por si só não significa qualidade.',
        ),
        takeaways: [
          'Caso de teste serve para reduzir ambiguidade e preservar conhecimento executável.',
          'Detalhe demais e detalhe de menos atrapalham do mesmo jeito.',
          'Template simples, consistente e reutilizável costuma funcionar melhor do que documento pesado.',
          'Use feedback de outra pessoa executando para validar clareza.',
        ],
      },
      {
        slug: 'checklists',
        title: 'Checklists',
        description: 'Smoke, cross-browser e release.',
        checklistId: '02-qa-manual-checklists',
        difficulty: 'iniciante',
        minutes: 16,
        heading: 'Quando checklist vence caso detalhado',
        coreIdea:
          'Checklist é um artefato de validação rápida orientado por itens críticos, especialmente útil quando o fluxo precisa ser repetido com frequência e a equipe já domina o contexto. Ele não substitui todo caso de teste, mas reduz tempo de execução em cenários bem conhecidos.',
        marketImpact:
          'Em times brasileiros com janela curta de release, checklist bem montado é ouro. Ele ajuda smoke, sanity, revisão pós-hotfix e validação de rotina sem exigir releitura completa de casos detalhados a cada entrega pequena.',
        exampleScenario:
          'Pense em uma publicação semanal com pequenas mudanças de catálogo. Em vez de abrir dezenas de casos formais, o QA usa checklist de release com itens críticos: login, busca, carrinho, checkout, mensagens principais e fluxo administrativo essencial. O foco é confirmar sobrevivência do sistema rapidamente.',
        dailySignals:
          'Checklist funciona melhor quando o produto já tem um fluxo relativamente conhecido e quando a pergunta principal é “o sistema continua de pé?”. Se a funcionalidade é nova ou a regra está mudando muito, talvez um caso mais detalhado ainda seja o melhor caminho.',
        artifactIntro:
          'Crie um checklist de smoke separado por risco de negócio, não por ordem de tela. Comece pelos itens que derrubam valor rápido para usuário ou receita, e só depois pense em conveniências e detalhes secundários.',
        artifactWrapup:
          'Quando o checklist está organizado por risco, ele fica muito mais útil em dias corridos porque a equipe consegue cortar escopo conscientemente se o tempo apertar.',
        commonMistake:
          'Erro comum: transformar checklist em lista infinita que perde a função de rapidez. Outro erro é usar checklist para funcionalidade inédita e complexa, onde ainda falta entendimento para resumir bem.',
        practiceTask:
          'Monte dois checklists para o mesmo produto: um de smoke para PR pequeno e um de release maior. Compare os itens e justifique por que alguns aparecem nos dois e outros só no release.',
        interviewAngle:
          'Explique que checklist é ótimo para repetibilidade e velocidade, mas não serve para todo contexto. Essa nuance mostra que você sabe escolher artefato de acordo com risco e maturidade do fluxo.',
        quiz: q(
          'Quando um checklist tende a ser mais útil do que um caso de teste detalhado?',
          [
            'Quando a funcionalidade é nova e ninguém entende a regra ainda',
            'Quando a validação é recorrente, crítica e precisa ser rápida em um fluxo já conhecido',
            'Quando o time quer eliminar documentação',
            'Quando não existe ambiente de teste',
          ],
          1,
          'Checklist brilha em validação recorrente e rápida, principalmente para smoke e release de fluxo já conhecido.',
        ),
        takeaways: [
          'Checklist acelera validação recorrente de itens críticos.',
          'Ele funciona melhor em fluxos já conhecidos e com pergunta de sobrevivência do sistema.',
          'Checklist longo demais perde a função de rapidez.',
          'Escolha o artefato certo conforme novidade, risco e necessidade de detalhamento.',
        ],
      },
      {
        slug: 'bug-reports',
        title: 'Bug reports',
        description: 'Evidência, Jira e comunicação com dev.',
        checklistId: '02-qa-manual-bug-reports',
        difficulty: 'iniciante',
        minutes: 20,
        heading: 'Bug ruim vs bug que o dev agradece',
        coreIdea:
          'Bug report é um artefato de comunicação. Ele precisa tornar o defeito reproduzível, mensurável e priorizável. O melhor report não é o mais dramático; é o que permite ao time entender contexto, impacto e próximos passos com o menor ruído possível.',
        marketImpact:
          'No mercado brasileiro, onde times são enxutos e contexto muda rápido, bug bem escrito economiza retrabalho em QA, dev, produto e suporte. Um report confuso faz o time perder tempo perguntando o básico, reproduzindo do zero e discutindo prioridade sem evidência.',
        exampleScenario:
          'Considere um bug no checkout em que o botão de finalizar fica habilitado mesmo sem endereço válido. Um report fraco diria “checkout com problema”. Um report bom mostra ambiente, conta usada, passos mínimos, esperado versus atual, impacto no negócio, screenshot ou vídeo e observação sobre frequência.',
        dailySignals:
          'Você sabe que um bug report está forte quando o dev quase não precisa pedir contexto adicional. Se o ticket volta com perguntas sobre dado de teste, ambiente, navegador ou passo exato, ainda existe ambiguidade a corrigir.',
        artifactIntro:
          'Vale manter um template padrão com campos de título, ambiente, passos, esperado, atual, evidência e impacto. Esse template pode morar no Jira, em markdown ou até em snippet pessoal de texto para acelerar abertura sem perder qualidade.',
        artifactWrapup:
          'O template não serve para engessar; serve para garantir que o mínimo importante nunca seja esquecido no calor da execução.',
        commonMistake:
          'Erro comum: escrever título genérico e jogar toda a informação dentro de um bloco de texto sem ordem. Outro erro é descrever apenas o sintoma visual e esquecer impacto, frequência ou workaround.',
        practiceTask:
          'Reescreva um bug do seu portfólio em duas versões: uma rápida e ruim, outra profissional. Compare o esforço que um dev teria para reproduzir cada uma e você vai enxergar por que formato importa.',
        interviewAngle:
          'Se pedirem para falar de bug report, destaque reprodutibilidade, impacto e evidência. É uma resposta simples, mas muito mais madura do que dizer só “eu abro no Jira com print”.',
        quiz: q(
          'O que mais diferencia um bug report profissional de um bug report fraco?',
          [
            'O tamanho do texto',
            'A presença de contexto reproduzível, impacto e evidência útil',
            'O uso obrigatório de vídeo em todos os casos',
            'A quantidade de pessoas marcadas no ticket',
          ],
          1,
          'Report profissional comunica contexto reproduzível, impacto e evidência. O formato pode variar, mas esses elementos são o núcleo.',
        ),
        takeaways: [
          'Bug report é artefato de comunicação, não desabafo.',
          'Reprodutibilidade, impacto e evidência são o centro do report útil.',
          'Templates ajudam a não esquecer o essencial sob pressão.',
          'Compare versões ruins e boas para treinar clareza.',
        ],
      },
      {
        slug: 'analise-de-risco',
        title: 'Análise de risco',
        description: 'Matriz e risk-based testing.',
        checklistId: '02-qa-manual-analise-de-risco',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Onde investir tempo de teste',
        coreIdea:
          'Análise de risco em QA é o processo de decidir onde o sistema pode falhar de forma mais cara para usuário e negócio, e então ajustar profundidade de validação com base nisso. Ela existe para orientar foco, não para justificar chute com linguagem bonita.',
        marketImpact:
          'No mercado brasileiro, risco é palavra-chave porque quase sempre o tempo é menor do que a ambição do backlog. Quem sabe raciocinar por risco ajuda o time a sair do “testar tudo por igual” e entra em um modelo mais honesto e eficiente de priorização.',
        exampleScenario:
          'Se um e-commerce vai liberar mudança em checkout e mudança cosmética em página institucional, as duas áreas merecem atenção diferente. Checkout combina impacto financeiro, reputação e suporte; página institucional, em geral, tem risco menor. A análise de risco orienta o peso de cada validação.',
        dailySignals:
          'Risco aparece em áreas com receita, segurança, autenticação, integração crítica, alta frequência de uso, histórico de incidentes ou regra nova pouco compreendida. Esses sinais ajudam a decidir por onde começar quando o prazo não comporta tudo.',
        artifactIntro:
          'Uma matriz simples de probabilidade versus impacto já resolve muito bem o problema para times pequenos. O segredo está menos no desenho da matriz e mais na qualidade da conversa que ela força: por que isso dói, quem é afetado, qual é o custo se passar despercebido?',
        artifactWrapup:
          'No portfólio, incluir essa matriz em README ou plano de testes mostra que você pensa em cobertura como escolha estratégica, não como coleção aleatória de casos.',
        commonMistake:
          'Erro clássico: chamar qualquer opinião forte de análise de risco. Sem critério, sem contexto e sem justificativa, vira só preferência pessoal fantasiada de metodologia.',
        practiceTask:
          'Liste cinco áreas do seu sistema e rankeie por impacto, frequência de uso, facilidade de workaround e histórico de problema. Depois ajuste a profundidade de teste de cada uma e registre a justificativa.',
        interviewAngle:
          'Uma resposta forte conecta risco a tempo limitado. Diga que risk-based testing existe porque testar tudo com mesma profundidade quase nunca é possível, e o papel do QA é tornar essa escolha explícita.',
        quiz: q(
          'Qual é o principal benefício de uma boa análise de risco em QA?',
          [
            'Eliminar a necessidade de reteste',
            'Distribuir profundidade de teste conforme impacto e probabilidade',
            'Garantir que tudo será automatizado',
            'Substituir a decisão de produto',
          ],
          1,
          'Análise de risco ajuda o time a investir energia onde a falha custa mais e onde a probabilidade justifica maior cobertura.',
        ),
        takeaways: [
          'Análise de risco orienta foco e profundidade de teste.',
          'Risco combina impacto, probabilidade, frequência, histórico e criticidade do fluxo.',
          'Matriz simples funciona bem quando a conversa por trás dela é séria.',
          'Risk-based testing é essencial quando tempo e escopo não cabem juntos.',
        ],
      },
      {
        slug: 'plano-de-testes',
        title: 'Plano de testes',
        description: 'IEEE 829 enxuto e exemplo Toolshop.',
        checklistId: '02-qa-manual-plano-de-testes',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Plano que o time realmente lê',
        coreIdea:
          'Plano de testes é o documento que organiza objetivo, escopo, estratégia, ambiente, risco, critério de entrada e critério de saída de uma validação. Quando bem escrito, ele alinha expectativa entre QA, dev, produto e liderança antes da execução começar.',
        marketImpact:
          'Em empresas brasileiras, o plano raramente precisa seguir modelo acadêmico pesado para funcionar. O que faz diferença é ter um documento enxuto, claro e atualizável, capaz de responder rapidamente o que será validado, com qual profundidade e o que fica fora do corte.',
        exampleScenario:
          'Num projeto como Toolshop, um plano de testes pode delimitar módulos cobertos, riscos críticos, tipos de teste aplicados, ambientes, contas, evidências esperadas e critérios para recomendação Go ou No Go. Isso dá contexto para todo o restante: casos, bugs e relatório final.',
        dailySignals:
          'Você percebe necessidade de plano quando o time começa a discutir cobertura sem referência comum, quando produto acha que algo está incluído e QA acha que está fora, ou quando o release chega perto e ninguém sabe exatamente qual definição de “pronto” está valendo.',
        artifactIntro:
          'Um plano de testes enxuto pode caber em poucas seções: objetivo, escopo, fora de escopo, abordagem, riscos, ambiente, critérios e entregáveis. O foco é ser útil para decisão, não impressionar por volume de páginas.',
        artifactWrapup:
          'No portfólio, esse documento ajuda a costurar todos os outros artefatos. Ele mostra que você pensa antes de sair executando e que sabe comunicar limites do recorte adotado.',
        commonMistake:
          'Erro comum: copiar template enorme sem adaptar para o contexto. Outro erro é pular o plano completamente e tentar explicar cobertura só com casos e bugs soltos, sem narrativa que una o trabalho.',
        practiceTask:
          'Escreva um plano enxuto para um módulo do seu portfólio usando no máximo uma página em markdown. Se ao reler você ainda souber responder objetivo, risco, escopo e critério de saída, o documento já está cumprindo o papel.',
        interviewAngle:
          'Em entrevista, diga que plano de testes é ferramenta de alinhamento e não obrigação burocrática. Recrutador gosta de ouvir que você adapta profundidade documental ao tamanho e risco do projeto.',
        quiz: q(
          'Qual é uma boa característica de um plano de testes útil para o time?',
          [
            'Ser sempre longo e baseado em modelo acadêmico completo',
            'Ser claro sobre escopo, abordagem, riscos e critério de saída',
            'Existir apenas depois que os bugs já foram encontrados',
            'Substituir casos, bugs e evidências',
          ],
          1,
          'Plano de testes bom alinha expectativa sobre escopo, estratégia, riscos e definição de pronto. Tamanho não é o principal.',
        ),
        takeaways: [
          'Plano de testes serve para alinhar objetivo, escopo, risco e critério de saída.',
          'Documento útil é enxuto, claro e adaptado ao contexto.',
          'Ele costura estratégia, execução e decisão de release.',
          'No portfólio, o plano organiza a narrativa do trabalho de QA.',
        ],
      },
    ],
  },
);

glossaryCards.push(
  { category: 'Fundamentos', term: 'QA', definition: 'Disciplina de prevenção, detecção e comunicação de risco de qualidade ao longo do ciclo de desenvolvimento.' },
  { category: 'Fundamentos', term: 'QC', definition: 'Foco maior na inspeção do produto entregue para detectar desvios e falhas observáveis.' },
  { category: 'Fundamentos', term: 'Smoke test', definition: 'Conjunto enxuto de verificações para confirmar que o sistema continua vivo nos fluxos mais críticos.' },
  { category: 'Fundamentos', term: 'Regressão', definition: 'Validação para garantir que comportamentos que já funcionavam continuem íntegros após uma mudança.' },
  { category: 'Fundamentos', term: 'Severidade', definition: 'Medida do impacto técnico ou funcional de um defeito sobre produto e usuário.' },
  { category: 'Fundamentos', term: 'Prioridade', definition: 'Urgência de tratar um problema no contexto do negócio e do momento do release.' },
  { category: 'Fundamentos', term: 'Idempotência', definition: 'Propriedade de uma operação que pode ser repetida sem amplificar efeito colateral inesperado.' },
  { category: 'Fundamentos', term: 'Risco', definition: 'Combinação entre impacto potencial e probabilidade de um problema ocorrer ou escapar.' },

  { category: 'Processo ágil', term: 'Backlog', definition: 'Fila priorizada de trabalho que representa demandas, melhorias, bugs e iniciativas do produto.' },
  { category: 'Processo ágil', term: 'Refinement', definition: 'Momento em que o time esclarece requisitos, dependências, critérios e riscos antes da implementação.' },
  { category: 'Processo ágil', term: 'DoR', definition: 'Definition of Ready; conjunto mínimo de condições para um item entrar em desenvolvimento com clareza suficiente.' },
  { category: 'Processo ágil', term: 'DoD', definition: 'Definition of Done; critérios objetivos que indicam quando um item pode ser considerado realmente pronto.' },
  { category: 'Processo ágil', term: 'Retrospectiva', definition: 'Cerimônia de inspeção do processo em que o time decide o que manter, corrigir ou experimentar.' },
  { category: 'Processo ágil', term: 'Kanban', definition: 'Método de fluxo contínuo orientado por visualização do trabalho, limites de WIP e redução de gargalos.' },
  { category: 'Processo ágil', term: 'Scrum', definition: 'Framework ágil com papéis, cadência e cerimônias definidos para organizar entrega incremental.' },

  { category: 'QA manual', term: 'Caso de teste', definition: 'Descrição executável de pré-condição, passos, dados e resultado esperado para um cenário específico.' },
  { category: 'QA manual', term: 'Checklist', definition: 'Lista de validações críticas, útil para smoke e execução recorrente em fluxos já conhecidos.' },
  { category: 'QA manual', term: 'Bug report', definition: 'Registro estruturado de defeito com contexto reproduzível, evidência, impacto e resultado observado.' },
  { category: 'QA manual', term: 'Cenário de teste', definition: 'Situação de negócio ou comportamento do sistema que o QA decide explorar ou validar.' },
  { category: 'QA manual', term: 'Massa de teste', definition: 'Conjunto de dados usado para executar cenários e reproduzir regras do sistema.' },
  { category: 'QA manual', term: 'Exploratório', definition: 'Abordagem em que aprendizado, execução e investigação acontecem de forma adaptativa.' },
  { category: 'QA manual', term: 'Workaround', definition: 'Alternativa temporária que permite continuar usando o sistema apesar de um defeito existir.' },
  { category: 'QA manual', term: 'Rastreabilidade', definition: 'Capacidade de ligar requisito, caso, bug, execução e evidência ao longo do fluxo.' },

  { category: 'API', term: 'Endpoint', definition: 'Ponto de acesso de uma API, representado por uma rota que expõe determinado recurso ou operação.' },
  { category: 'API', term: 'Payload', definition: 'Conteúdo enviado ou recebido na requisição, normalmente em JSON, XML ou outro formato serializado.' },
  { category: 'API', term: 'Header', definition: 'Metadado HTTP usado para autenticação, serialização, cache, segurança e comportamento de integração.' },
  { category: 'API', term: '401', definition: 'Status que indica falha ou ausência de autenticação para acessar o recurso.' },
  { category: 'API', term: '403', definition: 'Status que indica identidade reconhecida, porém sem permissão para o recurso solicitado.' },
  { category: 'API', term: '404', definition: 'Status que indica recurso inexistente ou indisponível naquele endereço solicitado.' },
  { category: 'API', term: '422', definition: 'Status comum para indicar que a estrutura da requisição é válida, mas os dados violam regra de validação.' },
  { category: 'API', term: 'Schema', definition: 'Estrutura esperada do corpo de resposta ou request, incluindo campos, tipos e, às vezes, restrições.' },

  { category: 'API', term: 'JWT', definition: 'Token assinado usado para representar identidade e claims de autorização em muitos sistemas.' },
  { category: 'API', term: 'Bearer token', definition: 'Forma de envio de token no header Authorization, normalmente como prova de autenticação.' },
  { category: 'API', term: 'Rate limit', definition: 'Limite de consumo de requisições em um intervalo, usado para proteger estabilidade e abuso.' },
  { category: 'API', term: 'CORS', definition: 'Mecanismo de política entre origens que controla como browsers podem acessar recursos externos.' },

  { category: 'Automação E2E', term: 'Playwright', definition: 'Framework moderno de automação web com foco em multi-browser, auto-wait e boa observabilidade.' },
  { category: 'Automação E2E', term: 'Locator', definition: 'Estratégia usada pelo teste para encontrar um elemento na interface de forma estável e legível.' },
  { category: 'Automação E2E', term: 'POM', definition: 'Page Object Model; padrão que centraliza locators e ações de uma tela em abstrações reutilizáveis.' },
  { category: 'Automação E2E', term: 'Flaky test', definition: 'Teste instável que falha sem mudança real no sistema, geralmente por sincronização ou estado ruim.' },
  { category: 'Automação E2E', term: 'Trace', definition: 'Artefato rico de execução que ajuda a revisar passos, rede, snapshots e falhas em automação.' },
  { category: 'Automação E2E', term: 'Fixture', definition: 'Recurso de framework para preparar e fornecer contexto reutilizável aos testes.' },
  { category: 'Automação E2E', term: 'Auto-wait', definition: 'Capacidade do framework de aguardar automaticamente certas condições antes de agir ou afirmar.' },
  { category: 'Automação E2E', term: 'Assertion', definition: 'Verificação que confirma se o comportamento observado corresponde ao esperado pelo teste.' },

  { category: 'CI/CD', term: 'Workflow', definition: 'Arquivo que descreve quando e como um pipeline de automação deve ser executado.' },
  { category: 'CI/CD', term: 'Job', definition: 'Bloco de execução dentro do workflow com runner, steps e objetivo específico.' },
  { category: 'CI/CD', term: 'Runner', definition: 'Máquina ou ambiente onde os steps do job são executados.' },
  { category: 'CI/CD', term: 'Artifact', definition: 'Arquivo publicado pelo pipeline para apoiar debug, auditoria ou consumo posterior.' },
  { category: 'CI/CD', term: 'Cache', definition: 'Mecanismo de reaproveitamento de dependências ou arquivos para acelerar execuções repetidas.' },
  { category: 'CI/CD', term: 'Secret', definition: 'Valor sensível consumido pela pipeline sem ficar exposto no código versionado ou nos logs.' },
  { category: 'CI/CD', term: 'Gate de qualidade', definition: 'Etapa ou critério que precisa passar antes que o fluxo siga para merge, release ou deploy.' },
  { category: 'CI/CD', term: 'Nightly', definition: 'Execução agendada, muitas vezes noturna, usada para regressões mais pesadas ou menos urgentes.' },

  { category: 'Segurança e qualidade', term: 'Autenticação', definition: 'Processo de provar identidade de uma requisição, usuário ou serviço.' },
  { category: 'Segurança e qualidade', term: 'Autorização', definition: 'Decisão sobre o que uma identidade autenticada pode ou não acessar.' },
  { category: 'Segurança e qualidade', term: 'Dados sensíveis', definition: 'Informações que exigem cuidado especial por risco de privacidade, segurança ou compliance.' },
  { category: 'Segurança e qualidade', term: 'PII', definition: 'Personally Identifiable Information; dado capaz de identificar uma pessoa de forma direta ou indireta.' },
  { category: 'Segurança e qualidade', term: 'Least privilege', definition: 'Princípio de conceder somente o mínimo de acesso necessário para cada usuário ou serviço.' },
  { category: 'Segurança e qualidade', term: 'Observabilidade', definition: 'Capacidade de entender o comportamento do sistema por logs, métricas, traces e evidências relevantes.' },

  { category: 'Carreira e entrevista', term: 'STAR', definition: 'Estrutura de resposta comportamental: situação, tarefa, ação e resultado.' },
  { category: 'Carreira e entrevista', term: 'Pitch', definition: 'Apresentação curta e clara de um projeto, experiência ou proposta de valor profissional.' },
  { category: 'Carreira e entrevista', term: 'Portfolio review', definition: 'Leitura crítica do seu material público para avaliar clareza, profundidade e evidência de competência.' },
  { category: 'Carreira e entrevista', term: 'Go/No Go', definition: 'Recomendação consciente de liberar ou não um produto com base em evidência e risco.' },
  { category: 'Carreira e entrevista', term: 'Known issue', definition: 'Defeito conhecido e registrado, cujo impacto e tratamento já foram explicitamente documentados.' },
  { category: 'Carreira e entrevista', term: 'Mentoria', definition: 'Acompanhamento estruturado que acelera aprendizado técnico e adaptação ao contexto do time.' },
);

modules.push(
  {
    folder: '07-meus-projetos',
    chapters: [
      {
        slug: 'toolshop-overview',
        title: 'Toolshop — visão geral',
        description: 'Practice Software Testing em 3 camadas.',
        checklistId: '07-meus-projetos-toolshop-overview',
        difficulty: 'intermediario',
        minutes: 22,
        heading: 'Arquitetura em repositórios',
        coreIdea:
          'O ecossistema Toolshop do Wesley foi pensado como portfólio em camadas, com um hub central em [toolshop-quality-portfolio](https://github.com/Wesleysc94/toolshop-quality-portfolio) e repositórios separados para manual, API e E2E: [toolshop-manual-quality](https://github.com/Wesleysc94/toolshop-manual-quality), [toolshop-api-quality-suite](https://github.com/Wesleysc94/toolshop-api-quality-suite) e [toolshop-web-e2e-playwright](https://github.com/Wesleysc94/toolshop-web-e2e-playwright).',
        marketImpact:
          'Essa organização importa no mercado brasileiro porque recrutador raramente explora tudo com calma. Quando o portfólio está quebrado em recortes coerentes, a pessoa consegue entrar pela camada que mais interessa para a vaga e ainda entender a narrativa completa sem se perder.',
        exampleScenario:
          'Se a vaga pede mais API, o recrutador pode abrir direto a suíte Python e ver contrato, cenários negativos e estrutura. Se a vaga pede automação web, o repositório Playwright já entrega POM, locators e CI. O hub central amarra tudo com decisão de Go/No Go e visão estratégica.',
        dailySignals:
          'Sinais de portfólio maduro aparecem quando os repositórios conversam entre si, têm README objetivo, mostram artefatos reais e deixam claro o papel de cada camada. O oposto aparece quando tudo está misturado sem narrativa ou quando há muita evidência solta sem contexto.',
        artifactIntro:
          'Um artefato excelente aqui é um diagrama simples ligando hub, repositórios satélites, tipo de evidência produzida e pergunta que cada camada responde. Isso ajuda tanto no estudo quanto no pitch de entrevista.',
        artifactWrapup:
          'Esse diagrama deixa explícito que o portfólio não foi montado como coleção de links aleatórios, e sim como sistema de demonstração de competência.',
        commonMistake:
          'Erro comum em portfólio de QA é tentar mostrar tudo em um repositório caótico ou, no extremo oposto, dividir demais sem explicar a lógica. O valor da arquitetura está em tornar a leitura rápida e coerente.',
        practiceTask:
          'Revise seus READMEs e pergunte se cada repositório responde claramente: o que cobre, como rodar, que evidência entrega e como se conecta com os demais. Se uma dessas respostas estiver fraca, o pitch também estará.',
        interviewAngle:
          'Em entrevista, vale explicar que a separação por camada foi escolha de comunicação e estratégia de portfólio. Essa justificativa mostra intencionalidade, não apenas organização estética.',
        codeLang: 'md',
        codeBlock: `toolshop-quality-portfolio/
├─ README.md
├─ links para manual, API e E2E
├─ resumo dos principais achados
└─ recomendação final de Go/No Go`,
        artifactIntro:
          'Até um pseudo-tree como este já ajuda a mostrar que existe arquitetura de evidência por trás dos links do portfólio.',
        codeWrapup:
          'O importante é conectar repositório, camada de teste e tipo de decisão que aquela camada suporta.',
        quiz: q(
          'Qual é a principal vantagem de separar o Toolshop em hub + repositórios por camada?',
          [
            'Evitar escrever README',
            'Permitir leitura rápida por recorte técnico sem perder a narrativa completa',
            'Impedir integração entre as camadas',
            'Reduzir a necessidade de evidência',
          ],
          1,
          'A separação por camada facilita leitura por recorte técnico e ainda permite que o hub una a estratégia e a decisão final do portfólio.',
        ),
        takeaways: [
          'O Toolshop foi estruturado para comunicar profundidade por camada e visão integrada no hub.',
          'Repositórios separados ajudam recrutador a entrar no recorte certo mais rápido.',
          'README e narrativa são tão importantes quanto código e bug report.',
          'Arquitetura do portfólio também comunica maturidade de QA.',
        ],
      },
      {
        slug: 'toolshop-decisões',
        title: 'Toolshop — decisões',
        description: 'Trade-offs e No Go.',
        checklistId: '07-meus-projetos-toolshop-decisoes',
        difficulty: 'intermediario',
        minutes: 20,
        heading: 'Por que Python + TS',
        coreIdea:
          'As decisões do Toolshop mostram que portfólio forte não é coleção de buzzwords; é sequência de trade-offs documentados. Separar repositórios, usar Python para API e TypeScript para E2E, e registrar recomendação No Go são escolhas que comunicam raciocínio de QA.',
        marketImpact:
          'No mercado brasileiro, muitos candidatos mostram automação verde, mas poucos explicam por que escolheram determinada stack, qual risco encontraram e como decidiram comunicar a recomendação final. Esse é justamente o diferencial deste módulo.',
        exampleScenario:
          'A escolha de [toolshop-api-quality-suite](https://github.com/Wesleysc94/toolshop-api-quality-suite) com pytest/httpx conversa com a realidade de times backend Python. Já [toolshop-web-e2e-playwright](https://github.com/Wesleysc94/toolshop-web-e2e-playwright) mostra aderência ao ecossistema web moderno. A combinação comunica versatilidade com propósito.',
        dailySignals:
          'Boa decisão técnica costuma deixar rastro: README explicando recorte, issue descrevendo known issue, workflow coerente com custo e relatório final ligando evidência a recomendação. Sem esse rastro, a decisão parece palpite.',
        artifactIntro:
          'O artefato mais forte aqui é um ADR curto ou seção de README respondendo “decisão, motivação, trade-off, impacto e limite”. Isso transforma escolha técnica em material de avaliação para recrutador e para você mesmo.',
        artifactWrapup:
          'Tomar decisão é importante; tornar a decisão auditável é o que realmente diferencia o trabalho profissional.',
        commonMistake:
          'Erro comum: justificar stack só com “gosto mais dessa”. Outro problema é esconder bug crítico para deixar portfólio todo verde e perder a oportunidade de mostrar pensamento crítico.',
        practiceTask:
          'Escreva uma mini ADR para uma escolha do seu projeto e outra para um No Go. O exercício ajuda muito a transformar intuição em argumento técnico.',
        interviewAngle:
          'Em entrevista, não fuja do No Go. Pelo contrário: use a história para mostrar critérios, evidência, impacto e responsabilidade técnica.',
        codeLang: 'md',
        codeBlock: `## Decisão
Usar Python + pytest/httpx para API e TypeScript + Playwright para E2E.

## Motivo
Alinhar o portfólio com stacks muito presentes em vagas de QA e separar contrato de jornada.

## Trade-off
Mais de um repositório para manter, porém leitura mais clara por camada.`,
        artifactIntro:
          'Esse formato de ADR curto já ajuda a mostrar que a escolha da stack foi intencional e auditável.',
        codeWrapup:
          'Quando a decisão vem acompanhada de trade-off explícito, ela ganha muito mais credibilidade.',
        quiz: q(
          'Qual é uma forma madura de apresentar as decisões do Toolshop?',
          [
            'Esconder trade-offs para parecer mais seguro',
            'Explicar escolha, motivo, custo e impacto da decisão com evidência',
            'Dizer apenas que a stack estava em alta no mercado',
            'Evitar comentar o No Go para não parecer negativo',
          ],
          1,
          'Decisão madura é documentada com motivação, trade-off e impacto. Isso vale tanto para stack quanto para recomendação de release.',
        ),
        takeaways: [
          'Decisões do Toolshop comunicam raciocínio técnico, não só preferência.',
          'ADR curta ou seção de README ajuda a tornar trade-off auditável.',
          'No Go bem explicado vale muito em portfólio.',
          'Esconder limite reduz, e não aumenta, maturidade percebida.',
        ],
      },
      {
        slug: 'swaglab-overview',
        title: 'Swag Lab — visão geral',
        description: 'Monorepo Playwright + API.',
        checklistId: '07-meus-projetos-swaglab-overview',
        difficulty: 'intermediario',
        minutes: 20,
        heading: 'Resultados e escopo',
        coreIdea:
          'O [swaglab-quality-suite](https://github.com/Wesleysc94/swaglab-quality-suite) mostra outro desenho de portfólio: um monorepo que concentra E2E, API e CI/CD em um mesmo espaço. Esse contraste com o Toolshop é valioso porque prova que Wesley sabe trabalhar tanto com separação por camada quanto com suíte integrada.',
        marketImpact:
          'No mercado brasileiro, muita empresa adota monorepo ou pelo menos espera que a automação converse com o mesmo ciclo de pull request e pipeline. Mostrar um projeto assim amplia a leitura do seu portfólio para além da experiência em repositórios separados.',
        exampleScenario:
          'Dentro do Swag Lab, o foco recai em jornada web com POM, uso de Reqres para apoio em cenários de API e integração com pipeline. A vantagem é que o repositório se apresenta como suíte pronta para rodar, o que aproxima o material do dia a dia de equipes que mantêm automação dentro do mesmo fluxo do produto.',
        dailySignals:
          'Sinais fortes desse projeto são organização de pastas, clareza do README, convenção de teste, setup replicável e alinhamento entre código, pipeline e known issues. Isso dá sensação de suíte viva, não de laboratório isolado.',
        artifactIntro:
          'Uma árvore explicada do monorepo é um ótimo artefato para esse capítulo, mostrando onde ficam testes E2E, camadas de apoio, config e workflows.',
        artifactWrapup:
          'Esse tipo de leitura ajuda a explicar por que o Swag Lab comunica maturidade diferente do Toolshop sem competir com ele.',
        commonMistake:
          'Erro comum é tratar os dois projetos como duplicação. Na verdade, eles se complementam: um enfatiza narrativa por camada; o outro enfatiza integração de suíte e pipeline.',
        practiceTask:
          'Compare seus próprios projetos e escreva o que cada um comunica melhor: arquitetura em camadas, monorepo, documentação, CI ou profundidade de automação. Esse exercício melhora muito sua narrativa.',
        interviewAngle:
          'Em entrevista, vale mostrar que você entende por que o Swag Lab está integrado em um repo só e por que isso conversa com realidade de times que versionam tudo junto.',
        artifactIntro:
          'Um mapa de pastas com explicação de responsabilidade por diretório já ajuda muito no pitch desse projeto.',
        artifactWrapup:
          'Ele transforma o repositório em história fácil de contar em 60 segundos.',
        quiz: q(
          'O que o Swag Lab adiciona ao portfólio em relação ao Toolshop?',
          [
            'Nada, porque repete exatamente a mesma arquitetura',
            'Mostra experiência com suíte integrada em monorepo e com pipeline mais próxima do fluxo real de time',
            'Substitui completamente a necessidade dos outros repositórios',
            'Serve só para exibir screenshots',
          ],
          1,
          'O Swag Lab complementa o Toolshop ao mostrar outra arquitetura de trabalho, mais integrada em torno da suíte e do pipeline.',
        ),
        takeaways: [
          'Swag Lab amplia o portfólio com visão de suíte integrada.',
          'Ele complementa, e não duplica, a narrativa do Toolshop.',
          'Monorepo ajuda a comunicar fluxo próximo ao de muitos times reais.',
          'Pitch forte mostra o que cada projeto comunica de diferente.',
        ],
      },
      {
        slug: 'swaglab-pom-pratica',
        title: 'Swag Lab — POM',
        description: 'Páginas e locators reais.',
        checklistId: '07-meus-projetos-swaglab-pom-pratica',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Como o teste consome a Page',
        coreIdea:
          'No Swag Lab, o Page Object Model deixa de ser conceito abstrato e aparece como convenção concreta de manutenção. O ganho visível está em como o spec continua legível enquanto locators e interações ficam concentrados em objetos de página.',
        marketImpact:
          'Isso pesa bastante em entrevista porque muitas vagas pedem POM, mas o candidato às vezes só sabe definir. Quando você mostra o padrão aplicado em um repositório real, com locators coerentes e testes consumindo métodos claros, a conversa muda de nível.',
        exampleScenario:
          'Fluxos como login, adição ao carrinho e checkout parcial podem consumir páginas específicas em vez de repetir seletor em cada arquivo. Isso permite que o recrutador enxergue o padrão no código, não só na resposta oral.',
        dailySignals:
          'Os sinais bons aparecem quando o teste lê quase como narrativa de negócio e quando a mudança em um locator não exige edição espalhada. Sinais ruins seriam page class inflada, método que faz coisa demais ou assertion misturada com toda a regra de negócio.',
        artifactIntro:
          'Um before/after curto entre teste cru e teste usando page object é um ótimo artefato para esse capítulo, porque torna o benefício visualmente óbvio.',
        artifactWrapup:
          'Comparação visual ajuda muito mais do que definição abstrata, especialmente para alguém lendo o repositório pela primeira vez.',
        commonMistake:
          'Erro comum: vender POM como solução mágica e não mostrar o cuidado com limite da abstração. O valor está na manutenção e legibilidade, não no padrão por si só.',
        practiceTask:
          'Abra um fluxo seu com repetição de seletor e tente reescrever usando page object pequeno. Depois compare o quanto o teste ficou mais narrativo.',
        interviewAngle:
          'Na entrevista, cite o repositório e explique qual parte do custo de manutenção caiu quando locators foram centralizados. Isso mostra aprendizagem aplicada.',
        codeLang: 'ts',
        codeBlock: `test('usuário adiciona produto ao carrinho', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');
});`,
        artifactIntro:
          'O ponto forte desse exemplo é como o spec fica centrado em intenção de negócio e não em detalhe repetido de interação.',
        codeWrapup:
          'Em portfólio, esse tipo de legibilidade comunica muito bem o valor prático do POM para manutenção da suíte.',
        quiz: q(
          'O que melhor demonstra POM aplicado de forma útil no Swag Lab?',
          [
            'Classe gigante com todos os locators do sistema',
            'Spec legível consumindo métodos de intenção e locators concentrados na page',
            'Remover qualquer locator do projeto',
            'Escrever tudo em um único arquivo para facilitar leitura',
          ],
          1,
          'POM útil aparece quando o spec fica mais narrativo e a manutenção de locators fica centralizada e proporcional.',
        ),
        takeaways: [
          'O valor do POM no Swag Lab aparece no código, não só na definição.',
          'Spec narrativo e locators centralizados melhoram manutenção.',
          'Abstração proporcional é mais importante do que seguir padrão por vaidade.',
          'Mostrar before/after é excelente para entrevista.',
        ],
      },
      {
        slug: 'swaglab-cicd-pratica',
        title: 'Swag Lab — CI/CD',
        description: 'Workflows e REQRES.',
        checklistId: '07-meus-projetos-swaglab-cicd-pratica',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Dois pipelines por path',
        coreIdea:
          'A parte de CI/CD do Swag Lab mostra que automação boa não termina no laptop. Ela precisa entrar em pipeline com critério de execução, artefato e leitura de falha que o time consiga usar sem sofrimento.',
        marketImpact:
          'Para vaga júnior, esse é um diferencial importante porque muita gente ainda apresenta automação sem qualquer integração com CI. Mostrar workflow real aproxima o projeto da rotina de empresa e comunica noção de manutenção.',
        exampleScenario:
          'Quando o repositório separa jobs ou recortes de execução por domínio, ele dá um passo além do “rodar tudo”. O time passa a pensar em custo, gatilho e diagnóstico de falha. Isso é muito valioso para QA que quer crescer na parte de engenharia.',
        dailySignals:
          'Bons sinais: workflow legível, job com objetivo claro, cache coerente, artefato útil e ligação entre mudança de código e validação necessária. Sinais ruins: pipeline lenta, opaca e sem justificativa para cada etapa.',
        artifactIntro:
          'Uma imagem ou tabela do fluxo dos workflows, com explicação de gatilho e objetivo, é ótimo artefato para tornar o CI visível no portfólio.',
        artifactWrapup:
          'Isso ajuda muito recrutador técnico a perceber que não existe só código de teste, mas também engenharia de execução por trás.',
        commonMistake:
          'Erro comum: achar que basta ter um workflow verde. O valor real está em saber explicar por que aquele job existe, o que protege e como ajuda a investigação quando falha.',
        practiceTask:
          'Documente o pipeline do seu projeto em linguagem simples: o que roda em PR, o que roda em main, que artefato sobe e qual decisão aquele job suporta.',
        interviewAngle:
          'Quando falar desse projeto, conecte pipeline a confiabilidade do portfólio. Isso mostra que você entende automação como produto mantido.',
        codeLang: 'yaml',
        codeBlock: `on:
  pull_request:
  push:
    branches: [main]

jobs:
  ui-smoke:
    steps:
      - run: npm run test:e2e -- --grep @smoke
  api-checks:
    steps:
      - run: npm run test:api`,
        artifactIntro:
          'Esse recorte sintetiza bem a lógica de pipeline segmentada por tipo de validação e custo de feedback.',
        codeWrapup:
          'A leitura do workflow fica muito mais forte quando cada job já comunica seu papel sem precisar de adivinhação.',
        quiz: q(
          'O que torna a parte de CI/CD do Swag Lab valiosa no portfólio?',
          [
            'Apenas o fato de existir um arquivo YAML',
            'Mostrar que a automação conversa com gatilho, custo de execução e diagnóstico em pipeline real',
            'Substituir todo o restante do projeto',
            'Rodar sempre tudo em qualquer alteração',
          ],
          1,
          'CI/CD forte no portfólio mostra integração real da suíte com fluxo de entrega e depuração, não só presença de YAML.',
        ),
        takeaways: [
          'CI/CD no Swag Lab aproxima o projeto da rotina real de times.',
          'Workflow bom comunica gatilho, objetivo e artefato.',
          'Pipeline verde sem narrativa ainda explica pouco.',
          'Relacionar job a custo e proteção de risco fortalece o pitch.',
        ],
      },
      {
        slug: 'swaglab-bug-documentado',
        title: 'Swag Lab — bugs documentados',
        description: 'problem_user e testes verdes.',
        checklistId: '07-meus-projetos-swaglab-bug-documentado',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Trade-off rastreio vs ruído',
        coreIdea:
          'O capítulo de bugs documentados no Swag Lab é forte porque mostra convivência madura entre teste automatizado e known issue. Nem todo defeito conhecido precisa derrubar a pipeline para sempre; o importante é que o risco esteja registrado e a decisão seja explícita.',
        marketImpact:
          'Esse tipo de nuance pesa muito no mercado brasileiro porque times reais convivem com débito, prazo e bug aceito temporariamente. Saber documentar a exceção sem normalizar bagunça é habilidade valiosa.',
        exampleScenario:
          'O caso clássico do `problem_user` permite explicar por que um fluxo pode continuar verde se o defeito é conhecido, rastreado e fora do objetivo daquele check específico. A credibilidade vem do registro claro, não do silêncio.',
        dailySignals:
          'A diferença entre maturidade e maquiagem está em três sinais: bug conhecido tem issue clara, o impacto está explicado e existe racional para o teste não falhar permanentemente. Sem isso, verde deixa de significar confiança.',
        artifactIntro:
          'Um documento curto de known issue com contexto, impacto, link para ticket e efeito sobre a suíte é um artefato excelente para esse capítulo.',
        artifactWrapup:
          'Ele mostra que você sabe conviver com realidade imperfeita sem sacrificar rastreabilidade e honestidade técnica.',
        commonMistake:
          'Erro comum: esconder defeito conhecido para deixar tudo verde ou, no extremo oposto, deixar pipeline permanentemente vermelha sem estratégia, gerando fadiga e perda de valor do alerta.',
        practiceTask:
          'Escreva a política que você usaria para bug conhecido no seu portfólio: quando quarantinar, quando manter falhando, que evidência documentar e quem precisa saber disso.',
        interviewAngle:
          'Essa história funciona muito bem em entrevista porque mostra que você entende o custo de ruído na pipeline sem abandonar responsabilidade técnica.',
        codeLang: 'md',
        codeBlock: `## Known issue
- cenário: checkout com problem_user
- impacto: fluxo inconsistente para usuário específico
- decisão atual: não bloquear smoke geral
- rastreio: issue aberta com evidência e contexto`,
        artifactIntro:
          'Esse formato simples já comunica contexto suficiente para que o verde da suíte não seja interpretado como ausência total de problema.',
        codeWrapup:
          'A honestidade do registro é o que protege o valor da automação quando o sistema ainda convive com defeitos conhecidos.',
        quiz: q(
          'Qual é uma forma madura de lidar com bug conhecido em automação?',
          [
            'Esconder o defeito para manter tudo verde',
            'Registrar contexto e decidir conscientemente quando o bug deve ou não bloquear o pipeline',
            'Ignorar qualquer documentação sobre o problema',
            'Falhar todos os jobs para sempre sem estratégia',
          ],
          1,
          'Bug conhecido exige registro claro e decisão consciente sobre o papel dele na pipeline. Nem esconder nem normalizar ruído permanente são boas saídas.',
        ),
        takeaways: [
          'Bug conhecido precisa de rastreabilidade para não virar maquiagem de suíte verde.',
          'Verde só vale quando o contexto do known issue está explícito.',
          'Fadiga de alerta é risco real em pipeline sem estratégia.',
          'Essa discussão mostra maturidade técnica em entrevista.',
        ],
      },
      {
        slug: 'perguntas-recrutador',
        title: 'Perguntas de recrutador',
        description: '30 respostas modelo.',
        checklistId: '07-meus-projetos-perguntas-recrutador',
        difficulty: 'intermediario',
        minutes: 24,
        heading: 'Pitch dos seus projetos',
        coreIdea:
          'Este capítulo amarra os projetos do portfólio em fala de entrevista. O grande objetivo é transformar código, bugs, pipeline e README em narrativa curta, segura e coerente sobre o que você sabe fazer e por que tomou certas decisões.',
        marketImpact:
          'No mercado brasileiro, muita pessoa boa tecnicamente perde força na conversa porque descreve projeto como lista de ferramenta. Recrutador quer entender objetivo, estratégia, decisão, bug encontrado, aprendizado e impacto percebido.',
        exampleScenario:
          'Quando Wesley fala do Toolshop e do Swag Lab, o ideal é ligar produto-alvo, camada de cobertura, decisão de stack, pipeline, bug conhecido e recomendação de release em respostas de 30 segundos, 60 segundos e 2 minutos.',
        dailySignals:
          'Boa narrativa tem começo, meio e fim. Sinais ruins aparecem quando a explicação pula de ferramenta em ferramenta sem dizer por que aquilo importou para qualidade do produto.',
        artifactIntro:
          'O melhor artefato aqui é um roteiro pessoal de pitch dividido em problema, estratégia, achado, decisão e aprendizado. Esse formato te ajuda a falar com naturalidade sem decorar frase pronta.',
        artifactWrapup:
          'Treinar esse roteiro muda completamente a forma como o portfólio é percebido em entrevista.',
        commonMistake:
          'Erro comum: responder “usei Playwright, pytest e GitHub Actions” sem conectar ferramenta a risco e decisão. Outro erro é falar só do caminho feliz e esconder o que deu errado.',
        practiceTask:
          'Grave três versões do seu pitch: 30 segundos, 60 segundos e 2 minutos. Depois escute procurando repetições, buzzwords vazias e pontos em que faltou evidência.',
        interviewAngle:
          'A melhor resposta é a que liga ferramenta, risco, evidência e decisão. Isso mostra maturidade muito maior do que tentar soar “super técnico” sem narrativa.',
        artifactIntro:
          'Mesmo um outline em markdown já ajuda a treinar o pitch até ele ficar natural.',
        artifactWrapup:
          'O foco não é decorar; é ganhar segurança para contar uma história técnica com começo e fim.',
        quiz: q(
          'O que mais fortalece a resposta sobre projeto em entrevista?',
          [
            'Listar o maior número possível de ferramentas',
            'Conectar contexto, estratégia, achados, decisões e aprendizado',
            'Evitar falar de bug para não parecer negativo',
            'Descrever somente a UI do projeto',
          ],
          1,
          'Projeto forte em entrevista é explicado como narrativa técnica: contexto, estratégia, evidência, decisão e aprendizado.',
        ),
        takeaways: [
          'Pitch bom transforma projeto em narrativa, não em lista de ferramentas.',
          'Contexto, estratégia, achado e aprendizado precisam aparecer juntos.',
          'Treinar versões curtas e longas do pitch aumenta muita confiança.',
          'Bugs e trade-offs bem explicados fortalecem, e não enfraquecem, o portfólio.',
        ],
      },
    ],
  },
  {
    folder: '08-entrevista',
    chapters: [
      {
        slug: 'perguntas-comportamentais',
        title: 'Comportamentais',
        description: 'STAR e projetos como experiência.',
        checklistId: '08-entrevista-perguntas-comportamentais',
        difficulty: 'iniciante',
        minutes: 18,
        heading: '15 perguntas frequentes',
        coreIdea:
          'Pergunta comportamental não busca apenas simpatia; ela tenta prever como você reage a conflito, prazo, ambiguidade e aprendizado. Para QA júnior em transição, o segredo é usar projetos e experiências reais como matéria-prima de resposta estruturada.',
        marketImpact:
          'No mercado brasileiro, recrutadores valorizam respostas organizadas, honestas e com contexto. A estrutura STAR ajuda porque impede que a resposta fique vaga ou “motivacional” demais.',
        exampleScenario:
          'Você pode usar um bug crítico encontrado no portfólio para responder sobre atenção a detalhe, uma recomendação No Go para falar de discordância técnica e um ajuste de pipeline para falar de melhoria contínua.',
        dailySignals:
          'Sinais de resposta forte: situação clara, ação concreta sua, resultado observável e aprendizado humilde. Sinais ruins: história genérica, foco só no time sem mostrar seu papel ou discurso excessivamente heroico.',
        artifactIntro:
          'Monte uma tabela com três histórias base e mapeie quais perguntas comportamentais cada uma responde. Isso reduz ansiedade e evita inventar exemplo na hora.',
        artifactWrapup:
          'Com poucas histórias bem preparadas, você cobre boa parte das perguntas mais comuns com consistência.',
        commonMistake:
          'Erro comum: responder com abstração sem caso real ou improvisar uma história tão perfeita que parece artificial. Recrutador percebe rapidamente quando falta material concreto.',
        practiceTask:
          'Escreva três histórias STAR baseadas nos seus projetos: conflito, prazo apertado e aprendizado técnico. Depois adapte cada uma para perguntas diferentes.',
        interviewAngle:
          'A dica mais forte é responder com sinceridade organizada. Mostrar reflexão sobre erro e evolução costuma pesar mais do que tentar parecer impecável.',
        artifactIntro:
          'Uma tabela de histórias STAR é um dos melhores artefatos de preparação para entrevista.',
        artifactWrapup:
          'Ela transforma memória dispersa em repertório reaproveitável.',
        quiz: q(
          'Qual elemento fortalece uma resposta comportamental em entrevista?',
          [
            'Frases genéricas sobre trabalho em equipe sem exemplo',
            'Uma história concreta com contexto, ação, resultado e aprendizado',
            'Evitar qualquer menção a dificuldade',
            'Responder apenas com opinião pessoal',
          ],
          1,
          'Resposta forte traz história concreta e organizada, mostrando o que você fez, o que aconteceu e o que aprendeu.',
        ),
        takeaways: [
          'História concreta vale mais do que frase genérica em pergunta comportamental.',
          'STAR ajuda a manter contexto, ação, resultado e aprendizado visíveis.',
          'Projetos de portfólio podem virar experiência forte de entrevista.',
          'Honestidade organizada transmite maturidade e confiança.',
        ],
      },
      {
        slug: 'perguntas-tecnicas-manual',
        title: 'Técnicas — manual',
        description: '20 perguntas com gabarito.',
        checklistId: '08-entrevista-perguntas-tecnicas-manual',
        difficulty: 'iniciante',
        minutes: 18,
        heading: 'Do smoke ao DoD',
        coreIdea:
          'Perguntas técnicas de QA manual normalmente verificam se você domina fundamentos operacionais: caso de teste, checklist, bug report, risco, smoke, regressão e participação em fluxo ágil. O desafio é responder com profundidade suficiente sem transformar tudo em aula longa.',
        marketImpact:
          'Em vagas júnior no Brasil, essa parte costuma separar quem estudou de forma aplicada de quem decorou palavras. Recrutador ou líder técnico quer ouvir raciocínio curto, exemplo concreto e clareza de objetivo.',
        exampleScenario:
          'Se perguntarem diferença entre smoke e regressão, vale responder pela pergunta que cada um responde e citar um cenário do seu portfólio. O mesmo raciocínio funciona para DoD, critério de aceite, severidade e prioridade.',
        dailySignals:
          'Boa preparação aparece quando você consegue dar definição curta, exemplo real e erro comum associado ao tema. Isso torna a resposta muito mais memorável.',
        artifactIntro:
          'Monte um caderno ou arquivo markdown com perguntas frequentes e respostas em até seis linhas. O limite de tamanho força clareza e melhora sua comunicação oral.',
        artifactWrapup:
          'Responder curto e bem é uma habilidade que precisa de treino deliberado, não apenas de leitura.',
        commonMistake:
          'Erro comum: responder técnico-manual como glossário ambulante, sem exemplo ou sem ligação com decisão real do time.',
        practiceTask:
          'Escolha dez perguntas frequentes e responda em voz alta em no máximo um minuto cada. Depois revise onde faltou exemplo concreto.',
        interviewAngle:
          'A melhor resposta técnica-manual geralmente tem definição curta, caso real e motivo de negócio. Esse tripé funciona muito bem.',
        artifactIntro:
          'Um arquivo de treino com respostas curtas é excelente para revisão antes de entrevista.',
        artifactWrapup:
          'Ele te ajuda a sair do excesso de teoria e entrar em fala objetiva.',
        quiz: q(
          'O que torna uma resposta técnica de QA manual mais forte em entrevista?',
          [
            'Decorar a maior definição possível',
            'Combinar definição curta, exemplo real e impacto prático',
            'Falar apenas de ferramenta',
            'Evitar qualquer detalhe de contexto',
          ],
          1,
          'Resposta técnica forte combina conceito, exemplo e valor prático para o time ou para o produto.',
        ),
        takeaways: [
          'Pergunta técnica manual cobra raciocínio aplicado, não só glossário.',
          'Definição curta + exemplo + impacto é uma estrutura poderosa.',
          'Treino oral em respostas de até um minuto aumenta muito a clareza.',
          'Portfólio fornece excelente repertório para essas respostas.',
        ],
      },
      {
        slug: 'perguntas-tecnicas-api',
        title: 'Técnicas — API',
        description: '15 perguntas.',
        checklistId: '08-entrevista-perguntas-tecnicas-api',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'REST e status',
        coreIdea:
          'Perguntas técnicas de API tendem a girar em torno de contrato, autenticação, status code, negativo, headers e organização de suíte. O que o entrevistador quer ver é se você sabe transformar esses conceitos em estratégia de validação.',
        marketImpact:
          'Como API virou parte central de muitas vagas brasileiras de QA, responder só com “uso Postman” costuma ser pouco. O diferencial está em mostrar leitura de contrato e raciocínio sobre risco e comportamento do endpoint.',
        exampleScenario:
          'Você pode responder sobre 401 vs 403, cenário negativo, idempotência ou headers sempre ancorando em endpoint real do seu portfólio. Isso transmite experiência prática muito acima do nível tutorial.',
        dailySignals:
          'Sinal de boa resposta: você explica o que valida e por quê. Sinal fraco: resposta centrada só em ferramenta ou em sequência de cliques.',
        artifactIntro:
          'Crie um arquivo de revisão com perguntas de API e sempre adicione um exemplo de endpoint ou snippet de teste à resposta. Isso te obriga a sair do abstrato.',
        artifactWrapup:
          'Com o tempo, essa prática cria repertório muito mais convincente para entrevista técnica.',
        commonMistake:
          'Erro comum: falar de API só no nível do Postman e esquecer contrato, status, permissão e negativo. Outro erro é responder de forma tão ampla que parece não ter executado nada de fato.',
        practiceTask:
          'Escolha cinco perguntas de API e responda usando exemplos do Toolshop ou do Swag Lab. Grave sua explicação e veja se o exemplo realmente reforça o conceito.',
        interviewAngle:
          'Quando a entrevista tocar API, falar em contrato e risco costuma ser muito mais forte do que falar apenas em ferramenta.',
        artifactIntro:
          'Um caderno de perguntas com endpoint real e snippet curto de teste é excelente material de treino.',
        artifactWrapup:
          'Ele transforma estudo em repertório técnico reutilizável.',
        quiz: q(
          'Qual é uma boa forma de responder pergunta técnica de API em entrevista?',
          [
            'Focar apenas em qual ferramenta você abriu',
            'Explicar o conceito e ligar a resposta a um exemplo real de contrato ou teste',
            'Evitar mencionar cenário negativo',
            'Responder só com siglas',
          ],
          1,
          'Resposta forte de API combina conceito, risco e exemplo real de endpoint ou teste.',
        ),
        takeaways: [
          'Perguntas de API cobram contrato, não apenas ferramenta.',
          'Exemplo real de endpoint fortalece muito a resposta.',
          'Status, autenticação e negativo são temas recorrentes.',
          'Treinar com snippets reais deixa a fala muito mais convincente.',
        ],
      },
      {
        slug: 'perguntas-tecnicas-e2e',
        title: 'Técnicas — E2E',
        description: '15 perguntas.',
        checklistId: '08-entrevista-perguntas-tecnicas-e2e',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Playwright na prática',
        coreIdea:
          'Perguntas de E2E costumam explorar ferramenta, estratégia de cobertura, flakiness, locator, POM e pipeline. O objetivo é verificar se você entende custo de manutenção e não apenas sabe gravar fluxo de clique.',
        marketImpact:
          'No mercado brasileiro, Playwright ganhou espaço rápido, então vale muito saber justificar escolha de locator, wait, assertion e POM com base em estabilidade, CI e legibilidade.',
        exampleScenario:
          'Usar exemplos do Swag Lab para explicar POM, locators semânticos, waits observáveis e integração com pipeline te coloca em posição muito melhor do que responder apenas com teoria.',
        dailySignals:
          'Boa resposta mostra percepção de custo: quando um teste é caro, quando fica frágil, como reduzir flakiness e por que nem tudo deve ser E2E.',
        artifactIntro:
          'Monte uma lista de perguntas E2E e relacione cada uma a um trecho real do seu repositório. Isso torna a resposta concreta e memorável.',
        artifactWrapup:
          'Com trecho real em mente, você responde com muito mais segurança e menos buzzword.',
        commonMistake:
          'Erro comum: vender E2E como solução para tudo ou tratar flakiness como problema inevitável. Isso enfraquece a imagem de maturidade técnica.',
        practiceTask:
          'Selecione cinco perguntas E2E e responda sempre com um trade-off do seu projeto. Exemplo: por que escolheu Playwright, por que usou POM, quando não usaria E2E.',
        interviewAngle:
          'Em entrevista, trade-off vale ouro. Mostra que você entende custo, cobertura e manutenção, não só sintaxe.',
        artifactIntro:
          'Um arquivo ligando pergunta a trecho real de código é ótimo material de revisão.',
        artifactWrapup:
          'Ele te lembra de sempre responder com evidência do seu próprio trabalho.',
        quiz: q(
          'Qual elemento fortalece uma resposta sobre automação E2E?',
          [
            'Tratar E2E como a única camada importante',
            'Explicar ferramenta e padrões junto de custo, flakiness e trade-off',
            'Evitar mencionar manutenção',
            'Responder apenas com nome de framework',
          ],
          1,
          'Resposta forte sobre E2E mostra ferramenta, custo, manutenção e decisão de cobertura no contexto do projeto.',
        ),
        takeaways: [
          'E2E em entrevista pede trade-off, não só sintaxe.',
          'Locators, waits, assertions e POM são temas recorrentes.',
          'Exemplo real do Swag Lab fortalece muito a fala.',
          'Flakiness e custo de manutenção devem entrar na resposta.',
        ],
      },
      {
        slug: 'perguntas-cicd',
        title: 'Técnicas — CI/CD',
        description: '10 perguntas.',
        checklistId: '08-entrevista-perguntas-cicd',
        difficulty: 'intermediario',
        minutes: 16,
        heading: 'Pipeline e secrets',
        coreIdea:
          'Perguntas de CI/CD em entrevista costumam verificar se você entende gatilho, job, artefato, secret, custo de feedback e papel do pipeline no ciclo de qualidade. Não é esperado que você seja devops sênior, mas é importante mostrar autonomia de leitura.',
        marketImpact:
          'Cada vez mais vagas brasileiras esperam que QA converse com pipeline sem medo. Saber explicar um workflow simples, artefato e política de secret já te coloca acima de respostas muito rasas.',
        exampleScenario:
          'Usar o próprio workflow deste handbook ou do Swag Lab como exemplo permite falar de PR, main, lint, types, build, audit de conteúdo e artefato com base em caso real.',
        dailySignals:
          'Boa resposta fala de objetivo de cada job e do que ele protege. Resposta fraca fica só em “tem um YAML no GitHub”.',
        artifactIntro:
          'Um diagrama simples do workflow, com gatilho e propósito por etapa, é um excelente material de revisão para entrevista.',
        artifactWrapup:
          'Com esse mapa em mente, você tende a responder de forma mais lógica e menos decorada.',
        commonMistake:
          'Erro comum: tratar CI/CD como assunto externo demais e não se preparar. Para QA, mesmo um nível básico de fluência faz muita diferença.',
        practiceTask:
          'Explique um workflow seu em voz alta, passo a passo, como se estivesse ensinando alguém novo no time. Onde você travar, existe uma lacuna de entendimento para revisar.',
        interviewAngle:
          'Mostrar noção clara de feedback, artefato e secret comunica maturidade ótima para nível júnior ou júnior/pleno em evolução.',
        artifactIntro:
          'Mapear um workflow real do seu repositório é uma forma simples de transformar CI/CD em material concreto de estudo.',
        artifactWrapup:
          'Isso evita resposta genérica e melhora muito a confiança na hora da entrevista.',
        quiz: q(
          'Qual é uma resposta mais forte sobre CI/CD em entrevista de QA?',
          [
            'Dizer apenas que já ouviu falar em pipeline',
            'Explicar gatilho, job, feedback gerado e algum cuidado com secret ou artefato',
            'Responder que CI/CD é assunto só do devops',
            'Evitar mencionar build e testes',
          ],
          1,
          'Resposta forte sobre CI/CD mostra leitura de fluxo, propósito dos jobs e cuidados práticos com qualidade da entrega.',
        ),
        takeaways: [
          'Perguntas de CI/CD cobram leitura de pipeline e não especialização extrema.',
          'Gatilho, job, artefato e secret são pontos de alto valor na resposta.',
          'Exemplo de workflow real melhora muito a clareza.',
          'QA ganha diferencial quando sabe conversar bem com pipeline.',
        ],
      },
      {
        slug: 'simulados',
        title: 'Simulados',
        description: '3 simulados completos.',
        checklistId: '08-entrevista-simulados',
        difficulty: 'intermediario',
        minutes: 20,
        heading: 'Fintech, health, consultoria',
        coreIdea:
          'Simulado é o momento de juntar repertório técnico e comportamental sob pressão parecida com entrevista real. O objetivo não é acertar frase perfeita, e sim treinar raciocínio, estrutura de resposta e gestão de nervosismo.',
        marketImpact:
          'Para o mercado brasileiro, simulado ajuda muito porque o processo seletivo varia bastante entre startup, consultoria e empresa mais tradicional. Treinar contextos diferentes deixa sua fala mais adaptável.',
        exampleScenario:
          'Um simulado de fintech pode puxar risco e API; um de health pode exigir mais cuidado com dados sensíveis e clareza de processo; um de consultoria pode pedir comunicação, adaptação e velocidade de aprendizado em projetos variados.',
        dailySignals:
          'Sinais de bom simulado: resposta estruturada, tempo razoável, uso de exemplo real e autocorreção consciente. Sinais ruins: dispersão, excesso de buzzword e incapacidade de fechar a ideia.',
        artifactIntro:
          'Gravar os simulados e anotar pontos fortes, pontos confusos e termos repetidos demais é um excelente artefato de evolução.',
        artifactWrapup:
          'Rever a própria fala é desconfortável no começo, mas acelera demais a clareza e a confiança.',
        commonMistake:
          'Erro comum: estudar muito conteúdo e não treinar fala. Entrevista cobra raciocínio comunicado, não apenas conhecimento silencioso.',
        practiceTask:
          'Monte três simulados com contexto de empresa diferente e responda como se a conversa fosse real. Depois compare como sua narrativa muda e onde ainda falta consistência.',
        interviewAngle:
          'O simulado é onde você transforma todo o handbook em repertório aplicado. Não pule essa etapa.',
        artifactIntro:
          'Um checklist de autoavaliação por simulado ajuda a revisar sua evolução com critérios mais objetivos.',
        artifactWrapup:
          'Ele transforma nervosismo difuso em pontos concretos de melhoria.',
        quiz: q(
          'Qual é o maior benefício de fazer simulados de entrevista?',
          [
            'Decorar palavras difíceis',
            'Treinar raciocínio comunicado sob pressão parecida com a entrevista real',
            'Substituir estudo técnico por improviso',
            'Eliminar totalmente o nervosismo',
          ],
          1,
          'Simulado ajuda a transformar conhecimento em fala estruturada e confiante em contexto parecido com o da entrevista.',
        ),
        takeaways: [
          'Simulado transforma estudo em fala praticada.',
          'Contextos diferentes de empresa pedem nuances diferentes de resposta.',
          'Gravar e revisar a própria fala acelera clareza.',
          'Conhecimento sem treino oral costuma render menos do que poderia.',
        ],
      },
      {
        slug: 'negociacao-salario',
        title: 'Negociação salarial',
        description: 'Faixas 2026 e lembranças.',
        checklistId: '08-entrevista-negociacao-salario',
        difficulty: 'iniciante',
        minutes: 16,
        heading: 'Pesquisa e benefício',
        coreIdea:
          'Negociação salarial para QA júnior não é confronto; é preparação. Você precisa chegar sabendo sua faixa-alvo, seus critérios de aceitação e como comunicar valor com base em portfólio, stack e tipo de vaga.',
        marketImpact:
          'No mercado brasileiro de 2026, faixa de entrada varia bastante por cidade, remoto, regime de contratação, stack e nível real de autonomia esperado. Por isso, o melhor caminho é pesquisa consistente e clareza sobre o pacote total, não apenas o número fixo.',
        exampleScenario:
          'Uma vaga com salário um pouco menor pode compensar se trouxer mentoria forte, stack alinhada ao seu objetivo e espaço real de crescimento. Outra, com valor maior, pode ter contexto caótico e baixa chance de evolução. Negociar bem também é escolher ambiente, não só cifra.',
        dailySignals:
          'Sinais importantes na conversa: escopo da vaga, senioridade real exigida, benefícios, regime, expectativas de autonomia e possibilidade de crescimento. Tudo isso entra na leitura de proposta.',
        artifactIntro:
          'Monte uma folha simples com faixa mínima, faixa ideal, benefícios indispensáveis, pontos negociáveis e argumentos de valor. Esse material reduz ansiedade na hora da conversa.',
        artifactWrapup:
          'Ter seus critérios escritos evita aceitar ou recusar no impulso.',
        commonMistake:
          'Erro comum: responder valor sem pesquisa ou pedir desculpa por negociar. Outro erro é focar só no número e esquecer qualidade da vaga para o próximo passo da carreira.',
        practiceTask:
          'Pesquise três vagas parecidas com o seu objetivo e compare salário, stack, benefícios e exigência. Depois defina sua faixa de negociação com base em evidência.',
        interviewAngle:
          'Na conversa salarial, postura calma e argumento objetivo costumam funcionar melhor do que tentativa de pressão. Portfólio e clareza de escopo ajudam muito.',
        artifactIntro:
          'Uma tabela de decisão salarial é um artefato simples, mas muito útil para não depender de improviso.',
        artifactWrapup:
          'Ela organiza critério e te deixa mais seguro para conversar sem parecer perdido.',
        quiz: q(
          'Qual postura é mais saudável ao negociar salário em início de carreira?',
          [
            'Aceitar qualquer valor sem pesquisa para não incomodar',
            'Chegar com faixa pesquisada e considerar pacote completo da vaga',
            'Negociar apenas pelo impulso do momento',
            'Fingir que não se importa com remuneração',
          ],
          1,
          'Negociação mais saudável combina pesquisa, clareza de faixa e leitura do pacote completo da vaga, não só do número isolado.',
        ),
        takeaways: [
          'Negociação salarial começa em pesquisa, não na improvisação.',
          'Faixa, benefícios, regime e chance de crescimento precisam entrar na conta.',
          'Portfólio fortalece argumento de valor mesmo em início de carreira.',
          'Critérios escritos reduzem ansiedade na hora da conversa.',
        ],
      },
    ],
  },
  {
    folder: '09-glossario',
    chapters: [
      {
        slug: 'termos-tecnicos',
        title: 'Termos técnicos',
        description: 'Glossário com flashcards e revisão espaçada por categoria.',
        checklistId: '09-glossario-termos-tecnicos',
        difficulty: 'iniciante',
        minutes: 24,
        heading: 'Revisão rápida com repetição inteligente',
        coreIdea:
          'Este glossário foi pensado para consolidar linguagem técnica de QA e apoiar revisão espaçada entre os módulos.',
        quiz: q(
          'Qual é o melhor uso do glossário do handbook?',
          [
            'Ler uma vez e nunca mais voltar',
            'Usar os cards para revisar termos e identificar lacunas antes da entrevista',
            'Substituir totalmente os outros módulos',
            'Decorar siglas sem contexto',
          ],
          1,
          'O glossário funciona melhor como ferramenta de revisão recorrente, ajudando a identificar o que ainda precisa de aprofundamento nos outros módulos.',
        ),
        takeaways: [
          'Glossário bom acelera leitura de requisito, bug, pipeline e entrevista.',
          'Flashcards funcionam melhor com repetição espaçada e associação a casos reais.',
          'Termo técnico sem contexto vira decoração, não repertório.',
          'Use o glossário para diagnosticar lacunas e voltar ao módulo certo.',
        ],
      },
    ],
  },
);

modules.push(
  {
    folder: '05-cicd',
    chapters: [
      {
        slug: 'conceitos',
        title: 'Conceitos de CI/CD',
        description: 'Pipeline e papel do QA.',
        checklistId: '05-cicd-conceitos',
        difficulty: 'iniciante',
        minutes: 14,
        heading: 'CI vs CD vs deploy',
        coreIdea:
          'CI/CD é o encadeamento de práticas que reduz o tempo entre mudança de código e feedback confiável sobre qualidade, integração e entrega. CI foca em integrar cedo e validar cedo. CD amplia essa lógica para entrega contínua ou deploy contínuo, dependendo da estratégia da empresa.',
        marketImpact:
          'No mercado brasileiro, entender CI/CD virou requisito frequente até para vagas de QA manual com ambição de evolução. Isso acontece porque o pipeline é o lugar onde qualidade deixa de depender apenas de disciplina humana e passa a ganhar reforço automático.',
        exampleScenario:
          'Um projeto que roda lint, testes de API e smoke E2E a cada PR responde muito mais cedo sobre regressão do que um processo que depende apenas de validação manual perto do release. Mesmo quando o deploy não é automático, a lógica de feedback contínuo já muda o ritmo do time.',
        dailySignals:
          'Sinais importantes: build quebrando por integração, testes que demoram demais para responder, pipeline sem artefato para debug ou merge acontecendo sem validação mínima confiável.',
        artifactIntro:
          'Uma linha do tempo simples do pipeline do seu projeto já é um ótimo artefato: gatilho, job, tipo de validação, artefato gerado e decisão habilitada em cada etapa.',
        artifactWrapup:
          'Esse mapa ajuda a explicar para qualquer pessoa onde QA entra no fluxo e por que a qualidade do pipeline afeta a qualidade do produto.',
        commonMistake:
          'Erro comum: falar de CI/CD como sinônimo de “deploy automático”. Outro erro é imaginar que pipeline substitui raciocínio de QA; na verdade, ela automatiza sinais e reforça disciplina.',
        practiceTask:
          'Desenhe o pipeline ideal do seu portfólio, mesmo que ainda não esteja 100% implementado. Registre o que rodaria em PR, o que rodaria na main e que decisão cada etapa suportaria.',
        interviewAngle:
          'Em entrevista, explique CI/CD pela ótica de feedback e confiança. Isso mostra maturidade maior do que focar só em ferramenta específica.',
        artifactIntro:
          'Mesmo sem código, um fluxograma de pipeline já ajuda a internalizar a diferença entre validar, entregar e publicar.',
        artifactWrapup:
          'O valor está em ligar cada etapa a uma decisão real do time.',
        quiz: q(
          'Qual definição está mais alinhada ao objetivo de CI/CD para QA?',
          [
            'Substituir toda validação humana por deploy automático',
            'Reduzir tempo até feedback confiável sobre integração, qualidade e entrega',
            'Executar apenas testes manuais antes da publicação',
            'Rodar pipeline só quando produção quebra',
          ],
          1,
          'CI/CD existe para acelerar feedback e aumentar confiança do fluxo de entrega. Deploy automático pode ser consequência, mas não resume o conceito.',
        ),
        takeaways: [
          'CI/CD é sobre feedback rápido e confiável, não apenas deploy automático.',
          'Pipeline forte aumenta previsibilidade e disciplina de qualidade.',
          'QA precisa entender o fluxo para posicionar melhor os testes.',
          'Desenhar a linha do pipeline ajuda muito a estudar e explicar o tema.',
        ],
      },
      {
        slug: 'github-actions-basico',
        title: 'GitHub Actions básico',
        description: 'Workflow, jobs e caches.',
        checklistId: '05-cicd-github-actions-basico',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'YAML que roda de primeira',
        coreIdea:
          'GitHub Actions é a forma mais comum de muitos portfólios e projetos pequenos transformarem validação em rotina automatizada. Para QA, entender workflow, trigger, job, step, runner e cache já permite ler e propor melhorias de pipeline com segurança.',
        marketImpact:
          'No Brasil, GitHub Actions aparece em inúmeros times por custo inicial baixo e integração nativa com repositório. QA que entende o básico deixa de depender totalmente de dev para interpretar pipeline, triagem de falha e ajustes simples de automação.',
        exampleScenario:
          'Um workflow pode disparar em push e pull request, instalar dependências, rodar testes e subir artefatos. Mesmo sem escrever toda a arquitetura de CI, o QA consegue entender onde a validação entra e por que uma falha bloqueou merge.',
        dailySignals:
          'Você deve olhar para gatilho, ordem dos steps, runner, cache, artefatos e mensagens de falha. Esses pontos quase sempre explicam por que um workflow está lento, frágil ou difícil de depurar.',
        artifactIntro:
          'Vale muito manter um workflow simples e legível em vez de um YAML super sofisticado e impossível de manter. Comentários curtos e nomes claros de job ajudam o time inteiro.',
        artifactWrapup:
          'Legibilidade em pipeline também é qualidade, porque diminui custo de debug e de onboarding.',
        commonMistake:
          'Erro comum: copiar YAML da internet sem adaptar diretório, script, versão de Node ou estratégia de cache. O arquivo até pode rodar uma vez, mas dificilmente ficará saudável no projeto real.',
        practiceTask:
          'Escreva um workflow mínimo para o seu projeto com gatilho em PR, setup do ambiente e execução de um script importante. Depois valide se o nome dos jobs já comunica o suficiente.',
        interviewAngle:
          'Em entrevista, mostre que você sabe ler workflow como fluxo de validação. Isso comunica autonomia e capacidade de colaborar com CI mesmo sem ser devops.',
        codeLang: 'yaml',
        codeBlock: `name: ci

on:
  pull_request:
  push:
    branches: [main]

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint`,
        artifactIntro:
          'Esse workflow mínimo já deixa clara a estrutura central do GitHub Actions: gatilho, job, runner e steps de validação.',
        codeWrapup:
          'Com esse esqueleto pronto, você consegue adicionar testes, build e artefatos sem perder legibilidade.',
        quiz: q(
          'Qual ponto é central para entender um workflow de GitHub Actions?',
          [
            'Só o nome do arquivo YAML',
            'Como gatilhos, jobs e steps se encadeiam para produzir feedback',
            'A cor do badge no README',
            'A quantidade de comentários no arquivo',
          ],
          1,
          'O essencial em GitHub Actions é entender como o workflow é disparado e que sequência de jobs e steps produz a validação necessária.',
        ),
        takeaways: [
          'GitHub Actions organiza validação automática por gatilhos, jobs e steps.',
          'QA ganha autonomia quando sabe ler e propor ajustes simples em workflow.',
          'YAML legível vale mais do que configuração mirabolante sem contexto.',
          'Comece pelo mínimo viável e evolua conforme o projeto cresce.',
        ],
      },
      {
        slug: 'pipeline-qa',
        title: 'Pipeline de QA',
        description: 'Smoke no PR, suite na main, matriz.',
        checklistId: '05-cicd-pipeline-qa',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'O que roda quando',
        coreIdea:
          'Pipeline de QA é a organização das validações automáticas ao longo do fluxo de entrega. A pergunta central não é “quais testes existem?”, mas “qual teste roda em que momento, com que objetivo e com que custo de feedback?”.',
        marketImpact:
          'Em times brasileiros, pipeline bem desenhada evita dois extremos ruins: rodar tudo em todo lugar e tornar o fluxo lento, ou rodar quase nada e descobrir regressão tarde. O equilíbrio entre PR, merge em main, nightly e ambientes é parte do trabalho estratégico de QA.',
        exampleScenario:
          'Uma boa distribuição pode colocar lint e smoke no PR, suíte mais ampla na main, regressão pesada em janela noturna e execuções específicas por domínio quando o projeto cresce. O objetivo é adequar profundidade ao momento da decisão.',
        dailySignals:
          'Sinais de pipeline mal desenhada: PR demora demais, teste caro bloqueia feedback cedo, regressão relevante só roda de vez em quando ou o time não sabe para que serve cada job.',
        artifactIntro:
          'Faça um quadro simples com momento de execução, objetivo, testes incluídos e decisão habilitada. Esse quadro ajuda a enxergar a arquitetura do pipeline com clareza e facilita explicação para o time.',
        artifactWrapup:
          'Quando a arquitetura do pipeline fica explícita, fica muito mais fácil discutir otimização sem cair em achismo.',
        commonMistake:
          'Erro comum: chamar tudo de smoke ou colocar toda a suíte no PR por insegurança. O problema é que isso gera latência e, com o tempo, leva o próprio time a desvalorizar o pipeline.',
        practiceTask:
          'Classifique seus testes atuais em níveis de criticidade e tempo de execução. Depois decida em qual estágio de pipeline cada grupo faz mais sentido.',
        interviewAngle:
          'Responder essa pergunta com foco em custo de feedback e nível de risco mostra visão de engenharia e produto ao mesmo tempo.',
        codeLang: 'yaml',
        codeBlock: `jobs:
  pr-smoke:
    if: github.event_name == 'pull_request'
    steps:
      - run: npm run lint
      - run: npm run test:smoke

  main-regression:
    if: github.ref == 'refs/heads/main'
    steps:
      - run: npm run test:regression`,
        artifactIntro:
          'Esse recorte pequeno já mostra a lógica central: nem tudo precisa rodar em todos os momentos do mesmo jeito.',
        codeWrapup:
          'A maturidade do pipeline cresce quando cada job tem propósito claro e alinhado ao custo aceitável daquele estágio.',
        quiz: q(
          'Qual é uma boa lógica para desenhar pipeline de QA?',
          [
            'Rodar sempre a suíte mais pesada em todo pull request',
            'Distribuir validação conforme custo, criticidade e momento da decisão',
            'Evitar qualquer smoke porque regressão resolve tudo',
            'Executar pipeline só em produção',
          ],
          1,
          'Pipeline boa distribui validação por nível de risco e por momento de decisão, equilibrando feedback rápido e cobertura adequada.',
        ),
        takeaways: [
          'Pipeline de QA responde o que roda, quando roda e por quê.',
          'PR, main e execuções noturnas podem ter profundidades diferentes.',
          'Feedback rápido e cobertura útil precisam ser equilibrados.',
          'Arquitetura explícita do pipeline facilita otimização posterior.',
        ],
      },
      {
        slug: 'secrets',
        title: 'Secrets',
        description: 'GitHub Secrets e boas práticas.',
        checklistId: '05-cicd-secrets',
        difficulty: 'intermediario',
        minutes: 14,
        heading: 'Nunca logar secret',
        coreIdea:
          'Secret em CI/CD é qualquer dado sensível necessário para o pipeline funcionar sem ficar exposto no repositório ou nos logs. Para QA, isso inclui tokens, credenciais de ambiente, chaves de integração e qualquer variável que permita acesso indevido.',
        marketImpact:
          'No mercado brasileiro, vazamento de credencial em repositório ou log ainda acontece com frequência maior do que deveria. Ter noção prática de secrets mostra maturidade de segurança básica e evita um erro que pode comprometer o projeto inteiro.',
        exampleScenario:
          'Uma suíte E2E pode precisar de usuário de teste, token de API ou credencial de serviço externo. Se esse dado é hardcoded no código ou aparece no log do workflow, o risco vai muito além do teste: ele afeta segurança do sistema e confiança do time.',
        dailySignals:
          'Atenção especial a `.env` versionado sem cuidado, tokens em screenshot, echo de variável no console e shared accounts sem rotação mínima. Todos esses pontos merecem disciplina imediata.',
        artifactIntro:
          'Um bom artefato é uma tabela simples classificando segredos usados pelo projeto: nome, onde ficam armazenados, quem consome e qual política mínima de rotação ou revogação.',
        artifactWrapup:
          'Essa visão ajuda o time a não tratar secret como detalhe operacional invisível.',
        commonMistake:
          'Erro comum: achar que segredo só importa para produção. Ambiente de teste e CI também merecem proteção, porque costumam ter integrações reais e muita visibilidade em logs.',
        practiceTask:
          'Revise seu projeto e liste toda informação sensível usada localmente e no CI. Depois decida o que deve virar secret, o que pode ser variável pública e o que deveria ser removido do fluxo.',
        interviewAngle:
          'Em entrevista, uma resposta simples e forte é: secret não vai para repositório, não vai para log e precisa ter dono e contexto de uso claros.',
        codeLang: 'yaml',
        codeBlock: `env:
  API_TOKEN: \${{ secrets.API_TOKEN }}

steps:
  - run: npm run test:api`,
        artifactIntro:
          'O snippet acima mostra o básico: consumir valor sensível do storage adequado do CI sem expor a credencial no código do projeto.',
        codeWrapup:
          'Mesmo assim, é essencial garantir que scripts e logs não imprimam esse valor durante a execução.',
        quiz: q(
          'Qual prática é mais alinhada ao uso seguro de secrets em CI?',
          [
            'Versionar token no repositório para facilitar o onboarding',
            'Armazenar credencial no sistema de secrets do CI e evitar exposição em log',
            'Imprimir o secret no console para debug rápido',
            'Usar a mesma senha fixa em todos os ambientes sem rastreamento',
          ],
          1,
          'Secret deve ser armazenado em local apropriado e mantido fora do código e dos logs do pipeline.',
        ),
        takeaways: [
          'Secrets precisam ficar fora do código versionado e dos logs.',
          'QA também deve olhar segurança básica de credenciais no pipeline.',
          'Ambiente de teste e CI merecem a mesma disciplina mínima de proteção.',
          'Mapear quem usa cada secret ajuda a manter o fluxo saudável.',
        ],
      },
      {
        slug: 'artefatos',
        title: 'Artefatos',
        description: 'Upload de relatório e trace.',
        checklistId: '05-cicd-artefatos',
        difficulty: 'intermediario',
        minutes: 14,
        heading: 'Debugar CI com artefato',
        coreIdea:
          'Artefato em pipeline é tudo que ajuda o time a entender o que aconteceu em uma execução: relatório HTML, screenshot, vídeo, trace, log estruturado ou arquivo de evidência. Para QA, artefato bom encurta muito o tempo entre falha e diagnóstico.',
        marketImpact:
          'Em times brasileiros com janela curta e menos pessoas dedicadas a CI, artefato é a diferença entre investigar problema em minutos ou em horas. Sem ele, falha em pipeline vira “não reproduzi aqui” e o time perde confiança na automação.',
        exampleScenario:
          'Se um teste Playwright falha apenas no CI, trace e screenshot permitem revisar o fluxo sem precisar rerodar de forma cega várias vezes. O mesmo vale para relatório de Newman ou junit XML quando a suíte de API quebra em ambiente remoto.',
        dailySignals:
          'Sinais de pipeline madura: falha vem acompanhada de material útil para depuração. Sinais ruins: build quebra, mas ninguém sabe qual passo visualmente falhou ou que request causou o erro.',
        artifactIntro:
          'Defina desde cedo quais artefatos realmente ajudam seu projeto. Não é sobre subir tudo sempre; é sobre subir o suficiente para que a investigação não comece no escuro.',
        artifactWrapup:
          'Artefato bom reduz tempo de diagnóstico e protege a credibilidade da suíte perante o time.',
        commonMistake:
          'Erro comum: tratar artefato como luxo opcional. Outro erro é subir arquivos demais sem critério, gerando ruído e custo sem ganho real de debug.',
        practiceTask:
          'Escolha uma falha comum do seu projeto e pergunte que artefato teria resolvido a investigação mais rápido. Use essa resposta para decidir o que a pipeline deve publicar.',
        interviewAngle:
          'Se citarem CI, mencionar artefato mostra experiência prática. É um detalhe simples, mas muito conectado à dor real de manutenção da automação.',
        codeLang: 'yaml',
        codeBlock: `- name: Upload Playwright report
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/`,
        artifactIntro:
          'Esse step pequeno muda bastante a capacidade de debug, porque evita que a falha morra junto com o runner efêmero da pipeline.',
        codeWrapup:
          'O princípio vale para qualquer stack: publique a evidência que acelera o entendimento da falha sem exagerar no volume.',
        quiz: q(
          'Por que artefatos são importantes em pipeline de QA?',
          [
            'Porque deixam o workflow mais bonito',
            'Porque aceleram diagnóstico e aumentam confiança na investigação de falhas',
            'Porque substituem todos os logs',
            'Porque devem ser enviados mesmo quando não ajudam no debug',
          ],
          1,
          'Artefatos bons reduzem tempo de diagnóstico e ajudam o time a confiar mais no pipeline quando algo falha.',
        ),
        takeaways: [
          'Artefato útil encurta o caminho entre falha e diagnóstico.',
          'Relatório, trace, screenshot e logs estruturados têm alto valor para QA.',
          'Suba o suficiente para investigar bem sem criar ruído desnecessário.',
          'Pipeline sem artefato costuma gerar baixa confiança na automação.',
        ],
      },
    ],
  },
  {
    folder: '06-soft-skills',
    chapters: [
      {
        slug: 'comunicacao-com-dev',
        title: 'Comunicação com dev',
        description: 'Mesmo lado, fatos primeiro.',
        checklistId: '06-soft-skills-comunicacao-com-dev',
        difficulty: 'iniciante',
        minutes: 14,
        heading: 'Feedback sem confronto',
        coreIdea:
          'Comunicação com dev em QA funciona melhor quando parte de fatos observáveis, impacto claro e intenção de resolver o problema junto. O objetivo não é vencer discussão; é reduzir incerteza e melhorar a decisão do time.',
        marketImpact:
          'No mercado brasileiro, especialmente em squads enxutos, a qualidade da comunicação muda diretamente a velocidade do trabalho. QA que abre conversa com evidência e contexto evita desgaste desnecessário e aumenta credibilidade muito rápido.',
        exampleScenario:
          'Ao reportar um bug de checkout, é bem diferente dizer “isso está todo errado” de dizer “com usuário X, no navegador Y, o botão permanece habilitado sem endereço válido; isso permite tentar fechar pedido inconsistente”. A segunda forma convida colaboração.',
        dailySignals:
          'Bons sinais: conversa baseada em cenário reproduzível, linguagem objetiva e disposição para ouvir contexto técnico. Maus sinais: acusação, ironia, ticket sem evidência e escalonamento emocional antes de entender a causa.',
        artifactIntro:
          'Um mini-roteiro de conversa ajuda muito: contexto, passos, impacto, evidência e próxima pergunta. Parece simples, mas muda bastante o tom da interação.',
        artifactWrapup:
          'Quando essa estrutura vira hábito, o QA ganha reputação de pessoa confiável para triagem, não de “caçador de erro” difícil de colaborar.',
        commonMistake:
          'Erro comum: comunicar defeito como crítica pessoal ao dev. Outro problema é levar conversa sem evidência mínima, o que abre espaço para achismo e defensividade.',
        practiceTask:
          'Reescreva uma mensagem de bug em duas versões: uma emocional e outra factual. Compare o quanto cada uma facilita colaboração real.',
        interviewAngle:
          'Em entrevista comportamental, diga que você usa fatos primeiro e opinião depois. Essa frase parece simples, mas transmite postura profissional madura.',
        artifactIntro:
          'Até uma estrutura de comentário em issue já pode servir como artefato de comunicação consciente.',
        artifactWrapup:
          'O importante é preservar clareza, respeito e foco no problema.',
        quiz: q(
          'Qual postura tende a melhorar a comunicação entre QA e dev?',
          [
            'Acusar o responsável assim que o bug aparece',
            'Trazer cenário reproduzível, impacto e evidência em linguagem objetiva',
            'Escalar para liderança antes de conversar com o time',
            'Evitar qualquer pergunta para não parecer inseguro',
          ],
          1,
          'Comunicação saudável parte de fatos, impacto e intenção de resolver em conjunto. Isso reduz defensividade e acelera o entendimento.',
        ),
        takeaways: [
          'Comunicação forte em QA nasce de fatos, contexto e respeito.',
          'Cenário reproduzível e impacto claro reduzem ruído com dev.',
          'Mensagem emocional sem evidência gera defensividade desnecessária.',
          'Um roteiro simples ajuda a manter qualidade da conversa sob pressão.',
        ],
      },
      {
        slug: 'time-agil',
        title: 'Time ágil',
        description: 'Daily, refinement, review.',
        checklistId: '06-soft-skills-time-agil',
        difficulty: 'iniciante',
        minutes: 14,
        heading: 'Presença sem ruído',
        coreIdea:
          'Fazer parte de um time ágil, do ponto de vista de QA, significa participar com contribuição útil em cada momento do fluxo, sem transformar cerimônia em palco. Valor vem de perguntas certas, alinhamento e visibilidade sobre risco.',
        marketImpact:
          'Em muitos times brasileiros, QA júnior entra com receio de falar pouco ou de falar demais. Saber em que momento contribuir e com qual foco é uma habilidade prática que melhora muito sua integração com o squad.',
        exampleScenario:
          'Na daily, o melhor movimento pode ser sinalizar bloqueio ou risco de forma objetiva. No refinement, transformar regra ambígua em pergunta testável. Na review, mostrar evidência. Na retro, apontar gargalo de qualidade sem personalizar culpa.',
        dailySignals:
          'Sinais de boa atuação: intervenções curtas, foco no fluxo, visibilidade de risco e preparação prévia. Sinais ruins: silêncio total por medo ou participação longa demais sem mover a decisão.',
        artifactIntro:
          'Um quadro pessoal com “que pergunta levar para cada cerimônia” ajuda muito quem está começando. Essa preparação evita improviso e reduz ansiedade.',
        artifactWrapup:
          'Com o tempo, esse mapa mental vira natural e você passa a contribuir com mais confiança e menos ruído.',
        commonMistake:
          'Erro comum: achar que participar bem é falar muito. Outro erro é esperar convite formal para trazer ponto crítico que já deveria ter sido levantado antes.',
        practiceTask:
          'Antes de uma cerimônia do seu projeto ou estudo, escreva qual é a informação de qualidade mais útil para levar. Depois compare com o que realmente aconteceu.',
        interviewAngle:
          'Em entrevista, mostre que você enxerga cerimônia como mecanismo de alinhamento e redução de surpresa. Isso comunica maturidade acima do nível “participo de daily”.',
        artifactIntro:
          'Mesmo um quadro simples por cerimônia já ajuda a tornar sua participação muito mais intencional.',
        artifactWrapup:
          'O foco não é parecer protagonista; é melhorar decisão coletiva.',
        quiz: q(
          'Qual é uma boa forma de o QA contribuir em um time ágil?',
          [
            'Falar muito em toda cerimônia para mostrar presença',
            'Trazer informação útil, risco e pergunta testável no momento adequado',
            'Esperar o sprint terminar para então comentar requisito',
            'Evitar retro porque qualidade é assunto só de QA',
          ],
          1,
          'Contribuição madura em time ágil é objetiva, contextual e orientada a reduzir surpresa no fluxo.',
        ),
        takeaways: [
          'QA agrega valor em cerimônia quando traz informação útil no momento certo.',
          'Participação boa não é volume de fala; é clareza de contribuição.',
          'Pergunta testável no refinement e risco visível na daily têm alto impacto.',
          'Preparação reduz ansiedade e melhora presença profissional.',
        ],
      },
      {
        slug: 'reportar-bug',
        title: 'Reportar bug',
        description: 'Formal vs conversa rápida.',
        checklistId: '06-soft-skills-reportar-bug',
        difficulty: 'iniciante',
        minutes: 14,
        heading: 'O que o dev quer ver',
        coreIdea:
          'Reportar bug não é só abrir ticket; é escolher o melhor canal e o melhor nível de formalização para aquele problema. Às vezes uma conversa rápida destrava triagem. Outras vezes o contexto pede ticket completo com rastreabilidade.',
        marketImpact:
          'Em times brasileiros, saber equilibrar comunicação informal e registro formal evita tanto burocracia inútil quanto perda de histórico. Essa leitura contextual é muito valorizada porque mostra noção de fluxo, prioridade e colaboração.',
        exampleScenario:
          'Se você encontra uma inconsistência pequena enquanto pareia com o dev, talvez uma mensagem rápida já resolva. Se o bug tem impacto relevante, risco de regressão ou precisa entrar em backlog, o caminho formal vira obrigatório.',
        dailySignals:
          'Use registro formal quando o defeito precisa de rastreabilidade, priorização ou reexecução posterior. Use conversa rápida quando a questão ainda precisa só de confirmação rápida e o contexto está claro.',
        artifactIntro:
          'Um roteiro simples ajuda: confirmar cenário, decidir canal, registrar impacto e garantir que nada crítico fique sem rastreio.',
        artifactWrapup:
          'Isso evita o problema clássico de bug importante resolvido “no chat” sem qualquer histórico para o time.',
        commonMistake:
          'Erro comum: formalizar tudo com o mesmo peso ou, ao contrário, resolver tudo informalmente e perder visibilidade sobre problema recorrente.',
        practiceTask:
          'Pegue três defeitos do seu portfólio e escreva qual você trataria por conversa rápida e qual exigiria ticket completo, explicando o motivo em cada caso.',
        interviewAngle:
          'Boa resposta aqui mostra discernimento: saber quando agilizar via conversa e quando proteger o time com registro rastreável.',
        artifactIntro:
          'Um quadro de decisão por canal de comunicação pode parecer simples, mas ajuda muito quem está começando.',
        artifactWrapup:
          'Ele força você a pensar em impacto, urgência e necessidade de histórico antes de agir.',
        quiz: q(
          'Quando um bug deve ir além de uma conversa rápida e virar registro formal?',
          [
            'Somente quando o QA estiver irritado',
            'Quando houver necessidade de rastreabilidade, priorização ou reteste posterior',
            'Nunca, porque conversa no chat resolve tudo',
            'Apenas se o bug for visual',
          ],
          1,
          'Bug relevante para priorização, histórico ou reexecução precisa de registro formal, não apenas de conversa passageira.',
        ),
        takeaways: [
          'Reportar bug envolve escolher bem o canal e o nível de formalização.',
          'Conversa rápida e ticket formal têm papéis diferentes.',
          'Rastreabilidade importa quando há impacto, priorização ou reteste.',
          'Discernimento de canal é parte importante da maturidade de QA.',
        ],
      },
      {
        slug: 'postura-profissional',
        title: 'Postura profissional',
        description: 'No Go com dados, reputação técnica.',
        checklistId: '06-soft-skills-postura-profissional',
        difficulty: 'intermediario',
        minutes: 14,
        heading: 'Discordar com evidência',
        coreIdea:
          'Postura profissional em QA é a combinação de clareza, consistência, responsabilidade e coragem para sustentar uma recomendação com dados. Isso inclui dizer “não estou confortável com este release” sem transformar a fala em confronto pessoal.',
        marketImpact:
          'No mercado brasileiro, reputação técnica se constrói rápido a partir de pequenos hábitos: cumprir combinado, documentar bem, não esconder risco, saber discordar com respeito e admitir incerteza quando ela existe. Essa postura pesa muito em transição de carreira.',
        exampleScenario:
          'Imagine um release em que checkout ainda falha em cenário crítico, mas existe pressão para publicar. Postura profissional não é ser pessimista automático; é expor evidência, alcance, workaround e impacto para que a decisão de Go ou No Go seja consciente.',
        dailySignals:
          'Você percebe boa postura quando a pessoa é previsível, transparente e orientada a resolver problema sem teatro. Maus sinais aparecem em quem some do problema, muda discurso conforme pressão ou mascara risco para evitar conversa difícil.',
        artifactIntro:
          'Um documento curto de recomendação de release, com riscos, evidências e recomendação justificada, é excelente exercício de postura profissional aplicada.',
        artifactWrapup:
          'Esse artefato mostra que você sabe sustentar posição técnica sem precisar de autoridade hierárquica para isso.',
        commonMistake:
          'Erro comum: confundir postura firme com rigidez arrogante. Outro erro é o oposto: perceber risco relevante e silenciar por medo de desagradar.',
        practiceTask:
          'Escreva uma recomendação de Go ou No Go para um cenário do seu portfólio usando só fatos, impacto e próximos passos. Depois releia procurando qualquer frase emocional desnecessária.',
        interviewAngle:
          'Em entrevista comportamental, esse tema combina muito com histórias STAR de discordância respeitosa. Mostra maturidade, responsabilidade e autocontrole.',
        artifactIntro:
          'Mesmo um resumo de release em markdown já serve como treino concreto de postura técnica.',
        artifactWrapup:
          'O objetivo é aprender a sustentar recomendação com evidência e serenidade.',
        quiz: q(
          'O que melhor representa postura profissional forte em QA?',
          [
            'Concordar com qualquer release para evitar conflito',
            'Sustentar recomendação com fatos, impacto e respeito ao time',
            'Expor falhas do time para mostrar autoridade',
            'Evitar assumir qualquer posição em cenário crítico',
          ],
          1,
          'Postura forte em QA combina clareza, evidência e respeito. Discordância técnica não precisa virar confronto pessoal.',
        ),
        takeaways: [
          'Postura profissional em QA combina clareza, consistência e responsabilidade.',
          'Go/No Go deve ser sustentado por evidência, não por emoção.',
          'Firmeza não é arrogância, e silêncio diante de risco também custa caro.',
          'Histórias de discordância respeitosa são ótimas para entrevista.',
        ],
      },
    ],
  },
);

modules.push(
  {
    folder: '03-testes-api',
    chapters: [
      {
        slug: 'rest-fundamentos',
        title: 'REST na prática',
        description: 'Métodos HTTP, idempotência e recursos.',
        checklistId: '03-testes-api-rest-fundamentos',
        difficulty: 'iniciante',
        minutes: 18,
        heading: 'REST sem enrolação de teoria',
        coreIdea:
          'REST, no contexto de QA, é menos uma aula de arquitetura e mais uma forma de ler intenção de contrato. Método HTTP, recurso, payload, status code e idempotência indicam como o sistema deveria se comportar e o que você deve validar em cenário feliz, borda e erro.',
        marketImpact:
          'Em projetos brasileiros, saber ler REST acelera muito a atuação do QA porque API costuma virar a fonte mais rápida de feedback quando a interface ainda está mudando. Quem entende o contrato consegue validar regra com menos ruído de front e conversa melhor com backend.',
        exampleScenario:
          'Num fluxo de catálogo, GET deve buscar recurso sem causar efeito colateral; POST cria; PUT e PATCH atualizam com nuances; DELETE remove ou inativa. Se o contrato foge disso, o QA precisa entender por quê para não validar com suposição errada.',
        dailySignals:
          'Os sinais mais úteis aparecem quando nome de endpoint, método escolhido e comportamento real não combinam. Um POST usado como busca, um GET que muda estado ou uma atualização não idempotente costumam indicar risco técnico ou documentação fraca.',
        artifactIntro:
          'Um bom artefato para esse capítulo é um mapa simples dos endpoints do seu projeto com método, recurso, objetivo e regra principal. Esse quadro ajuda muito a enxergar intenção antes mesmo de escrever o primeiro teste.',
        artifactWrapup:
          'Documentar o contrato com esse olhar te ajuda a testar melhor e também a detectar inconsistência cedo, principalmente quando a documentação oficial está incompleta.',
        commonMistake:
          'Erro clássico: decorar sigla REST sem relacionar cada método ao tipo de verificação necessária. Outro desvio comum é testar só status 200 e ignorar semântica, idempotência e coerência do contrato.',
        practiceTask:
          'Escolha três endpoints do seu portfólio e escreva para cada um: objetivo, método, recurso afetado, efeitos colaterais esperados e cenário negativo mínimo. Esse exercício melhora sua leitura de API rapidamente.',
        interviewAngle:
          'Em entrevista, explique REST pela ótica de contrato e decisão de teste. Mostrar como método e idempotência mudam o que você valida é muito mais forte do que repetir definição acadêmica.',
        artifactIntro:
          'Um endpoint simples de produtos já permite visualizar REST de forma prática: recurso bem nomeado, método coerente e resposta previsível.',
        codeLang: 'http',
        codeBlock: `GET /products?category=hand-tools HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer <token>`,
        codeWrapup:
          'Ao olhar um request assim, o QA já consegue pensar em filtros válidos, paginação, ausência de token, categoria inexistente e consistência do body retornado.',
        quiz: q(
          'Qual leitura é mais útil para QA ao analisar um endpoint REST?',
          [
            'Apenas decorar que REST usa JSON',
            'Entender como método, recurso e comportamento esperado compõem o contrato',
            'Validar somente se a URL parece bonita',
            'Ignorar idempotência porque isso é assunto de dev',
          ],
          1,
          'Para QA, REST importa como contrato: método, recurso, efeitos esperados, status e coerência do comportamento.',
        ),
        takeaways: [
          'REST ajuda QA a ler contrato de forma estruturada.',
          'Método HTTP e recurso orientam o tipo de verificação necessária.',
          'Idempotência e coerência do endpoint fazem parte da análise.',
          'Mapear endpoint antes de testar reduz suposição errada.',
        ],
      },
      {
        slug: 'status-codes',
        title: 'Status codes',
        description: '2xx a 5xx: o que validar como QA.',
        checklistId: '03-testes-api-status-codes',
        difficulty: 'iniciante',
        minutes: 18,
        heading: '401 vs 403 e outros clássicos',
        coreIdea:
          'Status code não é detalhe cosmético da API. Ele sintetiza a interpretação do servidor sobre o resultado da requisição e orienta o cliente sobre o próximo passo. Para QA, validar código HTTP certo evita bug silencioso e integração ambígua.',
        marketImpact:
          'Em sistemas brasileiros com integração entre squads ou entre cliente e fornecedor, status code errado custa caro porque gera handling incorreto, mensagens enganosas e retrabalho em camadas diferentes. Um 200 com erro escondido no body é um clássico que atrapalha muito.',
        exampleScenario:
          'Se uma requisição sem autenticação retorna 200 com mensagem de erro no JSON, o front pode interpretar sucesso e seguir o fluxo quebrado. Se uma validação de campo inválido devolve 500 em vez de 400 ou 422, o time perde clareza sobre causa do problema.',
        dailySignals:
          'Fique atento quando o time trata todos os erros como 500, quando 401 e 403 são usados como sinônimos ou quando sucesso é reportado mesmo com falha funcional dentro do payload.',
        artifactIntro:
          'Monte uma tabela simples com status mais usados no seu sistema e a pergunta de negócio que cada um responde. Isso ajuda muito a sair da memorização mecânica e entrar em leitura de contrato.',
        artifactWrapup:
          'Ter esse mapa facilita análise de regressão porque você passa a saber quais códigos são esperados por endpoint e por tipo de falha.',
        commonMistake:
          'Erro comum: validar apenas “veio alguma resposta” e ignorar se o código combina com o cenário. Outro clássico é decorar faixas 2xx, 4xx e 5xx sem entender a diferença entre autenticação, autorização e validação de payload.',
        practiceTask:
          'Liste respostas esperadas para um endpoint do seu portfólio em cenário feliz, sem token, com token inválido, com dado ruim e com recurso inexistente. Esse exercício deixa muito claro o papel de cada código.',
        interviewAngle:
          'Quando perguntarem sobre status codes, não liste todos. Escolha os mais frequentes e explique o que eles significam para decisão do cliente e para triagem do time.',
        codeLang: 'python',
        codeBlock: `def test_requires_token(client):
    response = client.get('/orders')

    assert response.status_code == 401
    assert response.json()['message'] == 'Authentication required'`,
        artifactIntro:
          'Um teste pequeno como este já mostra que status code é parte central do contrato e não um detalhe opcional da resposta.',
        codeWrapup:
          'Note como o código HTTP e a mensagem trabalham juntos para dar clareza. Validar os dois aumenta muito a qualidade do teste.',
        quiz: q(
          'Por que validar status code correto é importante em API?',
          [
            'Porque o front-end nunca usa essa informação',
            'Porque ele comunica o resultado da requisição e orienta tratamento correto do cliente',
            'Porque só backend se importa com isso',
            'Porque todo erro deveria ser 500',
          ],
          1,
          'Status code orienta como cliente e time interpretam o resultado da chamada. Código errado gera integração ambígua e decisão ruim.',
        ),
        takeaways: [
          'Status code faz parte do contrato da API.',
          '401, 403, 404, 422 e 500 não são intercambiáveis.',
          'Código errado confunde cliente, triagem e observabilidade.',
          'Teste API validando status e significado do cenário.',
        ],
      },
      {
        slug: 'headers',
        title: 'Headers HTTP',
        description: 'Auth, cache, CORS e segurança.',
        checklistId: '03-testes-api-headers',
        difficulty: 'intermediario',
        minutes: 16,
        heading: 'Headers que você inspeciona todo dia',
        coreIdea:
          'Headers HTTP carregam metadados essenciais para autenticação, serialização, cache, segurança e comportamento de integração. Ignorá-los faz o QA perder metade da leitura do contrato, porque muita decisão importante da API não está apenas no corpo da resposta.',
        marketImpact:
          'No dia a dia de times brasileiros, problemas de header aparecem em CORS mal configurado, token expirado, conteúdo devolvido no formato errado, rate limit sem transparência ou cache respondendo dado obsoleto. QA que olha header evita vários bugs difíceis de diagnosticar só pela UI.',
        exampleScenario:
          'Uma chamada autenticada pode devolver 200, mas com header de cache inadequado, expondo informação sensível em ambiente compartilhado. Outra pode responder JSON válido, porém sem content-type correto, quebrando cliente que depende dessa semântica.',
        dailySignals:
          'Sinais frequentes: Authorization ausente, Accept ignorado, CORS permissivo demais, content-type incoerente, rate limit sem cabeçalhos de controle ou resposta que deveria ser privada vindo com cache público.',
        artifactIntro:
          'Crie uma pequena checklist de headers críticos por tipo de endpoint: autenticação, content-type, cache e qualquer cabeçalho customizado relevante. Isso reduz esquecimento em regressão e onboarding.',
        artifactWrapup:
          'Quando o time ganha essa checklist, bugs de integração deixam de depender apenas de percepção manual no front e passam a ser capturados mais cedo no nível do contrato.',
        commonMistake:
          'Erro comum: olhar só body e status code, assumindo que o restante da resposta está saudável. Em APIs reais, header errado pode quebrar consumo, segurança e comportamento de browser mesmo quando o JSON parece bonito.',
        practiceTask:
          'Pegue um endpoint autenticado do seu projeto e registre quais headers são obrigatórios na request e quais deveriam aparecer na response. Depois compare com o ambiente real.',
        interviewAngle:
          'Em entrevista, headers viram boa oportunidade para mostrar atenção a contrato e segurança. Cite exemplos concretos como Authorization, Content-Type, Cache-Control e CORS.',
        codeLang: 'python',
        codeBlock: `def test_json_content_type(client, token):
    response = client.get(
        '/products',
        headers={'Authorization': f'Bearer {token}', 'Accept': 'application/json'},
    )

    assert response.status_code == 200
    assert response.headers['content-type'].startswith('application/json')`,
        artifactIntro:
          'Esse teste é pequeno, mas captura um detalhe que costuma passar despercebido quando a validação fica só no corpo da resposta.',
        codeWrapup:
          'Com a mesma lógica, você pode validar cache, cabeçalhos de segurança e qualquer contrato adicional importante para consumo da API.',
        quiz: q(
          'Qual afirmação sobre headers HTTP é mais correta para QA?',
          [
            'Headers são secundários e só importam para infraestrutura',
            'Headers fazem parte do contrato e influenciam autenticação, cache, formato e segurança',
            'Headers servem apenas para debug manual',
            'Se o JSON veio certo, os headers podem ser ignorados',
          ],
          1,
          'Headers compõem o contrato da API e podem impactar autenticação, serialização, cache, CORS e segurança.',
        ),
        takeaways: [
          'Headers são parte central do contrato HTTP.',
          'Authorization, Content-Type, Cache-Control e CORS merecem leitura ativa do QA.',
          'Body correto não compensa header incorreto.',
          'Uma checklist de headers críticos ajuda muito em regressão.',
        ],
      },
      {
        slug: 'postman',
        title: 'Postman',
        description: 'Collections, environments e Newman.',
        checklistId: '03-testes-api-postman',
        difficulty: 'iniciante',
        minutes: 18,
        heading: 'Collection organizada de verdade',
        coreIdea:
          'Postman é útil quando deixa de ser bloco de requests soltas e vira coleção reproduzível com ambientes, variáveis, scripts de validação e documentação mínima. O valor está na organização do fluxo, não apenas em apertar Send.',
        marketImpact:
          'Em muitas empresas brasileiras, Postman ainda é a ferramenta de entrada para QA júnior em API. Quem sabe estruturar collection com clareza acelera onboarding, colaboração com dev e transição para execução automatizada via Newman.',
        exampleScenario:
          'Uma collection de autenticação, catálogo e pedido pode compartilhar token, baseUrl, massa de teste e validações básicas. Sem essa estrutura, cada requisição vira ilha e o conhecimento some assim que a sessão manual termina.',
        dailySignals:
          'Collection desorganizada costuma ter variáveis fixas no corpo, requests duplicadas, autenticação copiada em cada chamada e ausência de nomenclatura coerente. Tudo isso atrapalha reuso e dificulta transformar exploração em regressão.',
        artifactIntro:
          'Aqui o artefato ideal é uma collection com pastas por domínio de negócio, environments separados por ambiente e scripts pequenos para checagens repetidas. Isso já demonstra maturidade operacional muito acima de uso casual da ferramenta.',
        artifactWrapup:
          'Quando a collection está bem organizada, ela pode servir tanto para exploração quanto para base de documentação e até execução em CI com Newman.',
        commonMistake:
          'Erro comum: usar Postman apenas como navegador de API e não registrar nada. Outro erro é colocar tudo no mesmo environment sem versionar variáveis importantes ou sem separar massa sensível.',
        practiceTask:
          'Pegue cinco endpoints do seu portfólio, agrupe por domínio, parametrise baseUrl e token, e adicione pelo menos uma validação por request. Isso já muda muito a qualidade do uso da ferramenta.',
        interviewAngle:
          'Em entrevista, diga que Postman é útil como ferramenta de exploração e organização inicial, mas ganha muito mais valor quando collection, environments e Newman entram no fluxo.',
        codeLang: 'javascript',
        codeBlock: `pm.test('status deve ser 200', function () {
  pm.response.to.have.status(200);
});

pm.test('retorna lista de produtos', function () {
  const body = pm.response.json();
  pm.expect(Array.isArray(body.data)).to.eql(true);
});`,
        artifactIntro:
          'Scripts simples como esses já evitam validação apenas visual e começam a transformar request manual em evidência repetível.',
        codeWrapup:
          'O próximo passo natural é mover essa collection para Newman e integrá-la à pipeline, mantendo o mesmo contrato de validação.',
        quiz: q(
          'Qual é um sinal de que uma collection Postman está madura?',
          [
            'Ela tem apenas requests soltas executadas manualmente',
            'Ela usa variáveis, organização por domínio e validações reutilizáveis',
            'Ela evita qualquer script para não ficar complexa',
            'Ela repete token em cada request para ficar explícito',
          ],
          1,
          'Collection madura organiza fluxo, reutiliza variáveis e incorpora validações que facilitam exploração, documentação e execução automatizada.',
        ),
        takeaways: [
          'Postman útil é collection organizada, não sequência de cliques isolados.',
          'Variáveis, environments e scripts melhoram reuso e clareza.',
          'Boa collection facilita migração para Newman e CI.',
          'Evite duplicação de token, URL e requests sem contexto.',
        ],
      },
      {
        slug: 'pytest-httpx',
        title: 'pytest + httpx',
        description: 'Fixtures, markers e código real Toolshop.',
        checklistId: '03-testes-api-pytest-httpx',
        difficulty: 'intermediario',
        minutes: 20,
        heading: 'Stack Python moderna',
        coreIdea:
          'A combinação de pytest com httpx oferece uma stack forte para testes de API porque junta organização, legibilidade e flexibilidade. Pytest ajuda em fixtures, parametrização e relatório. HTTPX fornece um cliente moderno e ergonômico para requests síncronas ou assíncronas.',
        marketImpact:
          'No mercado brasileiro, pytest continua sendo uma linguagem comum de automação em times de backend e QA. Saber usar essa stack melhora sua comunicação com dev Python e amplia sua empregabilidade para contextos além do front.',
        exampleScenario:
          'Em um projeto como Toolshop, você pode criar fixture de cliente, fixture de token e testes separados por domínio de negócio. Isso deixa suíte mais limpa do que copiar request inteira em todo arquivo e facilita manutenção conforme o contrato evolui.',
        dailySignals:
          'Sinais de boa estrutura aparecem quando setup está concentrado em fixture, nome de teste comunica intenção e assertions validam contrato de forma legível. Sinais ruins aparecem quando tudo vive em um arquivo só e cada teste recria autenticação, base URL e massa.',
        artifactIntro:
          'Monte um esqueleto com `conftest.py`, cliente compartilhado, helpers de autenticação e pasta por domínio. Mesmo em portfólio pequeno, essa organização comunica engenharia de teste melhor do que um monte de requests avulsas.',
        artifactWrapup:
          'Estrutura boa reduz custo de manutenção e deixa claro para recrutador que você pensa em suíte como produto de engenharia, não apenas como script que “roda aqui”.',
        commonMistake:
          'Erro comum: usar pytest só como executor de requests sem aproveitar fixture, parametrização e marcação. Outro problema é validar pouco, checando apenas status code e ignorando contrato útil do body.',
        practiceTask:
          'Escolha um fluxo simples, extraia setup repetido para fixture e parametrize ao menos dois cenários negativos. O ganho de clareza costuma ficar evidente já no primeiro refactor.',
        interviewAngle:
          'Quando falar dessa stack, destaque legibilidade e manutenção. Mostrar que você sabe por que usa fixture e por que HTTPX é confortável para contrato vale mais do que decorar sintaxe.',
        codeLang: 'python',
        codeBlock: `import httpx
import pytest

@pytest.fixture
def client():
    return httpx.Client(base_url='https://api.practicesoftwaretesting.com')

def test_products_endpoint_returns_items(client):
    response = client.get('/products')

    assert response.status_code == 200
    assert len(response.json()['data']) > 0`,
        artifactIntro:
          'Esse exemplo mostra o mínimo viável de uma stack organizada: cliente compartilhado e assertion legível para comportamento esperado.',
        codeWrapup:
          'A partir daqui, você pode evoluir para fixtures de autenticação, schema, markers e parametrização por cenários negativos.',
        quiz: q(
          'Qual vantagem de usar pytest + httpx em testes de API?',
          [
            'A stack torna impossível validar cenário negativo',
            'Ela combina cliente HTTP legível com recursos fortes de organização e reutilização',
            'Ela serve apenas para testes assíncronos',
            'Ela elimina a necessidade de fixtures',
          ],
          1,
          'Pytest + HTTPX entrega legibilidade, estrutura e boa manutenção para testes de contrato e comportamento de API.',
        ),
        takeaways: [
          'Pytest + HTTPX é uma stack forte para API por legibilidade e manutenção.',
          'Fixtures e parametrização reduzem repetição e ruído.',
          'Estrutura de pastas e helpers comunica maturidade de engenharia.',
          'Valide mais do que status code quando o contrato pedir.',
        ],
      },
      {
        slug: 'cenarios-negativos',
        title: 'Cenários negativos',
        description: 'Payloads inválidos e borda.',
        checklistId: '03-testes-api-cenarios-negativos',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Negativo que acha bug de verdade',
        coreIdea:
          'Cenário negativo em API existe para provar que o sistema falha do jeito certo: com validação coerente, mensagem útil, status adequado e sem efeitos colaterais indevidos. É aí que muita regra mal implementada aparece antes de chegar à UI.',
        marketImpact:
          'Em projetos brasileiros com prazo curto, é comum o time cobrir só caminho feliz para mostrar avanço rápido. O problema é que defeito grave de contrato costuma morar justamente em dado inválido, ausência de campo obrigatório, permissão incorreta ou ordem inesperada de execução.',
        exampleScenario:
          'Um cadastro pode aceitar payload sem campo obrigatório, um pedido pode ser criado duas vezes com idempotência mal tratada ou um endpoint pode responder 500 para erro de validação que deveria ser 422. Todos esses exemplos são negativos que geram bug de valor real.',
        dailySignals:
          'Procure rotas onde a validação parece superficial, onde documentação lista restrição mas resposta não confirma isso, ou onde campos opcionais e obrigatórios ficam ambíguos. Esses pontos costumam render bons negativos.',
        artifactIntro:
          'Um bom artefato é uma lista mínima de heurísticas negativas por endpoint: campo faltando, formato inválido, valor fora de faixa, recurso inexistente, autenticação ausente e conflito de permissão.',
        artifactWrapup:
          'Essa lista vira memória operacional para regressão e evita que cenário negativo seja improvisado sem método toda vez.',
        commonMistake:
          'Erro comum: confundir negativo com caos aleatório. Cenário negativo forte é intencional e ligado ao contrato. Mandar lixo sem hipótese pode até achar algo, mas não substitui análise.',
        practiceTask:
          'Escolha um endpoint e desenhe ao menos cinco negativos baseados no contrato, não em chute puro. Depois classifique quais deles podem virar regressão automática.',
        interviewAngle:
          'Em entrevista, mostre que negativo é ferramenta de descoberta de regra mal protegida. Isso comunica maturidade porque sai do automático “teste feliz e acabou”.',
        codeLang: 'python',
        codeBlock: `def test_rejects_invalid_email(client):
    response = client.post('/customers', json={'email': 'abc', 'first_name': 'Wes'})

    assert response.status_code in {400, 422}
    assert 'email' in response.text.lower()`,
        artifactIntro:
          'Esse tipo de teste é simples, mas poderoso porque verifica se a API falha de forma previsível para dado claramente inválido.',
        codeWrapup:
          'Vale expandir o mesmo raciocínio para campo ausente, valor fora de faixa, permissão insuficiente e referência inexistente.',
        quiz: q(
          'Qual é a melhor leitura sobre testes negativos em API?',
          [
            'São menos importantes do que caminho feliz',
            'Devem ser aleatórios e sem relação com o contrato',
            'Validam se o sistema falha de forma coerente para entradas e contextos inválidos',
            'Servem apenas para aumentar número de casos',
          ],
          2,
          'Testes negativos bons derivam do contrato e verificam se a falha é tratada corretamente, sem comportamento imprevisível.',
        ),
        takeaways: [
          'Negativo testa qualidade da falha, não apenas existência do erro.',
          'Campo ausente, formato inválido e permissão errada são ótimos pontos de partida.',
          'Contrato é a fonte principal de um bom cenário negativo.',
          'Negativo forte evita bug grave chegar ao front.',
        ],
      },
      {
        slug: 'autenticacao',
        title: 'Autenticação em API',
        description: 'JWT, API key, Basic e OAuth visão QA.',
        checklistId: '03-testes-api-autenticacao',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Testar expiração e permissão',
        coreIdea:
          'Autenticação em API é o mecanismo que prova identidade da requisição; autorização decide o que essa identidade pode fazer. Para QA, o ponto central é validar fluxo de acesso, expiração, renovação e permissão de forma previsível.',
        marketImpact:
          'No mercado brasileiro, muitos sistemas misturam JWT, sessão, API key e integrações com terceiros. QA que entende o básico de autenticação evita falhas graves de acesso indevido e também reduz falso positivo quando problema está no token, não na regra de negócio em si.',
        exampleScenario:
          'Um endpoint administrativo pode exigir token válido e role específica. Se token expirado ainda acessa dado sensível, o problema é sério. Se usuário autenticado recebe 401 quando deveria receber 403, o contrato também está confuso e atrapalha integração.',
        dailySignals:
          'Fique atento a fluxos de login que não propagam bem expiração, endpoints com permissão frouxa, mensagens genéricas demais e diferenças pouco claras entre ausência de autenticação e falta de autorização.',
        artifactIntro:
          'Monte uma matriz simples com tipo de usuário, token esperado, endpoint e resultado permitido ou negado. Esse artefato ajuda muito a pensar cobertura de permissão sem se perder em tentativa manual desorganizada.',
        artifactWrapup:
          'Além de ajudar nos testes, essa matriz vira excelente material de conversa com produto e backend quando há dúvida sobre acesso.',
        commonMistake:
          'Erro clássico: validar apenas “com token funciona” e esquecer sem token, token expirado, token inválido, role incorreta e rota sensível. Outro erro é usar 401 e 403 como se fossem a mesma coisa.',
        practiceTask:
          'Escolha um endpoint protegido e teste acesso com usuário válido, token ausente, token expirado e usuário sem permissão. Registre o comportamento esperado e compare com o retorno real.',
        interviewAngle:
          'Em entrevista, mostrar que você diferencia autenticação de autorização e sabe testar expiração já te coloca à frente de respostas muito superficiais sobre API.',
        codeLang: 'python',
        codeBlock: `def test_admin_route_forbidden_for_regular_user(client, user_token):
    response = client.get(
        '/admin/reports',
        headers={'Authorization': f'Bearer {user_token}'},
    )

    assert response.status_code == 403`,
        artifactIntro:
          'Esse exemplo reforça uma distinção importante: o usuário está autenticado, mas não tem autorização para acessar o recurso.',
        codeWrapup:
          'Cobrir essas diferenças torna a suíte de API muito mais valiosa do ponto de vista de segurança e clareza contratual.',
        quiz: q(
          'Qual cenário diferencia autenticação de autorização em API?',
          [
            'Usuário sem token recebe 401 e usuário autenticado sem permissão recebe 403',
            'Os dois cenários devem sempre retornar 500',
            'Autenticação e autorização são a mesma coisa',
            'A diferença só importa para infraestrutura',
          ],
          0,
          '401 costuma representar ausência ou falha de autenticação. 403 indica identidade reconhecida, mas sem permissão para o recurso.',
        ),
        takeaways: [
          'Autenticação prova identidade; autorização define permissão.',
          'Token válido não basta: é preciso validar expiração e escopo.',
          '401 e 403 comunicam situações diferentes.',
          'Matriz de usuários e permissões ajuda muito a cobrir acesso.',
        ],
      },
    ],
  },
  {
    folder: '04-automacao-e2e',
    chapters: [
      {
        slug: 'comparativo-ferramentas',
        title: 'Comparativo de ferramentas',
        description: 'Selenium, Cypress, Playwright.',
        checklistId: '04-automacao-e2e-comparativo-ferramentas',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Escolha com dados de 2026',
        coreIdea:
          'Comparar Selenium, Cypress e Playwright não deveria ser guerra de torcida. O objetivo é entender trade-off de ecossistema, estabilidade, debugging, paralelismo, suporte cross-browser e aderência ao contexto do time.',
        marketImpact:
          'No mercado brasileiro de 2026, Playwright aparece forte em vagas modernas, Cypress ainda é relevante em muitos times e Selenium continua existindo em legados e ecossistemas maiores. Saber justificar escolha é mais importante do que vender uma ferramenta como solução universal.',
        exampleScenario:
          'Para um portfólio júnior com foco em web moderna, Playwright costuma brilhar por auto-wait, trace viewer e multi-browser. Para time já profundamente investido em Cypress, migrar pode não ser prioridade. Para legado com ecossistema diverso, Selenium ainda pode fazer sentido.',
        dailySignals:
          'A melhor escolha depende de stack do produto, maturidade do time, necessidade de cross-browser, orçamento de manutenção e observabilidade desejada em CI. Quando alguém escolhe ferramenta só porque “está na moda”, a conta costuma aparecer depois.',
        artifactIntro:
          'Uma matriz comparativa simples com critérios objetivos é ótima para portfólio: setup, debugging, browsers, paralelismo, custo de manutenção e alinhamento com o contexto escolhido.',
        artifactWrapup:
          'Esse tipo de comparação mostra pensamento crítico e evita respostas simplistas em entrevista.',
        commonMistake:
          'Erro comum: comparar ferramentas só pela experiência inicial de developer experience. QA precisa olhar também manutenção, CI, artefatos, flakiness e curva do time.',
        practiceTask:
          'Monte sua própria matriz com os critérios que mais importam para o projeto escolhido e escreva por que uma ferramenta ganhou naquele contexto específico.',
        interviewAngle:
          'Em entrevista, responda pela lógica de trade-off. Dizer “escolhi Playwright para este contexto por causa de X e Y” soa muito melhor do que “Playwright é melhor em tudo”.',
        artifactIntro:
          'Uma tabela curta já ajuda a tornar a comparação objetiva e reutilizável nas próximas decisões.',
        artifactWrapup:
          'Mesmo sem código, esse artefato é técnico porque transforma opinião em critério observável.',
        quiz: q(
          'Qual é a postura mais madura ao comparar ferramentas E2E?',
          [
            'Escolher a mais famosa e encerrar a conversa',
            'Avaliar trade-offs conforme contexto de produto, time e manutenção',
            'Evitar qualquer comparação para não criar polêmica',
            'Trocar de ferramenta a cada projeto para mostrar variedade',
          ],
          1,
          'Comparação madura considera contexto, custos e objetivos. Ferramenta boa em um cenário pode não ser a melhor em outro.',
        ),
        takeaways: [
          'Ferramenta E2E deve ser escolhida por trade-off, não por torcida.',
          'Playwright, Cypress e Selenium seguem relevantes em contextos diferentes.',
          'Debug, CI, multi-browser e manutenção pesam mais do que hype.',
          'Matriz comparativa é ótimo artefato para portfólio e entrevista.',
        ],
      },
      {
        slug: 'setup-playwright',
        title: 'Setup Playwright',
        description: 'Config, CLI e primeiro teste.',
        checklistId: '04-automacao-e2e-setup-playwright',
        difficulty: 'intermediario',
        minutes: 20,
        heading: 'playwright.config.ts sem medo',
        coreIdea:
          'Fazer setup de Playwright é mais do que instalar pacote e rodar `npx playwright test`. É definir baseUrl, projetos, retries, trace, reporter e estratégia de execução local e em CI de um jeito que o time realmente consiga manter.',
        marketImpact:
          'No mercado brasileiro, um setup inicial bem feito economiza muita dor em pipeline depois. Times que configuram observabilidade cedo com trace, screenshot e vídeo têm muito mais facilidade para tratar falha sem transformar QA em caça-fantasma.',
        exampleScenario:
          'Um projeto com login, catálogo e checkout pode rodar em Chromium no fluxo local e expandir para Firefox/WebKit na pipeline noturna. Essa escolha de setup já comunica prioridade de feedback rápido versus cobertura mais ampla em momentos específicos.',
        dailySignals:
          'Bons sinais: baseUrl centralizada, projetos nomeados, output claro, retries conscientes e artefato útil em falha. Maus sinais: config confusa, timeout mágico, múltiplas URLs hardcoded e ausência de debugging em CI.',
        artifactIntro:
          'O artefato principal aqui é o próprio `playwright.config.ts`, porque ele documenta decisões de execução tão bem quanto qualquer texto explicativo.',
        artifactWrapup:
          'Tratar a configuração como documento vivo ajuda o time a revisar trade-off de browser, retry e reporter conforme a suíte cresce.',
        commonMistake:
          'Erro recorrente: copiar config de tutorial sem entender por que cada opção existe. Isso gera timeout excessivo, retries mascarando flakiness e projetos demais para o estágio atual da suíte.',
        practiceTask:
          'Monte sua config começando pelo mínimo: baseUrl, reporter e trace on-first-retry. Depois evolua conforme o projeto exigir, registrando o motivo de cada adição.',
        interviewAngle:
          'Em entrevista, fale da config como peça de engenharia. Isso mostra que você enxerga automação E2E como produto mantido, não como script solto.',
        codeLang: 'ts',
        codeBlock: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});`,
        artifactIntro:
          'Mesmo enxuta, essa configuração já cobre baseURL, observabilidade e projeto principal de execução.',
        codeWrapup:
          'Com a suíte evoluindo, você pode adicionar reporter HTML, shards e projetos extras sem perder clareza da intenção inicial.',
        quiz: q(
          'Qual é uma boa característica de um setup Playwright saudável?',
          [
            'Copiar toda opção possível da documentação logo no primeiro dia',
            'Centralizar baseUrl e artefatos úteis, adicionando complexidade só quando houver motivo',
            'Evitar trace para deixar a config menor',
            'Usar timeout muito alto para nunca falhar',
          ],
          1,
          'Setup saudável começa claro e útil, com observabilidade e centralização básicas, e cresce conforme necessidade real.',
        ),
        takeaways: [
          'Setup Playwright é decisão de engenharia, não só instalação.',
          'BaseUrl, trace e reporter são pilares de uma boa experiência local e em CI.',
          'Config enxuta e intencional é melhor do que copiar tudo de tutorial.',
          'Evolua a config conforme risco e escala da suíte.',
        ],
      },
      {
        slug: 'page-object-model',
        title: 'Page Object Model',
        description: 'Estrutura e exemplo Swaglab.',
        checklistId: '04-automacao-e2e-page-object-model',
        difficulty: 'intermediario',
        minutes: 20,
        heading: 'POM que escala',
        coreIdea:
          'Page Object Model organiza locators e ações de uma tela em uma abstração reutilizável, reduzindo repetição e concentrando conhecimento de interação. O objetivo não é esconder tudo atrás de classe bonita, e sim diminuir custo quando a interface muda.',
        marketImpact:
          'No mercado brasileiro, POM continua muito cobrado porque mostra preocupação com manutenção. Mesmo quando o time adota outras abordagens, entender o raciocínio por trás do padrão é importante para conversar sobre escalabilidade da suíte.',
        exampleScenario:
          'Se cinco testes diferentes fazem login clicando nos mesmos elementos, qualquer mudança de seletor vai custar cinco correções. Quando a ação mora numa LoginPage, a correção tende a ficar centralizada e o spec continua descrevendo comportamento em vez de detalhe de DOM.',
        dailySignals:
          'POM costuma fazer sentido quando a tela é reutilizada em vários cenários ou quando o fluxo tem interação mais rica. Se a abstração começa a esconder regra de negócio demais ou virar classe gigante, o padrão perdeu a mão.',
        artifactIntro:
          'Um bom exercício é criar uma page por área importante e manter métodos curtos com nomes de intenção: login, adicionar item, finalizar compra. Essa organização deixa o teste mais legível e mais estável ao longo do tempo.',
        artifactWrapup:
          'A abstração deve servir ao teste. Quando a classe começa a ficar mais difícil de entender que o próprio fluxo, é sinal de que precisa ser quebrada ou simplificada.',
        commonMistake:
          'Erro comum: transformar Page Object em “super classe” que mistura locators, regra de negócio, assertion e utilidade genérica demais. Outro problema é esconder tanto a interface que o teste perde legibilidade.',
        practiceTask:
          'Escolha um fluxo com repetição no seu portfólio e extraia uma page com locators estáveis e métodos pequenos. Compare o antes e depois em legibilidade e manutenção.',
        interviewAngle:
          'Em entrevista, diga que POM serve para reduzir repetição e concentrar manutenção, mas que você evita abstração excessiva. Essa nuance mostra maturidade.',
        codeLang: 'ts',
        codeBlock: `export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string) {
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}`,
        artifactIntro:
          'Esse exemplo mostra a essência do padrão: concentrar locators e intenção sem transformar a classe em monstro genérico.',
        codeWrapup:
          'Em teste, isso permite escrever fluxo mais limpo e focado em comportamento, reduzindo repetição de seletor espalhado.',
        quiz: q(
          'Qual é uma boa justificativa para usar POM em automação E2E?',
          [
            'Esconder toda a interface para o teste ficar misterioso',
            'Centralizar ações e locators repetidos para reduzir custo de manutenção',
            'Evitar qualquer assertion no projeto',
            'Substituir necessidade de bons locators',
          ],
          1,
          'POM ajuda a reduzir repetição e concentrar manutenção, desde que a abstração permaneça legível e proporcional.',
        ),
        takeaways: [
          'POM reduz repetição e centraliza manutenção de interação.',
          'Boa abstração preserva intenção do teste sem esconder demais a UI.',
          'Classes gigantes e genéricas demais são sinal de excesso.',
          'Use POM onde há repetição e valor real de manutenção.',
        ],
      },
      {
        slug: 'locators',
        title: 'Locators',
        description: 'Hierarquia Playwright e data-testid.',
        checklistId: '04-automacao-e2e-locators',
        difficulty: 'intermediario',
        minutes: 18,
        heading: 'Seletor estável de verdade',
        coreIdea:
          'Locator é a forma como o teste encontra um elemento de interface. Em Playwright, a ordem de preferência costuma privilegiar semântica de usuário: role, label, texto e test id. Locator bom reduz flakiness e melhora legibilidade do teste.',
        marketImpact:
          'Times brasileiros que sofrem com automação frágil quase sempre têm história de seletor ruim. CSS quebradiço, XPath longo e dependência de estrutura visual geram manutenção cara e derrubam confiança do time na suíte.',
        exampleScenario:
          'Um botão de login pode ser encontrado por role e nome acessível com muito mais estabilidade do que por uma cadeia CSS dependente da posição do elemento no DOM. Quando o layout muda, o locator semântico costuma sobreviver melhor.',
        dailySignals:
          'Sinais de locator ruim: muito `.nth()`, dependência de texto dinâmico instável, seletor que quebra quando muda o container visual e testes que falham por causa de detalhes de marcação sem impacto no usuário.',
        artifactIntro:
          'Crie uma hierarquia de escolha de locator para o seu projeto: role primeiro, label quando fizer sentido, test id para componentes sem semântica forte e CSS apenas como último recurso documentado.',
        artifactWrapup:
          'Essa convenção reduz discussão aleatória em PR e ajuda todo mundo a automatizar com o mesmo critério.',
        commonMistake:
          'Erro recorrente: usar XPath ou CSS longo por reflexo, mesmo quando o elemento já tem role ou label acessível. Outro desvio é pedir test id para tudo sem primeiro explorar se a interface já oferece semântica adequada.',
        practiceTask:
          'Revise um teste seu e troque os seletores mais frágeis por locators semânticos. Depois rode novamente e compare legibilidade e estabilidade percebida.',
        interviewAngle:
          'Em entrevista, fale da hierarquia de locator e da relação entre seletor bom, acessibilidade e manutenção. É um ótimo tema para mostrar profundidade prática em Playwright.',
        codeLang: 'ts',
        codeBlock: `await page.getByRole('button', { name: 'Add to cart' }).click();
await page.getByLabel('Password').fill('secret_sauce');
await page.getByTestId('cart-count').waitFor();`,
        artifactIntro:
          'O trio acima mostra uma boa combinação: semântica quando existe, test id quando ajuda e nada de dependência desnecessária da estrutura visual.',
        codeWrapup:
          'Quanto mais previsível for a convenção de locators, menor tende a ser a fragilidade da suíte no médio prazo.',
        quiz: q(
          'Qual tendência costuma produzir locator mais estável em Playwright?',
          [
            'Priorizar role, label e test id conforme semântica do elemento',
            'Usar sempre o maior XPath possível',
            'Escolher o primeiro seletor que funcionar no DevTools',
            'Depender da posição visual do elemento na tela',
          ],
          0,
          'Locators semânticos e consistentes tendem a sobreviver melhor a mudanças de layout e tornam o teste mais legível.',
        ),
        takeaways: [
          'Locator bom é parte central da estabilidade da suíte E2E.',
          'Role, label e test id formam uma hierarquia saudável em Playwright.',
          'CSS longo e XPath por reflexo costumam aumentar custo de manutenção.',
          'Convensão de locator melhora PR, legibilidade e colaboração.',
        ],
      },
      {
        slug: 'assertions',
        title: 'Assertions',
        description: 'Web-first, soft e API no mesmo fluxo.',
        checklistId: '04-automacao-e2e-assertions',
        difficulty: 'intermediario',
        minutes: 16,
        heading: 'Expect que não flakya à toa',
        coreIdea:
          'Assertion define o que precisa ser verdade para que o teste considere o comportamento aceito. Em Playwright, assertions web-first esperam automaticamente pelo estado desejado, o que reduz a necessidade de esperas manuais e melhora resiliência.',
        marketImpact:
          'No dia a dia brasileiro, muita falha de automação nasce menos de interação e mais de assertion mal escolhida. Validar texto genérico demais, estado transitório ou detalhe irrelevante faz o teste oscilar e diminui confiança da equipe.',
        exampleScenario:
          'Depois do login, pode ser mais forte validar que a URL mudou e que um elemento específico do dashboard ficou visível do que checar qualquer fragmento de texto solto na página. Boa assertion combina intenção, estabilidade e valor de negócio.',
        dailySignals:
          'Sinais de assertion fraca: teste passa mesmo com fluxo errado, falha por detalhes visuais sem relevância funcional ou precisa de `waitForTimeout` antes de validar estado. Sinais bons: assertion orientada a comportamento observável importante.',
        artifactIntro:
          'Mantenha uma pequena convenção sobre o que é aceitável afirmar em cada tipo de fluxo: navegação, estado de componente, retorno de API, mensagem de erro e persistência de dado.',
        artifactWrapup:
          'Quando a equipe pensa em assertion como contrato de comportamento, o teste fica muito mais valioso do que uma simples sequência de cliques.',
        commonMistake:
          'Erro comum: exagerar no número de assertions irrelevantes ou, no extremo oposto, validar tão pouco que o teste não protege nada importante. O equilíbrio vem do valor da evidência.',
        practiceTask:
          'Releia um teste seu e pergunte: “se esta assertion falhar, o que exatamente o time aprende?” Se a resposta for vaga, talvez a verificação precise ser redesenhada.',
        interviewAngle:
          'Boa resposta em entrevista mostra que você escolhe assertion pelo comportamento crítico e pela estabilidade do sinal, e não apenas porque “ficou fácil de escrever”.',
        codeLang: 'ts',
        codeBlock: `await expect(page).toHaveURL(/inventory/);
await expect(page.getByTestId('shopping-cart-link')).toBeVisible();
await expect(page.getByText('Products')).toBeVisible();`,
        artifactIntro:
          'Essas assertions combinam navegação, presença de elemento crítico e texto relevante sem depender de espera manual arbitrária.',
        codeWrapup:
          'Em muitos fluxos, essa combinação já cria uma evidência muito mais forte do que validar um único texto genérico perdido na página.',
        quiz: q(
          'O que caracteriza uma assertion forte em automação E2E?',
          [
            'Ela valida qualquer detalhe visual para aumentar cobertura',
            'Ela comprova comportamento importante com sinal estável e valor para o time',
            'Ela depende de sleep antes de rodar',
            'Ela evita verificar estado crítico para não quebrar',
          ],
          1,
          'Assertion forte valida comportamento relevante com evidência estável e útil para o time, sem exagero nem superficialidade.',
        ),
        takeaways: [
          'Assertion define o contrato de comportamento esperado pelo teste.',
          'Em Playwright, web-first assertions reduzem necessidade de espera manual.',
          'Verificar demais ou de menos são erros igualmente caros.',
          'Escolha assertions pelo valor do sinal para o time.',
        ],
      },
      {
        slug: 'esperas',
        title: 'Esperas',
        description: 'Auto-wait vs waitFor* vs sleep.',
        checklistId: '04-automacao-e2e-esperas',
        difficulty: 'intermediario',
        minutes: 16,
        heading: 'Por que sleep é red flag',
        coreIdea:
          'Esperas em automação E2E servem para sincronizar teste e aplicação. Em Playwright, boa parte desse trabalho já é feita por auto-wait em ações e assertions. O papel do QA é escolher a espera certa quando o comportamento exige sincronização adicional explícita.',
        marketImpact:
          'No mercado brasileiro, muito projeto sofre com flakiness por causa de `sleep` aleatório. Esse tipo de solução parece rápida no curto prazo, mas aumenta tempo de pipeline e mascara problema real de sincronismo ou observabilidade.',
        exampleScenario:
          'Se o clique dispara uma chamada e a tela só muda depois da resposta, faz sentido esperar por um estado observável, uma response ou um elemento específico. Dormir três segundos porque “normalmente funciona” cria uma bomba-relógio de manutenção.',
        dailySignals:
          'Sinais de espera ruim: timeout arbitrário, teste lento sem motivo, falha intermitente dependente de ambiente e dificuldade para explicar exatamente o que o script está aguardando.',
        artifactIntro:
          'Vale criar uma regra explícita para o projeto: priorizar auto-wait e assertions; usar `waitForResponse`, `waitForURL` ou condição visível quando necessário; evitar `waitForTimeout` como solução padrão.',
        artifactWrapup:
          'Essa convenção ajuda muito porque torna revisões de automação mais objetivas e combate flakiness antes de ela virar cultura.',
        commonMistake:
          'Erro clássico: tratar `sleep` como atalho inocente. Outro problema é esperar pelo sinal errado, como texto transitório pouco confiável, em vez de observar o comportamento que realmente define avanço do fluxo.',
        practiceTask:
          'Procure um teste seu com espera suspeita e troque por uma condição observável mais forte. Compare o tempo e a estabilidade depois da mudança.',
        interviewAngle:
          'Quando esse tema surgir, diga que espera boa é explicável. Se você não consegue descrever claramente o evento ou estado aguardado, provavelmente a sincronização ainda está fraca.',
        codeLang: 'ts',
        codeBlock: `await Promise.all([
  page.waitForResponse((response) => response.url().includes('/inventory') && response.ok()),
  page.getByRole('button', { name: 'Login' }).click(),
]);

await expect(page).toHaveURL(/inventory/);`,
        artifactIntro:
          'Esse padrão deixa claro o que o teste espera: a chamada relevante concluir e a navegação refletir o novo estado.',
        codeWrapup:
          'É muito mais forte do que um timeout fixo porque sincroniza o teste com comportamento observável do sistema.',
        quiz: q(
          'Qual leitura está mais alinhada a boas práticas de esperas em Playwright?',
          [
            'waitForTimeout é a melhor saída para qualquer flakiness',
            'A melhor espera é a que observa um estado ou evento significativo do fluxo',
            'Não existe problema em dormir alguns segundos em todos os testes',
            'Esperas explícitas nunca são necessárias',
          ],
          1,
          'Boa espera observa estado ou evento real do fluxo. Timeouts fixos devem ser exceção e não base da sincronização.',
        ),
        takeaways: [
          'Playwright já oferece auto-wait em muitas ações e assertions.',
          'Espera extra deve observar evento ou estado significativo do fluxo.',
          'Sleep arbitrário é sinal de fragilidade e lentidão.',
          'Sincronização boa é explicável e reproduzível.',
        ],
      },
      {
        slug: 'hooks-fixtures',
        title: 'Hooks e fixtures',
        description: 'beforeEach e fixtures customizadas.',
        checklistId: '04-automacao-e2e-hooks-fixtures',
        difficulty: 'avancado',
        minutes: 18,
        heading: 'Fixture > gambiarra no beforeEach',
        coreIdea:
          'Hooks e fixtures organizam setup e teardown da suíte. O ganho real aparece quando dados, contexto e sessão são montados de forma explícita e reutilizável, em vez de espalhar preparação manual por vários testes.',
        marketImpact:
          'Em times brasileiros com crescimento rápido de suíte, a diferença entre beforeEach genérico e fixture bem desenhada aparece cedo: menos repetição, menos estado escondido e mais clareza sobre dependência de cada teste.',
        exampleScenario:
          'Se vários cenários precisam de usuário autenticado, uma fixture de sessão pode encapsular login ou estado salvo. Isso deixa o spec focado em comportamento de negócio e reduz ruído em cada arquivo de teste.',
        dailySignals:
          'Sinais de bom uso: setup declarativo, reaproveitamento claro e dependência explícita no teste. Sinais ruins: beforeEach gigante, side effects invisíveis, massa compartilhada demais e dificuldade para entender de onde veio o estado.',
        artifactIntro:
          'Uma convenção de fixtures por domínio e não por “arquivão utilitário” ajuda muito. Separe autenticação, dados de produto, carrinho ou admin conforme contexto real da suíte.',
        artifactWrapup:
          'Quanto mais explícita a fixture, mais fácil fica entender o custo de setup e evitar estado mágico contaminando cenários.',
        commonMistake:
          'Erro comum: usar beforeEach para tudo, acumulando lógica que o teste nunca mostra de frente. Outro erro é compartilhar demais o mesmo estado e criar dependência invisível entre cenários.',
        practiceTask:
          'Escolha um conjunto de testes repetitivo e extraia o setup para uma fixture nomeada. Depois pergunte se o spec ficou mais fácil de ler e se a dependência ficou mais explícita.',
        interviewAngle:
          'Em entrevista, destacar clareza e isolamento como critérios de fixture é ótimo sinal. Mostra que você pensa em arquitetura de teste, não só em sintaxe de framework.',
        codeLang: 'ts',
        codeBlock: `import { test as base } from '@playwright/test';

export const test = base.extend({
  loggedPage: async ({ page }, use) => {
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await use(page);
  },
});`,
        artifactIntro:
          'Essa fixture deixa explícito que o teste receberá uma página já autenticada, reduzindo ruído repetido em vários specs.',
        codeWrapup:
          'O ganho vem quando essa abstração permanece clara e não vira um monte de side effects invisíveis no setup.',
        quiz: q(
          'Qual é uma boa razão para usar fixture em Playwright?',
          [
            'Esconder toda a preparação sem deixar pista no teste',
            'Reutilizar setup de forma explícita e reduzir repetição com clareza',
            'Evitar qualquer isolamento entre cenários',
            'Substituir assertions',
          ],
          1,
          'Fixture bem feita reduz repetição e deixa dependência clara. O objetivo é legibilidade e isolamento, não esconder estado.',
        ),
        takeaways: [
          'Fixtures ajudam a estruturar setup reutilizável com clareza.',
          'beforeEach gigante tende a esconder dependência e aumentar ruído.',
          'Estado compartilhado demais pode contaminar a suíte.',
          'Boa fixture deixa o spec focado em comportamento.',
        ],
      },
    ],
  },
);

function stripForWordCount(source) {
  return source
    .replace(/^---[\s\S]*?---/m, ' ')
    .replace(/^import .*$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/[`*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(source) {
  const cleaned = stripForWordCount(source);
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function slugToQuizId(slug) {
  return `${slug.normalize('NFD').replace(/[^\w-]/g, '').replaceAll('_', '-')}-q1`;
}

function renderQuiz(quizId, quiz) {
  const options = quiz.options.map((option) => `    ${JSON.stringify(option)},`).join('\n');
  return `<Quiz
  id=${JSON.stringify(quizId)}
  question=${JSON.stringify(quiz.question)}
  options={[
${options}
  ]}
  correctIndex={${quiz.correctIndex}}
  explanation=${JSON.stringify(quiz.explanation)}
/>`;
}

function renderTakeaways(items) {
  const values = items.map((item) => `    ${JSON.stringify(item)},`).join('\n');
  return `<KeyTakeaways
  items={[
${values}
  ]}
/>`;
}

function renderArtifactSection(chapter) {
  if (chapter.codeBlock) {
    return `## Exemplo prático de artefato ou código

${chapter.artifactIntro} Um ponto importante aqui é perceber que o valor do snippet não está em copiar linha por linha, e sim em enxergar a intenção por trás da estrutura: evidência objetiva, leitura rápida e manutenção possível no dia seguinte.

\`\`\`${chapter.codeLang ?? 'txt'}
${chapter.codeBlock.trim()}
\`\`\`

${chapter.codeWrapup} Em um contexto profissional, você quase sempre vai adaptar o exemplo ao naming do time, ao CI existente e ao nível de risco do fluxo. Ainda assim, ter um modelo concreto encurta a curva de aprendizado e evita que o capítulo fique preso só na teoria.`;
  }

  return `## Artefato que vale construir no portfólio

${chapter.artifactIntro} O objetivo é sair do capítulo com um entregável tangível: algo que você possa anexar em issue, colocar no README do projeto ou usar como referência quando precisar repetir o raciocínio em outro contexto.

${chapter.artifactWrapup} Quando você transforma conhecimento em artefato, fica mais fácil revisar, explicar em entrevista e provar que domina o tema com evidência em vez de discurso genérico.`;
}

function renderGlossaryCategoryIntro(category, cards) {
  const highlightedTerms = cards
    .slice(0, 5)
    .map((card) => card.term)
    .join(', ');

  return `Antes de abrir os flashcards de ${category.toLowerCase()}, vale perceber o fio condutor entre termos como ${highlightedTerms}. Eles costumam aparecer juntos em backlog, bug report, pipeline, planejamento de cobertura e entrevista técnica. Quando você entende a relação entre esses conceitos, deixa de tratar vocabulário como lista decorada e começa a enxergar um mapa mental de decisão: o que observar, o que perguntar, que risco existe e como explicar isso para o restante do time.

Um erro comum de iniciante nesta categoria é conhecer a definição isolada, mas não reconhecer o termo no contexto real do projeto. Por isso, use este bloco tentando conectar cada palavra a um caso concreto do seu portfólio, a uma conversa com dev ou a uma evidência que você já produziu. Essa prática acelera a revisão, melhora a sua fluência em português técnico e ajuda muito quando você precisa responder rápido em entrevista sem soar engessado.`;
}

function renderStandardChapter(chapter) {
  const quizId = chapter.quiz.id ?? slugToQuizId(chapter.slug);

  const content = `---
title: ${JSON.stringify(chapter.title)}
description: ${JSON.stringify(chapter.description)}
---

import { DifficultyBadge } from '@/components/learning/DifficultyBadge';
import { EstimatedTime } from '@/components/learning/EstimatedTime';
import { ChecklistItem } from '@/components/learning/ChecklistItem';
import { KeyTakeaways } from '@/components/learning/KeyTakeaways';
import { Quiz } from '@/components/learning/Quiz';

<div className="not-prose mb-6 flex flex-wrap items-center gap-3">
  <DifficultyBadge level="${chapter.difficulty}" />
  <EstimatedTime minutes={${chapter.minutes}} />
</div>

## ${chapter.heading}

${chapter.coreIdea} Em QA júnior, o ganho real aparece quando você consegue reconhecer esse assunto no backlog, na conversa de refinement, na escolha do cenário de teste e no momento de comunicar risco para o time. Em vez de decorar uma definição isolada, a meta é entender o efeito prático que ela tem sobre cobertura, prioridade, confiança do release e qualidade da comunicação.

${chapter.dailySignals} Esse é o tipo de leitura que diferencia uma pessoa que só executa passo a passo de alguém que começa a pensar como profissional de qualidade. Quando o conceito fica claro, você passa a observar o produto de forma mais estruturada e deixa de depender apenas de feeling.

## Por que isso importa no mercado brasileiro

${chapter.marketImpact} Em muitas empresas brasileiras, o time de QA ainda é enxuto e precisa trabalhar com tempo curto, pressão de entrega e processos em amadurecimento. Nessa realidade, dominar ${chapter.title.toLowerCase()} não é luxo acadêmico; é uma forma concreta de reduzir retrabalho, dar feedback mais rápido e escolher melhor onde vale investir energia.

Outro ponto importante é a comunicação. Em squads pequenos, QA conversa o tempo todo com dev, PO, suporte, liderança e, às vezes, até com cliente interno. Quem domina este assunto consegue explicar impacto de negócio sem dramatizar, justificar prioridade sem achismo e negociar escopo com base em evidência. Isso pesa muito em avaliação de maturidade, inclusive para vagas júnior.

Também por isso vale revisar o tema pensando em linguagem. Conceito técnico bem entendido melhora ticket, comentário em PR, relatório de execução, conversa de triagem e até a forma como você pede ajuda quando ainda não tem certeza sobre uma hipótese. Em QA, clareza operacional quase sempre anda junto com clareza de comunicação.

## Exemplo concreto de fluxo

${chapter.exampleScenario} Repare que o valor do exemplo não está só no defeito encontrado ou no teste que passou. O valor está no encadeamento: hipótese, execução, evidência, decisão e acompanhamento. Esse encadeamento é o que transforma uma atividade pontual em prática profissional de QA.

Quando você recria um cenário assim no portfólio, o recrutador enxerga duas coisas. Primeiro, que você sabe usar o conceito fora do slide. Segundo, que você entende como documentar raciocínio para que outra pessoa consiga continuar o trabalho sem depender da sua memória. Em ambiente real, isso poupa tempo, reduz mal-entendido e dá mais previsibilidade ao ciclo de qualidade.

Esse cuidado com narrativa de evidência é especialmente útil para quem está em transição de carreira. Ele transforma projeto de estudo em demonstração concreta de repertório profissional, porque mostra não só o que você testou, mas como pensou, priorizou, registrou e aprendeu com o resultado.

## Sinais que você deve observar no dia a dia

${chapter.dailySignals} Bons QAs aprendem a perceber esses sinais cedo, antes que o problema vire retrabalho caro ou defeito em produção. Isso vale tanto para fluxo manual quanto para API, automação, CI/CD e comportamento do time.

Na prática, observar sinais significa olhar para o que mudou no requisito, onde a evidência ainda está fraca, que parte do fluxo concentra mais risco, que automação está frágil ou que conversa ainda ficou ambígua. Quanto mais cedo você conecta esses indícios ao conceito estudado, mais natural fica aplicar o assunto fora do handbook.

${renderArtifactSection(chapter)}

## Erros comuns de iniciante

${chapter.commonMistake} O primeiro erro clássico é tratar o assunto como receita pronta e tentar aplicar a mesma solução em qualquer sistema. Produto, time, risco e maturidade de processo mudam; por isso, a mesma prática precisa ser adaptada ao contexto.

Outro erro frequente é confundir atividade com resultado. Escrever caso de teste, montar collection, abrir bug ou subir pipeline não garante qualidade por si só. O que garante valor é saber por que aquilo existe, que risco cobre, que decisão habilita e como será mantido depois. Quando você liga ação a propósito, a qualidade do trabalho sobe muito.

## Como praticar no portfólio

${chapter.practiceTask} O segredo é não tentar parecer “sênior de mentirinha”. Em vez de inventar um processo perfeito, documente o que você faria, por que escolheu esse recorte e quais limitações ainda existem. Honestidade bem escrita transmite mais maturidade do que prometer cobertura total sem evidência.

Uma boa rotina é fechar cada estudo com três entregáveis: um artefato reutilizável, uma decisão justificada e uma reflexão sobre erro comum. Esse trio fortalece memória técnica, melhora sua fala em entrevista e cria um histórico público de evolução. Com o tempo, os capítulos do handbook deixam de ser só revisão e viram matéria-prima do seu portfólio.

## Como explicar isso em entrevista

${chapter.interviewAngle} Em entrevista, a melhor resposta quase nunca é a mais longa; é a mais conectada com cenário real. Explique em voz alta como você perceberia o problema, que decisão tomaria primeiro e que evidência mostraria para sustentar a sua recomendação.

Se quiser parecer mais seguro sem soar decorado, use uma estrutura simples: contexto, risco, ação, evidência e próximo passo. Essa organização funciona para pergunta técnica e comportamental, porque mostra pensamento crítico. Recrutador percebe quando você entende o assunto no nível da operação e não apenas no nível da definição.

## Como isso conversa com o restante do handbook

Este tema não vive isolado. Em projeto real, ele conversa com o restante do handbook o tempo todo: com análise de risco quando você precisa decidir profundidade de cobertura, com bug report quando a evidência precisa ser bem comunicada, com automação quando o mesmo raciocínio precisa virar regressão sustentável e com entrevista quando você transforma prática em narrativa técnica clara.

Vale a pena revisar o capítulo pensando justamente nessas conexões. Pergunte a si mesmo: em qual projeto do meu portfólio este conceito já apareceu? Em que tipo de bug, decisão de pipeline, escolha de locator, discussão de critério de aceite ou recomendação de release ele ficou mais visível? Essa ponte entre assunto e experiência é o que realmente consolida aprendizado duradouro e evita que o conteúdo fique preso só na memória de curto prazo.

## Checklist mental para levar para o trabalho

Antes de fechar este capítulo, vale revisar um checklist mental rápido. Você sabe definir o conceito com suas palavras? Consegue citar um caso real ou plausível de mercado brasileiro? Sabe apontar um erro comum de iniciante e explicar por que ele custa caro para o time? Se a resposta ainda estiver vacilando, releia as seções pensando no seu projeto atual ou no seu portfólio.

O objetivo final não é decorar o texto deste material. O objetivo é ganhar um raciocínio portátil: algo que você consiga reaplicar em backlog novo, stack diferente e contexto de negócio diferente. Quando isso acontece, o estudo deixa de ser passivo e passa a produzir confiança de execução.

Se você quiser extrair ainda mais valor deste capítulo, feche a leitura anotando uma frase com o conceito principal, um exemplo do seu portfólio e uma dúvida que ainda precisa investigar. Essa rotina simples acelera revisão espaçada e transforma estudo em plano de ação.

Uma forma especialmente útil de consolidar o conteúdo é explicá-lo para outra pessoa como se você estivesse em pairing, onboarding ou revisão de bug. Quando você verbaliza a definição, o contexto brasileiro, o exemplo prático e o erro comum, fica muito mais fácil perceber onde ainda existe lacuna de entendimento. Esse tipo de prática também melhora a sua comunicação profissional, porque aproxima estudo técnico da forma como o assunto aparece em daily, triagem, retrospectiva e entrevista.

${renderQuiz(quizId, chapter.quiz)}

${renderTakeaways(chapter.takeaways)}

<ChecklistItem id="${chapter.checklistId}">Concluí este capítulo</ChecklistItem>
`;

  const words = countWords(content);
  if (words < 1500) {
    throw new Error(`Capítulo ${chapter.folder}/${chapter.slug} ficou com ${words} palavras.`);
  }

  return content;
}

function renderGlossaryChapter(chapter) {
  const grouped = glossaryCards.reduce((acc, card) => {
    if (!acc[card.category]) acc[card.category] = [];
    acc[card.category].push(card);
    return acc;
  }, {});

  const flashcards = Object.entries(grouped)
    .map(([category, cards]) => {
      const items = cards
        .map(
          (card) => `<Flashcard
  term=${JSON.stringify(card.term)}
  definition=${JSON.stringify(card.definition)}
  category=${JSON.stringify(category)}
/>`,
        )
        .join('\n\n');

      return `## ${category}

${renderGlossaryCategoryIntro(category, cards)}

${items}

Fechando esta categoria, faça uma revisão ativa: escolha três termos, explique com suas palavras e diga em que situação de QA você esperaria encontrá-los. Esse hábito simples transforma memória curta em repertório prático e deixa mais fácil perceber lacunas antes de uma entrevista, de uma daily ou de uma execução importante no portfólio.`;
    })
    .join('\n\n');

  const content = `---
title: ${JSON.stringify(chapter.title)}
description: ${JSON.stringify(chapter.description)}
---

import { DifficultyBadge } from '@/components/learning/DifficultyBadge';
import { EstimatedTime } from '@/components/learning/EstimatedTime';
import { ChecklistItem } from '@/components/learning/ChecklistItem';
import { KeyTakeaways } from '@/components/learning/KeyTakeaways';
import { Quiz } from '@/components/learning/Quiz';
import { Flashcard } from '@/components/learning/Flashcard';

<div className="not-prose mb-6 flex flex-wrap items-center gap-3">
  <DifficultyBadge level="${chapter.difficulty}" />
  <EstimatedTime minutes={${chapter.minutes}} />
</div>

## ${chapter.heading}

${chapter.coreIdea} Glossário não serve para decorar buzzword solta. Ele serve para acelerar leitura de requisito, melhorar a conversa com o time e evitar travar em entrevista quando aparece um termo técnico que você até já viu, mas ainda não transformou em vocabulário próprio. Por isso, este capítulo foi organizado em blocos de revisão curta, pensados para leitura recorrente.

No mercado brasileiro, esse tipo de revisão faz diferença porque o QA júnior costuma circular entre contextos muito diferentes: startup sem processo maduro, software house com cliente variado, squad interna em empresa tradicional ou vaga com foco mais manual no começo. Quando o vocabulário está afiado, você gasta menos energia tentando lembrar conceito básico e pode investir o raciocínio no problema real.

## Como usar os flashcards de forma inteligente

Use os cards como ferramenta de repetição espaçada, não como leitura linear única. Clique, tente definir com suas palavras, avalie se você realmente sabe aplicar o termo e só depois veja a definição. Se um termo parecer “óbvio”, force um segundo passo: em que cenário de projeto esse conceito apareceu ou deveria aparecer? Essa ponte com prática é o que fixa conhecimento.

Outro detalhe importante: termo técnico sem contexto vira enfeite. Por isso, ao revisar um card, tente associar o conceito a um bug, um teste, uma discussão de backlog, uma pipeline ou uma pergunta de entrevista. Quanto mais exemplos concretos você tiver na cabeça, menos chance de soar decorado quando precisar explicar o assunto ao vivo.

${flashcards}

## Fechamento de revisão

Depois de revisar os cards, separe alguns minutos para identificar padrões. Quais conceitos se conectam com risco? Quais aparecem mais em API e E2E? Quais entram em bug report, priorização ou CI/CD? Esse agrupamento mental acelera muito sua curva de aprendizado porque transforma palavras soltas em mapa de decisão.

Também vale registrar termos que ainda soam nebulosos. O glossário não substitui os outros módulos; ele aponta onde você precisa aprofundar. Se “idempotência” ficou fraca, volte ao módulo de API. Se “flaky test” ainda está confuso, revise E2E e pipeline. O uso ideal do glossário é exatamente esse: diagnosticar lacuna e guiar a próxima revisão.

${renderQuiz(chapter.quiz.id ?? slugToQuizId(chapter.slug), chapter.quiz)}

${renderTakeaways(chapter.takeaways)}

<ChecklistItem id="${chapter.checklistId}">Concluí este capítulo</ChecklistItem>
`;

  const words = countWords(content);
  if (words < 1500) {
    throw new Error(`Glossário ficou com ${words} palavras.`);
  }

  return content;
}

function renderChapter(chapter) {
  if (chapter.folder === '09-glossario') return renderGlossaryChapter(chapter);
  return renderStandardChapter(chapter);
}

function writeModuleMeta(folder, chapters) {
  writeFile(
    path.join(docsDir, folder, 'meta.json'),
    `${JSON.stringify(
      {
        title: moduleTitles[folder],
        pages: chapters.map((chapter) => chapter.slug),
      },
      null,
      2,
    )}\n`,
  );
}

function writeRootMeta() {
  writeFile(
    path.join(docsDir, 'meta.json'),
    `${JSON.stringify(
      {
        title: 'QA Junior Handbook',
        pages: ['index', ...Object.keys(moduleTitles)],
      },
      null,
      2,
    )}\n`,
  );
}

function main() {
  const chapters = modules.flatMap((docModule) =>
    docModule.chapters.map((chapter) => ({
      ...chapter,
      folder: docModule.folder,
    })),
  );

  for (const docModule of modules) {
    writeModuleMeta(docModule.folder, docModule.chapters);
    for (const chapter of docModule.chapters) {
      const rendered = renderChapter({ ...chapter, folder: docModule.folder });
      writeFile(path.join(docsDir, docModule.folder, `${chapter.slug}.mdx`), rendered);
    }
  }

  writeRootMeta();
  console.log(`Documentação gerada com sucesso: ${chapters.length} capítulos atualizados.`);
}

main();

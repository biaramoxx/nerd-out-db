export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  order: number;
  content: LessonSection[];
}

export interface LessonSection {
  title: string;
  body: string;
  code?: string;
  table?: { headers: string[]; rows: string[][] };
}

export const lessons: Lesson[] = [
  {
    id: "intro",
    title: "O que é um Banco de Dados?",
    description: "Entenda os conceitos fundamentais e por que os bancos de dados são essenciais.",
    icon: "Database",
    category: "Fundamentos",
    order: 1,
    content: [
      {
        title: "Definição",
        body: "Um banco de dados é uma coleção organizada de dados estruturados, armazenados eletronicamente em um sistema de computador. Ele permite que você armazene, organize, recupere e manipule informações de forma eficiente.\n\nImagine uma agenda de contatos: em vez de anotar nomes e telefones em papel, um banco de dados digital permite buscar, ordenar e filtrar milhares de registros instantaneamente.",
      },
      {
        title: "SGBD",
        body: "Sistema Gerenciador de Banco de Dados (SGBD) é o software que permite criar, manipular e administrar bancos de dados. Exemplos populares incluem PostgreSQL, MySQL, SQLite, MongoDB e SQL Server.\n\nO SGBD atua como intermediário entre o usuário (ou aplicação) e os dados armazenados, garantindo segurança, integridade e eficiência.",
      },
      {
        title: "Tipos de Banco de Dados",
        body: "Existem diversos tipos, cada um adequado para diferentes cenários:\n\n• Relacional: organiza dados em tabelas com linhas e colunas (SQL)\n• NoSQL: modelos flexíveis como documentos, grafos, chave-valor\n• Orientado a objetos: dados representados como objetos\n• Em memória: dados armazenados na RAM para máxima velocidade",
      },
    ],
  },
  {
    id: "tabelas",
    title: "Tabelas, Linhas e Colunas",
    description: "Aprenda a estrutura básica de um banco de dados relacional.",
    icon: "Table2",
    category: "Fundamentos",
    order: 2,
    content: [
      {
        title: "Conceitos Básicos",
        body: "Um banco de dados relacional organiza os dados em tabelas. Cada tabela representa uma entidade do mundo real, como clientes, produtos ou pedidos.\n\n• Tabela: estrutura que armazena dados sobre uma entidade\n• Coluna (ou campo): atributo da entidade (ex: nome, email)\n• Linha (ou registro): uma instância específica da entidade",
      },
      {
        title: "Exemplo Prático",
        body: "Veja como uma tabela de 'Clientes' pode ser organizada:",
        table: {
          headers: ["id", "nome", "email", "idade"],
          rows: [
            ["1", "Ana Silva", "ana@email.com", "28"],
            ["2", "Bruno Costa", "bruno@email.com", "34"],
            ["3", "Carla Souza", "carla@email.com", "22"],
          ],
        },
      },
      {
        title: "Tipos de Dados",
        body: "Cada coluna possui um tipo de dado que define que informação pode ser armazenada:\n\n• INTEGER: números inteiros (idade, quantidade)\n• VARCHAR(n): texto de até n caracteres (nome, email)\n• TEXT: textos longos (descrições, comentários)\n• DATE / DATETIME: datas e horários\n• DECIMAL: números decimais (preços, medidas)\n• BOOLEAN: verdadeiro ou falso",
      },
    ],
  },
  {
    id: "chaves",
    title: "Chaves Primárias e Estrangeiras",
    description: "Como conectar tabelas e garantir a integridade dos dados.",
    icon: "KeyRound",
    category: "Fundamentos",
    order: 3,
    content: [
      {
        title: "Chave Primária (Primary Key)",
        body: "A chave primária é um identificador único para cada registro em uma tabela. Ela garante que não existam linhas duplicadas e permite localizar rapidamente um registro específico.\n\nRegras:\n• Deve ser única para cada linha\n• Não pode ser nula (NULL)\n• Geralmente é um número inteiro auto-incrementado (id)",
      },
      {
        title: "Chave Estrangeira (Foreign Key)",
        body: "A chave estrangeira é uma coluna que cria um vínculo entre duas tabelas. Ela referencia a chave primária de outra tabela, estabelecendo um relacionamento.\n\nExemplo: uma tabela de 'Pedidos' pode ter uma coluna 'cliente_id' que referencia o 'id' da tabela 'Clientes'. Isso garante que todo pedido esteja vinculado a um cliente existente.",
      },
      {
        title: "Relacionamentos",
        body: "Os tipos mais comuns de relacionamentos entre tabelas são:\n\n• Um-para-Um (1:1): um registro de A relaciona-se a um de B\n• Um-para-Muitos (1:N): um registro de A relaciona-se a vários de B\n• Muitos-para-Muitos (N:M): vários registros de A relacionam-se a vários de B (requer tabela intermediária)",
      },
    ],
  },
  {
    id: "select",
    title: "Consultando Dados com SELECT",
    description: "Aprenda a recuperar informações do banco de dados.",
    icon: "Search",
    category: "SQL",
    order: 4,
    content: [
      {
        title: "Sintaxe Básica",
        body: "O comando SELECT é o mais utilizado em SQL. Ele permite consultar dados de uma ou mais tabelas.\n\nEstrutura básica:\nSELECT colunas FROM tabela WHERE condição;",
        code: "SELECT nome, email FROM clientes WHERE idade > 25;",
      },
      {
        title: "SELECT com Filtros",
        body: "A cláusula WHERE permite filtrar os resultados com base em condições.\n\nOperadores comuns:\n• = igual a\n• <> ou != diferente de\n• > maior que\n• < menor que\n• >= maior ou igual\n• <= menor ou igual\n• LIKE busca por padrão\n• BETWEEN intervalo\n• IN lista de valores",
        code: "SELECT * FROM produtos WHERE preco BETWEEN 10 AND 50;\nSELECT * FROM clientes WHERE nome LIKE 'A%';",
      },
      {
        title: "Ordenação e Limites",
        body: "Use ORDER BY para ordenar resultados e LIMIT para restringir a quantidade de linhas retornadas.\n\nOrdenação crescente (ASC) é o padrão. Use DESC para ordem decrescente.",
        code: "SELECT * FROM pedidos ORDER BY data DESC LIMIT 10;",
      },
    ],
  },
  {
    id: "crud",
    title: "Inserir, Atualizar e Deletar",
    description: "Operações de manipulação de dados: INSERT, UPDATE e DELETE.",
    icon: "Pencil",
    category: "SQL",
    order: 5,
    content: [
      {
        title: "INSERT",
        body: "O comando INSERT adiciona novos registros a uma tabela.",
        code: "INSERT INTO clientes (nome, email, idade)\nVALUES ('Daniel Lima', 'daniel@email.com', 30);",
      },
      {
        title: "UPDATE",
        body: "O comando UPDATE modifica registros existentes.\n\nIMPORTANTE: sempre use WHERE com UPDATE para evitar alterar todos os registros acidentalmente!",
        code: "UPDATE clientes\nSET email = 'novo@email.com'\nWHERE id = 1;",
      },
      {
        title: "DELETE",
        body: "O comando DELETE remove registros de uma tabela.\n\nIMPORTANTE: sempre use WHERE com DELETE para evitar apagar todos os dados!",
        code: "DELETE FROM clientes\nWHERE id = 3;",
      },
    ],
  },
  {
    id: "joins",
    title: "Combinando Tabelas com JOIN",
    description: "Consulte dados de múltiplas tabelas simultaneamente.",
    icon: "GitMerge",
    category: "SQL",
    order: 6,
    content: [
      {
        title: "INNER JOIN",
        body: "Retorna apenas os registros que possuem correspondência em ambas as tabelas.",
        code: "SELECT clientes.nome, pedidos.valor\nFROM clientes\nINNER JOIN pedidos ON clientes.id = pedidos.cliente_id;",
      },
      {
        title: "LEFT JOIN",
        body: "Retorna todos os registros da tabela da esquerda, e os correspondentes da direita. Se não houver correspondência, retorna NULL.",
        code: "SELECT clientes.nome, pedidos.valor\nFROM clientes\nLEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;",
      },
      {
        title: "Tipos de JOIN",
        body: "• INNER JOIN: apenas correspondências\n• LEFT JOIN: tudo da esquerda + correspondências\n• RIGHT JOIN: tudo da direita + correspondências\n• FULL JOIN: tudo de ambas as tabelas\n• CROSS JOIN: produto cartesiano (todas as combinações)",
      },
    ],
  },
  {
    id: "normalizacao",
    title: "Normalização de Dados",
    description: "Organize seus dados para evitar redundância e inconsistências.",
    icon: "Layers",
    category: "Modelagem",
    order: 7,
    content: [
      {
        title: "Primeira Forma Normal (1FN)",
        body: "Regras:\n• Cada coluna deve conter apenas valores atômicos (indivisíveis)\n• Cada célula deve conter apenas um valor\n• Não deve haver grupos repetitivos de colunas",
      },
      {
        title: "Segunda Forma Normal (2FN)",
        body: "Regras:\n• Deve estar na 1FN\n• Todos os atributos não-chave devem depender da chave primária completa (não apenas parte dela)\n\nIsso é relevante apenas para chaves primárias compostas.",
      },
      {
        title: "Terceira Forma Normal (3FN)",
        body: "Regras:\n• Deve estar na 2FN\n• Não deve haver dependências transitivas (atributos que dependem de outros atributos não-chave)\n\nExemplo ruim: uma tabela de alunos com colunas 'cidade' e 'estado', onde 'estado' depende de 'cidade'. A solução é separar em uma tabela de cidades.",
      },
    ],
  },
  {
    id: "indices",
    title: "Índices e Performance",
    description: "Acelere suas consultas com índices.",
    icon: "Zap",
    category: "Avançado",
    order: 8,
    content: [
      {
        title: "O que são Índices?",
        body: "Um índice é uma estrutura de dados que acelera a busca em uma tabela, funcionando como o índice de um livro: em vez de ler página por página, você vai direto ao assunto.\n\nO SGBD pode usar índices para localizar rapidamente registros sem precisar verificar todas as linhas da tabela.",
      },
      {
        title: "Criando Índices",
        body: "Você pode criar índices em colunas frequentemente usadas em filtros (WHERE), ordenações (ORDER BY) ou junções (JOIN).",
        code: "CREATE INDEX idx_clientes_email ON clientes(email);",
      },
      {
        title: "Cuidados",
        body: "Índices aceleram leituras (SELECT), mas deixam escritas (INSERT, UPDATE, DELETE) mais lentas, pois o índice precisa ser atualizado junto com os dados.\n\nRecomendações:\n• Crie índices em colunas de busca frequente\n• Evite criar muitos índices em tabelas que sofrem muitas alterações\n• A chave primária já possui um índice automaticamente",
      },
    ],
  },
];

export const quizQuestions = [
  {
    question: "O que é uma chave primária (Primary Key)?",
    options: [
      "Um campo que pode ter valores repetidos",
      "Um identificador único para cada registro em uma tabela",
      "Um campo que conecta duas tabelas diferentes",
      "Um tipo de dado numérico decimal",
    ],
    correctIndex: 1,
    explanation: "A chave primária é um identificador único e obrigatório para cada registro, garantindo que não existam duplicatas.",
  },
  {
    question: "Qual comando SQL é usado para consultar dados?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    correctIndex: 2,
    explanation: "SELECT é o comando usado para recuperar dados de uma ou mais tabelas.",
  },
  {
    question: "Qual tipo de JOIN retorna apenas registros com correspondência em ambas as tabelas?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
    correctIndex: 2,
    explanation: "INNER JOIN retorna apenas as linhas que possuem correspondência em ambas as tabelas envolvidas.",
  },
  {
    question: "Na 1ª Forma Normal (1FN), qual regra deve ser seguida?",
    options: [
      "Não deve haver dependências transitivas",
      "Cada coluna deve conter apenas valores atômicos (indivisíveis)",
      "Todos os atributos devem depender da chave primária completa",
      "Deve haver pelo menos 3 tabelas",
    ],
    correctIndex: 1,
    explanation: "A 1FN exige que cada célula contenha um valor atômico e não haja grupos repetitivos.",
  },
  {
    question: "O que acontece se você executar UPDATE sem a cláusula WHERE?",
    options: [
      "Nenhum registro é alterado",
      "Apenas o primeiro registro é alterado",
      "Todos os registros da tabela são alterados",
      "O comando retorna erro",
    ],
    correctIndex: 2,
    explanation: "Sem WHERE, o UPDATE afeta todas as linhas da tabela. Sempre use WHERE para restringir a alteração!",
  },
  {
    question: "Qual é a função de uma chave estrangeira (Foreign Key)?",
    options: [
      "Identificar unicamente cada registro",
      "Criar um relacionamento entre duas tabelas",
      "Indexar uma coluna para busca rápida",
      "Criptografar dados sensíveis",
    ],
    correctIndex: 1,
    explanation: "A chave estrangeira referencia a chave primária de outra tabela, estabelecendo um vínculo entre elas.",
  },
  {
    question: "Qual comando adiciona novos registros a uma tabela?",
    options: ["INSERT", "SELECT", "UPDATE", "ALTER"],
    correctIndex: 0,
    explanation: "INSERT INTO é o comando usado para adicionar novas linhas a uma tabela.",
  },
  {
    question: "Para que servem índices em um banco de dados?",
    options: [
      "Para criptografar dados",
      "Para acelerar consultas de busca",
      "Para criar backup automático",
      "Para validar tipos de dados",
    ],
    correctIndex: 1,
    explanation: "Índices aceleram operações de busca (SELECT), embora possam deixar escritas (INSERT/UPDATE/DELETE) um pouco mais lentas.",
  },
];

# Especificações do Projeto

Os pontos mais relevantes mediante as especificações propostas foram mencionadas e alocadas abaixo, conforme as personas, funcionalidades, requisitos e custos pesquisados! 

## Personas

1 - Gláucio da Costa Silva - 19 anos, aluno no curso de Ciências da Computação. 
Hobbies: Gosta de jogar videogame, sair com os amigos e ler diversos tipos de sites informativos sobre o mundo gamer. 
Conhecimentos: Fez um pequeno curso de SQL na Alura e de C# na UDEMY, busca crescer na área de TI. 
Trabalho: Exerce a função de vendedor em uma loja conceituada na região Norte.

2 - Edivan Neto Rossi - 24 anos, aluno no curso de Ciências da Computação. 
Hobbies: Gosta sair com os amigos, cozinhar e assistir vídeos de jogos. 
Conhecimentos: Java, HTML e um pequeno curso de CSS. 
Trabalho: Exerce a função de Suporte em uma empresa de gestão de atividades.

3 - Clara Ferreira Benevides - 21 anos, aluna no curso de Ciências da Computação. 
Hobbies: Gosta de jogar videogame, sair com as amigas e de ler diversos livros. 
Conhecimentos: HTML, SQL e C#. 
Trabalho: Exerce a função de Analista de sistemas e maquiadora nas horas vagas.

4 - João Victor Cunha - 45 anos, professor do curso de Ciências da Computação. 
Hobbies: Cozinhar, passear com a família e interagir com os amigos. 
Conhecimentos: Todos os tipos de programações e cursado em comunicação interpessoal. 
Trabalho: Exerce a função de professor à mais de 15 anos, na área da Ciência da Computação.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário             | Visualizar tarefas/grupos          | Melhor organização das atividades      |
|Administrador       | Visualizar/Avaliar grupos e tarefas| Conduzir/Organizar os grupos           |
 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir cadastro ao APP                                | ALTA | 
|RF-002| Tela inicial deve conter o botão de login               | ALTA |
|RF-003| Permitir acesso dos usuários a tela de tarefas/grupos   | ALTA |
|RF-004| Permitir criação de grupos pelos usuários               | ALTA |
|RF-005| Permitir criação de tarefas pelos usuários (professor)  | ALTA |
|RF-006| Apresentar o prazo para cada atividade gerada           | ALTA |
|RF-007| Tela de Histórico do Usuário                            | BAIXA |
|RF-008| Notificações de prazos de entrega das tarefas           | MÉDIA |




### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O aplicativo deve ser publicado e utilizado por qualquer versão de aparelho       | ALTA | 
|RNF-002| Deve armazenar as informações listadas pelo usuário                               | MÉDIA | 
|RNF-003| Transições de entre as telas de 2s a 4s                                           | ALTA | 
|RNF-004| Dados dos usuários devem ser registrados, guardados e protegidos com segurança    | ALTA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                                                                  |
|--|--------------------------------------------------------------------------------------------|
|01| Aplicativo deverá ser entregue/finalizado até o prazo final do semestre atual (23/06/2023) |
|02| Aplicativo deverá ser implementado com o uso de programações voltadas para o mobile        |

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

Fizemos o Diagrama de Casos de Uso utilizando o GitMind

Inserir imagem: 

# Matriz de Rastreabilidade

|    | RF-001 | RF-002 | RF-003 | RF-004 | RF-005 | RF-006 | RF-007 | RF-008 |
|------|----|----|----|----|----|----|----|----|
|RF-001| | x | x | x | x |  | x |  |
|RF-002|x|  |  |  |  |  |  |  |
|RF-003| x |  |  |  |  |  |  |  |
|RF-004| x |  |  |  |  |  |  |  |
|RF-005| x |  |  |  |  |  |  |  |
|RF-006|  |  |  |  |  |  |  |  |
|RF-007| x |  |  |  |  |  |  |  |
|RF-008|  |  |  |  |  |  |  |  |

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

Para o Gerenciamento do projeto, optamos pela utilização do DevOps e do Kanban para registros e criações das demandas, visto que se torna mais prático e agil para a visibilidade de todos os integrantes do grupo.

## Gerenciamento de Tempo

Conforme citado acima, utilizaremos o DevOps com o intuito de falicitar o gerenciamento de Projeto e Tempo, pois o mesmo contém o registros de horas gastas em cada demanda por sprint, visto que facilita o monitoramento geral do SCRUM MASTER durante o desenvolvimento do projeto.

## Gestão de Orçamento

Custos financeiros para o início e continuidade do projeto (sujeito a mudanças)

Gasto estimado	|  Valor
Recursos Humanos	| R$ 15.000,00
4 Aparelhos Android 8/13 |  R$ 12.000,00
2 Notebooks | R$ 5.000,00
Licenças de Softwares | R$ 100.000,00
Cursos e treinamentos | R$ 25.000,00
Especialização | R$ 12.500,00
3 Desenvolvedores Salários | R$ 20.000,00

TOTAL	 |R$ 189.500,00

